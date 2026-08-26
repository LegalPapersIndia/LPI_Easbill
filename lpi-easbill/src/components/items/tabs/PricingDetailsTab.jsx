// export default function PricingDetailsTab({ form, onChange }) {
//   return (
//     <div className="space-y-4">
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <div>
//           <label className="text-xs font-medium text-ink-muted">Sales Price</label>
//           <div className="flex mt-1">
//             <div className="flex items-center border border-border border-r-0 rounded-l-lg px-3 text-sm text-ink-muted">₹</div>
//             <input type="number" value={form.salePrice} onChange={(e) => onChange("salePrice", e.target.value)}
//               className="flex-1 border border-border px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
//             <select value={form.salePriceType} onChange={(e) => onChange("salePriceType", e.target.value)}
//               className="border border-border border-l-0 rounded-r-lg px-2 text-xs text-ink-muted outline-none">
//               <option value="with_tax">With Tax</option>
//               <option value="without_tax">Without Tax</option>
//             </select>
//           </div>
//         </div>
//         <div>
//           <label className="text-xs font-medium text-ink-muted">Purchase Price</label>
//           <div className="flex mt-1">
//             <div className="flex items-center border border-border border-r-0 rounded-l-lg px-3 text-sm text-ink-muted">₹</div>
//             <input type="number" value={form.purchasePrice} onChange={(e) => onChange("purchasePrice", e.target.value)}
//               className="flex-1 border border-border px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
//             <select value={form.purchasePriceType} onChange={(e) => onChange("purchasePriceType", e.target.value)}
//               className="border border-border border-l-0 rounded-r-lg px-2 text-xs text-ink-muted outline-none">
//               <option value="with_tax">With Tax</option>
//               <option value="without_tax">Without Tax</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <div>
//           <label className="text-xs font-medium text-ink-muted">GST Tax Rate (%)</label>
//           <select value={form.gstPercent} onChange={(e) => onChange("gstPercent", Number(e.target.value))}
//             className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand">
//             <option value={0}>None</option>
//             <option value={5}>5%</option>
//             <option value={12}>12%</option>
//             <option value={18}>18%</option>
//             <option value={28}>28%</option>
//           </select>
//         </div>
//         <div>
//           <label className="text-xs font-medium text-ink-muted">Discount on Sales Price (%)</label>
//           <input type="number" value={form.discountPercent} onChange={(e) => onChange("discountPercent", e.target.value)}
//             placeholder="ex: 12"
//             className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
//         </div>
//       </div>
//     </div>
//   );
// }



// export default function PricingDetailsTab({ form, onChange }) {
//   const isService = form.itemType === "Service";

//   return (
//     <div className="space-y-4">
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <div>
//           <label className="text-xs font-medium text-ink-muted">{isService ? "Service Charge" : "Sales Price"}</label>
//           <div className="flex mt-1">
//             <div className="flex items-center border border-border border-r-0 rounded-l-lg px-3 text-sm text-ink-muted">₹</div>
//             <input type="number" value={isService ? form.serviceCharge : form.salePrice}
//               onChange={(e) => onChange(isService ? "serviceCharge" : "salePrice", e.target.value)}
//               className="flex-1 border border-border px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
//             <select value={form.salePriceType} onChange={(e) => onChange("salePriceType", e.target.value)}
//               className="border border-border border-l-0 rounded-r-lg px-2 text-xs text-ink-muted outline-none">
//               <option value="with_tax">With Tax</option>
//               <option value="without_tax">Without Tax</option>
//             </select>
//           </div>
//         </div>

//         {!isService && (
//           <div>
//             <label className="text-xs font-medium text-ink-muted">Purchase Price</label>
//             <div className="flex mt-1">
//               <div className="flex items-center border border-border border-r-0 rounded-l-lg px-3 text-sm text-ink-muted">₹</div>
//               <input type="number" value={form.purchasePrice} onChange={(e) => onChange("purchasePrice", e.target.value)}
//                 className="flex-1 border border-border px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
//               <select value={form.purchasePriceType} onChange={(e) => onChange("purchasePriceType", e.target.value)}
//                 className="border border-border border-l-0 rounded-r-lg px-2 text-xs text-ink-muted outline-none">
//                 <option value="with_tax">With Tax</option>
//                 <option value="without_tax">Without Tax</option>
//               </select>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <div>
//           <label className="text-xs font-medium text-ink-muted">GST Tax Rate (%)</label>
//           <select value={form.gstPercent} onChange={(e) => onChange("gstPercent", Number(e.target.value))}
//             className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand">
//             <option value={0}>None</option>
//             <option value={5}>5%</option>
          
//             <option value={18}>18%</option>
//             <option value={40}>40%</option>
//           </select>
//         </div>
//         <div>
//           <label className="text-xs font-medium text-ink-muted">Discount on {isService ? "Service Charge" : "Sales Price"} (%)</label>
//           <input type="number" value={form.discountPercent} onChange={(e) => onChange("discountPercent", e.target.value)}
//             placeholder="ex: 12"
//             className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
//         </div>
//       </div>
//     </div>
//   );
// }




export default function PricingDetailsTab({ form, onChange }) {
  const isService = form.itemType === "Service";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-ink-muted">{isService ? "Service Charge" : "Sales Price"}</label>
          <div className="flex mt-1">
            <div className="flex items-center border border-border border-r-0 rounded-l-lg px-3 text-sm text-ink-muted">₹</div>
            <input type="number" value={isService ? form.serviceCharge : form.salePrice}
              onChange={(e) => onChange(isService ? "serviceCharge" : "salePrice", e.target.value)}
              className="flex-1 min-w-0 border border-border px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
            <select value={form.salePriceType} onChange={(e) => onChange("salePriceType", e.target.value)}
              className="shrink-0 w-23 border border-border border-l-0 rounded-r-lg px-2 text-xs text-ink-muted outline-none">
              <option value="with_tax">With Tax</option>
              <option value="without_tax">Without Tax</option>
            </select>
          </div>
        </div>

        {!isService && (
          <div>
            <label className="text-xs font-medium text-ink-muted">Purchase Price</label>
            <div className="flex mt-1">
              <div className="flex items-center border border-border border-r-0 rounded-l-lg px-3 text-sm text-ink-muted">₹</div>
              <input type="number" value={form.purchasePrice} onChange={(e) => onChange("purchasePrice", e.target.value)}
                className="flex-1 min-w-0 border border-border px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
              <select value={form.purchasePriceType} onChange={(e) => onChange("purchasePriceType", e.target.value)}
                className="shrink-0 w-23 border border-border border-l-0 rounded-r-lg px-2 text-xs text-ink-muted outline-none">
                <option value="with_tax">With Tax</option>
                <option value="without_tax">Without Tax</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-ink-muted">GST Tax Rate (%)</label>
          <select value={form.gstPercent} onChange={(e) => onChange("gstPercent", Number(e.target.value))}
            className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand">
            <option value={0}>None</option>
            <option value={5}>5%</option>
            <option value={18}>18%</option>
            <option value={40}>40%</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-ink-muted">Discount on {isService ? "Service Charge" : "Sales Price"} (%)</label>
          <input type="number" value={form.discountPercent} onChange={(e) => onChange("discountPercent", e.target.value)}
            placeholder="ex: 12"
            className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
        </div>
      </div>
    </div>
  );
}