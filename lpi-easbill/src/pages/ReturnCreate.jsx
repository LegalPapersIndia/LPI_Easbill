// import { useState, useMemo } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import DashboardLayout from "../components/layout/DashboardLayout";
// import InvoiceCompanyHeader from "../components/invoice/InvoiceCompanyHeader";
// import ReturnsToggle from "../components/returns/ReturnsToggle";
// import LinkInvoiceSearch from "../components/returns/LinkInvoiceSearch";
// import InvoiceLineItems from "../components/invoice/InvoiceLineItems";
// import PurchaseLineItems from "../components/purchase/PurchaseLineItems";
// import InvoiceTotals from "../components/invoice/InvoiceTotals";
// import { salesInvoicesList, purchaseInvoicesList, businessSettings, contactsList } from "../data/dummyData";

// const newLine = () => ({ id: `line-${Date.now()}-${Math.random()}`, itemId: "", name: "", hsnCode: "", qty: 1, rate: 0, gstPercent: 0 });

// export default function ReturnCreate() {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [type, setType] = useState(searchParams.get("type") || "sales");
//   const [returnNo] = useState(`${type === "sales" ? "SR" : "PR"}-2026-${String(Math.floor(Math.random() * 900) + 100)}`);
//   const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
//   const [selectedInvoice, setSelectedInvoice] = useState(null);
//   const [lines, setLines] = useState([newLine()]);
//   const [refundAmount, setRefundAmount] = useState(0);
//   const [paymentMode, setPaymentMode] = useState("Cash");

//   const invoicesPool = type === "sales" ? salesInvoicesList : purchaseInvoicesList;
//   const party = selectedInvoice
//     ? contactsList.find((c) => c.name === (type === "sales" ? selectedInvoice.customerName : selectedInvoice.supplierName))
//     : null;
//   const isSameState = party?.state === businessSettings.state;

//   const { subtotal, gstBreakup, grandTotal } = useMemo(() => {
//     let sub = 0, gst = 0;
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
//     if (!selectedInvoice) return alert(`Pehle ${type === "sales" ? "sales invoice" : "purchase invoice"} link karo`);
//     if (lines.every((l) => !l.itemId)) return alert("Kam se kam ek item add karo");

//     const payload = { returnNo, type, date, linkedInvoice: selectedInvoice, lines, subtotal, gstBreakup, grandTotal, refundAmount, paymentMode };
//     console.log("Return saved (dummy):", payload);
//     alert(`${type === "sales" ? "Sales" : "Purchase"} Return saved ho gaya! (Console mein dekho — abhi backend connect nahi hai)`);
//   };

//   const LineItemsComponent = type === "sales" ? InvoiceLineItems : PurchaseLineItems;

//   return (
//     <DashboardLayout>
//       <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//         <div>
//           <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">New Return</h1>
//           <p className="text-sm text-ink-muted mt-1">Kisi existing invoice ka return record karo.</p>
//         </div>
//         <button
//           onClick={() => navigate("/returns")}
//           className="text-sm mb-2 bg-brand text-white font-medium px-5 py-2.5 rounded-lg hover:bg-brand-dark transition-colors"
//         >
//           ← Back to Returns
//         </button>
//       </div>

//       <InvoiceCompanyHeader />

//       <ReturnsToggle type={type} onTypeChange={(t) => { setType(t); setSelectedInvoice(null); }} />

//       <div className="bg-white border border-border rounded-xl p-4 sm:p-5 mb-4">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="text-xs font-medium text-ink-muted">Return No.</label>
//             <input value={returnNo} readOnly className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm bg-paper tabular-num text-ink font-medium" />
//           </div>
//           <div>
//             <label className="text-xs font-medium text-ink-muted">Return Date</label>
//             <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
//               className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
//           </div>
//         </div>

//         <label className="text-xs font-medium text-ink-muted">
//           Link to {type === "sales" ? "Sales Invoice" : "Purchase Invoice"}
//         </label>
//         <div className="mt-1">
//           <LinkInvoiceSearch
//             invoices={invoicesPool}
//             selectedInvoice={selectedInvoice}
//             onSelect={setSelectedInvoice}
//             type={type}
//           />
//         </div>

