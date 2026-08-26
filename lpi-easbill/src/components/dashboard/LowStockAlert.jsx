// import { AlertTriangle } from "lucide-react";
// import { lowStockItems } from "../../data/dummyData";

// export default function LowStockAlert() {
//   return (
//     <div className="bg-white border border-border rounded-xl p-4 sm:p-5">
//       <div className="flex items-center gap-2 mb-4">
//         <AlertTriangle size={18} className="text-status-pending" />
//         <p className="font-display font-semibold text-ink">Low Stock Alert</p>
//       </div>
//       <div className="space-y-3">
//         {lowStockItems.map((item) => (
//           <div key={item._id} className="flex items-center justify-between text-sm">
//             <span className="text-ink">{item.name}</span>
//             <span className="tabular-num text-status-pending font-medium">
//               {item.stockQty} {item.unit}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




import { AlertTriangle } from "lucide-react";

export default function LowStockAlert({ lowStockItems }) {
  return (
    <div className="bg-white border border-border rounded-xl p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle size={18} className="text-status-pending" />
        <p className="font-display font-semibold text-ink">Low Stock Alert</p>
      </div>
      {lowStockItems.length === 0 ? (
        <p className="text-sm text-ink-muted">Koi item low stock mein nahi hai. 👍</p>
      ) : (
        <div className="space-y-3">
          {lowStockItems.map((item) => (
            <div key={item._id} className="flex items-center justify-between text-sm">
              <span className="text-ink">{item.name}</span>
              <span className="tabular-num text-status-pending font-medium">
                {item.stockQty} {item.unit}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}