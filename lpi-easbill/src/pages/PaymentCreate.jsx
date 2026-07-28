import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import PaymentPartySearch from "../components/payments/PaymentPartySearch";
import PendingInvoicesChecklist from "../components/payments/PendingInvoicesChecklist";

export default function PaymentCreate() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get("type") || "in";

  const [paymentNo] = useState(`PMT-${type.toUpperCase()}-2026-${String(Math.floor(Math.random() * 900) + 100)}`);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [mode, setMode] = useState("Cash");
  const [party, setParty] = useState(null);
  const [amount, setAmount] = useState("");
  const [discount, setDiscount] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedInvoiceIds, setSelectedInvoiceIds] = useState([]);

  const contactType = type === "in" ? "Customer" : "Supplier";

  const handleToggleInvoice = (invId, dueAmount) => {
    setSelectedInvoiceIds((prev) => {
      const next = prev.includes(invId) ? prev.filter((id) => id !== invId) : [...prev, invId];
      return next;
    });
    // Auto-suggest amount = sum of selected dues (simple helper)
    setAmount((prev) => {
      const current = Number(prev) || 0;
      const isRemoving = selectedInvoiceIds.includes(invId);
      return isRemoving ? Math.max(0, current - dueAmount) : current + dueAmount;
    });
  };

  const handleSave = () => {
    if (!party) return alert("Pehle party select karo");
    if (!amount || Number(amount) <= 0) return alert("Amount enter karo");

    const payload = {
      paymentNo, type, date, mode, party, amount: Number(amount), discount: Number(discount) || 0,
      notes, selectedInvoiceIds,
    };
    console.log("Payment saved (dummy):", payload);
    alert(`Payment ${type === "in" ? "In" : "Out"} saved ho gaya! (Console mein dekho — abhi backend connect nahi hai)`);
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">
            Record Payment {type === "in" ? "In" : "Out"}
          </h1>
          <p className="text-sm text-ink-muted mt-1">
            {type === "in" ? "Customer se aaya paisa record karo." : "Supplier ko diya paisa record karo."}
          </p>
        </div>
        <button
          onClick={() => navigate("/payments")}
          className="text-sm bg-brand text-white font-medium px-5 py-2.5 rounded-lg hover:bg-brand-dark transition-colors"
        >
          ← Back to Payments
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Party + Invoices */}
        <div className="bg-white border border-border rounded-xl p-4 sm:p-5">
          <label className="text-xs font-medium text-ink-muted block mb-1.5">Party Name</label>
          <PaymentPartySearch contactType={contactType} selectedParty={party} onSelect={setParty} />

          {party && (
            <div className="mt-4">
              <PendingInvoicesChecklist
                party={party}
                type={type}
                selectedInvoiceIds={selectedInvoiceIds}
                onToggleInvoice={handleToggleInvoice}
              />
            </div>
          )}
        </div>

        {/* Right: Payment Details */}
        <div className="bg-white border border-border rounded-xl p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-ink-muted">Payment Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
            </div>
            <div>
              <label className="text-xs font-medium text-ink-muted">Payment Mode</label>
              <select value={mode} onChange={(e) => setMode(e.target.value)}
                className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand">
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cheque">Cheque</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-ink-muted">
              {type === "in" ? "Payment In Number" : "Payment Out Number"}
            </label>
            <input value={paymentNo} readOnly
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm bg-paper tabular-num text-ink font-medium" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-ink-muted">
                {type === "in" ? "Amount Received (₹)" : "Amount Paid (₹)"}
              </label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
                className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
            </div>
            <div>
              <label className="text-xs font-medium text-ink-muted">Discount (₹)</label>
              <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)}
                className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-ink-muted">Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
              rows={3} placeholder="Enter Notes"
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand resize-none" />
          </div>

          <button onClick={handleSave}
            className="w-full bg-brand text-white font-medium py-2.5 rounded-lg text-sm hover:bg-brand-dark transition-colors">
            Save Payment
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}