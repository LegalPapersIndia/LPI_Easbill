import { salesInvoicesList, purchaseInvoicesList } from "../../data/dummyData";

export default function PendingInvoicesChecklist({ party, type, selectedInvoiceIds, onToggleInvoice }) {
  if (!party) return null;

  const pool = type === "in" ? salesInvoicesList : purchaseInvoicesList;
  const partyField = type === "in" ? "customerName" : "supplierName";
  const numberField = type === "in" ? "invoiceNo" : "purchaseNo";
  const paidField = type === "in" ? "amountReceived" : "amountPaid";

  const pendingInvoices = pool.filter(
    (inv) => inv[partyField] === party.name && inv[paidField] < inv.grandTotal
  );

  if (pendingInvoices.length === 0) {
    return (
      <div className="bg-paper border border-border rounded-lg p-4 text-center text-sm text-ink-muted">
        Is party ki koi pending invoice nahi hai.
      </div>
    );
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="bg-paper px-4 py-2 text-xs font-medium text-ink-muted border-b border-border">
        Pending Invoices — Select karo jinke against payment aaya/gaya
      </div>
      {pendingInvoices.map((inv) => {
        const due = inv.grandTotal - inv[paidField];
        const checked = selectedInvoiceIds.includes(inv._id);
        return (
          <label
            key={inv._id}
            className="flex items-center justify-between px-4 py-3 border-b border-border last:border-0 cursor-pointer hover:bg-paper/60"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggleInvoice(inv._id, due)}
                className="accent-brand w-4 h-4"
              />
              <div>
                <p className="text-sm font-medium text-ink tabular-num">{inv[numberField]}</p>
                <p className="text-xs text-ink-muted">{new Date(inv.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-ink-muted">Due</p>
              <p className="tabular-num text-sm font-semibold text-status-overdue">₹{due.toLocaleString("en-IN")}</p>
            </div>
          </label>
        );
      })}
    </div>
  );
}