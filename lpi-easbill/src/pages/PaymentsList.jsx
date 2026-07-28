import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import ReturnsToggle from "../components/returns/ReturnsToggle";
import { paymentsList } from "../data/dummyData";

export default function PaymentsList() {
  const navigate = useNavigate();
  const [type, setType] = useState("in");

  const filtered = paymentsList.filter((p) => p.type === type);
  const total = useMemo(() => filtered.reduce((sum, p) => sum + p.amount, 0), [filtered]);

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">Payments</h1>
          <p className="text-sm text-ink-muted mt-1">Payment In aur Payment Out ka record.</p>
        </div>
        <button
          onClick={() => navigate(`/payments/new?type=${type}`)}
          className="flex items-center justify-center gap-2 bg-brand text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-brand-dark transition-colors whitespace-nowrap"
        >
          <Plus size={16} />
          New Payment
        </button>
      </div>

      {/* Toggle — reuse same style, bas labels custom */}
      <div className="inline-flex bg-paper border border-border rounded-lg p-1 mb-5">
        {[{ key: "in", label: "Payment In" }, { key: "out", label: "Payment Out" }].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setType(key)}
            className={`px-5 py-2 rounded-md text-sm font-medium transition-colors
              ${type === key ? "bg-white text-brand shadow-sm" : "text-ink-muted hover:text-ink"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="bg-white border border-border rounded-xl p-4 mb-5 max-w-xs">
        <p className="text-xs text-ink-muted font-medium">Total {type === "in" ? "Received" : "Paid"}</p>
        <p className={`tabular-num text-xl font-semibold mt-1 ${type === "in" ? "text-status-paid" : "text-status-overdue"}`}>
          ₹{total.toLocaleString("en-IN")}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-border rounded-xl p-10 text-center">
          <p className="text-ink-muted text-sm">Koi payment {type === "in" ? "in" : "out"} record nahi mila.</p>
        </div>
      ) : (
        <div className="bg-white border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-160 text-sm">
              <thead>
                <tr className="text-left text-ink-muted bg-paper border-b border-border">
                  <th className="py-3 px-4 font-medium">Date</th>
                  <th className="py-3 px-4 font-medium">Payment No</th>
                  <th className="py-3 px-4 font-medium">Party</th>
                  <th className="py-3 px-4 font-medium">Mode</th>
                  <th className="py-3 px-4 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p._id} className="border-b border-border last:border-0 hover:bg-paper/60 transition-colors">
                    <td className="py-3 px-4 text-ink-muted tabular-num">
                      {new Date(p.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="py-3 px-4 tabular-num text-ink font-medium">{p.paymentNo}</td>
                    <td className="py-3 px-4 text-ink">{p.partyName}</td>
                    <td className="py-3 px-4 text-ink-muted">{p.mode}</td>
                    <td className={`py-3 px-4 tabular-num text-right font-medium ${type === "in" ? "text-status-paid" : "text-status-overdue"}`}>
                      ₹{p.amount.toLocaleString("en-IN")}
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