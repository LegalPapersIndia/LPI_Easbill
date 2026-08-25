
// import { useParams, useNavigate, useSearchParams } from "react-router-dom";
// import { Download, Printer, ArrowLeft, Share2 } from "lucide-react";
// import InvoicePrintTemplate from "../components/print/InvoicePrintTemplate";
// import {
//   salesInvoicesList, purchaseInvoicesList, quotationsList, purchaseOrdersList,
//   contactsList, invoiceLineItemsSample, quotationLineItemsSample,
//   purchaseOrderLineItemsSample, purchaseLineItemsSample,
// } from "../data/dummyData";

// const dataMap = {
//   sales: { pool: salesInvoicesList, lineItems: invoiceLineItemsSample, partyField: "customerName", numberField: "invoiceNo" },
//   purchase: { pool: purchaseInvoicesList, lineItems: purchaseLineItemsSample, partyField: "supplierName", numberField: "purchaseNo" },
//   quotation: { pool: quotationsList, lineItems: quotationLineItemsSample, partyField: "customerName", numberField: "quotationNo" },
//   purchaseOrder: { pool: purchaseOrdersList, lineItems: purchaseOrderLineItemsSample, partyField: "supplierName", numberField: "poNo" },
// };

// export default function InvoicePrintPreview() {
//   const { id } = useParams();
//   const [searchParams] = useSearchParams();
//   const type = searchParams.get("type") || "sales";
//   const navigate = useNavigate();

//   const config = dataMap[type] || dataMap.sales;
//   const invoice = config.pool.find((inv) => inv._id === id);

//   if (!invoice) {
//     return (
//       <div className="h-screen overflow-y-auto flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-ink-muted mb-4">Document nahi mila.</p>
//           <button onClick={() => navigate(-1)} className="text-brand hover:underline">← Wapas jao</button>
//         </div>
//       </div>
//     );
//   }

//   const partyName = invoice[config.partyField];
//   const party = contactsList.find((c) => c.name === partyName);
//   const lines = config.lineItems[invoice._id] || [
//     { name: "Sample Item", hsnCode: "0000", qty: 1, unit: "pcs", rate: invoice.grandTotal, gstPercent: 0 },
//   ];

//   const handleShareWhatsApp = () => {
//     const message = `Hi ${partyName}, aapka document ${invoice[config.numberField]} ₹${invoice.grandTotal} ka ready hai.`;
//     window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
//   };

//   return (
//     <div className="h-screen overflow-y-auto bg-paper">
//       <div className="print:hidden sticky top-0 bg-white border-b border-border z-10">
//         <div className="max-w-3xl mx-auto flex items-center justify-between px-4 py-3">
//           <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink">
//             <ArrowLeft size={16} /> Back
//           </button>
//           <div className="flex items-center gap-2">
//             <button onClick={handleShareWhatsApp} className="flex items-center gap-1.5 border border-border text-ink-muted text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-paper transition-colors">
//               <Share2 size={14} /> WhatsApp
//             </button>
//             <button onClick={() => window.print()} className="flex items-center gap-1.5 border border-border text-ink-muted text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-paper transition-colors">
//               <Printer size={14} /> Print
//             </button>
//             <button onClick={() => window.print()} className="flex items-center gap-1.5 bg-brand text-white text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-brand-dark transition-colors">
//               <Download size={14} /> Download PDF
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="py-6 print:py-0" id="invoice-print-area">
//         <InvoicePrintTemplate invoice={invoice} party={party} lines={lines} type={type} />
//       </div>
//     </div>
//   );
// }




import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Download, Printer, ArrowLeft, Share2 } from "lucide-react";
import InvoicePrintTemplate from "../components/print/InvoicePrintTemplate";
import { getSalesInvoiceById } from "../api/salesInvoiceApi";
import { getPurchaseInvoiceById } from "../api/purchaseInvoiceApi";
import { getQuotationById } from "../api/quotationApi";
import { getPurchaseOrderById } from "../api/purchaseOrderApi";

// Har type ke liye: kaunsa API function, response object mein kis key ke andar data hai,
// aur party kaunse field mein hai (customerId ya supplierId)
const configMap = {
  sales: { fetchFn: getSalesInvoiceById, dataKey: "invoice", partyKey: "customerId" },
  purchase: { fetchFn: getPurchaseInvoiceById, dataKey: "purchase", partyKey: "supplierId" },
  quotation: { fetchFn: getQuotationById, dataKey: "quotation", partyKey: "customerId" },
  purchaseOrder: { fetchFn: getPurchaseOrderById, dataKey: "purchaseOrder", partyKey: "supplierId" },
};

export default function InvoicePrintPreview() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "sales";
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const config = configMap[type] || configMap.sales;

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        setLoading(true);
        setError("");
        const { data } = await config.fetchFn(id);
        setInvoice(data[config.dataKey]);
      } catch (err) {
        setError("Document load karne mein error aaya");
      } finally {
        setLoading(false);
      }
    };
    fetchDoc();
  }, [id, type]);

  if (loading) {
    return (
      <div className="h-screen overflow-y-auto flex items-center justify-center">
        <p className="text-ink-muted text-sm">Loading...</p>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="h-screen overflow-y-auto flex items-center justify-center">
        <div className="text-center">
          <p className="text-ink-muted mb-4">{error || "Document nahi mila."}</p>
          <button onClick={() => navigate(-1)} className="text-brand hover:underline">← back </button>
        </div>
      </div>
    );
  }

  const party = invoice[config.partyKey];
  const lines = invoice.lines || [];
  const docNumber = invoice.invoiceNo || invoice.purchaseNo || invoice.quotationNo || invoice.poNo;

  const handleShareWhatsApp = () => {
    const message = `Hi ${party?.name || ""}, aapka document ${docNumber} ₹${invoice.grandTotal} ka ready hai.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="h-screen overflow-y-auto bg-paper">
      <div className="print:hidden sticky top-0 bg-white border-b border-border z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between px-4 py-3">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink">
            <ArrowLeft size={16} /> Back
          </button>
          <div className="flex items-center gap-2">
            <button onClick={handleShareWhatsApp} className="flex items-center gap-1.5 border border-border text-ink-muted text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-paper transition-colors">
              <Share2 size={14} /> WhatsApp
            </button>
            <button onClick={() => window.print()} className="flex items-center gap-1.5 border border-border text-ink-muted text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-paper transition-colors">
              <Printer size={14} /> Print
            </button>
            <button onClick={() => window.print()} className="flex items-center gap-1.5 bg-brand text-white text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-brand-dark transition-colors">
              <Download size={14} /> Download PDF
            </button>
          </div>
        </div>
      </div>

      <div className="py-6 print:py-0" id="invoice-print-area">
        <InvoicePrintTemplate invoice={invoice} party={party} lines={lines} type={type} />
      </div>
    </div>
  );
}