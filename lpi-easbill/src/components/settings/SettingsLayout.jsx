import { Link, useLocation } from "react-router-dom";
import { Building2, Users, UserCircle, FileText } from "lucide-react";

const settingsNav = [
  { label: "Business Settings", icon: Building2, path: "/settings/business" },
  // { label: "Manage Users", icon: Users, path: "/settings/users" },
  { label: "My Profile", icon: UserCircle, path: "/settings/profile" },
  { label: "Invoice Settings", icon: FileText, path: "/settings/invoice" },
];

export default function SettingsLayout({ children }) {
  const location = useLocation();

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Settings sub-nav — mobile pe horizontal scroll, desktop pe vertical sidebar */}
      <div className="lg:w-56 shrink-0">
        <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
          {settingsNav.map(({ label, icon: Icon, path }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={label}
                to={path}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
                  ${active ? "bg-brand-light text-brand" : "text-ink-muted hover:bg-paper"}`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}