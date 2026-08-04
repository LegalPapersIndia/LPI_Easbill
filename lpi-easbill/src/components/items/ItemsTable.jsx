
import { Pencil, Trash2 } from "lucide-react";

export default function ItemsTable({ items, onEdit, onDelete }) {
  if (items.length === 0) {
    return (
      <div className="bg-white border border-border rounded-xl p-10 text-center">
        <p className="text-ink-muted text-sm">Koi item nahi mila. Naya item add karo ya search/filter check karo.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-220 text-sm">
          <thead>
            <tr className="text-left text-ink-muted bg-paper border-b border-border">
              <th className="py-3 px-4 font-medium">Item</th>
              <th className="py-3 px-4 font-medium">Type</th>
              <th className="py-3 px-4 font-medium">Group</th>
              <th className="py-3 px-4 font-medium">Brand</th>
              <th className="py-3 px-4 font-medium text-right">Purchase</th>
              <th className="py-3 px-4 font-medium text-right">Sale</th>
              <th className="py-3 px-4 font-medium text-right">GST%</th>
              <th className="py-3 px-4 font-medium text-right">Stock</th>
              <th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const isService = item.itemType === "Service";
              const lowStock = !isService && item.stockQty <= (item.lowStockThreshold || 10);
              const displayPrice = isService ? item.serviceCharge : item.salePrice;
              return (
                <tr key={item._id} className="border-b border-border last:border-0 hover:bg-paper/60 transition-colors">
                  <td className="py-3 px-4">
                    <p className="text-ink font-medium">{item.name}</p>
                    <p className="text-xs text-ink-muted tabular-num">{item.sku}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium
                      ${isService ? "bg-brand-light text-brand" : "bg-status-paid/10 text-status-paid"}`}>
                      {item.itemType}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-ink-muted">{item.group || "-"}</td>
                  <td className="py-3 px-4 text-ink-muted">{item.brand || "-"}</td>
                  <td className="py-3 px-4 tabular-num text-right text-ink-muted">
                    {isService ? "-" : `₹${item.purchasePrice}`}
                  </td>
                  <td className="py-3 px-4 tabular-num text-right text-ink font-medium">₹{displayPrice}</td>
                  <td className="py-3 px-4 tabular-num text-right text-ink-muted">{item.gstPercent}%</td>
                  <td className="py-3 px-4 text-right">
                    {isService ? (
                      <span className="text-xs text-ink-muted">—</span>
                    ) : (
                      <span className={`tabular-num text-xs px-2 py-1 rounded-full font-medium
                        ${lowStock ? "bg-status-pending/10 text-status-pending" : "bg-status-paid/10 text-status-paid"}`}>
                        {item.stockQty} {item.unit}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => onEdit(item)} className="text-ink-muted hover:text-brand transition-colors">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => onDelete(item._id)} className="text-ink-muted hover:text-status-overdue transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}