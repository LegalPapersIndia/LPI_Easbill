
// import { Plus, Trash2 } from "lucide-react";
// import { itemsList } from "../../data/dummyData";

// export default function InvoiceLineItems({ lines, onAddLine, onRemoveLine, onUpdateLine }) {
//   const handleItemSelect = (lineId, itemId) => {
//     const item = itemsList.find((i) => i._id === itemId);
//     if (!item) return;
//     onUpdateLine(lineId, {
//       itemId: item._id,
//       name: item.name,
//       hsnCode: item.hsnCode,
//       rate: item.salePrice,
//       gstPercent: item.gstPercent,
//       qty: 1,
//     });
//   };

//   return (
//     <div className="bg-white border border-border rounded-xl p-4 sm:p-5 mb-4">
//       <p className="font-display font-semibold text-ink mb-4">Items</p>

//       <div className="overflow-x-auto -mx-4 sm:mx-0">
//         <table className="w-full min-w-[720px] text-sm">
//           <thead>
//             <tr className="text-left text-ink-muted border-b border-border">
//               <th className="py-2 px-4 sm:px-0 font-medium w-1/3">Item</th>
//               <th className="py-2 px-2 font-medium text-right w-20">HSN</th>
//               <th className="py-2 px-2 font-medium text-right w-16">Qty</th>
//               <th className="py-2 px-2 font-medium text-right w-24">Rate</th>
//               <th className="py-2 px-2 font-medium text-right w-16">GST%</th>
//               <th className="py-2 px-2 font-medium text-right w-28">Amount</th>
//               <th className="py-2 px-2 w-10"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {lines.map((line) => {
//               const amount = (line.qty || 0) * (line.rate || 0);
//               return (
//                 <tr key={line.id} className="border-b border-border last:border-0">
//                   <td className="py-2 px-4 sm:px-0">
//                     <select
//                       value={line.itemId || ""}
//                       onChange={(e) => handleItemSelect(line.id, e.target.value)}
//                       className="w-full border border-border rounded-lg px-2 py-1.5 text-sm outline-none focus:border-brand"
//                     >
//                       <option value="">Select item</option>
//                       {itemsList.map((i) => (
//                         <option key={i._id} value={i._id}>{i.name}</option>
//                       ))}
//                     </select>
//                   </td>
//                   <td className="py-2 px-2 text-right tabular-num text-ink-muted">
//                     {line.hsnCode || "-"}
//                   </td>
//                   <td className="py-2 px-2">
//                     <input
//                       type="number"
//                       min="1"
//                       value={line.qty || ""}
//                       onChange={(e) => onUpdateLine(line.id, { qty: Number(e.target.value) })}
//                       className="w-full border border-border rounded-lg px-2 py-1.5 text-sm text-right outline-none focus:border-brand tabular-num"
//                     />
//                   </td>
//                   <td className="py-2 px-2">
//                     <input
//                       type="number"
//                       value={line.rate || ""}
//                       onChange={(e) => onUpdateLine(line.id, { rate: Number(e.target.value) })}
//                       className="w-full border border-border rounded-lg px-2 py-1.5 text-sm text-right outline-none focus:border-brand tabular-num"
//                     />
//                   </td>
//                   <td className="py-2 px-2 text-right tabular-num text-ink-muted">
//                     {line.gstPercent || 0}%
//                   </td>
//                   <td className="py-2 px-2 text-right tabular-num text-ink font-medium">
//                     ₹{amount.toLocaleString("en-IN")}
//                   </td>
//                   <td className="py-2 px-2 text-right">
//                     <button onClick={() => onRemoveLine(line.id)} className="text-ink-muted hover:text-status-overdue transition-colors">
//                       <Trash2 size={16} />
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       <button
//         onClick={onAddLine}
//         className="flex items-center gap-2 text-sm font-medium text-brand mt-4 hover:underline"
//       >
//         <Plus size={16} />
//         Add Item Row
//       </button>
//     </div>
//   );
// }



