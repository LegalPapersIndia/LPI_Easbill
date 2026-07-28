import { contactsList, businessSettings } from "../../data/dummyData";

export default function PurchaseOrderHeader({ poNo, date, onDateChange, validTillDays, onValidTillDaysChange, supplierId, onSupplierChange }) {
  const suppliersOnly = contactsList.filter((c) => c.contactType === "Supplier");
  const selectedSupplier = suppliersOnly.find((s) => s._id === supplierId);
  const isSameState = selectedSupplier?.state === businessSettings.state;

  const validTillDate = new Date(date);
  validTillDate.setDate(validTillDate.getDate() + Number(validTillDays || 0));
  const validTillStr = validTillDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className="bg-white border border-border rounded-xl p-4 sm:p-5 mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="text-xs font-medium text-ink-muted">PO Number</label>
          <input
            value={poNo}
            readOnly
            className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm bg-paper tabular-num text-ink font-medium"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-ink-muted">PO Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-ink-muted">Valid Till (Days)</label>
          <input
            type="number"
            value={validTillDays}
            onChange={(e) => onValidTillDaysChange(e.target.value)}
            className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
          />
          <p className="text-[11px] text-ink-muted mt-1">Valid till: <span className="tabular-num font-medium text-ink">{validTillStr}</span></p>
        </div>

        <div>
          <label className="text-xs font-medium text-ink-muted">Supplier</label>
          <select
            value={supplierId}
            onChange={(e) => onSupplierChange(e.target.value)}
            className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
          >
            <option value="">Select supplier</option>
            {suppliersOnly.map((s) => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      {selectedSupplier && (
        <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-x-6 gap-y-1 text-xs text-ink-muted">
          <span>GSTIN: <span className="text-ink tabular-num">{selectedSupplier.gstin || "N/A"}</span></span>
          <span>State: <span className="text-ink">{selectedSupplier.state || "N/A"}</span></span>
          <span>Mobile: <span className="text-ink tabular-num">{selectedSupplier.mobile}</span></span>
          <span className={`px-2 py-0.5 rounded-full font-medium ${isSameState ? "bg-brand-light text-brand" : "bg-status-pending/10 text-status-pending"}`}>
            {isSameState ? "CGST + SGST applicable" : "IGST applicable"}
          </span>
        </div>
      )}
    </div>
  );
}