// import { useState, useMemo } from "react";
// import DashboardLayout from "../components/layout/DashboardLayout";
// import InvoiceCompanyHeader from "../components/invoice/InvoiceCompanyHeader";
// import QuotationHeader from "../components/invoice/QuotationHeader";
// import InvoiceLineItems from "../components/invoice/InvoiceLineItems";
// import InvoiceTotals from "../components/invoice/InvoiceTotals";
// import QuotationFooter from "../components/invoice/QuotationFooter";
// import { contactsList, businessSettings } from "../data/dummyData";
// import { getFinancialYear } from "../utils/financialYear";

// const newLine = () => ({ id: `line-${Date.now()}-${Math.random()}`, itemId: "", name: "", hsnCode: "", unit: "", qty: 1, rate: 0, gstPercent: 0 });

// export default function Quotation() {
//  const [quotationNo] = useState(`QUO/${getFinancialYear()}/${String(Math.floor(Math.random() * 900) + 100)}`);
//   const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
//   const [validDays, setValidDays] = useState(30);
//   const [customerId, setCustomerId] = useState("");
//   const [lines, setLines] = useState([newLine()]);
//   const [notes, setNotes] = useState("");
//   const [terms, setTerms] = useState(businessSettings.defaultTerms);

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

//   const handleSave = () => {
//     if (!customerId) return alert("Pehle customer select karo");
//     if (lines.every((l) => !l.itemId)) return alert("Kam se kam ek item add karo");

//     const quotationPayload = {
//       quotationNo, date, validDays, customerId, lines, subtotal, gstBreakup, grandTotal, notes, terms,
//     };
//     console.log("Quotation saved (dummy):", quotationPayload);
//     alert("Quotation saved ho gaya! (Console mein dekho — abhi backend connect nahi hai)");
//   };

//   return (
//     <DashboardLayout>
//       <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//         <div>
//           <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">New Quotation</h1>
//           <p className="text-sm text-ink-muted mt-1">Customer ko price estimate bhejo, invoice se pehle.</p>
//         </div>
//       </div>

//       <InvoiceCompanyHeader />

//       <QuotationHeader
//         quotationNo={quotationNo}
//         date={date}
//         onDateChange={setDate}
//         validDays={validDays}
//         onValidDaysChange={setValidDays}
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

//       <QuotationFooter
//         notes={notes}
//         onNotesChange={setNotes}
//         terms={terms}
//         onTermsChange={setTerms}
//       />

//       <div className="flex justify-end">
//         <button
//           onClick={handleSave}
//           className="bg-brand text-white font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-brand-dark transition-colors"
//         >
//           Save Quotation
//         </button>
//       </div>
//     </DashboardLayout>
//   );
// }




import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import InvoiceCompanyHeader from "../components/invoice/InvoiceCompanyHeader";
import QuotationHeader from "../components/invoice/QuotationHeader";
import InvoiceLineItems from "../components/invoice/InvoiceLineItems";
import InvoiceTotals from "../components/invoice/InvoiceTotals";
import QuotationFooter from "../components/invoice/QuotationFooter";
import { useBusiness } from "../context/BusinessContext";
import { getContacts } from "../api/contactsApi";
import { getItems } from "../api/itemsApi";
import { createQuotation } from "../api/quotationApi";

const newLine = () => ({ id: `line-${Date.now()}-${Math.random()}`, itemId: "", name: "", hsnCode: "", unit: "", qty: 1, rate: 0, gstPercent: 0 });

export default function Quotation() {
  const navigate = useNavigate();
  const { businessSettings } = useBusiness();

  const [customers, setCustomers] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [validDays, setValidDays] = useState(30);
  const [customerId, setCustomerId] = useState("");
  const [lines, setLines] = useState([newLine()]);
  const [notes, setNotes] = useState("");
  const [terms, setTerms] = useState("");

  useEffect(() => {
    if (businessSettings?.defaultTerms) setTerms(businessSettings.defaultTerms);
  }, [businessSettings]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);
        const [contactsRes, itemsRes] = await Promise.all([
          getContacts({ contactType: "Customer" }),
          getItems(),
        ]);
        setCustomers(contactsRes.data.contacts);
        setItemsList(itemsRes.data.items);
      } catch (err) {
        setError("Contacts/Items load karne mein error aaya");
      } finally {
        setLoadingData(false);
      }
    };
    fetchData();
  }, []);

  const selectedCustomer = customers.find((c) => c._id === customerId);
  const isSameState = selectedCustomer?.state === businessSettings?.state;

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

  const handleSave = async () => {
    setError("");
    if (!customerId) return alert("Pehle customer select karo");
    if (lines.every((l) => !l.itemId)) return alert("Kam se kam ek item add karo");

    const validLines = lines
      .filter((l) => l.itemId)
      .map((l) => ({
        itemId: l.itemId,
        name: l.name,
        hsnCode: l.hsnCode,
        unit: l.unit,
        qty: Number(l.qty),
        rate: Number(l.rate),
        gstPercent: Number(l.gstPercent),
      }));

    const payload = { date, validDays, customerId, lines: validLines, notes, terms };

    try {
      setSaving(true);
      await createQuotation(payload);
      navigate("/quotation");
    } catch (err) {
      setError(err.response?.data?.message || "Quotation save karne mein error aaya");
    } finally {
      setSaving(false);
    }
  };

  if (loadingData) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20 text-ink-muted text-sm">Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">New Quotation</h1>
          <p className="text-sm text-ink-muted mt-1">Customer ko price estimate bhejo, invoice se pehle.</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 text-sm text-status-overdue bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <InvoiceCompanyHeader />

      <QuotationHeader
        date={date}
        onDateChange={setDate}
        validDays={validDays}
        onValidDaysChange={setValidDays}
        customerId={customerId}
        onCustomerChange={setCustomerId}
        customers={customers}
      />

      <InvoiceLineItems
        lines={lines}
        onAddLine={handleAddLine}
        onRemoveLine={handleRemoveLine}
        onUpdateLine={handleUpdateLine}
        itemsList={itemsList}
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
          disabled={saving}
          className="bg-brand text-white font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-brand-dark transition-colors disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Quotation"}
        </button>
      </div>
    </DashboardLayout>
  );
}