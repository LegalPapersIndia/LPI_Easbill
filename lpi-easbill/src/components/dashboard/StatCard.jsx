export default function StatCard({ label, amount, trend, tone = "brand" }) {
  const toneMap = {
    brand: "text-brand bg-brand-light",
    paid: "text-status-paid bg-status-paid/10",
    pending: "text-status-pending bg-status-pending/10",
    overdue: "text-status-overdue bg-status-overdue/10",
  };

  return (
    <div className="bg-white border border-border rounded-xl p-4 sm:p-5">
      <p className="text-xs sm:text-sm text-ink-muted font-medium">{label}</p>
      <p className="tabular-num text-xl sm:text-2xl font-semibold text-ink mt-2">
        ₹{amount.toLocaleString("en-IN")}
      </p>
      {trend && (
        <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full ${toneMap[tone]}`}>
          {trend}
        </span>
      )}
    </div>
  );
}