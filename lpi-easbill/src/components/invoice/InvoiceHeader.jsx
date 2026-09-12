import { businessSettings, stateCodeMap } from "../../data/dummyData";
import SearchableSelect from "../common/SearchableSelect";

// export default function InvoiceHeader({ date, onDateChange, paymentTerms, onPaymentTermsChange, customerId, onCustomerChange, customers }) {
export default function InvoiceHeader({
  date,
  onDateChange,
  paymentTerms,
  onPaymentTermsChange,
  customerId,
  onCustomerChange,
  customers,
  onAddNewCustomer,
}) {
  const selectedCustomer = customers.find((c) => c._id === customerId);
  const isSameState = selectedCustomer?.state === businessSettings.state;

  const dueDate = new Date(date);
  dueDate.setDate(dueDate.getDate() + Number(paymentTerms || 0));
  const dueDateStr = dueDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-white border border-border rounded-xl p-4 sm:p-5 mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-medium text-ink-muted">
            Invoice Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-ink-muted">
            Payment Terms (Days)
          </label>
          <input
            type="number"
            value={paymentTerms}
            onChange={(e) => onPaymentTermsChange(e.target.value)}
            className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
          />
          <p className="text-[11px] text-ink-muted mt-1">
            Due:{" "}
            <span className="tabular-num font-medium text-ink">
              {dueDateStr}
            </span>
          </p>
        </div>

        {/* <div>
          <label className="text-xs font-medium text-ink-muted">Customer</label>
          <div className="mt-1">
            <SearchableSelect
              value={customerId}
              onChange={onCustomerChange}
              placeholder="Select customer"
              emptyText="No customer found"
              options={customers.map((c) => ({
                value: c._id,
                label: c.name,
                subLabel: c.mobile || c.gstin || "",
              }))}
            />
          </div>
        </div> */}

        <div>
          <label className="text-xs font-medium text-ink-muted">Customer</label>
          <div className="mt-1 flex gap-2">
            <div className="flex-1">
              <SearchableSelect
                value={customerId}
                onChange={onCustomerChange}
                placeholder="Select customer"
                emptyText="No customer found"
                options={customers.map((c) => ({
                  value: c._id,
                  label: c.name,
                  subLabel: c.mobile || c.gstin || "",
                }))}
              />
            </div>
            <button
              type="button"
              onClick={onAddNewCustomer}
              className="shrink-0 border border-brand text-brand text-sm font-medium px-3 rounded-lg hover:bg-brand-light transition-colors"
            >
              + Add
            </button>
          </div>
        </div>
      </div>

      {selectedCustomer && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
            <div>
              <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">
                Bill To
              </p>
              <p className="text-sm font-medium text-ink">
                {selectedCustomer.name}
              </p>
              <p className="text-xs text-ink-muted mt-0.5">
                {selectedCustomer.billingAddress || "Address not set"}
              </p>
              <p className="text-xs text-ink-muted">
                {selectedCustomer.state || "N/A"}
                {selectedCustomer.state && (
                  <span className="tabular-num">
                    {" "}
                    · State Code: {stateCodeMap[selectedCustomer.state]}
                  </span>
                )}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">
                Ship To
              </p>
              <p className="text-sm font-medium text-ink">
                {selectedCustomer.name}
              </p>
              <p className="text-xs text-ink-muted mt-0.5">
                {selectedCustomer.sameAsBilling
                  ? selectedCustomer.billingAddress
                  : selectedCustomer.shippingAddress || "Address not set"}
              </p>
              <p className="text-xs text-ink-muted">
                {selectedCustomer.state || "N/A"}
                {selectedCustomer.state && (
                  <span className="tabular-num">
                    {" "}
                    · State Code: {stateCodeMap[selectedCustomer.state]}
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-x-6 gap-y-1 text-xs text-ink-muted">
            <span>
              GSTIN:{" "}
              <span className="text-ink tabular-num">
                {selectedCustomer.gstin || "N/A"}
              </span>
            </span>
            <span>
              Mobile:{" "}
              <span className="text-ink tabular-num">
                {selectedCustomer.mobile}
              </span>
            </span>
            <span
              className={`px-2 py-0.5 rounded-full font-medium ${isSameState ? "bg-brand-light text-brand" : "bg-status-pending/10 text-status-pending"}`}
            >
              {isSameState ? "CGST + SGST applicable" : "IGST applicable"}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
