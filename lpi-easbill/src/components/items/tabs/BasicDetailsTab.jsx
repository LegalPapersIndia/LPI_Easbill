// // export default function BasicDetailsTab({ form, onChange, categories, unitOptions }) {
// //   return (
// //     <div className="space-y-4">
// //       <div>
// //         <label className="text-xs font-medium text-ink-muted block mb-2">Item Type</label>
// //         <div className="flex gap-3">
// //           {["Product", "Service"].map((type) => (
// //             <button
// //               key={type}
// //               type="button"
// //               onClick={() => onChange("itemType", type)}
// //               className={`px-5 py-2 rounded-lg text-sm font-medium border transition-colors
// //                 ${form.itemType === type ? "border-brand bg-brand-light text-brand" : "border-border text-ink-muted"}`}
// //             >
// //               {type}
// //             </button>
// //           ))}
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //         <div>
// //           <label className="text-xs font-medium text-ink-muted">Category</label>
// //           <select value={form.category} onChange={(e) => onChange("category", e.target.value)}
// //             className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand">
// //             <option value="">Select</option>
// //             {categories.map((c) => <option key={c} value={c}>{c}</option>)}
// //           </select>
// //         </div>
// //         <div>
// //           <label className="text-xs font-medium text-ink-muted">Item Name *</label>
// //           <input required value={form.name} onChange={(e) => onChange("name", e.target.value)}
// //             placeholder="ex: A4 Legal Paper Bundle"
// //             className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand" />
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //         <div>
// //           <label className="text-xs font-medium text-ink-muted">Sales Price</label>
// //           <div className="flex mt-1">
// //             <div className="flex items-center border border-border border-r-0 rounded-l-lg px-3 text-sm text-ink-muted">₹</div>
// //             <input type="number" value={form.salePrice} onChange={(e) => onChange("salePrice", e.target.value)}
// //               placeholder="ex: 420"
// //               className="flex-1 border border-border px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
// //             <select value={form.salePriceType} onChange={(e) => onChange("salePriceType", e.target.value)}
// //               className="border border-border border-l-0 rounded-r-lg px-2 text-xs text-ink-muted outline-none">
// //               <option value="with_tax">With Tax</option>
// //               <option value="without_tax">Without Tax</option>
// //             </select>
// //           </div>
// //         </div>
// //         <div>
// //           <label className="text-xs font-medium text-ink-muted">GST Tax Rate (%)</label>
// //           <select value={form.gstPercent} onChange={(e) => onChange("gstPercent", Number(e.target.value))}
// //             className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand">
// //             <option value={0}>None</option>
// //             <option value={5}>5%</option>
// //             <option value={12}>12%</option>
// //             <option value={18}>18%</option>
// //             <option value={28}>28%</option>
// //           </select>
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //         <div>
// //           <label className="text-xs font-medium text-ink-muted">Measuring Unit</label>
// //           <select value={form.unit} onChange={(e) => onChange("unit", e.target.value)}
// //             className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand">
// //             {unitOptions.map((u) => <option key={u} value={u}>{u}</option>)}
// //           </select>
// //         </div>
// //         <div>
// //           <label className="text-xs font-medium text-ink-muted">Opening Stock</label>
// //           <input type="number" value={form.stockQty} onChange={(e) => onChange("stockQty", e.target.value)}
// //             placeholder="ex: 150"
// //             className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



// import InlineAddSelect from "../InlineAddSelect";

// export default function BasicDetailsTab({ form, onChange, groups, brands, onAddGroup, onAddBrand, unitOptions }) {
//   return (
//     <div className="space-y-4">
//       <div>
//         <label className="text-xs font-medium text-ink-muted block mb-2">Item Type</label>
//         <div className="flex gap-3">
//           {["Product", "Service"].map((type) => (
//             <button
//               key={type}
//               type="button"
//               onClick={() => onChange("itemType", type)}
//               className={`px-5 py-2 rounded-lg text-sm font-medium border transition-colors
//                 ${form.itemType === type ? "border-brand bg-brand-light text-brand" : "border-border text-ink-muted"}`}
//             >
//               {type}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <InlineAddSelect
//           label="Group"
//           value={form.group}
//           onChange={(v) => onChange("group", v)}
//           options={groups}
//           onAddOption={onAddGroup}
//         />
//         <InlineAddSelect
//           label="Brand"
//           value={form.brand}
//           onChange={(v) => onChange("brand", v)}
//           options={brands}
//           onAddOption={onAddBrand}
//         />
//       </div>