import { Plus, Trash2 } from "lucide-react";
import { allItemsAndServices } from "../../data/dummyData";

export default function InvoiceLineItems({ lines, onAddLine, onRemoveLine, onUpdateLine }) {
  const handleItemSelect = (lineId, itemId) => {
    const item = allItemsAndServices.find((i) => i._id === itemId);
    if (!item) return;
    const rate = item.itemType === "Service" ? item.serviceCharge : item.salePrice;
    onUpdateLine(lineId, {
      itemId: item._id,
      name: item.name,
      hsnCode: item.hsnCode,
      unit: item.unit || "-",
      rate: Number(rate) || 0,
      gstPercent: item.gstPercent,
      qty: 1,
    });
  };

  return (
    <div className="bg-white border border-border rounded-xl p-4 sm:p-5 mb-4">
      <p className="font-display font-semibold text-ink mb-4">Items</p>

      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <table className="w-full min-w-200 text-sm">
          <thead>
            <tr className="text-left text-ink-muted border-b border-border">
              <th className="py-2 px-4 sm:px-0 font-medium w-1/3">Item</th>
              <th className="py-2 px-2 font-medium text-right w-20">HSN</th>
              <th className="py-2 px-2 font-medium text-right w-16">Qty</th>
              <th className="py-2 px-2 font-medium text-left w-16">Unit</th>
              <th className="py-2 px-2 font-medium text-right w-24">Rate</th>
              <th className="py-2 px-2 font-medium text-right w-16">GST%</th>
              <th className="py-2 px-2 font-medium text-right w-28">Amount</th>
              <th className="py-2 px-2 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line) => {
              const amount = (line.qty || 0) * (line.rate || 0);
              return (
                <tr key={line.id} className="border-b border-border last:border-0">
                  <td className="py-2 px-4 sm:px-0">
                    <select
                      value={line.itemId || ""}
                      onChange={(e) => handleItemSelect(line.id, e.target.value)}
                      className="w-full border border-border rounded-lg px-2 py-1.5 text-sm outline-none focus:border-brand"
                    >
                      <option value="">Select item</option>
                      {allItemsAndServices.map((i) => (
                        <option key={i._id} value={i._id}>
                          {i.name} {i.itemType === "Service" ? "(Service)" : ""}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 px-2 text-right tabular-num text-ink-muted">
                    {line.hsnCode || "-"}
                  </td>
                  <td className="py-2 px-2">
                    <input
                      type="number"
                      min="1"
                      value={line.qty || ""}
                      onChange={(e) => onUpdateLine(line.id, { qty: Number(e.target.value) })}
                      className="w-full border border-border rounded-lg px-2 py-1.5 text-sm text-right outline-none focus:border-brand tabular-num"
                    />
                  </td>
                  <td className="py-2 px-2 text-ink-muted uppercase text-xs">
                    {line.unit || "-"}
                  </td>
                  <td className="py-2 px-2">
                    <input
                      type="number"
                      value={line.rate || ""}
                      onChange={(e) => onUpdateLine(line.id, { rate: Number(e.target.value) })}
                      className="w-full border border-border rounded-lg px-2 py-1.5 text-sm text-right outline-none focus:border-brand tabular-num"
                    />
                  </td>
                  <td className="py-2 px-2 text-right tabular-num text-ink-muted">
                    {line.gstPercent || 0}%
                  </td>
                  <td className="py-2 px-2 text-right tabular-num text-ink font-medium">
                    ₹{amount.toLocaleString("en-IN")}
                  </td>
                  <td className="py-2 px-2 text-right">
                    <button onClick={() => onRemoveLine(line.id)} className="text-ink-muted hover:text-status-overdue transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button
        onClick={onAddLine}
        className="flex items-center gap-2 text-sm font-medium text-brand mt-4 hover:underline"
      >
        <Plus size={16} />
        Add Item Row
      </button>
    </div>
  );
}