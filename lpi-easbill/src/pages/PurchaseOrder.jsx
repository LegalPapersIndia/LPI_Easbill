// import { useState, useMemo } from "react";
// import DashboardLayout from "../components/layout/DashboardLayout";
// import InvoiceCompanyHeader from "../components/invoice/InvoiceCompanyHeader";
// import PurchaseOrderHeader from "../components/purchase/PurchaseOrderHeader";
// import PurchaseLineItems from "../components/purchase/PurchaseLineItems";
// import InvoiceTotals from "../components/invoice/InvoiceTotals";
// import PurchaseOrderFooter from "../components/purchase/PurchaseOrderFooter";
// import { contactsList, businessSettings } from "../data/dummyData";
// import { getFinancialYear } from "../utils/financialYear";

// const newLine = () => ({ id: `line-${Date.now()}-${Math.random()}`, itemId: "", name: "", hsnCode: "", unit: "", qty: 1, rate: 0, gstPercent: 0 });

// export default function PurchaseOrder() {
//   const [poNo] = useState(`PO/${getFinancialYear()}/${String(Math.floor(Math.random() * 900) + 100)}`);
//   const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
//   const [validTillDays, setValidTillDays] = useState(30);
//   const [supplierId, setSupplierId] = useState("");
//   const [lines, setLines] = useState([newLine()]);
//   const [notes, setNotes] = useState("");
//   const [terms, setTerms] = useState(businessSettings.defaultTerms);

//   const selectedSupplier = contactsList.find((s) => s._id === supplierId);
//   const isSameState = selectedSupplier?.state === businessSettings.state;

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
//     if (!supplierId) return alert("Pehle supplier select karo");
//     if (lines.every((l) => !l.itemId)) return alert("Kam se kam ek item add karo");

//     const poPayload = {
//       poNo, date, validTillDays, supplierId, lines, subtotal, gstBreakup, grandTotal, notes, terms,
//     };
//     console.log("Purchase Order saved (dummy):", poPayload);
//     alert("Purchase Order saved ho gaya! (Console mein dekho — abhi backend connect nahi hai)");
//   };

//   return (
//     <DashboardLayout>
//       <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//         <div>
//           <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">New Purchase Order</h1>
//           <p className="text-sm text-ink-muted mt-1">Supplier ko order bhejo, invoice se pehle.</p>
//         </div>
//       </div>

//       <InvoiceCompanyHeader />

//       <PurchaseOrderHeader
//         poNo={poNo}
//         date={date}
//         onDateChange={setDate}
//         validTillDays={validTillDays}
//         onValidTillDaysChange={setValidTillDays}
//         supplierId={supplierId}
//         onSupplierChange={setSupplierId}
//       />

//       <PurchaseLineItems
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

//       <PurchaseOrderFooter
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
//           Save Purchase Order
//         </button>
//       </div>
//     </DashboardLayout>
//   );
// }




import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import InvoiceCompanyHeader from "../components/invoice/InvoiceCompanyHeader";
import PurchaseOrderHeader from "../components/purchase/PurchaseOrderHeader";
import PurchaseLineItems from "../components/purchase/PurchaseLineItems";
import InvoiceTotals from "../components/invoice/InvoiceTotals";
import PurchaseOrderFooter from "../components/purchase/PurchaseOrderFooter";
import { useBusiness } from "../context/BusinessContext";
import { getContacts } from "../api/contactsApi";
import { getItems } from "../api/itemsApi";
import { createPurchaseOrder } from "../api/purchaseOrderApi";

const newLine = () => ({ id: `line-${Date.now()}-${Math.random()}`, itemId: "", name: "", hsnCode: "", unit: "", qty: 1, rate: 0, gstPercent: 0 });

export default function PurchaseOrder() {
  const navigate = useNavigate();
  const { businessSettings } = useBusiness();

  const [suppliers, setSuppliers] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [validTillDays, setValidTillDays] = useState(30);
  const [supplierId, setSupplierId] = useState("");
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
          getContacts({ contactType: "Supplier" }),
          getItems(),
        ]);
        setSuppliers(contactsRes.data.contacts);
        setItemsList(itemsRes.data.items);
      } catch (err) {
        setError("Suppliers/Items load karne mein error aaya");
      } finally {
        setLoadingData(false);
      }
    };
    fetchData();
  }, []);

  const selectedSupplier = suppliers.find((s) => s._id === supplierId);
  const isSameState = selectedSupplier?.state === businessSettings?.state;

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
    if (!supplierId) return alert("Pehle supplier select karo");
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

    const payload = { date, validTillDays, supplierId, lines: validLines, notes, terms };

    try {
      setSaving(true);
      await createPurchaseOrder(payload);
      navigate("/purchase-order");
    } catch (err) {
      setError(err.response?.data?.message || "Purchase Order save karne mein error aaya");
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
          <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">New Purchase Order</h1>
          <p className="text-sm text-ink-muted mt-1">Supplier ko order bhejo, invoice se pehle.</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 text-sm text-status-overdue bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <InvoiceCompanyHeader />

      <PurchaseOrderHeader
        date={date}
        onDateChange={setDate}
        validTillDays={validTillDays}
        onValidTillDaysChange={setValidTillDays}
        supplierId={supplierId}
        onSupplierChange={setSupplierId}
        suppliers={suppliers}
      />

      <PurchaseLineItems
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

      <PurchaseOrderFooter
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
          {saving ? "Saving..." : "Save Purchase Order"}
        </button>
      </div>
    </DashboardLayout>
  );
}