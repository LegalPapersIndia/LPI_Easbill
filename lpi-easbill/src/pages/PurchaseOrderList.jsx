// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Plus, Search, Eye, Pencil, Trash2 } from "lucide-react";
// import DashboardLayout from "../components/layout/DashboardLayout";
// import { purchaseOrdersList } from "../data/dummyData";


// export default function PurchaseOrderList() {
//   const navigate = useNavigate();
//   const [orders] = useState(purchaseOrdersList);
//   const [search, setSearch] = useState("");

//   const filtered = orders.filter((o) =>
//     o.poNo.toLowerCase().includes(search.toLowerCase()) ||
//     o.supplierName.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <DashboardLayout>
//       <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//         <div>
//           <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">Purchase Orders</h1>
//           <p className="text-sm text-ink-muted mt-1">Suppliers ko bheje gaye orders.</p>
//         </div>
//         <button
//           onClick={() => navigate("/purchase-order/new")}
//           className="flex items-center justify-center gap-2 bg-brand text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-brand-dark transition-colors whitespace-nowrap"
//         >
//           <Plus size={16} />
//           New Purchase Order
//         </button>
//       </div>

//       <div className="flex items-center gap-2 bg-white border border-border rounded-lg px-3 py-2 mb-4 max-w-md">
//         <Search size={16} className="text-ink-muted shrink-0" />
//         <input
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search by PO no or supplier..."
//           className="bg-transparent text-sm outline-none w-full placeholder:text-ink-muted"
//         />
//       </div>

//       {filtered.length === 0 ? (
//         <div className="bg-white border border-border rounded-xl p-10 text-center">
//           <p className="text-ink-muted text-sm">Koi purchase order nahi mila.</p>
//         </div>
//       ) : (
//         <div className="bg-white border border-border rounded-xl overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full min-w-160 text-sm">
//               <thead>
//                 <tr className="text-left text-ink-muted bg-paper border-b border-border">
//                   <th className="py-3 px-4 font-medium">Date</th>
//                   <th className="py-3 px-4 font-medium">PO Number</th>
//                   <th className="py-3 px-4 font-medium">Supplier</th>
//                   <th className="py-3 px-4 font-medium text-right">Amount</th>
//                   <th className="py-3 px-4 font-medium text-right">Status</th>
//                   <th className="py-3 px-4 font-medium text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filtered.map((o) => (
//                   <tr key={o._id} className="border-b border-border last:border-0 hover:bg-paper/60 transition-colors">
//                     <td className="py-3 px-4 text-ink-muted tabular-num">
//                       {new Date(o.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//                     </td>
//                     <td className="py-3 px-4 tabular-num text-ink font-medium">{o.poNo}</td>
//                     <td className="py-3 px-4 text-ink">{o.supplierName}</td>
//                     <td className="py-3 px-4 tabular-num text-right text-ink font-medium">₹{o.grandTotal.toLocaleString("en-IN")}</td>
//                     <td className="py-3 px-4 text-right">
//                       <span className="capitalize text-xs px-2 py-1 rounded-full font-medium bg-brand-light text-brand">{o.status}</span>
//                     </td>
//                     <td className="py-3 px-4">
//                       <div className="flex items-center justify-end gap-2">
//                        <button onClick={() => navigate(`/print/invoice/${o._id}?type=purchaseOrder`)} className="text-ink-muted hover:text-brand transition-colors">
//   <Eye size={16} />
// </button>
//                         <button className="text-ink-muted hover:text-brand transition-colors"><Pencil size={16} /></button>
//                         <button className="text-ink-muted hover:text-status-overdue transition-colors"><Trash2 size={16} /></button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </DashboardLayout>
//   );
// }




import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Eye, Pencil, Trash2 } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getPurchaseOrders, deletePurchaseOrder } from "../api/purchaseOrderApi";
import { calculateQuotationStatus, getStatusStyle } from "../utils/statusHelpers";

export default function PurchaseOrderList() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;

      const { data } = await getPurchaseOrders(params);
      setOrders(data.purchaseOrders);
    } catch (err) {
      setError("Purchase Orders load karne mein error aaya");
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleDelete = async (id) => {
    if (!window.confirm("Ye purchase order delete karna hai?")) return;
    try {
      await deletePurchaseOrder(id);
      await fetchOrders();
    } catch (err) {
      setError(err.response?.data?.message || "Delete karne mein error aaya");
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">Purchase Orders</h1>
          <p className="text-sm text-ink-muted mt-1">Orders sent to suppliers.</p>
        </div>
        <button
          onClick={() => navigate("/purchase-order/new")}
          className="flex items-center justify-center gap-2 bg-brand text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-brand-dark transition-colors whitespace-nowrap"
        >
          <Plus size={16} />
          New Purchase Order
        </button>
      </div>

      {error && (
        <div className="mb-4 text-sm text-status-overdue bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <div className="flex items-center gap-2 bg-white border border-border rounded-lg px-3 py-2 mb-4 max-w-md">
        <Search size={16} className="text-ink-muted shrink-0" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by PO no..."
          className="bg-transparent text-sm outline-none w-full placeholder:text-ink-muted"
        />
      </div>

      {loading ? (
        <div className="bg-white border border-border rounded-xl p-10 text-center text-sm text-ink-muted">
          Loading...
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white border border-border rounded-xl p-10 text-center">
          <p className="text-ink-muted text-sm">Koi purchase order nahi mila.</p>
        </div>
      ) : (
        <div className="bg-white border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-160 text-sm">
              <thead>
                <tr className="text-left text-ink-muted bg-paper border-b border-border">
                  <th className="py-3 px-4 font-medium">Date</th>
                  <th className="py-3 px-4 font-medium">PO Number</th>
                  <th className="py-3 px-4 font-medium">Supplier</th>
                  <th className="py-3 px-4 font-medium text-right">Amount</th>
                  <th className="py-3 px-4 font-medium text-right">Status</th>
                  <th className="py-3 px-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => {
                  const status = calculateQuotationStatus(o);
                  return (
                    <tr key={o._id} className="border-b border-border last:border-0 hover:bg-paper/60 transition-colors">
                      <td className="py-3 px-4 text-ink-muted tabular-num">
                        {new Date(o.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                      <td className="py-3 px-4 tabular-num text-ink font-medium">{o.poNo}</td>
                      <td className="py-3 px-4 text-ink">{o.supplierId?.name || "N/A"}</td>
                      <td className="py-3 px-4 tabular-num text-right text-ink font-medium">₹{o.grandTotal.toLocaleString("en-IN")}</td>
                      <td className="py-3 px-4 text-right">
                        <span className={`capitalize text-xs px-2 py-1 rounded-full font-medium ${getStatusStyle(status)}`}>{status}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                         <button onClick={() => navigate(`/print/invoice/${o._id}?type=purchaseOrder`)} className="text-ink-muted hover:text-brand transition-colors">
                            <Eye size={16} />
                          </button>
                          <button className="text-ink-muted hover:text-brand transition-colors"><Pencil size={16} /></button>
                          <button onClick={() => handleDelete(o._id)} className="text-ink-muted hover:text-status-overdue transition-colors"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}