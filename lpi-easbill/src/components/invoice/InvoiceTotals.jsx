// export default function InvoiceTotals({ subtotal, gstBreakup, isSameState, grandTotal }) {
//   return (
//     <div className="bg-white border border-border rounded-xl p-4 sm:p-5 mb-4">
//       <div className="max-w-sm ml-auto space-y-2 text-sm">
//         <div className="flex justify-between text-ink-muted">
//           <span>Subtotal</span>
//           <span className="tabular-num text-ink">₹{subtotal.toLocaleString("en-IN")}</span>
//         </div>

//         {isSameState ? (
//           <>
//             <div className="flex justify-between text-ink-muted">
//               <span>CGST</span>
//               <span className="tabular-num text-ink">₹{(gstBreakup / 2).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
//             </div>
//             <div className="flex justify-between text-ink-muted">
//               <span>SGST</span>
//               <span className="tabular-num text-ink">₹{(gstBreakup / 2).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
//             </div>
//           </>
//         ) : (
//           <div className="flex justify-between text-ink-muted">
//             <span>IGST</span>
//             <span className="tabular-num text-ink">₹{gstBreakup.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
//           </div>
//         )}

//         <div className="flex justify-between pt-2 border-t border-border font-display font-semibold text-base text-ink">
//           <span>Grand Total</span>
//           <span className="tabular-num">₹{grandTotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
//         </div>
//       </div>
//     </div>
//   );
// }



export default function InvoiceTotals({ subtotal, discount, onDiscountChange, shipping, onShippingChange, gstBreakup, isSameState, grandTotal }) {
  const gross = subtotal - Number(discount || 0);

  return (
    <div className="bg-white border border-border rounded-xl p-4 sm:p-5 mb-4">
      <div className="max-w-sm ml-auto space-y-2 text-sm">
        <div className="flex justify-between text-ink-muted">
          <span>Subtotal</span>
          <span className="tabular-num text-ink">₹{subtotal.toLocaleString("en-IN")}</span>
        </div>

        <div className="flex justify-between items-center text-ink-muted">
          <span>Discount (₹)</span>
          <input
            type="number"
            value={discount}
            onChange={(e) => onDiscountChange(e.target.value)}
            placeholder="0"
            className="w-28 border border-border rounded-lg px-2 py-1 text-sm text-right outline-none focus:border-brand tabular-num"
          />
        </div>

        <div className="flex justify-between text-ink-muted pt-1 border-t border-border">
          <span>Gross Amount</span>
          <span className="tabular-num text-ink font-medium">₹{gross.toLocaleString("en-IN")}</span>
        </div>

        {isSameState ? (
          <>
            <div className="flex justify-between text-ink-muted">
              <span>CGST</span>
              <span className="tabular-num text-ink">₹{(gstBreakup / 2).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-ink-muted">
              <span>SGST</span>
              <span className="tabular-num text-ink">₹{(gstBreakup / 2).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
            </div>
          </>
        ) : (
          <div className="flex justify-between text-ink-muted">
            <span>IGST</span>
            <span className="tabular-num text-ink">₹{gstBreakup.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
          </div>
        )}

        <div className="flex justify-between items-center text-ink-muted">
          <span>Shipping / Handling (₹)</span>
          <input
            type="number"
            value={shipping}
            onChange={(e) => onShippingChange(e.target.value)}
            placeholder="0"
            className="w-28 border border-border rounded-lg px-2 py-1 text-sm text-right outline-none focus:border-brand tabular-num"
          />
        </div>

        <div className="flex justify-between pt-2 border-t border-border font-display font-semibold text-base text-ink">
          <span>Invoice Amount</span>
          <span className="tabular-num">₹{grandTotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
        </div>
      </div>
    </div>
  );
}