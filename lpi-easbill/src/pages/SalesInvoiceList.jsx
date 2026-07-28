import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import SalesInvoiceListTable from "../components/invoice/SalesInvoiceListTable";
import { salesInvoicesList } from "../data/dummyData";
import { calculateInvoiceStatus } from "../utils/statusHelpers";

export default function SalesInvoiceList() {
  const navigate = useNavigate();
  const [invoices] = useState(salesInvoicesList);
  const [search, setSearch] = useState("");

  const stats = useMemo(() => {
  const total = invoices.reduce((sum, i) => sum + i.grandTotal, 0);
  const paid = invoices
    .filter((i) => calculateInvoiceStatus(i) === "paid")
    .reduce((sum, i) => sum + i.grandTotal, 0);
  const unpaid = invoices
    .filter((i) => calculateInvoiceStatus(i) !== "paid")
    .reduce((sum, i) => sum + (i.grandTotal - i.amountReceived), 0);
  return { total, paid, unpaid };
}, [invoices]);

  const filtered = invoices.filter((i) =>
    i.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
    i.customerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">Sales Invoices</h1>
          <p className="text-sm text-ink-muted mt-1">Sabhi sales invoices ka record.</p>
        </div>
        <button
          onClick={() => navigate("/sales-invoice/new")}
          className="flex items-center justify-center gap-2 bg-brand text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-brand-dark transition-colors whitespace-nowrap"
        >
          <Plus size={16} />
          New Sales Invoice
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-5">
        <div className="bg-white border border-border rounded-xl p-4">
          <p className="text-xs text-ink-muted font-medium">Total Sales</p>
          <p className="tabular-num text-xl font-semibold text-ink mt-1">₹{stats.total.toLocaleString("en-IN")}</p>
        </div>
        <div className="bg-white border border-border rounded-xl p-4">
          <p className="text-xs text-ink-muted font-medium">Paid</p>
          <p className="tabular-num text-xl font-semibold text-status-paid mt-1">₹{stats.paid.toLocaleString("en-IN")}</p>
        </div>
        <div className="bg-white border border-border rounded-xl p-4">
          <p className="text-xs text-ink-muted font-medium">Unpaid</p>
          <p className="tabular-num text-xl font-semibold text-status-overdue mt-1">₹{stats.unpaid.toLocaleString("en-IN")}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-white border border-border rounded-lg px-3 py-2 mb-4 max-w-md">
        <Search size={16} className="text-ink-muted shrink-0" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by invoice no or customer..."
          className="bg-transparent text-sm outline-none w-full placeholder:text-ink-muted"
        />
      </div>

      <SalesInvoiceListTable invoices={filtered} onEdit={() => {}} onDelete={() => {}} />
    </DashboardLayout>
  );
}