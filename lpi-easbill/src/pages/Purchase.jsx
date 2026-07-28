import { useState, useMemo } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import InvoiceCompanyHeader from "../components/invoice/InvoiceCompanyHeader";
import PurchaseHeader from "../components/purchase/PurchaseHeader";
import PurchaseLineItems from "../components/purchase/PurchaseLineItems";
import InvoiceTotals from "../components/invoice/InvoiceTotals";
import PurchaseFooter from "../components/purchase/PurchaseFooter";
import { contactsList, businessSettings } from "../data/dummyData";

const newLine = () => ({ id: `line-${Date.now()}-${Math.random()}`, itemId: "", name: "", hsnCode: "", unit: "", qty: 1, rate: 0, gstPercent: 0 });

export default function Purchase() {
  const [purchaseNo] = useState(`PUR-2026-${String(Math.floor(Math.random() * 900) + 100)}`);
  const [originalInvoiceNo, setOriginalInvoiceNo] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [paymentTerms, setPaymentTerms] = useState(15);
  const [supplierId, setSupplierId] = useState("");
  const [lines, setLines] = useState([newLine()]);
  const [amountPaid, setAmountPaid] = useState(0);
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [notes, setNotes] = useState("");
  const [terms, setTerms] = useState(businessSettings.defaultTerms);

  const selectedSupplier = contactsList.find((s) => s._id === supplierId);
  const isSameState = selectedSupplier?.state === businessSettings.state;

  const { subtotal, gstBreakup, grandTotal } = useMemo(() => {
    let sub = 0;
    let gst = 0;
    lines.forEach((line) => {
      const amount = (line.qty || 0) * (line.rate || 0);
      sub += amount;
      gst += (amount * (line.gstPercent || 0)) / 100;
    });
    return { subtotal: sub, gstBreakup: gst, grandTotal: sub + gst };
  }, [lines]);

  const handleAddLine = () => setLines((prev) => [...prev, newLine()]);
  const handleRemoveLine = (id) => setLines((prev) => prev.filter((l) => l.id !== id));
  const handleUpdateLine = (id, updates) =>
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)));

  const handleSave = () => {
    if (!supplierId) return alert("Pehle supplier select karo");
    if (lines.every((l) => !l.itemId)) return alert("Kam se kam ek item add karo");

    const purchasePayload = {
      purchaseNo, originalInvoiceNo, date, paymentTerms, supplierId, lines,
      subtotal, gstBreakup, grandTotal, amountPaid: Number(amountPaid), paymentMode, notes, terms,
      balanceAmount: grandTotal - Number(amountPaid),
    };
    console.log("Purchase saved (dummy):", purchasePayload);
    alert("Purchase entry saved ho gaya! (Console mein dekho — abhi backend connect nahi hai). Stock aage badhega jab backend connect hoga.");
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">New Purchase Invoice</h1>
          <p className="text-sm text-ink-muted mt-1">Supplier se aaya hua maal record karo.</p>
        </div>
      </div>

      <InvoiceCompanyHeader />

      <PurchaseHeader
        purchaseNo={purchaseNo}
        originalInvoiceNo={originalInvoiceNo}
        onOriginalInvoiceNoChange={setOriginalInvoiceNo}
        date={date}
        onDateChange={setDate}
        paymentTerms={paymentTerms}
        onPaymentTermsChange={setPaymentTerms}
        supplierId={supplierId}
        onSupplierChange={setSupplierId}
      />

      <PurchaseLineItems
        lines={lines}
        onAddLine={handleAddLine}
        onRemoveLine={handleRemoveLine}
        onUpdateLine={handleUpdateLine}
      />

      <InvoiceTotals
        subtotal={subtotal}
        gstBreakup={gstBreakup}
        isSameState={isSameState}
        grandTotal={grandTotal}
      />

      <PurchaseFooter
        grandTotal={grandTotal}
        amountPaid={amountPaid}
        onAmountPaidChange={setAmountPaid}
        paymentMode={paymentMode}
        onPaymentModeChange={setPaymentMode}
        notes={notes}
        onNotesChange={setNotes}
        terms={terms}
        onTermsChange={setTerms}
      />

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-brand text-white font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-brand-dark transition-colors"
        >
          Save Purchase Invoice
        </button>
      </div>
    </DashboardLayout>
  );
}