import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { contactCategories, indianStates, stateCodeMap } from "../../data/dummyData";

const emptyForm = {
  name: "", mobile: "", email: "", openingBalance: 0, balanceType: "collect",
  gstin: "", pan: "", contactType: "Customer", category: "",
  billingAddress: "", shippingAddress: "", sameAsBilling: true, state: "",
  creditPeriod: 30, creditLimit: 0, contactPersonName: "", dob: "",
  bankAccountHolder: "", bankName: "", bankAccountNumber: "", bankIfsc: "",
};

export default function ContactFormModal({ open, onClose, onSave, editingContact }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setForm(editingContact ? { ...editingContact } : emptyForm);
  }, [editingContact, open]);

  if (!open) return null;

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      _id: editingContact?._id || `cn${Date.now()}`,
      openingBalance: Number(form.openingBalance),
      creditPeriod: Number(form.creditPeriod),
      creditLimit: Number(form.creditLimit),
      shippingAddress: form.sameAsBilling ? form.billingAddress : form.shippingAddress,
      stateCode: stateCodeMap[form.state] || "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-ink/40 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-2xl sm:rounded-xl rounded-t-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border sticky top-0 bg-white">
          <h2 className="font-display font-semibold text-ink">
            {editingContact ? "Edit Contact" : "Add New Contact"}
          </h2>
          <button onClick={onClose} className="text-ink-muted hover:text-ink">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* General Details */}
          <div>
            <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">General Details</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-ink-muted">Name *</label>
                <input required value={form.name} onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand" />
              </div>
              <div>
                <label className="text-xs font-medium text-ink-muted">Mobile Number</label>
                <input value={form.mobile} onChange={(e) => handleChange("mobile", e.target.value)}
                  className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
              </div>
              <div>
                <label className="text-xs font-medium text-ink-muted">Contact Type *</label>
                <select required value={form.contactType} onChange={(e) => handleChange("contactType", e.target.value)}
                  className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand">
                  <option value="Customer">Customer</option>
                  <option value="Supplier">Supplier</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-ink-muted">Category</label>
                <select value={form.category} onChange={(e) => handleChange("category", e.target.value)}
                  className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand">
                  <option value="">Select</option>
                  {contactCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-ink-muted">GSTIN</label>
                <input value={form.gstin} onChange={(e) => handleChange("gstin", e.target.value)}
                  placeholder="ex: 29XXXXX9438X1XX"
                  className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
              </div>
              <div>
                <label className="text-xs font-medium text-ink-muted">PAN Number</label>
                <input value={form.pan} onChange={(e) => handleChange("pan", e.target.value)}
                  className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
              </div>
              <div>
                <label className="text-xs font-medium text-ink-muted">Opening Balance (₹)</label>
                <input type="number" value={form.openingBalance} onChange={(e) => handleChange("openingBalance", e.target.value)}
                  className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
              </div>
              <div>
                <label className="text-xs font-medium text-ink-muted">Balance Type</label>
                <select value={form.balanceType} onChange={(e) => handleChange("balanceType", e.target.value)}
                  className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand">
                  <option value="collect">To Collect</option>
                  <option value="pay">To Pay</option>
                </select>
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">Address</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-ink-muted">Billing Address</label>
                <textarea value={form.billingAddress} onChange={(e) => handleChange("billingAddress", e.target.value)}
                  rows={2} className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand resize-none" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-ink-muted">Shipping Address</label>
                  <label className="flex items-center gap-1.5 text-xs text-ink-muted cursor-pointer">
                    <input type="checkbox" checked={form.sameAsBilling}
                      onChange={(e) => handleChange("sameAsBilling", e.target.checked)}
                      className="accent-brand" />
                    Same as billing
                  </label>
                </div>
                <textarea
                  value={form.sameAsBilling ? form.billingAddress : form.shippingAddress}
                  onChange={(e) => handleChange("shippingAddress", e.target.value)}
                  disabled={form.sameAsBilling}
                  rows={2}
                  className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand resize-none disabled:bg-paper disabled:text-ink-muted" />
              </div>
             <div>
            <label className="text-xs font-medium text-ink-muted">State</label>
            <select
              value={form.state}
              onChange={(e) => handleChange("state", e.target.value)}
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
            >
              {indianStates.map((s) => (
                <option key={s} value={s}>
                  {stateCodeMap[s]} - {s}
                </option>
              ))}
            </select>
            {form.state && (
              <p className="text-[11px] text-ink-muted mt-1">
                State Code:{" "}
                <span className="tabular-num font-medium text-ink">
                  {stateCodeMap[form.state]}
                </span>
              </p>
            )}
          </div>
            </div>
          </div>

          {/* Credit Terms */}
          <div>
            <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">Credit Terms</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-ink-muted">Credit Period (Days)</label>
                <input type="number" value={form.creditPeriod} onChange={(e) => handleChange("creditPeriod", e.target.value)}
                  className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
              </div>
              <div>
                <label className="text-xs font-medium text-ink-muted">Credit Limit (₹)</label>
                <input type="number" value={form.creditLimit} onChange={(e) => handleChange("creditLimit", e.target.value)}
                  className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
              </div>
            </div>
          </div>

          {/* Contact Person */}
          <div>
            <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">Contact Person</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-ink-muted">Contact Person Name</label>
                <input value={form.contactPersonName} onChange={(e) => handleChange("contactPersonName", e.target.value)}
                  placeholder="ex: Ankit Mishra"
                  className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand" />
              </div>
              <div>
                <label className="text-xs font-medium text-ink-muted">Date of Birth</label>
                <input type="date" value={form.dob} onChange={(e) => handleChange("dob", e.target.value)}
                  className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
              </div>
            </div>
          </div>

          {/* Bank Account (Optional) */}
          <div>
            <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">Bank Account (Optional)</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-ink-muted">Account Holder Name</label>
                <input value={form.bankAccountHolder} onChange={(e) => handleChange("bankAccountHolder", e.target.value)}
                  className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand" />
              </div>
              <div>
                <label className="text-xs font-medium text-ink-muted">Bank Name</label>
                <input value={form.bankName} onChange={(e) => handleChange("bankName", e.target.value)}
                  className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand" />
              </div>
              <div>
                <label className="text-xs font-medium text-ink-muted">Account Number</label>
                <input value={form.bankAccountNumber} onChange={(e) => handleChange("bankAccountNumber", e.target.value)}
                  className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
              </div>
              <div>
                <label className="text-xs font-medium text-ink-muted">IFSC Code</label>
                <input value={form.bankIfsc} onChange={(e) => handleChange("bankIfsc", e.target.value)}
                  className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2 pb-1 sticky bottom-0 bg-white">
            <button type="button" onClick={onClose}
              className="flex-1 border border-border text-ink-muted font-medium py-2.5 rounded-lg text-sm hover:bg-paper transition-colors">
              Cancel
            </button>
            <button type="submit"
              className="flex-1 bg-brand text-white font-medium py-2.5 rounded-lg text-sm hover:bg-brand-dark transition-colors">
              {editingContact ? "Save Changes" : "Add Contact"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}