//         {party && (
//           <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-x-6 gap-y-1 text-xs text-ink-muted">
//             <span>Party: <span className="text-ink font-medium">{party.name}</span></span>
//             <span>GSTIN: <span className="text-ink tabular-num">{party.gstin || "N/A"}</span></span>
//             <span className={`px-2 py-0.5 rounded-full font-medium ${isSameState ? "bg-brand-light text-brand" : "bg-status-pending/10 text-status-pending"}`}>
//               {isSameState ? "CGST + SGST applicable" : "IGST applicable"}
//             </span>
//           </div>
//         )}
//       </div>

//       <LineItemsComponent
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

//       <div className="bg-white border border-border rounded-xl p-4 sm:p-5 mb-4">
//         <p className="font-display font-semibold text-ink mb-4">
//           Refund {type === "sales" ? "(Amount Paid to Customer)" : "(Amount Received from Supplier)"}
//         </p>
//         <div className="grid grid-cols-2 gap-4 max-w-md">
//           <div>
//             <label className="text-xs font-medium text-ink-muted">Refund Amount (₹)</label>
//             <input type="number" value={refundAmount} onChange={(e) => setRefundAmount(e.target.value)}
//               className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
//           </div>
//           <div>
//             <label className="text-xs font-medium text-ink-muted">Payment Mode</label>
//             <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}
//               className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand">
//               <option value="Cash">Cash</option>
//               <option value="UPI">UPI</option>
//               <option value="Bank Transfer">Bank Transfer</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-end">
//         <button onClick={handleSave} className="bg-brand text-white font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-brand-dark transition-colors">
//           Save Return
//         </button>
//       </div>
//     </DashboardLayout>
//   );
// }


//new cloude file 

// import { useState, useMemo, useEffect, useCallback } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import DashboardLayout from "../components/layout/DashboardLayout";
// import InvoiceCompanyHeader from "../components/invoice/InvoiceCompanyHeader";
// import ReturnsToggle from "../components/returns/ReturnsToggle";
// import LinkInvoiceSearch from "../components/returns/LinkInvoiceSearch";
// import InvoiceLineItems from "../components/invoice/InvoiceLineItems";
// import PurchaseLineItems from "../components/purchase/PurchaseLineItems";
// import InvoiceTotals from "../components/invoice/InvoiceTotals";
// import { getSalesInvoices } from "../api/salesInvoiceApi";
// import { getPurchaseInvoices } from "../api/purchaseInvoiceApi";
// import { getItems } from "../api/itemsApi";
// import { createReturn } from "../api/returnsApi";
// import { useBusiness } from "../context/BusinessContext"; // ⚠️ confirm hook/path naam sahi hai

// const newLine = () => ({
//   localId: `line-${Date.now()}-${Math.random()}`,
//   itemId: "",
//   name: "",
//   hsnCode: "",
//   unit: "",
//   qty: 1,
//   rate: 0,
//   gstPercent: 0,
// });

// export default function ReturnCreate() {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const { businessSettings } = useBusiness();

//   const [type, setType] = useState(searchParams.get("type") || "sales");
//   const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

//   const [invoices, setInvoices] = useState([]);
//   const [loadingInvoices, setLoadingInvoices] = useState(true);

//   const [itemsList, setItemsList] = useState([]); // ✅ NEW

//   const [selectedInvoice, setSelectedInvoice] = useState(null);
//   const [lines, setLines] = useState([newLine()]);
//   const [refundAmount, setRefundAmount] = useState(0);
//   const [paymentMode, setPaymentMode] = useState("Cash");
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");

//   // ── type badalte hi us type ki invoices fetch karo ──
//   const fetchInvoices = useCallback(async () => {
//     try {
//       setLoadingInvoices(true);
//       const { data } =
//         type === "sales" ? await getSalesInvoices() : await getPurchaseInvoices();
//       setInvoices(data.invoices);
//     } catch (err) {
//       setError("Invoices load karne mein error aaya");
//     } finally {
//       setLoadingInvoices(false);
//     }
//   }, [type]);

