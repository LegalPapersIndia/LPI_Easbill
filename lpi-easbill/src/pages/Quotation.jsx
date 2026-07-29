import { useState, useMemo } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import InvoiceCompanyHeader from "../components/invoice/InvoiceCompanyHeader";
import QuotationHeader from "../components/invoice/QuotationHeader";
import InvoiceLineItems from "../components/invoice/InvoiceLineItems";
import InvoiceTotals from "../components/invoice/InvoiceTotals";
import QuotationFooter from "../components/invoice/QuotationFooter";
import { contactsList, businessSettings } from "../data/dummyData";
import { getFinancialYear } from "../utils/financialYear";

const newLine = () => ({ id: `line-${Date.now()}-${Math.random()}`, itemId: "", name: "", hsnCode: "", unit: "", qty: 1, rate: 0, gstPercent: 0 });

export default function Quotation() {
 const [quotationNo] = useState(`QUO/${getFinancialYear()}/${String(Math.floor(Math.random() * 900) + 100)}`);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [validDays, setValidDays] = useState(30);
  const [customerId, setCustomerId] = useState("");
  const [lines, setLines] = useState([newLine()]);
  const [notes, setNotes] = useState("");
  const [terms, setTerms] = useState(businessSettings.defaultTerms);

  const selectedCustomer = contactsList.find((c) => c._id === customerId);
  const isSameState = selectedCustomer?.state === businessSettings.state;

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
    if (!customerId) return alert("Pehle customer select karo");
    if (lines.every((l) => !l.itemId)) return alert("Kam se kam ek item add karo");

    const quotationPayload = {
      quotationNo, date, validDays, customerId, lines, subtotal, gstBreakup, grandTotal, notes, terms,
    };
    console.log("Quotation saved (dummy):", quotationPayload);
    alert("Quotation saved ho gaya! (Console mein dekho — abhi backend connect nahi hai)");
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">New Quotation</h1>
          <p className="text-sm text-ink-muted mt-1">Customer ko price estimate bhejo, invoice se pehle.</p>
        </div>
      </div>

      <InvoiceCompanyHeader />

      <QuotationHeader
        quotationNo={quotationNo}
        date={date}
        onDateChange={setDate}
        validDays={validDays}
        onValidDaysChange={setValidDays}
        customerId={customerId}
        onCustomerChange={setCustomerId}
      />

      <InvoiceLineItems
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

      <QuotationFooter
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
          Save Quotation
        </button>
      </div>
    </DashboardLayout>
  );
}