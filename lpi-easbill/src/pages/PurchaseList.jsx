// import { useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { Plus, Search } from "lucide-react";
// import DashboardLayout from "../components/layout/DashboardLayout";
// import PurchaseListTable from "../components/purchase/PurchaseListTable";
// import { purchaseInvoicesList } from "../data/dummyData";
// import { calculateInvoiceStatus } from "../utils/statusHelpers";

// export default function PurchaseList() {
//   const navigate = useNavigate();
//   const [purchases] = useState(purchaseInvoicesList);
//   const [search, setSearch] = useState("");

//   const stats = useMemo(() => {
//     const total = purchases.reduce((sum, p) => sum + p.grandTotal, 0);
//     const paid = purchases
//       .filter((p) => calculateInvoiceStatus(p) === "paid")
//       .reduce((sum, p) => sum + p.grandTotal, 0);
//     const unpaid = purchases
//       .filter((p) => calculateInvoiceStatus(p) !== "paid")
//       .reduce((sum, p) => sum + (p.grandTotal - p.amountPaid), 0);
//     return { total, paid, unpaid };
//   }, [purchases]);

//   const filtered = purchases.filter((p) =>
//     p.purchaseNo.toLowerCase().includes(search.toLowerCase()) ||
//     p.supplierName.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <DashboardLayout>
//       <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//         <div>
//           <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">Purchase Invoices</h1>
//           <p className="text-sm text-ink-muted mt-1">Sabhi purchase invoices ka record.</p>
//         </div>
//         <button
//           onClick={() => navigate("/purchase/new")}
//           className="flex items-center justify-center gap-2 bg-brand text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-brand-dark transition-colors whitespace-nowrap"
//         >
//           <Plus size={16} />
//           New Purchase Invoice
//         </button>
//       </div>

//       <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-5">
//         <div className="bg-white border border-border rounded-xl p-4">
//           <p className="text-xs text-ink-muted font-medium">Total Purchases</p>
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
//           placeholder="Search by purchase no or supplier..."
//           className="bg-transparent text-sm outline-none w-full placeholder:text-ink-muted"
//         />
//       </div>

//       <PurchaseListTable purchases={filtered} onDelete={() => {}} />
//     </DashboardLayout>
//   );
// }





import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import PurchaseListTable from "../components/purchase/PurchaseListTable";
import { getPurchaseInvoices, deletePurchaseInvoice, getPurchaseInvoiceStats } from "../api/purchaseInvoiceApi";

export default function PurchaseList() {
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]);
  const [stats, setStats] = useState({ total: 0, paid: 0, unpaid: 0 });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPurchases = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;

      const { data } = await getPurchaseInvoices(params);
      setPurchases(data.purchases);
    } catch (err) {
      setError("An error occurred while loading purchases.");
    } finally {
      setLoading(false);
    }
  }, [search]);

  const fetchStats = async () => {
    try {
      const { data } = await getPurchaseInvoiceStats();
      setStats(data.stats);
    } catch (err) {
      console.error("Stats load karne mein error:", err);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, [fetchPurchases]);

  useEffect(() => {
    fetchStats();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Ye purchase invoice delete karna hai? Stock wapas kam ho jayega.")) return;
    try {
      await deletePurchaseInvoice(id);
      await fetchPurchases();
      await fetchStats();
    } catch (err) {
      setError(err.response?.data?.message || "Delete karne mein error aaya");
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">Purchase Invoices</h1>
          <p className="text-sm text-ink-muted mt-1">Record of all purchase invoices.</p>
        </div>
        <button
          onClick={() => navigate("/purchase/new")}
          className="flex items-center justify-center gap-2 bg-brand text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-brand-dark transition-colors whitespace-nowrap"
        >
          <Plus size={16} />
          New Purchase Invoice
        </button>
      </div>

      {error && (
        <div className="mb-4 text-sm text-status-overdue bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-5">
        <div className="bg-white border border-border rounded-xl p-4">
          <p className="text-xs text-ink-muted font-medium">Total Purchases</p>
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
          placeholder="Search by purchase no..."
          className="bg-transparent text-sm outline-none w-full placeholder:text-ink-muted"
        />
      </div>

      {loading ? (
        <div className="bg-white border border-border rounded-xl p-10 text-center text-sm text-ink-muted">
          Loading...
        </div>
      ) : (
        <PurchaseListTable purchases={purchases} onDelete={handleDelete} />
      )}
    </DashboardLayout>
  );
}