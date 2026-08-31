
// // const statusStyle = {
// //   paid: "bg-status-paid/10 text-status-paid",
// //   partial: "bg-status-pending/10 text-status-pending",
// //   pending: "bg-status-pending/10 text-status-pending",
// //   overdue: "bg-status-overdue/10 text-status-overdue",
// // };

// // export default function RecentInvoices({ recentInvoices }) {
// //   return (
// //     <div className="bg-white border border-border rounded-xl p-4 sm:p-5">
// //       <div className="flex items-center justify-between mb-4">
// //         <p className="font-display font-semibold text-ink">Recent Invoices</p>
// //         <button className="text-sm text-brand font-medium hover:underline">View all</button>
// //       </div>

// //       {recentInvoices.length === 0 ? (
// //         <p className="text-sm text-ink-muted text-center py-6">There are no invoices yet.</p>
// //       ) : (
// //         <div className="overflow-x-auto -mx-4 sm:mx-0">
// //           <table className="w-full min-w-140 text-sm">
// //             <thead>
// //               <tr className="text-left text-ink-muted border-b border-border">
// //                 <th className="py-2 px-4 sm:px-0 font-medium">Invoice</th>
// //                 <th className="py-2 px-4 font-medium">Customer</th>
// //                 <th className="py-2 px-4 font-medium">Date</th>
// //                 <th className="py-2 px-4 font-medium text-right">Amount</th>
// //                 <th className="py-2 px-4 font-medium text-right">Status</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {recentInvoices.map((inv) => (
// //                 <tr key={inv._id} className="border-b border-border last:border-0">
// //                   <td className="py-3 px-4 sm:px-0 tabular-num text-ink font-medium">{inv.invoiceNo}</td>
// //                   <td className="py-3 px-4 text-ink">{inv.customerName}</td>
// //                   <td className="py-3 px-4 text-ink-muted">
// //                     {new Date(inv.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
// //                   </td>
// //                   <td className="py-3 px-4 tabular-num text-right text-ink">
// //                     ₹{inv.total.toLocaleString("en-IN")}
// //                   </td>
// //                   <td className="py-3 px-4 text-right">
// //                     <span className={`capitalize text-xs px-2 py-1 rounded-full ${statusStyle[inv.status]}`}>
// //                       {inv.status}
// //                     </span>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }




// import { useNavigate } from "react-router-dom";

// const statusStyle = {
//   paid: "bg-status-paid/10 text-status-paid",
//   partial: "bg-status-pending/10 text-status-pending",
//   pending: "bg-status-pending/10 text-status-pending",
//   overdue: "bg-status-overdue/10 text-status-overdue",
// };

// export default function RecentInvoices({ recentInvoices }) {
//   const navigate = useNavigate();
//   const displayedInvoices = recentInvoices.slice(0, 5);

//   return (
//     <div className="group bg-gradient-to-br from-indigo-50 via-white to-white border border-border rounded-xl p-4 sm:p-5 hover:shadow-lg transition-all duration-200">
//       <div className="flex items-center justify-between mb-4">
//         <p className="font-display font-semibold text-ink">Recent Invoices</p>
//         <button
//           onClick={() => navigate("/sales-invoice")}
//           className="text-sm text-brand font-medium hover:underline"
//         >
//           View all
//         </button>
//       </div>

//       {displayedInvoices.length === 0 ? (
//         <p className="text-sm text-ink-muted text-center py-6">There are no invoices yet.</p>
//       ) : (
//         <div className="overflow-x-auto -mx-4 sm:mx-0">
//           <table className="w-full min-w-140 text-sm">
//             <thead>
//               <tr className="text-left text-ink-muted border-b border-border">
//                 <th className="py-2 px-4 sm:px-0 font-medium">Invoice</th>
//                 <th className="py-2 px-4 font-medium">Customer</th>
//                 <th className="py-2 px-4 font-medium">Date</th>
//                 <th className="py-2 px-4 font-medium text-right">Amount</th>
//                 <th className="py-2 px-4 font-medium text-right">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {displayedInvoices.map((inv, idx) => (
//                 <tr
//                   key={inv._id}
//                   style={{ animationDelay: `${idx * 60}ms` }}
//                   className="border-b border-border last:border-0 hover:bg-indigo-50 hover:scale-[1.01] transition-all duration-150 animate-in fade-in slide-in-from-bottom-1"
//                 >
//                   <td className="py-3 px-4 sm:px-0 tabular-num text-ink font-medium">{inv.invoiceNo}</td>
//                   <td className="py-3 px-4 text-ink">{inv.customerName}</td>
//                   <td className="py-3 px-4 text-ink-muted">
//                     {new Date(inv.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//                   </td>
//                   <td className="py-3 px-4 tabular-num text-right text-ink">
//                     ₹{inv.total.toLocaleString("en-IN")}
//                   </td>
//                   <td className="py-3 px-4 text-right">
//                     <span className={`capitalize text-xs px-2 py-1 rounded-full font-medium ${statusStyle[inv.status]}`}>
//                       {inv.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculateInvoiceStatus, getStatusStyle } from "../../utils/statusHelpers";

