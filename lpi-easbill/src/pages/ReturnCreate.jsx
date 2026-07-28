import { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import InvoiceCompanyHeader from "../components/invoice/InvoiceCompanyHeader";
import ReturnsToggle from "../components/returns/ReturnsToggle";
import LinkInvoiceSearch from "../components/returns/LinkInvoiceSearch";
import InvoiceLineItems from "../components/invoice/InvoiceLineItems";
import PurchaseLineItems from "../components/purchase/PurchaseLineItems";
import InvoiceTotals from "../components/invoice/InvoiceTotals";
import { salesInvoicesList, purchaseInvoicesList, businessSettings, contactsList } from "../data/dummyData";

const newLine = () => ({ id: `line-${Date.now()}-${Math.random()}`, itemId: "", name: "", hsnCode: "", qty: 1, rate: 0, gstPercent: 0 });

export default function ReturnCreate() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [type, setType] = useState(searchParams.get("type") || "sales");
  const [returnNo] = useState(`${type === "sales" ? "SR" : "PR"}-2026-${String(Math.floor(Math.random() * 900) + 100)}`);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [lines, setLines] = useState([newLine()]);
  const [refundAmount, setRefundAmount] = useState(0);
  const [paymentMode, setPaymentMode] = useState("Cash");

  const invoicesPool = type === "sales" ? salesInvoicesList : purchaseInvoicesList;
  const party = selectedInvoice
    ? contactsList.find((c) => c.name === (type === "sales" ? selectedInvoice.customerName : selectedInvoice.supplierName))
    : null;
  const isSameState = party?.state === businessSettings.state;

  const { subtotal, gstBreakup, grandTotal } = useMemo(() => {
    let sub = 0, gst = 0;
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
    if (!selectedInvoice) return alert(`Pehle ${type === "sales" ? "sales invoice" : "purchase invoice"} link karo`);
    if (lines.every((l) => !l.itemId)) return alert("Kam se kam ek item add karo");

    const payload = { returnNo, type, date, linkedInvoice: selectedInvoice, lines, subtotal, gstBreakup, grandTotal, refundAmount, paymentMode };
    console.log("Return saved (dummy):", payload);
    alert(`${type === "sales" ? "Sales" : "Purchase"} Return saved ho gaya! (Console mein dekho — abhi backend connect nahi hai)`);
  };

  const LineItemsComponent = type === "sales" ? InvoiceLineItems : PurchaseLineItems;

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">New Return</h1>
          <p className="text-sm text-ink-muted mt-1">Kisi existing invoice ka return record karo.</p>
        </div>
        <button
          onClick={() => navigate("/returns")}
          className="text-sm mb-2 bg-brand text-white font-medium px-5 py-2.5 rounded-lg hover:bg-brand-dark transition-colors"
        >
          ← Back to Returns
        </button>
      </div>

      <InvoiceCompanyHeader />

      <ReturnsToggle type={type} onTypeChange={(t) => { setType(t); setSelectedInvoice(null); }} />

      <div className="bg-white border border-border rounded-xl p-4 sm:p-5 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs font-medium text-ink-muted">Return No.</label>
            <input value={returnNo} readOnly className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm bg-paper tabular-num text-ink font-medium" />
          </div>
          <div>
            <label className="text-xs font-medium text-ink-muted">Return Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
          </div>
        </div>

        <label className="text-xs font-medium text-ink-muted">
          Link to {type === "sales" ? "Sales Invoice" : "Purchase Invoice"}
        </label>
        <div className="mt-1">
          <LinkInvoiceSearch
            invoices={invoicesPool}
            selectedInvoice={selectedInvoice}
            onSelect={setSelectedInvoice}
            type={type}
          />
        </div>

        {party && (
          <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-x-6 gap-y-1 text-xs text-ink-muted">
            <span>Party: <span className="text-ink font-medium">{party.name}</span></span>
            <span>GSTIN: <span className="text-ink tabular-num">{party.gstin || "N/A"}</span></span>
            <span className={`px-2 py-0.5 rounded-full font-medium ${isSameState ? "bg-brand-light text-brand" : "bg-status-pending/10 text-status-pending"}`}>
              {isSameState ? "CGST + SGST applicable" : "IGST applicable"}
            </span>
          </div>
        )}
      </div>

      <LineItemsComponent
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

      <div className="bg-white border border-border rounded-xl p-4 sm:p-5 mb-4">
        <p className="font-display font-semibold text-ink mb-4">
          Refund {type === "sales" ? "(Amount Paid to Customer)" : "(Amount Received from Supplier)"}
        </p>
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <div>
            <label className="text-xs font-medium text-ink-muted">Refund Amount (₹)</label>
            <input type="number" value={refundAmount} onChange={(e) => setRefundAmount(e.target.value)}
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
          </div>
          <div>
            <label className="text-xs font-medium text-ink-muted">Payment Mode</label>
            <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand">
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="bg-brand text-white font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-brand-dark transition-colors">
          Save Return
        </button>
      </div>
    </DashboardLayout>
  );
}