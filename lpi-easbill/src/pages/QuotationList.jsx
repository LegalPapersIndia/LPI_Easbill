import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Eye, Pencil, Trash2 } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { quotationsList } from "../data/dummyData";


const statusStyle = {
  sent: "bg-brand-light text-brand",
  expired: "bg-status-overdue/10 text-status-overdue",
};

export default function QuotationList() {
  const navigate = useNavigate();
  const [quotations] = useState(quotationsList);
  const [search, setSearch] = useState("");

  const filtered = quotations.filter((q) =>
    q.quotationNo.toLowerCase().includes(search.toLowerCase()) ||
    q.customerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">Quotations</h1>
          <p className="text-sm text-ink-muted mt-1">Sabhi price estimates ka record.</p>
        </div>
        <button
          onClick={() => navigate("/quotation/new")}
          className="flex items-center justify-center gap-2 bg-brand text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-brand-dark transition-colors whitespace-nowrap"
        >
          <Plus size={16} />
          New Quotation
        </button>
      </div>

      <div className="flex items-center gap-2 bg-white border border-border rounded-lg px-3 py-2 mb-4 max-w-md">
        <Search size={16} className="text-ink-muted shrink-0" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by quotation no or customer..."
          className="bg-transparent text-sm outline-none w-full placeholder:text-ink-muted"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-border rounded-xl p-10 text-center">
          <p className="text-ink-muted text-sm">Koi quotation nahi mila.</p>
        </div>
      ) : (
        <div className="bg-white border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-160 text-sm">
              <thead>
                <tr className="text-left text-ink-muted bg-paper border-b border-border">
                  <th className="py-3 px-4 font-medium">Date</th>
                  <th className="py-3 px-4 font-medium">Quotation No</th>
                  <th className="py-3 px-4 font-medium">Customer</th>
                  <th className="py-3 px-4 font-medium text-right">Amount</th>
                  <th className="py-3 px-4 font-medium text-right">Status</th>
                  <th className="py-3 px-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((q) => (
                  <tr key={q._id} className="border-b border-border last:border-0 hover:bg-paper/60 transition-colors">
                    <td className="py-3 px-4 text-ink-muted tabular-num">
                      {new Date(q.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="py-3 px-4 tabular-num text-ink font-medium">{q.quotationNo}</td>
                    <td className="py-3 px-4 text-ink">{q.customerName}</td>
                    <td className="py-3 px-4 tabular-num text-right text-ink font-medium">₹{q.grandTotal.toLocaleString("en-IN")}</td>
                    <td className="py-3 px-4 text-right">
                      <span className={`capitalize text-xs px-2 py-1 rounded-full font-medium ${statusStyle[q.status]}`}>{q.status}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => navigate(`/print/invoice/${q._id}?type=quotation`)} className="text-ink-muted hover:text-brand transition-colors">
  <Eye size={16} />
</button>
                        <button className="text-ink-muted hover:text-brand transition-colors"><Pencil size={16} /></button>
                        <button className="text-ink-muted hover:text-status-overdue transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}