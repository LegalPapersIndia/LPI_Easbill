// import { Menu, Bell, Search } from "lucide-react";

// export default function Topbar({ onMenuClick, companyName }) {
//   return (
//     <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
//       <div className="flex items-center gap-3">
//         <button onClick={onMenuClick} className="lg:hidden text-ink-muted">
//           <Menu size={22} />
//         </button>
//         <div>
//           <p className="font-display font-semibold text-sm sm:text-base text-ink leading-tight">
//             {companyName}
//           </p>
//           <p className="text-xs text-ink-muted hidden sm:block">Dashboard Overview</p>
//         </div>
//       </div>

//       <div className="flex items-center gap-3">
//         <div className="hidden md:flex items-center gap-2 bg-paper border border-border rounded-lg px-3 py-1.5 w-56">
//           <Search size={16} className="text-ink-muted" />
//           <input
//             placeholder="Search invoices, items..."
//             className="bg-transparent text-sm outline-none w-full placeholder:text-ink-muted"
//           />
//         </div>
//         <button className="relative text-ink-muted">
//           <Bell size={20} />
//           <span className="absolute -top-1 -right-1 w-2 h-2 bg-status-overdue rounded-full" />
//         </button>
//         <div className="w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center font-display font-semibold text-sm">
//           A
//         </div>
//       </div>
//     </header>
//   );
// }



import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Topbar({ onMenuClick, companyName }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const initial = user.name ? user.name.trim().charAt(0).toUpperCase() : "?";

  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden text-ink-muted">
          <Menu size={22} />
        </button>
        <div>
          <p className="font-display font-semibold text-sm sm:text-base text-ink leading-tight">
            {companyName}
          </p>
          <p className="text-xs text-ink-muted hidden sm:block">Dashboard Overview</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/settings/business")}
          className="w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center font-display font-semibold text-sm hover:opacity-90 transition-opacity"
          title={user.name || "User"}
        >
          {initial}
        </button>
      </div>
    </header>
  );
}