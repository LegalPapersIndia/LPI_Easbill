
import { TrendingUp, ShoppingCart, Clock, AlertCircle } from "lucide-react";

export default function StatCard({ label, amount, trend, tone = "brand" }) {
  const toneMap = {
    brand: {
      text: "text-brand bg-brand-light",
      cardBg: "bg-gradient-to-br from-blue-50 to-white",
      icon: ShoppingCart,
    },
    paid: {
      text: "text-status-paid bg-status-paid/10",
      cardBg: "bg-gradient-to-br from-green-50 to-white",
      icon: TrendingUp,
    },
    pending: {
      text: "text-status-pending bg-status-pending/10",
      cardBg: "bg-gradient-to-br from-amber-50 to-white",
      icon: Clock,
    },
    overdue: {
      text: "text-status-overdue bg-status-overdue/10",
      cardBg: "bg-gradient-to-br from-red-50 to-white",
      icon: AlertCircle,
    },
  };

  const { cardBg, icon: Icon } = toneMap[tone];

  const iconBoxMap = {
    brand: "bg-brand text-white",
    paid: "bg-emerald-600 text-white",
    pending: "bg-amber-600 text-white",
    overdue: "bg-red-600 text-white",
  };

  const badgeMap = {
    brand: "text-brand bg-brand-light font-semibold",
    paid: "text-emerald-700 bg-emerald-100 font-semibold",
    pending: "text-amber-700 bg-amber-100 font-semibold",
    overdue: "text-red-700 bg-red-100 font-semibold",
  };

  return (
    <div
      className={`group ${cardBg} border border-border rounded-xl p-4 sm:p-5 hover:shadow-lg hover:-translate-y-1 hover:border-brand/30 transition-all duration-200`}
    >
      <div className="flex items-start justify-between">
        <p className="text-xs sm:text-sm text-ink-muted font-medium">{label}</p>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconBoxMap[tone]} group-hover:scale-110 group-hover:rotate-6 transition-transform duration-200 shadow-sm`}>
          <Icon size={22} />
        </div>
      </div>
      <p className="tabular-num text-xl sm:text-2xl font-semibold text-ink mt-2">
        ₹{amount.toLocaleString("en-IN")}
      </p>
      {trend && (
        <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full ${badgeMap[tone]}`}>
          {trend}
        </span>
      )}
    </div>
  );
}