//       <div>
//         <label className="text-xs font-medium text-ink-muted">Item Name *</label>
//         <input required value={form.name} onChange={(e) => onChange("name", e.target.value)}
//           placeholder="ex: A4 Legal Paper Bundle"
//           className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand" />
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <div>
//           <label className="text-xs font-medium text-ink-muted">Sales Price</label>
//           <div className="flex mt-1">
//             <div className="flex items-center border border-border border-r-0 rounded-l-lg px-3 text-sm text-ink-muted">₹</div>
//             <input type="number" value={form.salePrice} onChange={(e) => onChange("salePrice", e.target.value)}
//               placeholder="ex: 420"
//               className="flex-1 border border-border px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
//             <select value={form.salePriceType} onChange={(e) => onChange("salePriceType", e.target.value)}
//               className="border border-border border-l-0 rounded-r-lg px-2 text-xs text-ink-muted outline-none">
//               <option value="with_tax">With Tax</option>
//               <option value="without_tax">Without Tax</option>
//             </select>
//           </div>
//         </div>
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
//           <label className="text-xs font-medium text-ink-muted">Opening Stock</label>
//           <input type="number" value={form.stockQty} onChange={(e) => onChange("stockQty", e.target.value)}
//             placeholder="ex: 150"
//             className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
//         </div>
//       </div>
//     </div>
//   );
// }



// import InlineAddSelect from "../InlineAddSelect";

// export default function BasicDetailsTab({ form, onChange, groups, brands, onAddGroup, onAddBrand, unitOptions }) {
//   const isService = form.itemType === "Service";

//   return (
//     <div className="space-y-4">
//       <div>
//         <label className="text-xs font-medium text-ink-muted block mb-2">Item Type</label>
//         <div className="flex gap-3">
//           {["Product", "Service"].map((type) => (
//             <button
//               key={type}
//               type="button"
//               onClick={() => onChange("itemType", type)}
//               className={`px-5 py-2 rounded-lg text-sm font-medium border transition-colors
//                 ${form.itemType === type ? "border-brand bg-brand-light text-brand" : "border-border text-ink-muted"}`}
//             >
//               {type}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <InlineAddSelect
//           label="Group"
//           value={form.group}
//           onChange={(v) => onChange("group", v)}
//           options={groups}
//           onAddOption={onAddGroup}
//         />
//         <InlineAddSelect
//           label="Brand"
//           value={form.brand}
//           onChange={(v) => onChange("brand", v)}
//           options={brands}
//           onAddOption={onAddBrand}
//         />
//       </div>

//       <div>
//         <label className="text-xs font-medium text-ink-muted">{isService ? "Service Name *" : "Item Name *"}</label>
//         <input required value={form.name} onChange={(e) => onChange("name", e.target.value)}
//           placeholder={isService ? "ex: Document Notarization" : "ex: A4 Legal Paper Bundle"}
//           className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand" />
//       </div>

//       {isService ? (
//         // SERVICE — Sirf Service Charge + Min Charge, koi Unit/Stock nahi
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label className="text-xs font-medium text-ink-muted">Service Charge</label>
//             <div className="flex mt-1">
//               <div className="flex items-center border border-border border-r-0 rounded-l-lg px-3 text-sm text-ink-muted">₹</div>
//               <input type="number" value={form.serviceCharge} onChange={(e) => onChange("serviceCharge", e.target.value)}
//                 placeholder="ex: 500"
//                 className="flex-1 border border-border px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
//               <select value={form.salePriceType} onChange={(e) => onChange("salePriceType", e.target.value)}
//                 className="border border-border border-l-0 rounded-r-lg px-2 text-xs text-ink-muted outline-none">
//                 <option value="with_tax">With Tax</option>
//                 <option value="without_tax">Without Tax</option>
//               </select>
//             </div>
//           </div>
//           <div>
//             <label className="text-xs font-medium text-ink-muted">GST Tax Rate (%)</label>
//             <select value={form.gstPercent} onChange={(e) => onChange("gstPercent", Number(e.target.value))}
//               className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand">
//               <option value={0}>None</option>
//               <option value={5}>5%</option>
//               <option value={18}>18%</option>
//               <option value={40}>40%</option>
//             </select>
//           </div>
//           <div className="sm:col-span-2">
//             <label className="text-xs font-medium text-ink-muted">Min. Service Charge (Optional)</label>
//             <input type="number" value={form.minServiceCharge} onChange={(e) => onChange("minServiceCharge", e.target.value)}
//               placeholder="ex: 150"
//               className="w-full sm:w-52 mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
//           </div>
//         </div>
//       ) : (
//         // PRODUCT — Sales Price + GST + Unit + Opening Stock
//         <>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="text-xs font-medium text-ink-muted">Sales Price</label>
//               <div className="flex mt-1">
//                 <div className="flex items-center border border-border border-r-0 rounded-l-lg px-3 text-sm text-ink-muted">₹</div>
//                 <input type="number" value={form.salePrice} onChange={(e) => onChange("salePrice", e.target.value)}
//                   placeholder="ex: 420"
//                   className="flex-1 border border-border px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
//                 <select value={form.salePriceType} onChange={(e) => onChange("salePriceType", e.target.value)}
//                   className="border border-border border-l-0 rounded-r-lg px-2 text-xs text-ink-muted outline-none">
//                   <option value="with_tax">With Tax</option>
//                   <option value="without_tax">Without Tax</option>
//                 </select>
//               </div>
//             </div>
//             <div>
//               <label className="text-xs font-medium text-ink-muted">GST Tax Rate (%)</label>
//               <select value={form.gstPercent} onChange={(e) => onChange("gstPercent", Number(e.target.value))}
//                 className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand">
//                 <option value={0}>None</option>
//                 <option value={5}>5%</option>
//                 <option value={12}>12%</option>
//                 <option value={18}>18%</option>
//                 <option value={28}>28%</option>
//               </select>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="text-xs font-medium text-ink-muted">Measuring Unit</label>
//               <select value={form.unit} onChange={(e) => onChange("unit", e.target.value)}
//                 className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand">
//                 {unitOptions.map((u) => <option key={u} value={u}>{u}</option>)}
//               </select>
//             </div>
//             <div>
//               <label className="text-xs font-medium text-ink-muted">Opening Stock</label>
//               <input type="number" value={form.stockQty} onChange={(e) => onChange("stockQty", e.target.value)}
//                 placeholder="ex: 150"
//                 className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }





import InlineAddSelect from "../InlineAddSelect";

export default function BasicDetailsTab({ form, onChange, groups, brands, onAddGroup, onAddBrand, unitOptions }) {
  const isService = form.itemType === "Service";

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-medium text-ink-muted block mb-2">Item Type</label>
        <div className="flex gap-3">
          {["Product", "Service"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onChange("itemType", type)}
              className={`px-5 py-2 rounded-lg text-sm font-medium border transition-colors
                ${form.itemType === type ? "border-brand bg-brand-light text-brand" : "border-border text-ink-muted"}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InlineAddSelect
          label="Group"
          value={form.group}
          onChange={(v) => onChange("group", v)}
          options={groups}
          onAddOption={onAddGroup}
        />
        <InlineAddSelect
          label="Brand"
          value={form.brand}
          onChange={(v) => onChange("brand", v)}
          options={brands}
          onAddOption={onAddBrand}
        />
      </div>

      <div>
        <label className="text-xs font-medium text-ink-muted">{isService ? "Service Name *" : "Item Name *"}</label>
        <input required value={form.name} onChange={(e) => onChange("name", e.target.value)}
          placeholder={isService ? "ex: Document Notarization" : "ex: A4 Legal Paper Bundle"}
          className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand" />
      </div>

      {isService ? (
        // SERVICE — Sirf Service Charge + Min Charge, koi Unit/Stock nahi
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-ink-muted">Service Charge</label>
            <div className="flex mt-1">
              <div className="flex items-center border border-border border-r-0 rounded-l-lg px-3 text-sm text-ink-muted">₹</div>
              <input type="number" value={form.serviceCharge} onChange={(e) => onChange("serviceCharge", e.target.value)}
                placeholder="ex: 500"
                className="flex-1 min-w-0 border border-border px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
              <select value={form.salePriceType} onChange={(e) => onChange("salePriceType", e.target.value)}
                className="shrink-0 w-23 border border-border border-l-0 rounded-r-lg px-2 text-xs text-ink-muted outline-none">
                <option value="with_tax">With Tax</option>
                <option value="without_tax">Without Tax</option>
              </select>
            </div>
          </div>
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
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-ink-muted">Min. Service Charge (Optional)</label>
            <input type="number" value={form.minServiceCharge} onChange={(e) => onChange("minServiceCharge", e.target.value)}
              placeholder="ex: 150"
              className="w-full sm:w-52 mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
          </div>
        </div>
      ) : (
        // PRODUCT — Sales Price + GST + Unit + Opening Stock
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-ink-muted">Sales Price</label>
              <div className="flex mt-1">
                <div className="flex items-center border border-border border-r-0 rounded-l-lg px-3 text-sm text-ink-muted">₹</div>
                <input type="number" value={form.salePrice} onChange={(e) => onChange("salePrice", e.target.value)}
                  placeholder="ex: 420"
                  className="flex-1 min-w-0 border border-border px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
                <select value={form.salePriceType} onChange={(e) => onChange("salePriceType", e.target.value)}
                  className="shrink-0 w-23 border border-border border-l-0 rounded-r-lg px-2 text-xs text-ink-muted outline-none">
                  <option value="with_tax">With Tax</option>
                  <option value="without_tax">Without Tax</option>
                </select>
              </div>
            </div>
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-ink-muted">Measuring Unit</label>
              <select value={form.unit} onChange={(e) => onChange("unit", e.target.value)}
                className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand">
                {unitOptions.map((u) => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-ink-muted">Opening Stock</label>
              <input type="number" value={form.stockQty} onChange={(e) => onChange("stockQty", e.target.value)}
                placeholder="ex: 150"
                className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}