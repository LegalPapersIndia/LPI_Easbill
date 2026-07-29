import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, Package, FileText, ShoppingCart,
  RotateCcw, Wallet, BarChart3, Settings, X, ChevronDown, LogOut,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Contacts", icon: Users, path: "/contacts" },
  { label: "Items", icon: Package, path: "/items" },
  {
    label: "Sales", icon: FileText, key: "sales",
    children: [
      { label: "Sales Invoice", path: "/sales-invoice" },
      { label: "Quotation", path: "/quotation" },
    ],
  },
  {
    label: "Purchase", icon: ShoppingCart, key: "purchase",
    children: [
      { label: "Purchase Invoice", path: "/purchase" },
      { label: "Purchase Order", path: "/purchase-order" },
    ],
  },
  { label: "Returns", icon: RotateCcw, path: "/returns" },
  { label: "Payments", icon: Wallet, path: "/payments" },
  // { label: "Reports", icon: BarChart3, path: "/reports" },
  { label: "Settings", icon: Settings, path: "/settings/business" },
];

export default function Sidebar({ open, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState({ sales: false, purchase: false });

  const isChildActive = (children) => children.some((c) => location.pathname === c.path);
  const toggleGroup = (key) => setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} />}

      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-64 bg-sidebar border-r border-sidebar-hover z-50 transform transition-transform duration-200 shrink-0
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 flex flex-col`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-sidebar-hover shrink-0">
          <span className="font-display font-semibold text-lg text-white">BillFlow</span>
          <button onClick={onClose} className="lg:hidden text-white/60">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;

            if (item.children) {
              const groupActive = isChildActive(item.children);
              const isOpen = expanded[item.key] || groupActive;

              return (
                <div key={item.label}>
                  <button
                    onClick={() => toggleGroup(item.key)}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                      ${groupActive ? "text-white" : "text-white/70 hover:bg-sidebar-hover hover:text-white"}`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={18} />
                      {item.label}
                    </span>
                    <ChevronDown size={15} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isOpen && (
                    <div className="ml-8 mt-1 space-y-1 border-l border-sidebar-hover pl-3">
                      {item.children.map((child) => {
                        const active = location.pathname === child.path;
                        return (
                          <Link
                            key={child.path}
                            to={child.path}
                            onClick={onClose}
                            className={`block px-3 py-2 rounded-lg text-sm transition-colors
                              ${active ? "bg-brand text-white font-medium" : "text-white/60 hover:bg-sidebar-hover hover:text-white"}`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const active = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={onClose}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${active ? "bg-brand text-white" : "text-white/70 hover:bg-sidebar-hover hover:text-white"}`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-3 shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-sidebar-hover hover:text-white transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <div className="p-4 border-t border-sidebar-hover text-xs text-white/50 shrink-0">
          Legal Papers India · v1.0
        </div>
      </aside>
    </>
  );
}