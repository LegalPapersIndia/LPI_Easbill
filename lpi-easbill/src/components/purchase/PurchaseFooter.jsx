// import { useState } from "react";
// import { businessSettings } from "../../data/dummyData";

// export default function PurchaseFooter({ grandTotal, amountPaid, onAmountPaidChange, paymentMode, onPaymentModeChange, notes, onNotesChange, terms, onTermsChange }) {
//   const [markFullyPaid, setMarkFullyPaid] = useState(false);
//   const balanceAmount = grandTotal - Number(amountPaid || 0);

//   const handleFullyPaidToggle = (checked) => {
//     setMarkFullyPaid(checked);
//     if (checked) onAmountPaidChange(grandTotal);
//   };

//   return (
//     <div className="bg-white border border-border rounded-xl p-4 sm:p-5 mb-4">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Left: Notes + Terms */}
//         <div className="space-y-4">
//           <div>
//             <label className="text-xs font-medium text-ink-muted">Notes</label>
//             <textarea
//               value={notes}
//               onChange={(e) => onNotesChange(e.target.value)}
//               rows={2}
//               placeholder="Koi extra note (optional)"
//               className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand resize-none"
//             />
//           </div>
//           <div>
//             <label className="text-xs font-medium text-ink-muted">Terms & Conditions</label>
//             <textarea
//               value={terms}
//               onChange={(e) => onTermsChange(e.target.value)}
//               rows={3}
//               className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand resize-none"
//             />
//           </div>
//         </div>

//         {/* Right: Payment (Paid, not Received) */}
//         <div className="space-y-3">
//           <label className="flex items-center gap-2 text-sm text-ink cursor-pointer">
//             <input
//               type="checkbox"
//               checked={markFullyPaid}
//               onChange={(e) => handleFullyPaidToggle(e.target.checked)}
//               className="accent-brand"
//             />
//             Mark as fully paid
//           </label>

//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <label className="text-xs font-medium text-ink-muted">Amount Paid (₹)</label>
//               <input
//                 type="number"
//                 value={amountPaid}
//                 onChange={(e) => onAmountPaidChange(e.target.value)}
//                 className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
//               />
//             </div>
//             <div>
//               <label className="text-xs font-medium text-ink-muted">Payment Mode</label>
//               <select
//                 value={paymentMode}
//                 onChange={(e) => onPaymentModeChange(e.target.value)}
//                 className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
//               >
//                 <option value="Cash">Cash</option>
//                 <option value="UPI">UPI</option>
//                 <option value="Bank Transfer">Bank Transfer</option>
//                 <option value="Cheque">Cheque</option>
//               </select>
//             </div>
//           </div>

//           <div className="flex justify-between items-center pt-3 border-t border-border">
//             <span className="text-sm font-medium text-ink-muted">Balance Amount (Due to Supplier)</span>
//             <span className={`tabular-num font-display font-semibold text-lg ${balanceAmount > 0 ? "text-status-overdue" : "text-status-paid"}`}>
//               ₹{balanceAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
//             </span>
//           </div>

//           <div className="pt-4 flex justify-end">
//             <div className="text-center">
//               <div className="w-40 h-16 border border-border rounded-lg flex items-center justify-center overflow-hidden bg-paper">
//                 {businessSettings.signature ? (
//                   <img src={businessSettings.signature} alt="Signature" className="w-full h-full object-contain" />
//                 ) : (
//                   <span className="text-xs text-ink-muted">No signature set</span>
//                 )}
//               </div>
//               <p className="text-[11px] text-ink-muted mt-1">Authorized Signatory</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import { useState } from "react";
import { useBusiness } from "../../context/BusinessContext";

export default function PurchaseFooter({ grandTotal, amountPaid, onAmountPaidChange, paymentMode, onPaymentModeChange, notes, onNotesChange, terms, onTermsChange }) {
  const { businessSettings } = useBusiness();
  const [markFullyPaid, setMarkFullyPaid] = useState(false);
  const balanceAmount = grandTotal - Number(amountPaid || 0);

  const handleFullyPaidToggle = (checked) => {
    setMarkFullyPaid(checked);
    if (checked) onAmountPaidChange(grandTotal);
  };

  return (
    <div className="bg-white border border-border rounded-xl p-4 sm:p-5 mb-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Notes + Terms */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-ink-muted">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => onNotesChange(e.target.value)}
              rows={2}
              placeholder="Koi extra note (optional)"
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand resize-none"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-ink-muted">Terms & Conditions</label>
            <textarea
              value={terms}
              onChange={(e) => onTermsChange(e.target.value)}
              rows={3}
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand resize-none"
            />
          </div>
        </div>

        {/* Right: Payment (Paid, not Received) */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm text-ink cursor-pointer">
            <input
              type="checkbox"
              checked={markFullyPaid}
              onChange={(e) => handleFullyPaidToggle(e.target.checked)}
              className="accent-brand"
            />
            Mark as fully paid
          </label>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-ink-muted">Amount Paid (₹)</label>
              <input
                type="number"
                value={amountPaid}
                onChange={(e) => onAmountPaidChange(e.target.value)}
                className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ink-muted">Payment Mode</label>
              <select
                value={paymentMode}
                onChange={(e) => onPaymentModeChange(e.target.value)}
                className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
              >
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cheque">Cheque</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-border">
            <span className="text-sm font-medium text-ink-muted">Balance Amount (Due to Supplier)</span>
            <span className={`tabular-num font-display font-semibold text-lg ${balanceAmount > 0 ? "text-status-overdue" : "text-status-paid"}`}>
              ₹{balanceAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="pt-4 flex justify-end">
            <div className="text-center">
              <div className="w-40 h-16 border border-border rounded-lg flex items-center justify-center overflow-hidden bg-paper">
                {businessSettings?.signature ? (
                  <img src={businessSettings.signature} alt="Signature" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-xs text-ink-muted">No signature set</span>
                )}
              </div>
              <p className="text-[11px] text-ink-muted mt-1">Authorized Signatory</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}