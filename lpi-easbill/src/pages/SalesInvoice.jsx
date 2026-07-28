

// import { useState, useMemo } from "react";
// import DashboardLayout from "../components/layout/DashboardLayout";
// import InvoiceCompanyHeader from "../components/invoice/InvoiceCompanyHeader";
// import InvoiceHeader from "../components/invoice/InvoiceHeader";
// import InvoiceLineItems from "../components/invoice/InvoiceLineItems";
// import InvoiceTotals from "../components/invoice/InvoiceTotals";
// import InvoiceFooter from "../components/invoice/InvoiceFooter";
// import { contactsList, businessSettings } from "../data/dummyData";
// import { useNavigate } from "react-router-dom";

// const newLine = () => ({ id: `line-${Date.now()}-${Math.random()}`, itemId: "", name: "", hsnCode: "", qty: 1, rate: 0, gstPercent: 0 });

// export default function SalesInvoice() {
//   const [invoiceNo] = useState(`${businessSettings.invoicePrefix}${String(Math.floor(Math.random() * 900) + 100)}`);
//   const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
//   const [paymentTerms, setPaymentTerms] = useState(30);
//   const [customerId, setCustomerId] = useState("");
//   const [lines, setLines] = useState([newLine()]);
//   const [amountReceived, setAmountReceived] = useState(0);
//   const [paymentMode, setPaymentMode] = useState("Cash");
//   const [notes, setNotes] = useState("");
//   const [terms, setTerms] = useState(businessSettings.defaultTerms);
// const navigate = useNavigate();
//   const selectedCustomer = contactsList.find((c) => c._id === customerId);
//   const isSameState = selectedCustomer?.state === businessSettings.state;

//   const { subtotal, gstBreakup, grandTotal } = useMemo(() => {
//     let sub = 0;
//     let gst = 0;
//     lines.forEach((line) => {
//       const amount = (line.qty || 0) * (line.rate || 0);
//       sub += amount;
//       gst += (amount * (line.gstPercent || 0)) / 100;
//     });
//     return { subtotal: sub, gstBreakup: gst, grandTotal: sub + gst };
//   }, [lines]);

//   const handleAddLine = () => setLines((prev) => [...prev, newLine()]);
//   const handleRemoveLine = (id) => setLines((prev) => prev.filter((l) => l.id !== id));
//   const handleUpdateLine = (id, updates) =>
//     setLines((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)));

//   const handleSave = (status) => {
//     if (!customerId) return alert("Pehle customer select karo");
//     if (lines.every((l) => !l.itemId)) return alert("Kam se kam ek item add karo");

//     const invoicePayload = {
//       invoiceNo, date, paymentTerms, customerId, lines, subtotal, gstBreakup, grandTotal,
//       amountReceived: Number(amountReceived), paymentMode, notes, terms,
//       balanceAmount: grandTotal - Number(amountReceived), status,
//     };
//     console.log("Invoice saved (dummy):", invoicePayload);
//     alert(`Invoice ${status === "draft" ? "draft mein" : "saved"} ho gaya! (Console mein dekho — abhi backend connect nahi hai)`);
//   };

//   return (
//     <DashboardLayout>
//       <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//         <div>
//           <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">New Sales Invoice</h1>
//           <p className="text-sm text-ink-muted mt-1">Contact aur items select karke invoice banao.</p>
//         </div>
//         <button onClick={() => navigate("/sales-invoice")} className="text-sm text-brand  mb-2 bg-brand text-white font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-brand-dark transition-colors">← Back to Invoices</button>
//       </div>

//       <InvoiceCompanyHeader />

//       <InvoiceHeader
//         invoiceNo={invoiceNo}
//         date={date}
//         onDateChange={setDate}
//         paymentTerms={paymentTerms}
//         onPaymentTermsChange={setPaymentTerms}
//         customerId={customerId}
//         onCustomerChange={setCustomerId}
//       />

//       <InvoiceLineItems
//         lines={lines}
//         onAddLine={handleAddLine}
//         onRemoveLine={handleRemoveLine}
//         onUpdateLine={handleUpdateLine}
//       />

//       <InvoiceTotals
//         subtotal={subtotal}
//         gstBreakup={gstBreakup}
//         isSameState={isSameState}
//         grandTotal={grandTotal}
//       />

//       <InvoiceFooter
//         grandTotal={grandTotal}
//         amountReceived={amountReceived}
//         onAmountReceivedChange={setAmountReceived}
//         paymentMode={paymentMode}
//         onPaymentModeChange={setPaymentMode}
//         notes={notes}
//         onNotesChange={setNotes}
//         terms={terms}
//         onTermsChange={setTerms}
//       />

