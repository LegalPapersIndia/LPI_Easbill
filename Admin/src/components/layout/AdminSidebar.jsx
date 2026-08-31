import { NavLink } from "react-router-dom";
import { LayoutDashboard, Building2, X, ShieldCheck } from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
//   { label: "Businesses", icon: Building2, to: "/dashboard" },
];

export default function AdminSidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-[#FFF7ED] border-r border-[#FDBA74]/40 z-50
          transform transition-transform duration-200 flex flex-col
          ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-[#FDBA74]/40">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#EA580C] flex items-center justify-center shadow-sm shadow-orange-300">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-[#0F172A] leading-tight text-sm">BillFlow</p>
              <p className="text-[11px] text-[#9A3412]">Admin Panel</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-[#9A3412]">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-all duration-200 ease-out hover:translate-x-1
                ${isActive
                  ? "bg-[#EA580C] text-white shadow-sm shadow-orange-300"
                  : "text-[#9A3412] hover:bg-[#FFEDD5] hover:text-[#EA580C]"}`
              }
            >
              <item.icon
                size={17}
                className="transition-transform duration-200 group-hover:scale-110"
              />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-5 py-4 border-t border-[#FDBA74]/40">
          <p className="text-[11px] text-[#9A3412]">BillFlow Admin · v1.0</p>
        </div>
      </aside>
    </>
  );
}