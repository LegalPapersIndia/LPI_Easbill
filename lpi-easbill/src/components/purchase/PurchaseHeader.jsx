// import { contactsList, businessSettings } from "../../data/dummyData";

// export default function PurchaseHeader({ purchaseNo, originalInvoiceNo, onOriginalInvoiceNoChange, date, onDateChange, paymentTerms, onPaymentTermsChange, supplierId, onSupplierChange }) {
//   const suppliersOnly = contactsList.filter((c) => c.contactType === "Supplier");
//   const selectedSupplier = suppliersOnly.find((s) => s._id === supplierId);
//   const isSameState = selectedSupplier?.state === businessSettings.state;

//   const dueDate = new Date(date);
//   dueDate.setDate(dueDate.getDate() + Number(paymentTerms || 0));
//   const dueDateStr = dueDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

//   return (
//     <div className="bg-white border border-border rounded-xl p-4 sm:p-5 mb-4">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div>
//           <label className="text-xs font-medium text-ink-muted">Purchase Invoice No.</label>
//           <input
//             value={purchaseNo}
//             readOnly
//             className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm bg-paper tabular-num text-ink font-medium"
//           />
//         </div>

//         <div>
//           <label className="text-xs font-medium text-ink-muted">Original Invoice No.</label>
//           <input
//             value={originalInvoiceNo}
//             onChange={(e) => onOriginalInvoiceNoChange(e.target.value)}
//             placeholder="Supplier ka invoice number"
//             className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
//           />
//         </div>

//         <div>
//           <label className="text-xs font-medium text-ink-muted">Purchase Date</label>
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => onDateChange(e.target.value)}
//             className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
//           />
//         </div>

//         <div>
//           <label className="text-xs font-medium text-ink-muted">Payment Terms (Days)</label>
//           <input
//             type="number"
//             value={paymentTerms}
//             onChange={(e) => onPaymentTermsChange(e.target.value)}
//             className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
//           />
//           <p className="text-[11px] text-ink-muted mt-1">Due: <span className="tabular-num font-medium text-ink">{dueDateStr}</span></p>
//         </div>
//       </div>

//       <div className="mt-4">
//         <label className="text-xs font-medium text-ink-muted">Supplier</label>
//         <select
//           value={supplierId}
//           onChange={(e) => onSupplierChange(e.target.value)}
//           className="w-full sm:w-72 mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
//         >
//           <option value="">Select supplier</option>
//           {suppliersOnly.map((s) => (
//             <option key={s._id} value={s._id}>{s.name}</option>
//           ))}
//         </select>
//       </div>

//       {selectedSupplier && (
//         <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-x-6 gap-y-1 text-xs text-ink-muted">
//           <span>GSTIN: <span className="text-ink tabular-num">{selectedSupplier.gstin || "N/A"}</span></span>
//           <span>State: <span className="text-ink">{selectedSupplier.state || "N/A"}</span></span>
//           <span>Mobile: <span className="text-ink tabular-num">{selectedSupplier.mobile}</span></span>
//           <span className={`px-2 py-0.5 rounded-full font-medium ${isSameState ? "bg-brand-light text-brand" : "bg-status-pending/10 text-status-pending"}`}>
//             {isSameState ? "CGST + SGST applicable" : "IGST applicable"}
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }



import { contactsList, businessSettings, stateCodeMap } from "../../data/dummyData";

export default function PurchaseHeader({ purchaseNo, originalInvoiceNo, onOriginalInvoiceNoChange, date, onDateChange, paymentTerms, onPaymentTermsChange, supplierId, onSupplierChange }) {
  const suppliersOnly = contactsList.filter((c) => c.contactType === "Supplier");
  const selectedSupplier = suppliersOnly.find((s) => s._id === supplierId);
  const isSameState = selectedSupplier?.state === businessSettings.state;

  const dueDate = new Date(date);
  dueDate.setDate(dueDate.getDate() + Number(paymentTerms || 0));
  const dueDateStr = dueDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className="bg-white border border-border rounded-xl p-4 sm:p-5 mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="text-xs font-medium text-ink-muted">Purchase Invoice No.</label>
          <input
            value={purchaseNo}
            readOnly
            className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm bg-paper tabular-num text-ink font-medium"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-ink-muted">Original Invoice No.</label>
          <input
            value={originalInvoiceNo}
            onChange={(e) => onOriginalInvoiceNoChange(e.target.value)}
            placeholder="Supplier ka invoice number"
            className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-ink-muted">Purchase Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-ink-muted">Payment Terms (Days)</label>
          <input
            type="number"
            value={paymentTerms}
            onChange={(e) => onPaymentTermsChange(e.target.value)}
            className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
          />
          <p className="text-[11px] text-ink-muted mt-1">Due: <span className="tabular-num font-medium text-ink">{dueDateStr}</span></p>
        </div>
      </div>

      <div className="mt-4">
        <label className="text-xs font-medium text-ink-muted">Supplier</label>
        <select
          value={supplierId}
          onChange={(e) => onSupplierChange(e.target.value)}
          className="w-full sm:w-72 mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
        >
          <option value="">Select supplier</option>
          {suppliersOnly.map((s) => (
            <option key={s._id} value={s._id}>{s.name}</option>
          ))}
        </select>
      </div>

      {selectedSupplier && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">Bill From</p>
          <p className="text-sm font-medium text-ink">{selectedSupplier.name}</p>
          <p className="text-xs text-ink-muted mt-0.5">{selectedSupplier.billingAddress || "Address not set"}</p>
          <p className="text-xs text-ink-muted">
            {selectedSupplier.state || "N/A"}
            {selectedSupplier.state && <span className="tabular-num"> · State Code: {stateCodeMap[selectedSupplier.state]}</span>}
          </p>

          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-ink-muted">
            <span>GSTIN: <span className="text-ink tabular-num">{selectedSupplier.gstin || "N/A"}</span></span>
            <span>Mobile: <span className="text-ink tabular-num">{selectedSupplier.mobile}</span></span>
            <span className={`px-2 py-0.5 rounded-full font-medium ${isSameState ? "bg-brand-light text-brand" : "bg-status-pending/10 text-status-pending"}`}>
              {isSameState ? "CGST + SGST applicable" : "IGST applicable"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}