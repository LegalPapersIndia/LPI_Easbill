
// import { Pencil, Trash2 } from "lucide-react";

// export default function ItemsTable({ items, onEdit, onDelete }) {
//   if (items.length === 0) {
//     return (
//       <div className="bg-white border border-border rounded-xl p-10 text-center">
//         <p className="text-ink-muted text-sm">No items found. Add a new item or check your search/filters.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white border border-border rounded-xl overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="w-full min-w-220 text-sm">
//           <thead>
//             <tr className="text-left text-ink-muted bg-paper border-b border-border">
//               <th className="py-3 px-4 font-medium">Item</th>
//               <th className="py-3 px-4 font-medium">Type</th>
//               <th className="py-3 px-4 font-medium">Group</th>
//               <th className="py-3 px-4 font-medium">Brand</th>
//               <th className="py-3 px-4 font-medium text-right">Purchase</th>
//               <th className="py-3 px-4 font-medium text-right">Sale</th>
//               <th className="py-3 px-4 font-medium text-right">GST%</th>
//               <th className="py-3 px-4 font-medium text-right">Stock</th>
//               <th className="py-3 px-4 font-medium text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map((item) => {
//               const isService = item.itemType === "Service";
//               const lowStock = !isService && item.stockQty <= (item.lowStockThreshold || 10);
//               const displayPrice = isService ? item.serviceCharge : item.salePrice;
//               return (
//                 <tr key={item._id} className="border-b border-border last:border-0 hover:bg-paper/60 transition-colors">
//                   <td className="py-3 px-4">
//                     <p className="text-ink font-medium">{item.name}</p>
//                     <p className="text-xs text-ink-muted tabular-num">{item.sku}</p>
//                   </td>
//                   <td className="py-3 px-4">
//                     <span className={`text-xs px-2 py-1 rounded-full font-medium
//                       ${isService ? "bg-brand-light text-brand" : "bg-status-paid/10 text-status-paid"}`}>
//                       {item.itemType}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4 text-ink-muted">{item.group || "-"}</td>
//                   <td className="py-3 px-4 text-ink-muted">{item.brand || "-"}</td>
//                   <td className="py-3 px-4 tabular-num text-right text-ink-muted">
//                     {isService ? "-" : `₹${item.purchasePrice}`}
//                   </td>
//                   <td className="py-3 px-4 tabular-num text-right text-ink font-medium">₹{displayPrice}</td>
//                   <td className="py-3 px-4 tabular-num text-right text-ink-muted">{item.gstPercent}%</td>
//                   <td className="py-3 px-4 text-right">
//                     {isService ? (
//                       <span className="text-xs text-ink-muted">—</span>
//                     ) : (
//                       <span className={`tabular-num text-xs px-2 py-1 rounded-full font-medium
//                         ${lowStock ? "bg-status-pending/10 text-status-pending" : "bg-status-paid/10 text-status-paid"}`}>
//                         {item.stockQty} {item.unit}
//                       </span>
//                     )}
//                   </td>
//                   <td className="py-3 px-4">
//                     <div className="flex items-center justify-end gap-2">
//                       <button onClick={() => onEdit(item)} className="text-ink-muted hover:text-brand transition-colors">
//                         <Pencil size={16} />
//                       </button>
//                       <button onClick={() => onDelete(item._id)} className="text-ink-muted hover:text-status-overdue transition-colors">
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }




