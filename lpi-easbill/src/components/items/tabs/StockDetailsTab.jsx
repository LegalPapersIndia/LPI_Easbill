// export default function StockDetailsTab({ form, onChange, unitOptions }) {
//   return (
//     <div className="space-y-4">
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <div>
//           <label className="text-xs font-medium text-ink-muted">Item Code (SKU)</label>
//           <input value={form.sku} onChange={(e) => onChange("sku", e.target.value)}
//             placeholder="ex: ITM12549"
//             className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
//         </div>
//         <div>
//           <label className="text-xs font-medium text-ink-muted">HSN Code</label>
//           <input value={form.hsnCode} onChange={(e) => onChange("hsnCode", e.target.value)}
//             placeholder="ex: 4010"
//             className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <div>
//           <label className="text-xs font-medium text-ink-muted">Measuring Unit</label>
//           <select value={form.unit} onChange={(e) => onChange("unit", e.target.value)}
//             className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand">
//             {unitOptions.map((u) => <option key={u} value={u}>{u}</option>)}
//           </select>
//         </div>
//         <div>
//           <label className="text-xs font-medium text-ink-muted">Alternative Unit (Optional)</label>
//           <input value={form.altUnit} onChange={(e) => onChange("altUnit", e.target.value)}
//             placeholder="ex: Dozen"
//             className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand" />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <div>
//           <label className="text-xs font-medium text-ink-muted">Opening Stock</label>
//           <input type="number" value={form.stockQty} onChange={(e) => onChange("stockQty", e.target.value)}
//             className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
//         </div>
//         <div>
//           <label className="text-xs font-medium text-ink-muted">As of Date</label>
//           <input type="date" value={form.asOfDate} onChange={(e) => onChange("asOfDate", e.target.value)}
//             className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
//         </div>
//       </div>

//       <div className="border border-border rounded-lg p-3">
//         <label className="flex items-center justify-between cursor-pointer">
//           <span className="text-sm font-medium text-ink">Enable Low Stock Quantity Warning</span>
//           <input type="checkbox" checked={form.lowStockEnabled}
//             onChange={(e) => onChange("lowStockEnabled", e.target.checked)}
//             className="accent-brand w-4 h-4" />
//         </label>
//         {form.lowStockEnabled && (
//           <div className="mt-3">
//             <label className="text-xs font-medium text-ink-muted">Warn When Stock Falls Below</label>
//             <input type="number" value={form.lowStockThreshold} onChange={(e) => onChange("lowStockThreshold", e.target.value)}
//               placeholder="ex: 10"
//               className="w-full sm:w-40 mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
//           </div>
//         )}
//       </div>

//       <div>
//         <label className="text-xs font-medium text-ink-muted">Description</label>
//         <textarea value={form.description} onChange={(e) => onChange("description", e.target.value)}
//           rows={3} placeholder="Item ke baare mein extra detail (optional)"
//           className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand resize-none" />
//       </div>
//     </div>
//   );
// }



export default function StockDetailsTab({ form, onChange, unitOptions }) {
  const isService = form.itemType === "Service";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-ink-muted">Item Code (SKU)</label>
          <input value={form.sku} onChange={(e) => onChange("sku", e.target.value)}
            placeholder="ex: ITM12549"
            className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
        </div>
        <div>
          <label className="text-xs font-medium text-ink-muted">{isService ? "SAC Code" : "HSN Code"}</label>
          <input value={form.hsnCode} onChange={(e) => onChange("hsnCode", e.target.value)}
            placeholder={isService ? "ex: 9983" : "ex: 4010"}
            className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
        </div>
      </div>

      {!isService && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-ink-muted">Measuring Unit</label>
              <select value={form.unit} onChange={(e) => onChange("unit", e.target.value)}
                className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand">
                {unitOptions.map((u) => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-ink-muted">Alternative Unit (Optional)</label>
              <input value={form.altUnit} onChange={(e) => onChange("altUnit", e.target.value)}
                placeholder="ex: Dozen"
                className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-ink-muted">Opening Stock</label>
              <input type="number" value={form.stockQty} onChange={(e) => onChange("stockQty", e.target.value)}
                className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
            </div>
            <div>
              <label className="text-xs font-medium text-ink-muted">As of Date</label>
              <input type="date" value={form.asOfDate} onChange={(e) => onChange("asOfDate", e.target.value)}
                className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
            </div>
          </div>

          <div className="border border-border rounded-lg p-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm font-medium text-ink">Enable Low Stock Quantity Warning</span>
              <input type="checkbox" checked={form.lowStockEnabled}
                onChange={(e) => onChange("lowStockEnabled", e.target.checked)}
                className="accent-brand w-4 h-4" />
            </label>
            {form.lowStockEnabled && (
              <div className="mt-3">
                <label className="text-xs font-medium text-ink-muted">Warn When Stock Falls Below</label>
                <input type="number" value={form.lowStockThreshold} onChange={(e) => onChange("lowStockThreshold", e.target.value)}
                  placeholder="ex: 10"
                  className="w-full sm:w-40 mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
              </div>
            )}
          </div>
        </>
      )}

      <div>
        <label className="text-xs font-medium text-ink-muted">Description</label>
        <textarea value={form.description} onChange={(e) => onChange("description", e.target.value)}
          rows={3} placeholder={isService ? "Service ke baare mein detail (jaise: time lagega, kya included hai)" : "Item ke baare mein extra detail (optional)"}
          className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand resize-none" />
      </div>
    </div>
  );
}