//   useEffect(() => {
//     fetchInvoices();
//   }, [fetchInvoices]);

//   // ── ✅ NEW — items fetch karo (item dropdown ke liye, ek baar hi) ──
//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const { data } = await getItems();
//         setItemsList(data.items);
//       } catch (err) {
//         console.error("Items load karne mein error:", err);
//       }
//     };
//     fetchItems();
//   }, []);

//   // ── party ab selectedInvoice ke populated customerId/supplierId se aayega ──
//   const party = selectedInvoice
//     ? (type === "sales" ? selectedInvoice.customerId : selectedInvoice.supplierId)
//     : null;
//   const isSameState = party?.state === businessSettings?.state;

//   const { subtotal, gstBreakup, grandTotal } = useMemo(() => {
//     let sub = 0, gst = 0;
//     lines.forEach((line) => {
//       const amount = (line.qty || 0) * (line.rate || 0);
//       sub += amount;
//       gst += (amount * (line.gstPercent || 0)) / 100;
//     });
//     return { subtotal: sub, gstBreakup: gst, grandTotal: sub + gst };
//   }, [lines]);

//   const handleAddLine = () => setLines((prev) => [...prev, newLine()]);
//   const handleRemoveLine = (localId) => setLines((prev) => prev.filter((l) => l.localId !== localId));
//   const handleUpdateLine = (localId, updates) =>
//     setLines((prev) => prev.map((l) => (l.localId === localId ? { ...l, ...updates } : l)));

//   // ── invoice select hote hi uske lines auto-fill ho jaayenge ──
//   const handleSelectInvoice = (inv) => {
//     setSelectedInvoice(inv);
//     if (inv) {
//       setLines(
//         inv.lines.map((l) => ({
//           localId: `line-${Date.now()}-${Math.random()}`,
//           itemId: l.itemId || "",
//           name: l.name,
//           hsnCode: l.hsnCode || "",
//           unit: l.unit || "",
//           qty: l.qty,
//           rate: l.rate,
//           gstPercent: l.gstPercent || 0,
//         }))
//       );
//     } else {
//       setLines([newLine()]);
//     }
//   };

//   const handleSave = async () => {
//     if (!selectedInvoice) return alert(`Pehle ${type === "sales" ? "sales invoice" : "purchase invoice"} link karo`);
//     if (lines.every((l) => !l.name)) return alert("Kam se kam ek item add karo");
//     if (!party?._id) return alert("Party (customer/supplier) nahi mila is invoice mein");

//     const payload = {
//       type,
//       date,
//       linkedInvoiceId: selectedInvoice._id,
//       linkedInvoiceNo: type === "sales" ? selectedInvoice.invoiceNo : selectedInvoice.purchaseNo,
//       partyId: party._id,
//       lines: lines
//         .filter((l) => l.name)
//         .map(({ localId, ...rest }) => rest),
//       refundAmount: Number(refundAmount || 0),
//       paymentMode,
//     };

//     try {
//       setSaving(true);
//       setError("");
//       await createReturn(payload);
//       navigate("/returns");
//     } catch (err) {
//       setError(err.response?.data?.message || "Return save karne mein error aaya");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const LineItemsComponent = type === "sales" ? InvoiceLineItems : PurchaseLineItems;

//   return (
//     <DashboardLayout>
//       <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//         <div>
//           <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">New Return</h1>
//           <p className="text-sm text-ink-muted mt-1">Kisi existing invoice ka return record karo.</p>
//         </div>
//         <button
//           onClick={() => navigate("/returns")}
//           className="text-sm mb-2 bg-brand text-white font-medium px-5 py-2.5 rounded-lg hover:bg-brand-dark transition-colors"
//         >
//           ← Back to Returns
//         </button>
//       </div>

//       {error && (
//         <div className="mb-4 text-sm text-status-overdue bg-red-50 border border-red-100 rounded-lg px-3 py-2">
//           {error}
//         </div>
//       )}

