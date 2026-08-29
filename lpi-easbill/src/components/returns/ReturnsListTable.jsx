// import { Eye, Trash2 } from "lucide-react";

// export default function ReturnsListTable({ returns, type }) {
//   if (returns.length === 0) {
//     return (
//       <div className="bg-white border border-border rounded-xl p-10 text-center">
//         <p className="text-ink-muted text-sm">Koi {type} return nahi mila.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white border border-border rounded-xl overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="w-full min-w-170 text-sm">
//           <thead>
//             <tr className="text-left text-ink-muted bg-paper border-b border-border">
//               <th className="py-3 px-4 font-medium">Date</th>
//               <th className="py-3 px-4 font-medium">Return No</th>
//               <th className="py-3 px-4 font-medium">Party</th>
//               <th className="py-3 px-4 font-medium">Linked Invoice</th>
//               <th className="py-3 px-4 font-medium text-right">Amount</th>
//               <th className="py-3 px-4 font-medium text-right">Status</th>
//               <th className="py-3 px-4 font-medium text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {returns.map((r) => (
//               <tr key={r._id} className="border-b border-border last:border-0 hover:bg-paper/60 transition-colors">
//                 <td className="py-3 px-4 text-ink-muted tabular-num">
//                   {new Date(r.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//                 </td>
//                 <td className="py-3 px-4 tabular-num text-ink font-medium">{r.returnNo}</td>
//                 <td className="py-3 px-4 text-ink">{type === "sales" ? r.customerName : r.supplierName}</td>
//                 <td className="py-3 px-4 tabular-num text-ink-muted">{type === "sales" ? r.linkedInvoiceNo : r.linkedPurchaseNo}</td>
//                 <td className="py-3 px-4 tabular-num text-right text-ink font-medium">₹{r.grandTotal.toLocaleString("en-IN")}</td>
//                 <td className="py-3 px-4 text-right">
//                   <span className="capitalize text-xs px-2 py-1 rounded-full font-medium bg-status-paid/10 text-status-paid">{r.status}</span>
//                 </td>
//                 <td className="py-3 px-4">
//                   <div className="flex items-center justify-end gap-2">
//                     <button className="text-ink-muted hover:text-brand transition-colors"><Eye size={16} /></button>
//                     <button className="text-ink-muted hover:text-status-overdue transition-colors"><Trash2 size={16} /></button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }




import { Eye, Trash2 } from "lucide-react";

export default function ReturnsListTable({ returns, type, onDelete }) {
  if (returns.length === 0) {
    return (
      <div className="bg-white border border-border rounded-xl p-10 text-center">
        <p className="text-ink-muted text-sm">Koi {type}I didn't get any return.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-170 text-sm">
          <thead>
            <tr className="text-left text-ink-muted bg-paper border-b border-border">
              <th className="py-3 px-4 font-medium">Date</th>
              <th className="py-3 px-4 font-medium">Return No</th>
              <th className="py-3 px-4 font-medium">Party</th>
              <th className="py-3 px-4 font-medium">Linked Invoice</th>
              <th className="py-3 px-4 font-medium text-right">Amount</th>
              <th className="py-3 px-4 font-medium text-right">Status</th>
              <th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {returns.map((r) => (
              <tr key={r._id} className="border-b border-border last:border-0 hover:bg-paper/60 transition-colors">
                <td className="py-3 px-4 text-ink-muted tabular-num">
                  {new Date(r.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                </td>
                <td className="py-3 px-4 tabular-num text-ink font-medium">{r.returnNo}</td>
                <td className="py-3 px-4 text-ink">{r.partyId?.name || "N/A"}</td>
                <td className="py-3 px-4 tabular-num text-ink-muted">{r.linkedInvoiceNo}</td>
                <td className="py-3 px-4 tabular-num text-right text-ink font-medium">₹{r.grandTotal.toLocaleString("en-IN")}</td>
                <td className="py-3 px-4 text-right">
                  <span className="capitalize text-xs px-2 py-1 rounded-full font-medium bg-status-paid/10 text-status-paid">Refunded</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end gap-2">
                    {/* <button className="text-ink-muted hover:text-brand transition-colors"><Eye size={16} /></button> */}
                    <button onClick={() => onDelete(r._id)} className="text-ink-muted hover:text-status-overdue transition-colors"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}