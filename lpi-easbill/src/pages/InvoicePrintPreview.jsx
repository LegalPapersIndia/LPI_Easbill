
// import { useParams, useNavigate, useSearchParams } from "react-router-dom";
// import { Download, Printer, ArrowLeft, Share2 } from "lucide-react";
// import InvoicePrintTemplate from "../components/print/InvoicePrintTemplate";
// import {
//   salesInvoicesList, purchaseInvoicesList, quotationsList, purchaseOrdersList,
//   contactsList, invoiceLineItemsSample, quotationLineItemsSample, purchaseOrderLineItemsSample,
// } from "../data/dummyData";

// const dataMap = {
//   sales: { pool: salesInvoicesList, lineItems: invoiceLineItemsSample, partyField: "customerName", numberField: "invoiceNo" },
//   purchase: { pool: purchaseInvoicesList, lineItems: invoiceLineItemsSample, partyField: "supplierName", numberField: "purchaseNo" },
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
//       <div className="min-h-screen flex items-center justify-center">
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
//     const message = `Hi ${partyName}, aapka document ${invoice[config.numberField]} ₹${invoice.grandTotal} ka ready hai. (Backend connect hone ke baad direct PDF link yahan aayega).`;
//     window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
//   };

//   return (
//     <div className="min-h-screen bg-paper">
//       <div className="print:hidden sticky top-0 bg-white border-b border-border z-10">
//         <div className="max-w-3xl mx-auto flex items-center justify-between px-4 py-3">
//           <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink">
//             <ArrowLeft size={16} />
//             Back
//           </button>
//           <div className="flex items-center gap-2">
//             <button onClick={handleShareWhatsApp} className="flex items-center gap-1.5 border border-border text-ink-muted text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-paper transition-colors">
//               <Share2 size={14} />
//               WhatsApp
//             </button>
//             <button onClick={() => window.print()} className="flex items-center gap-1.5 border border-border text-ink-muted text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-paper transition-colors">
//               <Printer size={14} />
//               Print
//             </button>
//             <button onClick={() => window.print()} className="flex items-center gap-1.5 bg-brand text-white text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-brand-dark transition-colors">
//               <Download size={14} />
//               Download PDF
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




import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Download, Printer, ArrowLeft, Share2 } from "lucide-react";
import InvoicePrintTemplate from "../components/print/InvoicePrintTemplate";
import {
  salesInvoicesList, purchaseInvoicesList, quotationsList, purchaseOrdersList,
  contactsList, invoiceLineItemsSample, quotationLineItemsSample,
  purchaseOrderLineItemsSample, purchaseLineItemsSample,
} from "../data/dummyData";

const dataMap = {
  sales: { pool: salesInvoicesList, lineItems: invoiceLineItemsSample, partyField: "customerName", numberField: "invoiceNo" },
  purchase: { pool: purchaseInvoicesList, lineItems: purchaseLineItemsSample, partyField: "supplierName", numberField: "purchaseNo" },
  quotation: { pool: quotationsList, lineItems: quotationLineItemsSample, partyField: "customerName", numberField: "quotationNo" },
  purchaseOrder: { pool: purchaseOrdersList, lineItems: purchaseOrderLineItemsSample, partyField: "supplierName", numberField: "poNo" },
};

export default function InvoicePrintPreview() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "sales";
  const navigate = useNavigate();

  const config = dataMap[type] || dataMap.sales;
  const invoice = config.pool.find((inv) => inv._id === id);

  if (!invoice) {
    return (
      <div className="h-screen overflow-y-auto flex items-center justify-center">
        <div className="text-center">
          <p className="text-ink-muted mb-4">Document nahi mila.</p>
          <button onClick={() => navigate(-1)} className="text-brand hover:underline">← Wapas jao</button>
        </div>
      </div>
    );
  }

  const partyName = invoice[config.partyField];
  const party = contactsList.find((c) => c.name === partyName);
  const lines = config.lineItems[invoice._id] || [
    { name: "Sample Item", hsnCode: "0000", qty: 1, unit: "pcs", rate: invoice.grandTotal, gstPercent: 0 },
  ];

  const handleShareWhatsApp = () => {
    const message = `Hi ${partyName}, aapka document ${invoice[config.numberField]} ₹${invoice.grandTotal} ka ready hai.`;
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