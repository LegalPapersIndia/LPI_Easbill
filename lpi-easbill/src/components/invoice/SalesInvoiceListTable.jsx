// import { Eye, Pencil, Trash2 } from "lucide-react";
// import { calculateInvoiceStatus, getStatusStyle } from "../../utils/statusHelpers";
// import { useNavigate } from "react-router-dom";
// export default function SalesInvoiceListTable({ invoices, onEdit, onDelete }) {
//   if (invoices.length === 0) {
//     return (
//       <div className="bg-white border border-border rounded-xl p-10 text-center">
//         <p className="text-ink-muted text-sm">Koi invoice nahi mila. "New Sales Invoice" se pehla banao.</p>
//       </div>
//     );
//   }
// const navigate = useNavigate();
//   return (
//     <div className="bg-white border border-border rounded-xl overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="w-full min-w-170 text-sm">
//           <thead>
//             <tr className="text-left text-ink-muted bg-paper border-b border-border">
//               <th className="py-3 px-4 font-medium">Date</th>
//               <th className="py-3 px-4 font-medium">Invoice No</th>
//               <th className="py-3 px-4 font-medium">Customer</th>
//               <th className="py-3 px-4 font-medium text-right">Amount</th>
//               <th className="py-3 px-4 font-medium text-right">Status</th>
//               <th className="py-3 px-4 font-medium text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoices.map((inv) => {
//               const status = calculateInvoiceStatus(inv);
//               return (
//                 <tr key={inv._id} className="border-b border-border last:border-0 hover:bg-paper/60 transition-colors">
//                   <td className="py-3 px-4 text-ink-muted tabular-num">
//                     {new Date(inv.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//                   </td>
//                   <td className="py-3 px-4 tabular-num text-ink font-medium">{inv.invoiceNo}</td>
//                   <td className="py-3 px-4 text-ink">{inv.customerName}</td>
//                   <td className="py-3 px-4 tabular-num text-right text-ink font-medium">
//                     ₹{inv.grandTotal.toLocaleString("en-IN")}
//                   </td>
//                   <td className="py-3 px-4 text-right">
//                     <span className={`capitalize text-xs px-2 py-1 rounded-full font-medium ${getStatusStyle(status)}`}>
//                       {status}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4">
//                     <div className="flex items-center justify-end gap-2">
//                       <button onClick={() => navigate(`/print/invoice/${inv._id}?type=sales`)} className="text-ink-muted hover:text-brand transition-colors">
//   <Eye size={16} />
// </button>
//                       <button onClick={() => onEdit(inv)} className="text-ink-muted hover:text-brand transition-colors"><Pencil size={16} /></button>
//                       <button onClick={() => onDelete(inv._id)} className="text-ink-muted hover:text-status-overdue transition-colors"><Trash2 size={16} /></button>
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

// import { Eye, Pencil, Trash2 } from "lucide-react";
// import { calculateInvoiceStatus, getStatusStyle } from "../../utils/statusHelpers";
// import { useNavigate } from "react-router-dom";

// export default function SalesInvoiceListTable({ invoices, onEdit, onDelete }) {
//   if (invoices.length === 0) {
//     return (
//       <div className="bg-white border border-border rounded-xl p-10 text-center">
//         <p className="text-ink-muted text-sm">No invoice found. Create the first one using "New Sales Invoice".</p>
//       </div>
//     );
//   }

//   const navigate = useNavigate();

//   return (
//     <div className="bg-white border border-border rounded-xl overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="w-full min-w-170 text-sm">
//           <thead>
//             <tr className="text-left text-ink-muted bg-paper border-b border-border">
//               <th className="py-3 px-4 font-medium">Date</th>
//               <th className="py-3 px-4 font-medium">Invoice No</th>
//               <th className="py-3 px-4 font-medium">Customer</th>
//               <th className="py-3 px-4 font-medium text-right">Amount</th>
//               <th className="py-3 px-4 font-medium text-right">Status</th>
//               <th className="py-3 px-4 font-medium text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoices.map((inv) => {
//               const status = calculateInvoiceStatus(inv);
//               return (
//                 <tr key={inv._id} className="border-b border-border last:border-0 hover:bg-paper/60 transition-colors">
//                   <td className="py-3 px-4 text-ink-muted tabular-num">
//                     {new Date(inv.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//                   </td>
//                   <td className="py-3 px-4 tabular-num text-ink font-medium">{inv.invoiceNo}</td>
//                   <td className="py-3 px-4 text-ink">{inv.customerId?.name || "N/A"}</td>
//                   <td className="py-3 px-4 tabular-num text-right text-ink font-medium">
//                     ₹{inv.grandTotal.toLocaleString("en-IN")}
//                   </td>
//                   <td className="py-3 px-4 text-right">
//                     <span className={`capitalize text-xs px-2 py-1 rounded-full font-medium ${getStatusStyle(status)}`}>
//                       {status}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4">
//                     <div className="flex items-center justify-end gap-2">
//                       <button onClick={() => navigate(`/print/invoice/${inv._id}?type=sales`)} className="text-ink-muted hover:text-brand transition-colors">
//                         <Eye size={16} />
//                       </button>
//                       <button onClick={() => onEdit(inv)} className="text-ink-muted hover:text-brand transition-colors"><Pencil size={16} /></button>
//                       <button onClick={() => onDelete(inv._id)} className="text-ink-muted hover:text-status-overdue transition-colors"><Trash2 size={16} /></button>
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



