// import DashboardLayout from "../components/layout/DashboardLayout";
// import StatCard from "../components/dashboard/StatCard";
// import QuickActions from "../components/dashboard/QuickActions";
// import SalesTrendChart from "../components/dashboard/SalesTrendChart";
// import RecentInvoices from "../components/dashboard/RecentInvoices";
// import LowStockAlert from "../components/dashboard/LowStockAlert";
// import { dashboardStats } from "../data/dummyData";

// export default function Dashboard() {
//   return (
//     <DashboardLayout>
//       <div className="mb-6">
//         <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">Dashboard</h1>
//         <p className="text-sm text-ink-muted mt-1">Aapke business ka overview, aaj tak ka.</p>
//       </div>

//       <QuickActions />

//       {/* Stat cards - responsive grid */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
//         <StatCard label="Sales (This Month)" amount={dashboardStats.totalSalesThisMonth} trend="↑ 12% vs last month" tone="paid" />
//         <StatCard label="Purchase (This Month)" amount={dashboardStats.totalPurchaseThisMonth} tone="brand" />
//         <StatCard label="Receivable Due" amount={dashboardStats.outstandingReceivable} trend="Customers ka due" tone="pending" />
//         <StatCard label="Payable Due" amount={dashboardStats.outstandingPayable} trend="Suppliers ko dena" tone="overdue" />
//       </div>

//       {/* Chart + Low Stock */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
//         <div className="lg:col-span-2">
//           <SalesTrendChart />
//         </div>
//         <LowStockAlert />
//       </div>

//       {/* Recent Invoices */}
//       <RecentInvoices />
//     </DashboardLayout>
//   );
// }




import { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";
import QuickActions from "../components/dashboard/QuickActions";
import SalesTrendChart from "../components/dashboard/SalesTrendChart";
import RecentInvoices from "../components/dashboard/RecentInvoices";
import LowStockAlert from "../components/dashboard/LowStockAlert";
import { getDashboardData } from "../api/dashboardApi";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getDashboardData();
        setDashboardData(data);
      } catch (err) {
        console.error("Dashboard data load karne mein error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20 text-ink-muted text-sm">Loading...</div>
      </DashboardLayout>
    );
  }

  const stats = dashboardData?.stats || {
    totalSalesThisMonth: 0, totalPurchaseThisMonth: 0, outstandingReceivable: 0, outstandingPayable: 0,
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">Dashboard</h1>
        <p className="text-sm text-ink-muted mt-1">Aapke business ka overview, aaj tak ka.</p>
      </div>

      <QuickActions />

      {/* Stat cards - responsive grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard label="Sales (This Month)" amount={stats.totalSalesThisMonth} tone="paid" />
        <StatCard label="Purchase (This Month)" amount={stats.totalPurchaseThisMonth} tone="brand" />
        <StatCard label="Receivable Due" amount={stats.outstandingReceivable} trend="Customers ka due" tone="pending" />
        <StatCard label="Payable Due" amount={stats.outstandingPayable} trend="Suppliers ko dena" tone="overdue" />
      </div>

      {/* Chart + Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2">
          <SalesTrendChart salesTrend={dashboardData?.salesTrend || []} />
        </div>
        <LowStockAlert lowStockItems={dashboardData?.lowStockItems || []} />
      </div>

      {/* Recent Invoices */}
      <RecentInvoices recentInvoices={dashboardData?.recentInvoices || []} />
    </DashboardLayout>
  );
}