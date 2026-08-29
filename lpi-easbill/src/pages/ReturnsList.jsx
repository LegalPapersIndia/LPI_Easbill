// import { useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { Plus } from "lucide-react";
// import DashboardLayout from "../components/layout/DashboardLayout";
// import ReturnsToggle from "../components/returns/ReturnsToggle";
// import ReturnsListTable from "../components/returns/ReturnsListTable";
// import { salesReturnsList, purchaseReturnsList } from "../data/dummyData";

// export default function ReturnsList() {
//   const navigate = useNavigate();
//   const [type, setType] = useState("sales");

//   const returns = type === "sales" ? salesReturnsList : purchaseReturnsList;

//   const total = useMemo(() => returns.reduce((sum, r) => sum + r.grandTotal, 0), [returns]);

//   return (
//     <DashboardLayout>
//       <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//         <div>
//           <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">Returns</h1>
//           <p className="text-sm text-ink-muted mt-1">Sales aur Purchase returns ka record.</p>
//         </div>
//         <button
//           onClick={() => navigate(`/returns/new?type=${type}`)}
//           className="flex items-center justify-center gap-2 bg-brand text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-brand-dark transition-colors whitespace-nowrap"
//         >
//           <Plus size={16} />
//           New Return
//         </button>
//       </div>

//       <ReturnsToggle type={type} onTypeChange={setType} />

//       <div className="bg-white border border-border rounded-xl p-4 mb-5 max-w-xs">
//         <p className="text-xs text-ink-muted font-medium">Total {type === "sales" ? "Sales" : "Purchase"} Returns</p>
//         <p className="tabular-num text-xl font-semibold text-ink mt-1">₹{total.toLocaleString("en-IN")}</p>
//       </div>

//       <ReturnsListTable returns={returns} type={type} />
//     </DashboardLayout>
//   );
// }





import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import ReturnsToggle from "../components/returns/ReturnsToggle";
import ReturnsListTable from "../components/returns/ReturnsListTable";
import { getReturns, deleteReturn } from "../api/returnsApi";

export default function ReturnsList() {
  const navigate = useNavigate();
  const [type, setType] = useState("sales");
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReturns = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getReturns({ type });
      setReturns(data.returns);
    } catch (err) {
      setError("Returns load karne mein error aaya");
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchReturns();
  }, [fetchReturns]);

  const total = useMemo(() => returns.reduce((sum, r) => sum + r.grandTotal, 0), [returns]);

  const handleDelete = async (id) => {
    if (!window.confirm("Ye return delete karna hai? Stock wapas adjust ho jayega.")) return;
    try {
      await deleteReturn(id);
      await fetchReturns();
    } catch (err) {
      setError(err.response?.data?.message || "Delete karne mein error aaya");
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">Returns</h1>
          <p className="text-sm text-ink-muted mt-1">Record of sales and purchase returns.</p>
        </div>
        <button
          onClick={() => navigate(`/returns/new?type=${type}`)}
          className="flex items-center justify-center gap-2 bg-brand text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-brand-dark transition-colors whitespace-nowrap"
        >
          <Plus size={16} />
          New Return
        </button>
      </div>

      {error && (
        <div className="mb-4 text-sm text-status-overdue bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <ReturnsToggle type={type} onTypeChange={setType} />

      <div className="bg-white border border-border rounded-xl p-4 mb-5 max-w-xs">
        <p className="text-xs text-ink-muted font-medium">Total {type === "sales" ? "Sales" : "Purchase"} Returns</p>
        <p className="tabular-num text-xl font-semibold text-ink mt-1">₹{total.toLocaleString("en-IN")}</p>
      </div>

      {loading ? (
        <div className="bg-white border border-border rounded-xl p-10 text-center text-sm text-ink-muted">
          Loading...
        </div>
      ) : (
        <ReturnsListTable returns={returns} type={type} onDelete={handleDelete} />
      )}
    </DashboardLayout>
  );
}