//       <InvoiceCompanyHeader />

//       <ReturnsToggle type={type} onTypeChange={(t) => { setType(t); handleSelectInvoice(null); }} />

//       <div className="bg-white border border-border rounded-xl p-4 sm:p-5 mb-4">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="text-xs font-medium text-ink-muted">Return No.</label>
//             <input
//               value="Auto-generated on save"
//               readOnly
//               className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm bg-paper text-ink-muted italic"
//             />
//           </div>
//           <div>
//             <label className="text-xs font-medium text-ink-muted">Return Date</label>
//             <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
//               className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
//           </div>
//         </div>

//         <label className="text-xs font-medium text-ink-muted">
//           Link to {type === "sales" ? "Sales Invoice" : "Purchase Invoice"}
//         </label>
//         <div className="mt-1">
//           {loadingInvoices ? (
//             <p className="text-sm text-ink-muted">Invoices load ho rahe hain...</p>
//           ) : (
//             <LinkInvoiceSearch
//               invoices={invoices}
//               selectedInvoice={selectedInvoice}
//               onSelect={handleSelectInvoice}
//               type={type}
//             />
//           )}
//         </div>

//         {party && (
//           <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-x-6 gap-y-1 text-xs text-ink-muted">
//             <span>Party: <span className="text-ink font-medium">{party.name}</span></span>
//             <span>GSTIN: <span className="text-ink tabular-num">{party.gstin || "N/A"}</span></span>
//             <span className={`px-2 py-0.5 rounded-full font-medium ${isSameState ? "bg-brand-light text-brand" : "bg-status-pending/10 text-status-pending"}`}>
//               {isSameState ? "CGST + SGST applicable" : "IGST applicable"}
//             </span>
//           </div>
//         )}
//       </div>

//       <LineItemsComponent
//         lines={lines.map((l) => ({ ...l, id: l.localId }))}
//         onAddLine={handleAddLine}
//         onRemoveLine={handleRemoveLine}
//         onUpdateLine={handleUpdateLine}
//         itemsList={itemsList}
//       />

//       <InvoiceTotals
//         subtotal={subtotal}
//         gstBreakup={gstBreakup}
//         isSameState={isSameState}
//         grandTotal={grandTotal}
//       />

//       <div className="bg-white border border-border rounded-xl p-4 sm:p-5 mb-4">
//         <p className="font-display font-semibold text-ink mb-4">
//           Refund {type === "sales" ? "(Amount Paid to Customer)" : "(Amount Received from Supplier)"}
//         </p>
//         <div className="grid grid-cols-2 gap-4 max-w-md">
//           <div>
//             <label className="text-xs font-medium text-ink-muted">Refund Amount (₹)</label>
//             <input type="number" value={refundAmount} onChange={(e) => setRefundAmount(e.target.value)}
//               className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num" />
//           </div>
//           <div>
//             <label className="text-xs font-medium text-ink-muted">Payment Mode</label>
//             <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}
//               className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand">
//               <option value="Cash">Cash</option>
//               <option value="UPI">UPI</option>
//               <option value="Bank Transfer">Bank Transfer</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-end">
//         <button
//           onClick={handleSave}
//           disabled={saving}
//           className="bg-brand text-white font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-brand-dark transition-colors disabled:opacity-50"
//         >
//           {saving ? "Saving..." : "Save Return"}
//         </button>
//       </div>
//     </DashboardLayout>
//   );
// }


//1st cloude

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import InvoiceCompanyHeader from "../components/invoice/InvoiceCompanyHeader";
import ReturnsToggle from "../components/returns/ReturnsToggle";
import LinkInvoiceSearch from "../components/returns/LinkInvoiceSearch";
import InvoiceLineItems from "../components/invoice/InvoiceLineItems";
import PurchaseLineItems from "../components/purchase/PurchaseLineItems";
import InvoiceTotals from "../components/invoice/InvoiceTotals";
import { useBusiness } from "../context/BusinessContext";
import { getSalesInvoices } from "../api/salesInvoiceApi";
import { getPurchaseInvoices } from "../api/purchaseInvoiceApi";
import { getItems } from "../api/itemsApi";
import { createReturn } from "../api/returnsApi";