// import { useState } from "react";
// import {
//   Eye,
//   Pencil,
//   Trash2,
//   Download,
//   FileSpreadsheet,
//   FileText,
//   ChevronDown,
// } from "lucide-react";
// import {
//   calculateInvoiceStatus,
//   getStatusStyle,
// } from "../../utils/statusHelpers";
// import { useNavigate } from "react-router-dom";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// export default function SalesInvoiceListTable({ invoices, onEdit, onDelete }) {
//   const [selectedIds, setSelectedIds] = useState([]);
//   const [downloadOpen, setDownloadOpen] = useState(false);

//   if (invoices.length === 0) {
//     return (
//       <div className="bg-white border border-border rounded-xl p-10 text-center">
//         <p className="text-ink-muted text-sm">
//           No invoice found. Create the first one using "New Sales Invoice".
//         </p>
//       </div>
//     );
//   }

//   const navigate = useNavigate();

//   const allSelected = selectedIds.length === invoices.length;

//   const toggleSelectAll = () => {
//     if (allSelected) {
//       setSelectedIds([]);
//     } else {
//       setSelectedIds(invoices.map((inv) => inv._id));
//     }
//   };

//   const toggleSelectOne = (id) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
//     );
//   };

//   const getSelectedInvoices = () =>
//     invoices.filter((inv) => selectedIds.includes(inv._id));

//   const handleExportExcel = () => {
//     const rows = getSelectedInvoices().map((inv) => ({
//       Date: new Date(inv.date).toLocaleDateString("en-IN", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       }),
//       "Invoice No": inv.invoiceNo,
//       Customer: inv.customerId?.name || "N/A",
//       Amount: inv.grandTotal,
//       Status: calculateInvoiceStatus(inv),
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(rows);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Invoices");
//     XLSX.writeFile(workbook, "sales-invoices.xlsx");
//     setDownloadOpen(false);
//   };

//   const handleExportPDF = () => {
//     const doc = new jsPDF();
//     const rows = getSelectedInvoices().map((inv) => [
//       new Date(inv.date).toLocaleDateString("en-IN", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       }),
//       inv.invoiceNo,
//       inv.customerId?.name || "N/A",
//       `Rs ${inv.grandTotal.toLocaleString("en-IN")}`,
//       calculateInvoiceStatus(inv),
//     ]);

//     doc.text("Sales Invoices", 14, 12);
//     autoTable(doc, {
//       startY: 18,
//       head: [["Date", "Invoice No", "Customer", "Amount", "Status"]],
//       body: rows,
//     });
//     doc.save("sales-invoices.pdf");
//     setDownloadOpen(false);
//   };

//   return (
//     <div className="bg-white border border-border rounded-xl overflow-hidden">
//       {/* Toolbar */}
//       <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-paper">
//         <span className="text-sm text-ink-muted">
//           {selectedIds.length > 0
//             ? `${selectedIds.length} selected`
//             : "Select invoices to download"}
//         </span>

//         <div className="relative">
//           <button
//             onClick={() => setDownloadOpen((o) => !o)}
//             disabled={selectedIds.length === 0}
//             className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg bg-status-overdue text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-red-700 transition-colors"
//           >
//             <Download size={15} />
//             Download
//             <ChevronDown size={14} />
//           </button>

