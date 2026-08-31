// import { useNavigate } from "react-router-dom";
// import { FileText, ShoppingCart, UserPlus, Wallet, FileSignature, ClipboardList } from "lucide-react";

// const actions = [
//   { label: "New Invoice", icon: FileText, path: "/sales-invoice/new", color: "text-brand bg-brand-light" },
//   { label: "New Quotation", icon: FileSignature, path: "/quotation/new", color: "text-status-paid bg-status-paid/10" },
//   { label: "Add Purchase", icon: ShoppingCart, path: "/purchase/new", color: "text-status-pending bg-status-pending/10" },
//   { label: "Add Contact", icon: UserPlus, path: "/contacts", color: "text-brand bg-brand-light" },
//   { label: "Payment In", icon: Wallet, path: "/payments/new?type=in", color: "text-status-paid bg-status-paid/10" },
//   { label: "Payment Out", icon: ClipboardList, path: "/payments/new?type=out", color: "text-status-overdue bg-status-overdue/10" },
// ];

// export default function QuickActions() {
//   const navigate = useNavigate();

//   return (
//     <div className="bg-white border border-border rounded-xl p-4 sm:p-5 mb-6">
//       <p className="font-display font-semibold text-ink mb-4">Quick Actions</p>
//       <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
//         {actions.map(({ label, icon: Icon, path, color }) => (
//           <button
//             key={label}
//             onClick={() => navigate(path)}
//             className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border hover:border-brand hover:shadow-sm transition-all"
//           >
//             <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
//               <Icon size={18} />
//             </div>
//             <span className="text-xs font-medium text-ink text-center leading-tight">{label}</span>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }


import { useNavigate } from "react-router-dom";
import { FileText, ShoppingCart, UserPlus, Wallet, FileSignature, ClipboardList } from "lucide-react";

const actions = [
  { label: "New Invoice", icon: FileText, path: "/sales-invoice/new", color: "text-brand bg-brand-light" },
  { label: "New Quotation", icon: FileSignature, path: "/quotation/new", color: "text-status-paid bg-status-paid/10" },
  { label: "Add Purchase", icon: ShoppingCart, path: "/purchase/new", color: "text-status-pending bg-status-pending/10" },
  { label: "Add Contact", icon: UserPlus, path: "/contacts", color: "text-brand bg-brand-light" },
  { label: "Payment In", icon: Wallet, path: "/payments/new?type=in", color: "text-status-paid bg-status-paid/10" },
  { label: "Payment Out", icon: ClipboardList, path: "/payments/new?type=out", color: "text-status-overdue bg-status-overdue/10" },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-border rounded-xl p-4 sm:p-5 mb-6">
      <p className="font-display font-semibold text-ink mb-4">Quick Actions</p>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {actions.map(({ label, icon: Icon, path, color }) => (
          <button
            key={label}
            onClick={() => navigate(path)}
            className="group flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-blue-50 hover:bg-blue-100 hover:border-brand hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color} group-hover:scale-110 group-hover:rotate-6 transition-transform duration-200`}>
              <Icon size={18} />
            </div>
            <span className="text-xs font-medium text-ink text-center leading-tight">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}