const newLine = () => ({ id: `line-${Date.now()}-${Math.random()}`, itemId: "", name: "", hsnCode: "", unit: "", qty: 1, rate: 0, gstPercent: 0 });

export default function ReturnCreate() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { businessSettings } = useBusiness();

  const [type, setType] = useState(searchParams.get("type") || "sales");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [lines, setLines] = useState([newLine()]);
  const [refundAmount, setRefundAmount] = useState(0);
  const [paymentMode, setPaymentMode] = useState("Cash");

  const [invoicesPool, setInvoicesPool] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ── TYPE BADALTE HI SAHI INVOICE POOL FETCH KARO ──
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);
        setSelectedInvoice(null);

        const [invoicesRes, itemsRes] = await Promise.all([
          type === "sales" ? getSalesInvoices() : getPurchaseInvoices(),
          getItems(),
        ]);

        const rawInvoices = type === "sales" ? invoicesRes.data.invoices : invoicesRes.data.purchases;

        // LinkInvoiceSearch component ko "customerName"/"supplierName" chahiye —
        // backend se populated object (customerId.name / supplierId.name) aata hai,
        // isको flat field mein map kar rahe hain taaki search component ko change na karna pade
        const mapped = rawInvoices.map((inv) => ({
          ...inv,
          customerName: type === "sales" ? inv.customerId?.name : undefined,
          supplierName: type === "purchase" ? inv.supplierId?.name : undefined,
        }));

        setInvoicesPool(mapped);
        setItemsList(itemsRes.data.items);
      } catch (err) {
        setError("Invoices/Items load karne mein error aaya");
      } finally {
        setLoadingData(false);
      }
    };
    fetchData();
  }, [type]);

  // ── Party details seedhe selected invoice ke populated field se ──
  const party = selectedInvoice
    ? (type === "sales" ? selectedInvoice.customerId : selectedInvoice.supplierId)
    : null;
  const isSameState = party?.state === businessSettings?.state;

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

  const handleSave = async () => {
    setError("");
    if (!selectedInvoice) return alert(`Pehle ${type === "sales" ? "sales invoice" : "purchase invoice"} link karo`);
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

    const linkedInvoiceNo = type === "sales" ? selectedInvoice.invoiceNo : selectedInvoice.purchaseNo;

    const payload = {
      type,
      date,
      linkedInvoiceId: selectedInvoice._id,
      linkedInvoiceNo,
      partyId: party._id,
      lines: validLines,
      refundAmount,
      paymentMode,
    };

    try {
      setSaving(true);
      await createReturn(payload);
      navigate("/returns");
    } catch (err) {
      setError(err.response?.data?.message || "Return save karne mein error aaya");
    } finally {
      setSaving(false);
    }
  };

  const LineItemsComponent = type === "sales" ? InvoiceLineItems : PurchaseLineItems;

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
          <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">New Return</h1>
          <p className="text-sm text-ink-muted mt-1">Record a return for an existing invoice.</p>
        </div>
        <button
          onClick={() => navigate("/returns")}
          className="text-sm mb-2 bg-brand text-white font-medium px-5 py-2.5 rounded-lg hover:bg-brand-dark transition-colors"
        >
          ← Back to Returns
        </button>
      </div>

      {error && (
        <div className="mb-4 text-sm text-status-overdue bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <InvoiceCompanyHeader />

      <ReturnsToggle type={type} onTypeChange={setType} />

      <div className="bg-white border border-border rounded-xl p-4 sm:p-5 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
        itemsList={itemsList}
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
        <button onClick={handleSave} disabled={saving} className="bg-brand text-white font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-brand-dark transition-colors disabled:opacity-60">
          {saving ? "Saving..." : "Save Return"}
        </button>
      </div>
    </DashboardLayout>
  );
} 