//           {downloadOpen && selectedIds.length > 0 && (
//             <div className="absolute right-0 mt-1 w-44 bg-white border border-border rounded-lg shadow-lg z-10 overflow-hidden">
//               <button
//                 onClick={handleExportExcel}
//                 className="w-full flex items-center gap-2 px-3 py-2 text-sm text-ink hover:bg-paper transition-colors"
//               >
//                 <FileSpreadsheet size={15} />
//                 Export as Excel
//               </button>
//               <button
//                 onClick={handleExportPDF}
//                 className="w-full flex items-center gap-2 px-3 py-2 text-sm text-ink hover:bg-paper transition-colors"
//               >
//                 <FileText size={15} />
//                 Export as PDF
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full min-w-170 text-sm">
//           <thead>
//             <tr className="text-left text-ink-muted bg-paper border-b border-border">
//               <th className="py-3 px-4 font-medium w-10">
//                 <input
//                   type="checkbox"
//                   checked={allSelected}
//                   onChange={toggleSelectAll}
//                   className="accent-brand w-4 h-4 cursor-pointer"
//                 />
//               </th>
//               <th className="py-3 px-4 font-medium">Date</th>
//               <th className="py-3 px-4 font-medium">Invoice No</th>
//               <th className="py-3 px-4 font-medium">Customer</th>
//               <th className="py-3 px-4 font-medium text-right">Amount</th>
//               <th className="py-3 px-4 font-medium text-right">Status</th>
//               <th className="py-3 px-4 font-medium text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoices.map((inv) => {
//               const status = calculateInvoiceStatus(inv);
//               return (
//                 <tr
//                   key={inv._id}
//                   className="border-b border-border last:border-0 hover:bg-paper/60 transition-colors"
//                 >
//                   <td className="py-3 px-4">
//                     <input
//                       type="checkbox"
//                       checked={selectedIds.includes(inv._id)}
//                       onChange={() => toggleSelectOne(inv._id)}
//                       className="accent-brand w-4 h-4 cursor-pointer"
//                     />
//                   </td>
//                   <td className="py-3 px-4 text-ink-muted tabular-num">
//                     {new Date(inv.date).toLocaleDateString("en-IN", {
//                       day: "2-digit",
//                       month: "short",
//                       year: "numeric",
//                     })}
//                   </td>
//                   <td className="py-3 px-4 tabular-num text-ink font-medium">
//                     {inv.invoiceNo}
//                   </td>
//                   <td className="py-3 px-4 text-ink">
//                     {inv.customerId?.name || "N/A"}
//                   </td>
//                   <td className="py-3 px-4 tabular-num text-right text-ink font-medium">
//                     ₹{inv.grandTotal.toLocaleString("en-IN")}
//                   </td>
//                   <td className="py-3 px-4 text-right">
//                     <span
//                       className={`capitalize text-xs px-2 py-1 rounded-full font-medium ${getStatusStyle(status)}`}
//                     >
//                       {status}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4">
//                     <div className="flex items-center justify-end gap-2">
//                       <button
//                         onClick={() =>
//                           navigate(`/print/invoice/${inv._id}?type=sales`)
//                         }
//                         className="text-ink-muted hover:text-brand transition-colors"
//                       >
//                         <Eye size={16} />
//                       </button>
//                       <button
//                         onClick={() => onEdit(inv)}
//                         className="text-ink-muted hover:text-brand transition-colors"
//                       >
//                         <Pencil size={16} />
//                       </button>
//                       <button
//                         onClick={() => onDelete(inv._id)}
//                         className="text-ink-muted hover:text-status-overdue transition-colors"
//                       >
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
import {
  Eye,
  Pencil,
  Trash2,
  Download,
  FileSpreadsheet,
  FileText,
  ChevronDown,
} from "lucide-react";
import {
  calculateInvoiceStatus,
  getStatusStyle,
} from "../../utils/statusHelpers";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getSalesInvoiceById } from "../../api/salesInvoiceApi";

