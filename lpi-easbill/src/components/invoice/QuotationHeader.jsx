// import { contactsList, businessSettings } from "../../data/dummyData";

// export default function QuotationHeader({ quotationNo, date, onDateChange, validDays, onValidDaysChange, customerId, onCustomerChange }) {
//   const customersOnly = contactsList.filter((c) => c.contactType === "Customer");
//   const selectedCustomer = customersOnly.find((c) => c._id === customerId);
//   const isSameState = selectedCustomer?.state === businessSettings.state;

//   const validityDate = new Date(date);
//   validityDate.setDate(validityDate.getDate() + Number(validDays || 0));
//   const validityDateStr = validityDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

//   return (
//     <div className="bg-white border border-border rounded-xl p-4 sm:p-5 mb-4">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div>
//           <label className="text-xs font-medium text-ink-muted">Quotation No.</label>
//           <input
//             value={quotationNo}
//             readOnly
//             className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm bg-paper tabular-num text-ink font-medium"
//           />
//         </div>

//         <div>
//           <label className="text-xs font-medium text-ink-muted">Quotation Date</label>
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => onDateChange(e.target.value)}
//             className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
//           />
//         </div>

//         <div>
//           <label className="text-xs font-medium text-ink-muted">Valid For (Days)</label>
//           <input
//             type="number"
//             value={validDays}
//             onChange={(e) => onValidDaysChange(e.target.value)}
//             className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
//           />
//           <p className="text-[11px] text-ink-muted mt-1">Valid till: <span className="tabular-num font-medium text-ink">{validityDateStr}</span></p>
//         </div>

//         <div>
//           <label className="text-xs font-medium text-ink-muted">Customer</label>
//           <select
//             value={customerId}
//             onChange={(e) => onCustomerChange(e.target.value)}
//             className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
//           >
//             <option value="">Select customer</option>
//             {customersOnly.map((c) => (
//               <option key={c._id} value={c._id}>{c.name}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {selectedCustomer && (
//         <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-x-6 gap-y-1 text-xs text-ink-muted">
//           <span>GSTIN: <span className="text-ink tabular-num">{selectedCustomer.gstin || "N/A"}</span></span>
//           <span>State: <span className="text-ink">{selectedCustomer.state || "N/A"}</span></span>
//           <span>Mobile: <span className="text-ink tabular-num">{selectedCustomer.mobile}</span></span>
//           <span className={`px-2 py-0.5 rounded-full font-medium ${isSameState ? "bg-brand-light text-brand" : "bg-status-pending/10 text-status-pending"}`}>
//             {isSameState ? "CGST + SGST applicable" : "IGST applicable"}
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }




import { useBusiness } from "../../context/BusinessContext";

export default function QuotationHeader({ date, onDateChange, validDays, onValidDaysChange, customerId, onCustomerChange, customers }) {
  const { businessSettings } = useBusiness();
  const selectedCustomer = customers.find((c) => c._id === customerId);
  const isSameState = selectedCustomer?.state === businessSettings?.state;

  const validityDate = new Date(date);
  validityDate.setDate(validityDate.getDate() + Number(validDays || 0));
  const validityDateStr = validityDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className="bg-white border border-border rounded-xl p-4 sm:p-5 mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-medium text-ink-muted">Quotation Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-ink-muted">Valid For (Days)</label>
          <input
            type="number"
            value={validDays}
            onChange={(e) => onValidDaysChange(e.target.value)}
            className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
          />
          <p className="text-[11px] text-ink-muted mt-1">Valid till: <span className="tabular-num font-medium text-ink">{validityDateStr}</span></p>
        </div>

        <div>
          <label className="text-xs font-medium text-ink-muted">Customer</label>
          <select
            value={customerId}
            onChange={(e) => onCustomerChange(e.target.value)}
            className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
          >
            <option value="">Select customer</option>
            {customers.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {selectedCustomer && (
        <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-x-6 gap-y-1 text-xs text-ink-muted">
          <span>GSTIN: <span className="text-ink tabular-num">{selectedCustomer.gstin || "N/A"}</span></span>
          <span>State: <span className="text-ink">{selectedCustomer.state || "N/A"}</span></span>
          <span>Mobile: <span className="text-ink tabular-num">{selectedCustomer.mobile}</span></span>
          <span className={`px-2 py-0.5 rounded-full font-medium ${isSameState ? "bg-brand-light text-brand" : "bg-status-pending/10 text-status-pending"}`}>
            {isSameState ? "CGST + SGST applicable" : "IGST applicable"}
          </span>
        </div>
      )}
    </div>
  );
}