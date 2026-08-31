import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, LogOut } from "lucide-react";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden">
        {/* Topbar */}
        <div className="bg-white border-b border-[#E2E8F0]">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-[#64748B]"
            >
              <Menu size={22} />
            </button>
            <div className="hidden lg:block" />
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-[#64748B] hover:text-[#0F172A] font-medium"
            >
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>

        <main className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}