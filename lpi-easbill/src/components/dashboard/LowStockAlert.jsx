
import { AlertTriangle } from "lucide-react";

export default function LowStockAlert({ lowStockItems }) {
  return (
    <div className="group bg-linear-to-br from-amber-50 via-white to-white border border-border rounded-xl p-4 sm:p-5 hover:shadow-lg hover:-translate-y-1 hover:border-brand/30 transition-all duration-200">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-200">
          <AlertTriangle size={16} className="text-amber-600" />
        </div>
        <p className="font-display font-semibold text-ink">Low Stock Alert</p>
      </div>
      {lowStockItems.length === 0 ? (
        <p className="text-sm text-ink-muted">No item is low in stock. 👍</p>
      ) : (
        <div className="space-y-2">
          {lowStockItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between text-sm bg-amber-50/60 hover:bg-amber-100 rounded-lg px-3 py-2 transition-colors duration-150"
            >
              <span className="text-ink flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                {item.name}
              </span>
              <span className="tabular-num text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full font-semibold">
                {item.stockQty} {item.unit}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}