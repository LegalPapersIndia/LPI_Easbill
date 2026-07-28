import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { companyInfo } from "../../data/dummyData";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-paper overflow-hidden">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden">
        <Topbar onMenuClick={() => setSidebarOpen(true)} companyName={companyInfo.name} />
        <main className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}