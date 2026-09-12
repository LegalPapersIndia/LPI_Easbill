
import { useBusiness } from "../../context/BusinessContext";
import SearchableSelect from "../common/SearchableSelect";

export default function PurchaseOrderHeader({ date, onDateChange, validTillDays, onValidTillDaysChange, supplierId, onSupplierChange, suppliers, onAddNewSupplier }) {
  const { businessSettings } = useBusiness();
  const selectedSupplier = suppliers.find((s) => s._id === supplierId);
  const isSameState = selectedSupplier?.state === businessSettings?.state;

  const validTillDate = new Date(date);
  validTillDate.setDate(validTillDate.getDate() + Number(validTillDays || 0));
  const validTillStr = validTillDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className="bg-white border border-border rounded-xl p-4 sm:p-5 mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
  <div className="mt-1 flex gap-2">
    <div className="flex-1">
      <SearchableSelect
        value={supplierId}
        onChange={onSupplierChange}
        placeholder="Select supplier"
        emptyText="No supplier found"
        options={suppliers.map((s) => ({
          value: s._id,
          label: s.name,
          subLabel: s.mobile || s.gstin || "",
        }))}
      />
    </div>
    <button
      type="button"
      onClick={onAddNewSupplier}
      className="shrink-0 border border-brand text-brand text-sm font-medium px-3 rounded-lg hover:bg-brand-light transition-colors"
    >
      + Add
    </button>
  </div>
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