//       <div className="flex flex-col sm:flex-row gap-3 justify-end">
//         <button
//           onClick={() => handleSave("draft")}
//           className="border border-border text-ink-muted font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-paper transition-colors"
//         >
//           Save as Draft
//         </button>
//         <button
//           onClick={() => handleSave("paid")}
//           className="bg-brand text-white font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-brand-dark transition-colors"
//         >
//           Save Invoice
//         </button>
//       </div>
//     </DashboardLayout>
//   );
// }



import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import InvoiceCompanyHeader from "../components/invoice/InvoiceCompanyHeader";
import InvoiceHeader from "../components/invoice/InvoiceHeader";
import InvoiceLineItems from "../components/invoice/InvoiceLineItems";
import InvoiceTotals from "../components/invoice/InvoiceTotals";
import InvoiceFooter from "../components/invoice/InvoiceFooter";
import { contactsList, businessSettings } from "../data/dummyData";

const newLine = () => ({ id: `line-${Date.now()}-${Math.random()}`, itemId: "", name: "", hsnCode: "", unit: "", qty: 1, rate: 0, gstPercent: 0 });

export default function SalesInvoice() {
  const navigate = useNavigate();
  const [invoiceNo] = useState(`${businessSettings.invoicePrefix}${String(Math.floor(Math.random() * 900) + 100)}`);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [paymentTerms, setPaymentTerms] = useState(30);
  const [customerId, setCustomerId] = useState("");
  const [lines, setLines] = useState([newLine()]);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [amountReceived, setAmountReceived] = useState(0);
  const [paymentMode, setPaymentMode] = useState("Cash");
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

    const discountAmt = Number(discount || 0);
    const gross = sub - discountAmt;
    // Discount ke hisaab se GST ko proportionally adjust karo
    const scale = sub > 0 ? gross / sub : 1;
    const adjustedGst = gst * scale;
    const total = gross + adjustedGst + Number(shipping || 0);

    return { subtotal: sub, gstBreakup: adjustedGst, grandTotal: total };
  }, [lines, discount, shipping]);

  const handleAddLine = () => setLines((prev) => [...prev, newLine()]);
  const handleRemoveLine = (id) => setLines((prev) => prev.filter((l) => l.id !== id));
  const handleUpdateLine = (id, updates) =>
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)));

  const handleSave = (status) => {
    if (!customerId) return alert("Pehle customer select karo");
    if (lines.every((l) => !l.itemId)) return alert("Kam se kam ek item add karo");

    const invoicePayload = {
      invoiceNo, date, paymentTerms, customerId, lines, subtotal, discount, shipping, gstBreakup, grandTotal,
      amountReceived: Number(amountReceived), paymentMode, notes, terms,
      balanceAmount: grandTotal - Number(amountReceived), status,
    };
    console.log("Invoice saved (dummy):", invoicePayload);
    alert(`Invoice ${status === "draft" ? "draft mein" : "saved"} ho gaya! (Console mein dekho — abhi backend connect nahi hai)`);
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">New Sales Invoice</h1>
          <p className="text-sm text-ink-muted mt-1">Contact aur items select karke invoice banao.</p>
        </div>
        <button
          onClick={() => navigate("/sales-invoice")}
          className="text-sm mb-2 bg-brand text-white font-medium px-5 py-2.5 rounded-lg hover:bg-brand-dark transition-colors"
        >
          ← Back to Invoices
        </button>
      </div>

      <InvoiceCompanyHeader />

      <InvoiceHeader
        invoiceNo={invoiceNo}
        date={date}
        onDateChange={setDate}
        paymentTerms={paymentTerms}
        onPaymentTermsChange={setPaymentTerms}
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
        discount={discount}
        onDiscountChange={setDiscount}
        shipping={shipping}
        onShippingChange={setShipping}
        gstBreakup={gstBreakup}
        isSameState={isSameState}
        grandTotal={grandTotal}
      />

      <InvoiceFooter
        grandTotal={grandTotal}
        amountReceived={amountReceived}
        onAmountReceivedChange={setAmountReceived}
        paymentMode={paymentMode}
        onPaymentModeChange={setPaymentMode}
        notes={notes}
        onNotesChange={setNotes}
        terms={terms}
        onTermsChange={setTerms}
      />

      <div className="flex flex-col sm:flex-row gap-3 justify-end">
        <button
          onClick={() => handleSave("draft")}
          className="border border-border text-ink-muted font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-paper transition-colors"
        >
          Save as Draft
        </button>
        <button
          onClick={() => handleSave("paid")}
          className="bg-brand text-white font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-brand-dark transition-colors"
        >
          Save Invoice
        </button>
      </div>
    </DashboardLayout>
  );
}