import { useState } from "react";
import { Pencil, Trash2, Download, FileSpreadsheet, FileText, ChevronDown } from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ItemsTable({ items, onEdit, onDelete }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [downloadOpen, setDownloadOpen] = useState(false);

  if (items.length === 0) {
    return (
      <div className="bg-white border border-border rounded-xl p-10 text-center">
        <p className="text-ink-muted text-sm">No items found. Add a new item or check your search/filters.</p>
      </div>
    );
  }

  const allSelected = selectedIds.length === items.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((item) => item._id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const getSelectedItems = () =>
    items.filter((item) => selectedIds.includes(item._id));

  const handleExportExcel = () => {
    const rows = getSelectedItems().map((item) => {
      const isService = item.itemType === "Service";
      const displayPrice = isService ? item.serviceCharge : item.salePrice;
      return {
        Item: item.name,
        SKU: item.sku,
        Type: item.itemType,
        Group: item.group || "-",
        Brand: item.brand || "-",
        Purchase: isService ? "-" : item.purchasePrice,
        Sale: displayPrice,
        "GST%": item.gstPercent,
        Stock: isService ? "-" : `${item.stockQty} ${item.unit}`,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Items");
    XLSX.writeFile(workbook, "items.xlsx");
    setDownloadOpen(false);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const rows = getSelectedItems().map((item) => {
      const isService = item.itemType === "Service";
      const displayPrice = isService ? item.serviceCharge : item.salePrice;
      return [
        item.name,
        item.itemType,
        item.group || "-",
        item.brand || "-",
        isService ? "-" : `Rs ${item.purchasePrice}`,
        `Rs ${displayPrice}`,
        `${item.gstPercent}%`,
        isService ? "-" : `${item.stockQty} ${item.unit}`,
      ];
    });

    doc.text("Items", 14, 12);
    autoTable(doc, {
      startY: 18,
      head: [["Item", "Type", "Group", "Brand", "Purchase", "Sale", "GST%", "Stock"]],
      body: rows,
    });
    doc.save("items.pdf");
    setDownloadOpen(false);
  };

  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-paper">
        <span className="text-sm text-ink-muted">
          {selectedIds.length > 0
            ? `${selectedIds.length} selected`
            : "Select items to download"}
        </span>

        <div className="relative">
          <button
            onClick={() => setDownloadOpen((o) => !o)}
            disabled={selectedIds.length === 0}
            className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg bg-status-overdue text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-red-700 transition-colors"
          >
            <Download size={15} />
            Download
            <ChevronDown size={14} />
          </button>

          {downloadOpen && selectedIds.length > 0 && (
            <div className="absolute right-0 mt-1 w-44 bg-white border border-border rounded-lg shadow-lg z-10 overflow-hidden">
              <button
                onClick={handleExportExcel}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-ink hover:bg-paper transition-colors"
              >
                <FileSpreadsheet size={15} />
                Export as Excel
              </button>
              <button
                onClick={handleExportPDF}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-ink hover:bg-paper transition-colors"
              >
                <FileText size={15} />
                Export as PDF
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-220 text-sm">
          <thead>
            <tr className="text-left text-ink-muted bg-paper border-b border-border">
              <th className="py-3 px-4 font-medium w-10">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  className="accent-brand w-4 h-4 cursor-pointer"
                />
              </th>
              <th className="py-3 px-4 font-medium">Item</th>
              <th className="py-3 px-4 font-medium">Type</th>
              <th className="py-3 px-4 font-medium">Group</th>
              <th className="py-3 px-4 font-medium">Brand</th>
              <th className="py-3 px-4 font-medium text-right">Purchase</th>
              <th className="py-3 px-4 font-medium text-right">Sale</th>
              <th className="py-3 px-4 font-medium text-right">GST%</th>
              <th className="py-3 px-4 font-medium text-right">Stock</th>
              <th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const isService = item.itemType === "Service";
              const lowStock = !isService && item.stockQty <= (item.lowStockThreshold || 10);
              const displayPrice = isService ? item.serviceCharge : item.salePrice;
              return (
                <tr key={item._id} className="border-b border-border last:border-0 hover:bg-paper/60 transition-colors">
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item._id)}
                      onChange={() => toggleSelectOne(item._id)}
                      className="accent-brand w-4 h-4 cursor-pointer"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-ink font-medium">{item.name}</p>
                    <p className="text-xs text-ink-muted tabular-num">{item.sku}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium
                      ${isService ? "bg-brand-light text-brand" : "bg-status-paid/10 text-status-paid"}`}>
                      {item.itemType}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-ink-muted">{item.group || "-"}</td>
                  <td className="py-3 px-4 text-ink-muted">{item.brand || "-"}</td>
                  <td className="py-3 px-4 tabular-num text-right text-ink-muted">
                    {isService ? "-" : `₹${item.purchasePrice}`}
                  </td>
                  <td className="py-3 px-4 tabular-num text-right text-ink font-medium">₹{displayPrice}</td>
                  <td className="py-3 px-4 tabular-num text-right text-ink-muted">{item.gstPercent}%</td>
                  <td className="py-3 px-4 text-right">
                    {isService ? (
                      <span className="text-xs text-ink-muted">—</span>
                    ) : (
                      <span className={`tabular-num text-xs px-2 py-1 rounded-full font-medium
                        ${lowStock ? "bg-status-pending/10 text-status-pending" : "bg-status-paid/10 text-status-paid"}`}>
                        {item.stockQty} {item.unit}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => onEdit(item)} className="text-ink-muted hover:text-brand transition-colors">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => onDelete(item._id)} className="text-ink-muted hover:text-status-overdue transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}