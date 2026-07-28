import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";
import QuickActions from "../components/dashboard/QuickActions";
import SalesTrendChart from "../components/dashboard/SalesTrendChart";
import RecentInvoices from "../components/dashboard/RecentInvoices";
import LowStockAlert from "../components/dashboard/LowStockAlert";
import { dashboardStats } from "../data/dummyData";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">Dashboard</h1>
        <p className="text-sm text-ink-muted mt-1">Aapke business ka overview, aaj tak ka.</p>
      </div>

      <QuickActions />

      {/* Stat cards - responsive grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard label="Sales (This Month)" amount={dashboardStats.totalSalesThisMonth} trend="↑ 12% vs last month" tone="paid" />
        <StatCard label="Purchase (This Month)" amount={dashboardStats.totalPurchaseThisMonth} tone="brand" />
        <StatCard label="Receivable Due" amount={dashboardStats.outstandingReceivable} trend="Customers ka due" tone="pending" />
        <StatCard label="Payable Due" amount={dashboardStats.outstandingPayable} trend="Suppliers ko dena" tone="overdue" />
      </div>

      {/* Chart + Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2">
          <SalesTrendChart />
        </div>
        <LowStockAlert />
      </div>

      {/* Recent Invoices */}
      <RecentInvoices />
    </DashboardLayout>
  );
}