export default function SalesInvoiceListTable({ invoices, onEdit, onDelete }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [exporting, setExporting] = useState(false);

  if (invoices.length === 0) {
    return (
      <div className="bg-white border border-border rounded-xl p-10 text-center">
        <p className="text-ink-muted text-sm">
          No invoice found. Create the first one using "New Sales Invoice".
        </p>
      </div>
    );
  }

  const navigate = useNavigate();

  const allSelected = selectedIds.length === invoices.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(invoices.map((inv) => inv._id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  // ── Selected invoices ka POORA data backend se fetch karo (line items ke sath) ──
  const fetchFullInvoices = async () => {
    const results = await Promise.all(
      selectedIds.map((id) => getSalesInvoiceById(id).then((res) => res.data.invoice))
    );
    return results;
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  const handleExportExcel = async () => {
    try {
      setExporting(true);
      const fullInvoices = await fetchFullInvoices();

      const rows = [];

      fullInvoices.forEach((inv, idx) => {
        const customer = inv.customerId || {};
        const balance = inv.grandTotal - (inv.amountReceived || 0);

        rows.push(["Invoice No:", inv.invoiceNo, "", "Date:", formatDate(inv.date), "", "Due Date:", inv.dueDate ? formatDate(inv.dueDate) : "-"]);
        rows.push(["Customer:", customer.name || "N/A", "", "GSTIN:", customer.gstin || "N/A", "", "Mobile:", customer.mobile || "N/A"]);
        rows.push(["Billing Address:", customer.billingAddress || "-", "", "State:", customer.state || "-"]);
        rows.push(["Payment Terms (Days):", inv.paymentTerms ?? "-", "", "Payment Mode:", inv.paymentMode || "-"]);
        rows.push([]);
        rows.push(["Item", "HSN", "Qty", "Unit", "Rate", "GST %", "Amount"]);

        (inv.lines || []).forEach((line) => {
          const amount = line.qty * line.rate;
          rows.push([
            line.name,
            line.hsnCode || "-",
            line.qty,
            line.unit || "-",
            line.rate,
            line.gstPercent || 0,
            amount,
          ]);
        });

        rows.push([]);
        rows.push(["", "", "", "", "", "Subtotal", inv.subtotal]);
        rows.push(["", "", "", "", "", "Discount", inv.discount || 0]);
        rows.push(["", "", "", "", "", "Shipping", inv.shipping || 0]);
        rows.push(["", "", "", "", "", "GST", inv.gstBreakup || 0]);
        rows.push(["", "", "", "", "", "Grand Total", inv.grandTotal]);
        rows.push(["", "", "", "", "", "Amount Received", inv.amountReceived || 0]);
        rows.push(["", "", "", "", "", "Balance", balance]);
        rows.push([]);
        rows.push(["Notes:", inv.notes || "-"]);
        rows.push(["Terms & Conditions:", inv.terms || "-"]);

        if (idx !== fullInvoices.length - 1) {
          rows.push([]);
          rows.push(["=========================================="]);
          rows.push([]);
        }
      });

      const worksheet = XLSX.utils.aoa_to_sheet(rows);
      worksheet["!cols"] = [
        { wch: 22 }, { wch: 20 }, { wch: 10 }, { wch: 12 }, { wch: 12 }, { wch: 10 }, { wch: 14 },
      ];

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Invoices");
      XLSX.writeFile(workbook, "sales-invoices-detailed.xlsx");
    } catch (err) {
      alert("Export karne mein error aaya");
      console.error(err);
    } finally {
      setExporting(false);
      setDownloadOpen(false);
    }
  };

  const handleExportPDF = async () => {
    try {
      setExporting(true);
      const fullInvoices = await fetchFullInvoices();

      const doc = new jsPDF();
      let cursorY = 14;

      fullInvoices.forEach((inv, idx) => {
        if (idx > 0) {
          doc.addPage();
          cursorY = 14;
        }

        const customer = inv.customerId || {};
        const balance = inv.grandTotal - (inv.amountReceived || 0);

        doc.setFontSize(14);
        doc.text(`Invoice: ${inv.invoiceNo}`, 14, cursorY);
        cursorY += 7;

        doc.setFontSize(10);
        doc.text(`Date: ${formatDate(inv.date)}    Due Date: ${inv.dueDate ? formatDate(inv.dueDate) : "-"}`, 14, cursorY);
        cursorY += 6;
        doc.text(`Customer: ${customer.name || "N/A"}    GSTIN: ${customer.gstin || "N/A"}    Mobile: ${customer.mobile || "N/A"}`, 14, cursorY);
        cursorY += 6;
        doc.text(`Payment Terms: ${inv.paymentTerms ?? "-"} days    Payment Mode: ${inv.paymentMode || "-"}`, 14, cursorY);
        cursorY += 8;

        const itemRows = (inv.lines || []).map((line) => [
          line.name,
          line.hsnCode || "-",
          line.qty,
          line.unit || "-",
          `Rs ${line.rate.toLocaleString("en-IN")}`,
          `${line.gstPercent || 0}%`,
          `Rs ${(line.qty * line.rate).toLocaleString("en-IN")}`,
        ]);

        autoTable(doc, {
          startY: cursorY,
          head: [["Item", "HSN", "Qty", "Unit", "Rate", "GST%", "Amount"]],
          body: itemRows,
          styles: { fontSize: 9 },
        });

        cursorY = doc.lastAutoTable.finalY + 6;

        doc.setFontSize(10);
        doc.text(`Subtotal: Rs ${inv.subtotal.toLocaleString("en-IN")}`, 140, cursorY); cursorY += 5;
        doc.text(`Discount: Rs ${(inv.discount || 0).toLocaleString("en-IN")}`, 140, cursorY); cursorY += 5;
        doc.text(`Shipping: Rs ${(inv.shipping || 0).toLocaleString("en-IN")}`, 140, cursorY); cursorY += 5;
        doc.text(`GST: Rs ${(inv.gstBreakup || 0).toLocaleString("en-IN")}`, 140, cursorY); cursorY += 5;
        doc.setFont(undefined, "bold");
        doc.text(`Grand Total: Rs ${inv.grandTotal.toLocaleString("en-IN")}`, 140, cursorY); cursorY += 5;
        doc.setFont(undefined, "normal");
        doc.text(`Amount Received: Rs ${(inv.amountReceived || 0).toLocaleString("en-IN")}`, 140, cursorY); cursorY += 5;
        doc.text(`Balance: Rs ${balance.toLocaleString("en-IN")}`, 140, cursorY); cursorY += 8;

        if (inv.notes) {
          doc.text(`Notes: ${inv.notes}`, 14, cursorY);
          cursorY += 6;
        }
        if (inv.terms) {
          const termsLines = doc.splitTextToSize(`Terms: ${inv.terms}`, 180);
          doc.text(termsLines, 14, cursorY);
        }
      });

      doc.save("sales-invoices-detailed.pdf");
    } catch (err) {
      alert("Export karne mein error aaya");
      console.error(err);
    } finally {
      setExporting(false);
      setDownloadOpen(false);
    }
  };

  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-paper">
        <span className="text-sm text-ink-muted">
          {selectedIds.length > 0
            ? `${selectedIds.length} selected`
            : "Select invoices to download"}
        </span>

        <div className="relative">
          <button
            onClick={() => setDownloadOpen((o) => !o)}
            disabled={selectedIds.length === 0 || exporting}
            className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg bg-status-overdue text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-red-700 transition-colors"
          >
            <Download size={15} />
            {exporting ? "Preparing..." : "Download"}
            <ChevronDown size={14} />
          </button>

          {downloadOpen && selectedIds.length > 0 && (
            <div className="absolute right-0 mt-1 w-44 bg-white border border-border rounded-lg shadow-lg z-10 overflow-hidden">
              <button
                onClick={handleExportExcel}
                disabled={exporting}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-ink hover:bg-paper transition-colors disabled:opacity-50"
              >
                <FileSpreadsheet size={15} />
                Export as Excel
              </button>
              <button
                onClick={handleExportPDF}
                disabled={exporting}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-ink hover:bg-paper transition-colors disabled:opacity-50"
              >
                <FileText size={15} />
                Export as PDF
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-170 text-sm">
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
              <th className="py-3 px-4 font-medium">Date</th>
              <th className="py-3 px-4 font-medium">Invoice No</th>
              <th className="py-3 px-4 font-medium">Customer</th>
              <th className="py-3 px-4 font-medium text-right">Amount</th>
              <th className="py-3 px-4 font-medium text-right">Status</th>
              <th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => {
              const status = calculateInvoiceStatus(inv);
              return (
                <tr
                  key={inv._id}
                  className="border-b border-border last:border-0 hover:bg-paper/60 transition-colors"
                >
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(inv._id)}
                      onChange={() => toggleSelectOne(inv._id)}
                      className="accent-brand w-4 h-4 cursor-pointer"
                    />
                  </td>
                  <td className="py-3 px-4 text-ink-muted tabular-num">
                    {new Date(inv.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-3 px-4 tabular-num text-ink font-medium">
                    {inv.invoiceNo}
                  </td>
                  <td className="py-3 px-4 text-ink">
                    {inv.customerId?.name || "N/A"}
                  </td>
                  <td className="py-3 px-4 tabular-num text-right text-ink font-medium">
                    ₹{inv.grandTotal.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`capitalize text-xs px-2 py-1 rounded-full font-medium ${getStatusStyle(status)}`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() =>
                          navigate(`/print/invoice/${inv._id}?type=sales`)
                        }
                        className="text-ink-muted hover:text-brand transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => onEdit(inv)}
                        className="text-ink-muted hover:text-brand transition-colors"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(inv._id)}
                        className="text-ink-muted hover:text-status-overdue transition-colors"
                      >
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