// import { Eye, Pencil, Trash2 } from "lucide-react";
// import { calculateInvoiceStatus, getStatusStyle } from "../../utils/statusHelpers";
// import { useNavigate } from "react-router-dom";

// export default function PurchaseListTable({ purchases, onDelete }) {
//   if (purchases.length === 0) {
//     return (
//       <div className="bg-white border border-border rounded-xl p-10 text-center">
//         <p className="text-ink-muted text-sm">Koi purchase invoice nahi mila.</p>
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
//               <th className="py-3 px-4 font-medium">Purchase No</th>
//               <th className="py-3 px-4 font-medium">Supplier</th>
//               <th className="py-3 px-4 font-medium text-right">Amount</th>
//               <th className="py-3 px-4 font-medium text-right">Status</th>
//               <th className="py-3 px-4 font-medium text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {purchases.map((p) => {
//               const status = calculateInvoiceStatus(p);
//               return (
//                 <tr key={p._id} className="border-b border-border last:border-0 hover:bg-paper/60 transition-colors">
//                   <td className="py-3 px-4 text-ink-muted tabular-num">
//                     {new Date(p.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//                   </td>
//                   <td className="py-3 px-4 tabular-num text-ink font-medium">{p.purchaseNo}</td>
//                   <td className="py-3 px-4 text-ink">{p.supplierName}</td>
//                   <td className="py-3 px-4 tabular-num text-right text-ink font-medium">₹{p.grandTotal.toLocaleString("en-IN")}</td>
//                   <td className="py-3 px-4 text-right">
//                     <span className={`capitalize text-xs px-2 py-1 rounded-full font-medium ${getStatusStyle(status)}`}>{status}</span>
//                   </td>
//                   <td className="py-3 px-4">
//                     <div className="flex items-center justify-end gap-2">
//                      <button onClick={() => navigate(`/print/invoice/${p._id}?type=purchase`)} className="text-ink-muted hover:text-brand transition-colors">
//   <Eye size={16} />
// </button>
//                       <button className="text-ink-muted hover:text-brand transition-colors"><Pencil size={16} /></button>
//                       <button onClick={() => onDelete(p._id)} className="text-ink-muted hover:text-status-overdue transition-colors"><Trash2 size={16} /></button>
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




import { Eye, Pencil, Trash2 } from "lucide-react";
import { calculateInvoiceStatus, getStatusStyle } from "../../utils/statusHelpers";
import { useNavigate } from "react-router-dom";

export default function PurchaseListTable({ purchases, onDelete }) {
  if (purchases.length === 0) {
    return (
      <div className="bg-white border border-border rounded-xl p-10 text-center">
        <p className="text-ink-muted text-sm">Koi purchase invoice nahi mila.</p>
      </div>
    );
  }

  const navigate = useNavigate();

  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-170 text-sm">
          <thead>
            <tr className="text-left text-ink-muted bg-paper border-b border-border">
              <th className="py-3 px-4 font-medium">Date</th>
              <th className="py-3 px-4 font-medium">Purchase No</th>
              <th className="py-3 px-4 font-medium">Supplier</th>
              <th className="py-3 px-4 font-medium text-right">Amount</th>
              <th className="py-3 px-4 font-medium text-right">Status</th>
              <th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((p) => {
              const status = calculateInvoiceStatus(p);
              return (
                <tr key={p._id} className="border-b border-border last:border-0 hover:bg-paper/60 transition-colors">
                  <td className="py-3 px-4 text-ink-muted tabular-num">
                    {new Date(p.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                  </td>
                  <td className="py-3 px-4 tabular-num text-ink font-medium">{p.purchaseNo}</td>
                  <td className="py-3 px-4 text-ink">{p.supplierId?.name || "N/A"}</td>
                  <td className="py-3 px-4 tabular-num text-right text-ink font-medium">₹{p.grandTotal.toLocaleString("en-IN")}</td>
                  <td className="py-3 px-4 text-right">
                    <span className={`capitalize text-xs px-2 py-1 rounded-full font-medium ${getStatusStyle(status)}`}>{status}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                     <button onClick={() => navigate(`/print/invoice/${p._id}?type=purchase`)} className="text-ink-muted hover:text-brand transition-colors">
  <Eye size={16} />
</button>
                      <button className="text-ink-muted hover:text-brand transition-colors"><Pencil size={16} /></button>
                      <button onClick={() => onDelete(p._id)} className="text-ink-muted hover:text-status-overdue transition-colors"><Trash2 size={16} /></button>
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