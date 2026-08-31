// import { useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { Plus, Search } from "lucide-react";
// import DashboardLayout from "../components/layout/DashboardLayout";
// import SalesInvoiceListTable from "../components/invoice/SalesInvoiceListTable";
// import { salesInvoicesList } from "../data/dummyData";
// import { calculateInvoiceStatus } from "../utils/statusHelpers";

// export default function SalesInvoiceList() {
//   const navigate = useNavigate();
//   const [invoices] = useState(salesInvoicesList);
//   const [search, setSearch] = useState("");

//   const stats = useMemo(() => {
//   const total = invoices.reduce((sum, i) => sum + i.grandTotal, 0);
//   const paid = invoices
//     .filter((i) => calculateInvoiceStatus(i) === "paid")
//     .reduce((sum, i) => sum + i.grandTotal, 0);
//   const unpaid = invoices
//     .filter((i) => calculateInvoiceStatus(i) !== "paid")
//     .reduce((sum, i) => sum + (i.grandTotal - i.amountReceived), 0);
//   return { total, paid, unpaid };
// }, [invoices]);

//   const filtered = invoices.filter((i) =>
//     i.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
//     i.customerName.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <DashboardLayout>
//       <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//         <div>
//           <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">Sales Invoices</h1>
//           <p className="text-sm text-ink-muted mt-1">Sabhi sales invoices ka record.</p>
//         </div>
//         <button
//           onClick={() => navigate("/sales-invoice/new")}
//           className="flex items-center justify-center gap-2 bg-brand text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-brand-dark transition-colors whitespace-nowrap"
//         >
//           <Plus size={16} />
//           New Sales Invoice
//         </button>
//       </div>

//       <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-5">
//         <div className="bg-white border border-border rounded-xl p-4">
//           <p className="text-xs text-ink-muted font-medium">Total Sales</p>
//           <p className="tabular-num text-xl font-semibold text-ink mt-1">₹{stats.total.toLocaleString("en-IN")}</p>
//         </div>
//         <div className="bg-white border border-border rounded-xl p-4">
//           <p className="text-xs text-ink-muted font-medium">Paid</p>
//           <p className="tabular-num text-xl font-semibold text-status-paid mt-1">₹{stats.paid.toLocaleString("en-IN")}</p>
//         </div>
//         <div className="bg-white border border-border rounded-xl p-4">
//           <p className="text-xs text-ink-muted font-medium">Unpaid</p>
//           <p className="tabular-num text-xl font-semibold text-status-overdue mt-1">₹{stats.unpaid.toLocaleString("en-IN")}</p>
//         </div>
//       </div>

//       <div className="flex items-center gap-2 bg-white border border-border rounded-lg px-3 py-2 mb-4 max-w-md">
//         <Search size={16} className="text-ink-muted shrink-0" />
//         <input
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search by invoice no or customer..."
//           className="bg-transparent text-sm outline-none w-full placeholder:text-ink-muted"
//         />
//       </div>

//       <SalesInvoiceListTable invoices={filtered} onEdit={() => {}} onDelete={() => {}} />
//     </DashboardLayout>
//   );
// }





import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import SalesInvoiceListTable from "../components/invoice/SalesInvoiceListTable";
import { getSalesInvoices, deleteSalesInvoice, getSalesInvoiceStats } from "../api/salesInvoiceApi";

export default function SalesInvoiceList() {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [stats, setStats] = useState({ total: 0, paid: 0, unpaid: 0 });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchInvoices = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;

      const { data } = await getSalesInvoices(params);
      setInvoices(data.invoices);
    } catch (err) {
      setError("An error occurred while loading the invoices.");
    } finally {
      setLoading(false);
    }
  }, [search]);

  const fetchStats = async () => {
    try {
      const { data } = await getSalesInvoiceStats();
      setStats(data.stats);
    } catch (err) {
      console.error("Stats load karne mein error:", err);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  useEffect(() => {
    fetchStats();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Ye invoice delete karna hai? Stock wapas add ho jayega.")) return;
    try {
      await deleteSalesInvoice(id);
      await fetchInvoices();
      await fetchStats();
    } catch (err) {
      setError(err.response?.data?.message || "Delete karne mein error aaya");
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">Sales Invoices</h1>
          <p className="text-sm text-ink-muted mt-1">Record of all sales invoices.</p>
        </div>
        <button
          onClick={() => navigate("/sales-invoice/new")}
          className="flex items-center justify-center gap-2 bg-brand text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-brand-dark transition-colors whitespace-nowrap"
        >
          <Plus size={16} />
          New Sales Invoice
        </button>
      </div>

      {error && (
        <div className="mb-4 text-sm text-status-overdue bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

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
          placeholder="Search by invoice no..."
          className="bg-transparent text-sm outline-none w-full placeholder:text-ink-muted"
        />
      </div>

      {loading ? (
        <div className="bg-white border border-border rounded-xl p-10 text-center text-sm text-ink-muted">
          Loading...
        </div>
      ) : (
        <SalesInvoiceListTable invoices={invoices} onEdit={() => {}} onDelete={handleDelete} />
      )}
    </DashboardLayout>
  );
}