const statusStyle = {
  paid: "bg-status-paid/10 text-status-paid",
  partial: "bg-status-pending/10 text-status-pending",
  pending: "bg-status-pending/10 text-status-pending",
  overdue: "bg-status-overdue/10 text-status-overdue",
};

export default function RecentInvoices({ recentInvoices, recentPurchases }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("invoices");

  const isInvoices = activeTab === "invoices";
  const displayedInvoices = (recentInvoices || []).slice(0, 5);
  const displayedPurchases = (recentPurchases || []).slice(0, 5);
  const rows = isInvoices ? displayedInvoices : displayedPurchases;

  return (
    <div className="group bg-linear-to-br from-indigo-50 via-white to-white border border-border rounded-xl p-4 sm:p-5 hover:shadow-lg transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1 bg-paper rounded-lg p-1">
          <button  
            onClick={() => setActiveTab("invoices")}
            className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${
              isInvoices ? "bg-white text-brand shadow-sm" : "text-ink-muted hover:text-ink"
            }`}
          >
            Recent Invoices
          </button>
          <button
            onClick={() => setActiveTab("purchases")}
            className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${
              !isInvoices ? "bg-white text-brand shadow-sm" : "text-ink-muted hover:text-ink"
            }`}
          >
            Recent Purchases
          </button>
        </div>
        <button
          onClick={() => navigate(isInvoices ? "/sales-invoice" : "/purchase")}
          className="text-sm text-brand font-medium hover:underline whitespace-nowrap"
        >
          View all
        </button>
      </div>

      {rows.length === 0 ? (
        <p className="text-sm text-ink-muted text-center py-6">
          {isInvoices ? "There are no invoices yet." : "There are no purchases yet."}
        </p>
      ) : (
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="w-full min-w-140 text-sm">
            <thead>
              <tr className="text-left text-ink-muted border-b border-border">
                <th className="py-2 px-4 sm:px-0 font-medium">{isInvoices ? "Invoice" : "Purchase"}</th>
                <th className="py-2 px-4 font-medium">{isInvoices ? "Customer" : "Supplier"}</th>
                <th className="py-2 px-4 font-medium">Date</th>
                <th className="py-2 px-4 font-medium text-right">Amount</th>
                <th className="py-2 px-4 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {isInvoices
                ? displayedInvoices.map((inv, idx) => (
                    <tr
                      key={inv._id}
                      style={{ animationDelay: `${idx * 60}ms` }}
                      className="border-b border-border last:border-0 hover:bg-indigo-50 hover:scale-[1.01] transition-all duration-150 animate-in fade-in slide-in-from-bottom-1"
                    >
                      <td className="py-3 px-4 sm:px-0 tabular-num text-ink font-medium">{inv.invoiceNo}</td>
                      <td className="py-3 px-4 text-ink">{inv.customerName}</td>
                      <td className="py-3 px-4 text-ink-muted">
                        {new Date(inv.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                      <td className="py-3 px-4 tabular-num text-right text-ink">
                        ₹{inv.total.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={`capitalize text-xs px-2 py-1 rounded-full font-medium ${statusStyle[inv.status]}`}>
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))
                : displayedPurchases.map((p, idx) => {
                    const status = calculateInvoiceStatus(p);
                    return (
                      <tr
                        key={p._id}
                        style={{ animationDelay: `${idx * 60}ms` }}
                        className="border-b border-border last:border-0 hover:bg-indigo-50 hover:scale-[1.01] transition-all duration-150 animate-in fade-in slide-in-from-bottom-1"
                      >
                        <td className="py-3 px-4 sm:px-0 tabular-num text-ink font-medium">{p.purchaseNo}</td>
                        <td className="py-3 px-4 text-ink">{p.supplierId?.name || "N/A"}</td>
                        <td className="py-3 px-4 text-ink-muted">
                          {new Date(p.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                        </td>
                        <td className="py-3 px-4 tabular-num text-right text-ink">
                          ₹{p.grandTotal.toLocaleString("en-IN")}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className={`capitalize text-xs px-2 py-1 rounded-full font-medium ${getStatusStyle(status)}`}>
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}