// // // import { businessSettings, stateCodeMap } from "../../data/dummyData";
// // // import { numberToWords } from "../../utils/numberToWords";

// // // export default function ColorfulTemplate({ invoice, party, lines, type = "sales" }) {
// // //   const isSameState = party?.state === businessSettings.state;

// // //   const subtotal = lines.reduce((sum, l) => sum + l.qty * l.rate, 0);
// // //   const gstTotal = lines.reduce((sum, l) => sum + (l.qty * l.rate * l.gstPercent) / 100, 0);
// // //   const grandTotal = subtotal + gstTotal;
// // //   const amountReceived = invoice.amountReceived ?? invoice.amountPaid ?? 0;
// // //   const balance = grandTotal - amountReceived;

// // //   const docTitle =
// // //     type === "sales" ? "TAX INVOICE" :
// // //     type === "purchase" ? "PURCHASE INVOICE" :
// // //     type === "purchaseOrder" ? "PURCHASE ORDER" :
// // //     "QUOTATION";
// // //   const partyLabel = (type === "purchase" || type === "purchaseOrder") ? "Bill From" : "Bill To";

// // //   return (
// // //     <div className="bg-white max-w-3xl mx-auto" style={{ fontFamily: "Poppins, Arial, sans-serif" }}>
// // //       {/* Colorful Header Band */}
// // //       <div className="bg-brand text-white px-8 py-6 flex justify-between items-start">
// // //         <div>
// // //           <p className="text-2xl font-bold">{businessSettings.businessName}</p>
// // //           <p className="text-xs opacity-90 mt-1">{businessSettings.phone}</p>
// // //           <p className="text-xs opacity-90">{businessSettings.state}, State Code: {stateCodeMap[businessSettings.state]}</p>
// // //         </div>
// // //         <div className="text-right">
// // //           <p className="text-xl font-bold tracking-wide">{docTitle}</p>
// // //           <p className="text-[10px] bg-white/20 px-2 py-0.5 rounded mt-1 inline-block">ORIGINAL FOR RECIPIENT</p>
// // //         </div>
// // //       </div>

// // //       <div className="px-8 py-6">
// // //         {/* Invoice Info + Party */}
// // //         <div className="grid grid-cols-2 gap-6 mb-5">
// // //           <div>
// // //             <p className="text-xs font-semibold text-brand uppercase tracking-wide mb-1">{partyLabel}</p>
// // //             <p className="font-semibold text-ink">{party?.name || "Cash Sale"}</p>
// // //             <p className="text-xs text-gray-500 mt-0.5">Mobile: {party?.mobile || businessSettings.phone}</p>
// // //             {party?.gstin && <p className="text-xs text-gray-500">GSTIN: {party.gstin}</p>}
// // //           </div>
// // //           <div className="text-right">
// // //             <p className="text-xs text-gray-500">Invoice No.</p>
// // //             <p className="font-semibold text-ink">{invoice.invoiceNo || invoice.purchaseNo || invoice.quotationNo || invoice.poNo}</p>
// // //             <p className="text-xs text-gray-500 mt-2">Invoice Date</p>
// // //             <p className="font-semibold text-ink">{new Date(invoice.date).toLocaleDateString("en-GB")}</p>
// // //           </div>
// // //         </div>

// // //         {/* Items Table — Colorful Header */}
// // //         <table className="w-full text-sm border-collapse mb-4">
// // //           <thead>
// // //             <tr className="bg-brand-light text-brand">
// // //               <th className="text-left py-2 px-2 font-semibold rounded-l-lg">No.</th>
// // //               <th className="text-left py-2 px-2 font-semibold">Items</th>
// // //               <th className="text-center py-2 px-2 font-semibold">Qty.</th>
// // //               <th className="text-right py-2 px-2 font-semibold">Rate</th>
// // //               <th className="text-right py-2 px-2 font-semibold">Tax</th>
// // //               <th className="text-right py-2 px-2 font-semibold rounded-r-lg">Total</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody>
// // //             {lines.map((line, idx) => {
// // //               const lineTotal = line.qty * line.rate;
// // //               const lineTax = (lineTotal * line.gstPercent) / 100;
// // //               return (
// // //                 <tr key={idx} className="border-b border-gray-100">
// // //                   <td className="py-2 px-2 text-gray-500">{idx + 1}</td>
// // //                   <td className="py-2 px-2 font-medium text-ink">{line.name}</td>
// // //                   <td className="py-2 px-2 text-center text-gray-600">{line.qty} {line.unit}</td>
// // //                   <td className="py-2 px-2 text-right text-gray-600">{line.rate.toLocaleString("en-IN")}</td>
// // //                   <td className="py-2 px-2 text-right text-gray-600">{lineTax.toLocaleString("en-IN", { maximumFractionDigits: 0 })} ({line.gstPercent}%)</td>
// // //                   <td className="py-2 px-2 text-right font-semibold text-ink">{(lineTotal + lineTax).toLocaleString("en-IN")}</td>
// // //                 </tr>
// // //               );
// // //             })}
// // //           </tbody>
// // //         </table>

// // //         <div className="grid grid-cols-2 gap-8">
// // //           {/* Left: Terms + Amount in Words */}
// // //           <div>
// // //             <p className="text-xs font-semibold text-brand uppercase tracking-wide mb-1.5">Terms & Conditions</p>
// // //             <p className="text-xs text-gray-500 whitespace-pre-line mb-4">{businessSettings.defaultTerms}</p>

// // //             <p className="text-xs font-semibold text-brand uppercase tracking-wide mb-1">Total Amount (in words)</p>
// // //             <p className="text-xs text-gray-700 italic">{numberToWords(grandTotal)}</p>
// // //           </div>

// // //           {/* Right: Totals Box */}
// // //           <div className="bg-paper rounded-xl p-4 text-sm space-y-1.5">
// // //             <div className="flex justify-between text-gray-600">
// // //               <span>Taxable Amount</span><span>₹{subtotal.toLocaleString("en-IN")}</span>
// // //             </div>
// // //             {isSameState ? (
// // //               <>
// // //                 <div className="flex justify-between text-gray-600"><span>CGST</span><span>₹{(gstTotal / 2).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div>
// // //                 <div className="flex justify-between text-gray-600"><span>SGST</span><span>₹{(gstTotal / 2).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div>
// // //               </>
// // //             ) : (
// // //               <div className="flex justify-between text-gray-600"><span>IGST</span><span>₹{gstTotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div>
// // //             )}
// // //             <div className="flex justify-between font-bold text-ink border-t border-gray-200 pt-1.5 mt-1.5">
// // //               <span>Total Amount</span><span>₹{grandTotal.toLocaleString("en-IN")}</span>
// // //             </div>
// // //             {type === "sales" && (
// // //               <>
// // //                 <div className="flex justify-between text-status-paid">
// // //                   <span>Received Amount</span><span>₹{amountReceived.toLocaleString("en-IN")}</span>
// // //                 </div>
// // //                 <div className="flex justify-between font-semibold text-status-overdue">
// // //                   <span>Balance</span><span>₹{balance.toLocaleString("en-IN")}</span>
// // //                 </div>
// // //               </>
// // //             )}
// // //           </div>
// // //         </div>

// // //         {/* Bank Details + QR (sales only) */}
// // //         {type === "sales" && (businessSettings.bankName || businessSettings.paymentQrCode) && (
// // //           <div className="flex justify-between items-start border-t border-gray-200 pt-4 mt-5 text-xs">
// // //             <div>
// // //               <p className="font-semibold text-brand uppercase tracking-wide mb-1">Bank Details</p>
// // //               {businessSettings.accountHolderName && <p>A/C Name: {businessSettings.accountHolderName}</p>}
// // //               {businessSettings.bankName && <p>Bank: {businessSettings.bankName}</p>}
// // //               {businessSettings.accountNumber && <p>A/C No: {businessSettings.accountNumber}</p>}
// // //               {businessSettings.ifscCode && <p>IFSC: {businessSettings.ifscCode}</p>}
// // //             </div>
// // //             {businessSettings.paymentQrCode && (
// // //               <div className="text-center">
// // //                 <img src={businessSettings.paymentQrCode} alt="QR" className="w-20 h-20 object-contain" />
// // //                 <p className="text-[10px] mt-0.5">Scan & Pay</p>
// // //               </div>
// // //             )}
// // //           </div>
// // //         )}

// // //         {/* Signature */}
// // //         <div className="flex justify-end mt-6">
// // //           <div className="text-center">
// // //             {businessSettings.signature ? (
// // //               <img src={businessSettings.signature} alt="Signature" className="w-32 h-14 object-contain" />
// // //             ) : (
// // //               <div className="w-32 h-14 border-b-2 border-brand" />
// // //             )}
// // //             <p className="text-xs mt-1 font-medium text-ink">Authorized Signatory</p>
// // //             <p className="text-xs text-gray-500">For {businessSettings.businessName}</p>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <div className="bg-brand-light text-center py-2 text-xs text-brand font-medium">
// // //         Thank you for your business!
// // //       </div>
// // //     </div>
// // //   );
// // // }




// // import { stateCodeMap } from "../../data/dummyData";
// // import { numberToWords } from "../../utils/numberToWords";

// // export default function ColorfulTemplate({ invoice, party, lines, type = "sales", business }) {
// //   const businessSettings = business || {};

// //   const isSameState = party?.state === businessSettings.state;

// //   const subtotal = lines.reduce((sum, l) => sum + l.qty * l.rate, 0);
// //   const gstTotal = lines.reduce((sum, l) => sum + (l.qty * l.rate * l.gstPercent) / 100, 0);
// //   const grandTotal = subtotal + gstTotal;
// //   const amountReceived = invoice.amountReceived ?? invoice.amountPaid ?? 0;
// //   const balance = grandTotal - amountReceived;

// //   const docTitle =
// //     type === "sales" ? "TAX INVOICE" :
// //     type === "purchase" ? "PURCHASE INVOICE" :
// //     type === "purchaseOrder" ? "PURCHASE ORDER" :
// //     "QUOTATION";
// //   const partyLabel = (type === "purchase" || type === "purchaseOrder") ? "Bill From" : "Bill To";

// //   return (
// //     <div className="bg-white max-w-3xl mx-auto" style={{ fontFamily: "Poppins, Arial, sans-serif" }}>
// //       {/* Colorful Header Band */}
// //       <div className="bg-brand text-white px-8 py-6 flex justify-between items-start">
// //         <div className="flex items-center gap-3">
// //           {businessSettings.logo ? (
// //             <img
// //               src={businessSettings.logo}
// //               alt="Logo"
// //               className="w-14 h-14 object-contain bg-white rounded-lg p-1 shrink-0"
// //             />
// //           ) : (
// //             <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center font-bold text-xl shrink-0">
// //               {businessSettings.businessName ? businessSettings.businessName.charAt(0) : "?"}
// //             </div>
// //           )}
// //           <div>
// //             <p className="text-2xl font-bold">{businessSettings.businessName || "Business Name"}</p>
// //             <p className="text-xs opacity-90 mt-1">{businessSettings.phone}</p>
// //             <p className="text-xs opacity-90">{businessSettings.state}, State Code: {stateCodeMap[businessSettings.state]}</p>
// //           </div>
// //         </div>
// //         <div className="text-right">
// //           <p className="text-xl font-bold tracking-wide">{docTitle}</p>
// //           <p className="text-[10px] bg-white/20 px-2 py-0.5 rounded mt-1 inline-block">ORIGINAL FOR RECIPIENT</p>
// //         </div>
// //       </div>

// //       <div className="px-8 py-6">
// //         {/* Invoice Info + Party */}
// //         <div className="grid grid-cols-2 gap-6 mb-5">
// //           <div>
// //             <p className="text-xs font-semibold text-brand uppercase tracking-wide mb-1">{partyLabel}</p>
// //             <p className="font-semibold text-ink">{party?.name || "Cash Sale"}</p>
// //             <p className="text-xs text-gray-500 mt-0.5">Mobile: {party?.mobile || businessSettings.phone}</p>
// //             {party?.gstin && <p className="text-xs text-gray-500">GSTIN: {party.gstin}</p>}
// //           </div>
// //           <div className="text-right">
// //             <p className="text-xs text-gray-500">Invoice No.</p>
// //             <p className="font-semibold text-ink">{invoice.invoiceNo || invoice.purchaseNo || invoice.quotationNo || invoice.poNo}</p>
// //             <p className="text-xs text-gray-500 mt-2">Invoice Date</p>
// //             <p className="font-semibold text-ink">{new Date(invoice.date).toLocaleDateString("en-GB")}</p>
// //           </div>
// //         </div>

// //         {/* Items Table — Colorful Header */}
// //         <table className="w-full text-sm border-collapse mb-4">
// //           <thead>
// //             <tr className="bg-brand-light text-brand">
// //               <th className="text-left py-2 px-2 font-semibold rounded-l-lg">No.</th>
// //               <th className="text-left py-2 px-2 font-semibold">Items</th>
// //               <th className="text-center py-2 px-2 font-semibold">Qty.</th>
// //               <th className="text-right py-2 px-2 font-semibold">Rate</th>
// //               <th className="text-right py-2 px-2 font-semibold">Tax</th>
// //               <th className="text-right py-2 px-2 font-semibold rounded-r-lg">Total</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {lines.map((line, idx) => {
// //               const lineTotal = line.qty * line.rate;
// //               const lineTax = (lineTotal * line.gstPercent) / 100;
// //               return (
// //                 <tr key={idx} className="border-b border-gray-100">
// //                   <td className="py-2 px-2 text-gray-500">{idx + 1}</td>
// //                   <td className="py-2 px-2 font-medium text-ink">{line.name}</td>
// //                   <td className="py-2 px-2 text-center text-gray-600">{line.qty} {line.unit}</td>
// //                   <td className="py-2 px-2 text-right text-gray-600">{line.rate.toLocaleString("en-IN")}</td>
// //                   <td className="py-2 px-2 text-right text-gray-600">{lineTax.toLocaleString("en-IN", { maximumFractionDigits: 0 })} ({line.gstPercent}%)</td>
// //                   <td className="py-2 px-2 text-right font-semibold text-ink">{(lineTotal + lineTax).toLocaleString("en-IN")}</td>
// //                 </tr>
// //               );
// //             })}
// //           </tbody>
// //         </table>

// //         <div className="grid grid-cols-2 gap-8">
// //           {/* Left: Terms + Amount in Words */}
// //           <div>
// //             <p className="text-xs font-semibold text-brand uppercase tracking-wide mb-1.5">Terms & Conditions</p>
// //             <p className="text-xs text-gray-500 whitespace-pre-line mb-4">{businessSettings.defaultTerms}</p>

// //             <p className="text-xs font-semibold text-brand uppercase tracking-wide mb-1">Total Amount (in words)</p>
// //             <p className="text-xs text-gray-700 italic">{numberToWords(grandTotal)}</p>
// //           </div>

// //           {/* Right: Totals Box */}
// //           <div className="bg-paper rounded-xl p-4 text-sm space-y-1.5">
// //             <div className="flex justify-between text-gray-600">
// //               <span>Taxable Amount</span><span>₹{subtotal.toLocaleString("en-IN")}</span>
// //             </div>
// //             {isSameState ? (
// //               <>
// //                 <div className="flex justify-between text-gray-600"><span>CGST</span><span>₹{(gstTotal / 2).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div>
// //                 <div className="flex justify-between text-gray-600"><span>SGST</span><span>₹{(gstTotal / 2).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div>
// //               </>
// //             ) : (
// //               <div className="flex justify-between text-gray-600"><span>IGST</span><span>₹{gstTotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div>
// //             )}
// //             <div className="flex justify-between font-bold text-ink border-t border-gray-200 pt-1.5 mt-1.5">
// //               <span>Total Amount</span><span>₹{grandTotal.toLocaleString("en-IN")}</span>
// //             </div>
// //             {type === "sales" && (
// //               <>
// //                 <div className="flex justify-between text-status-paid">
// //                   <span>Received Amount</span><span>₹{amountReceived.toLocaleString("en-IN")}</span>
// //                 </div>
// //                 <div className="flex justify-between font-semibold text-status-overdue">
// //                   <span>Balance</span><span>₹{balance.toLocaleString("en-IN")}</span>
// //                 </div>
// //               </>
// //             )}
// //           </div>
// //         </div>

// //         {/* Bank Details + QR (sales only) */}
// //         {type === "sales" && (businessSettings.bankName || businessSettings.paymentQrCode) && (
// //           <div className="flex justify-between items-start border-t border-gray-200 pt-4 mt-5 text-xs">
// //             <div>
// //               <p className="font-semibold text-brand uppercase tracking-wide mb-1">Bank Details</p>
// //               {businessSettings.accountHolderName && <p>A/C Name: {businessSettings.accountHolderName}</p>}
// //               {businessSettings.bankName && <p>Bank: {businessSettings.bankName}</p>}
// //               {businessSettings.accountNumber && <p>A/C No: {businessSettings.accountNumber}</p>}
// //               {businessSettings.ifscCode && <p>IFSC: {businessSettings.ifscCode}</p>}
// //             </div>
// //             {businessSettings.paymentQrCode && (
// //               <div className="text-center">
// //                 <img src={businessSettings.paymentQrCode} alt="QR" className="w-20 h-20 object-contain" />
// //                 <p className="text-[10px] mt-0.5">Scan & Pay</p>
// //               </div>
// //             )}
// //           </div>
// //         )}

// //         {/* Signature */}
// //         <div className="flex justify-end mt-6">
// //           <div className="text-center">
// //             {businessSettings.signature ? (
// //               <img src={businessSettings.signature} alt="Signature" className="w-32 h-14 object-contain" />
// //             ) : (
// //               <div className="w-32 h-14 border-b-2 border-brand" />
// //             )}
// //             <p className="text-xs mt-1 font-medium text-ink">Authorized Signatory</p>
// //             <p className="text-xs text-gray-500">For {businessSettings.businessName || ""}</p>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="bg-brand-light text-center py-2 text-xs text-brand font-medium">
// //         Thank you for your business!
// //       </div>
// //     </div>
// //   );
// // }




// import { useBusiness } from "../../context/BusinessContext";
// import { stateCodeMap } from "../../data/dummyData";
// import { numberToWords } from "../../utils/numberToWords";

// export default function ColorfulTemplate({ invoice, party, lines, type = "sales" }) {
//   const { businessSettings } = useBusiness();
//   if (!businessSettings) return null;

//   const isSameState = party?.state === businessSettings.state;

//   const subtotal = lines.reduce((sum, l) => sum + l.qty * l.rate, 0);
//   const gstTotal = lines.reduce((sum, l) => sum + (l.qty * l.rate * l.gstPercent) / 100, 0);
//   const grandTotal = subtotal + gstTotal;
//   const amountReceived = invoice.amountReceived ?? invoice.amountPaid ?? 0;
//   const balance = grandTotal - amountReceived;

//   const docTitle =
//     type === "sales" ? "TAX INVOICE" :
//     type === "purchase" ? "PURCHASE INVOICE" :
//     type === "purchaseOrder" ? "PURCHASE ORDER" :
//     "QUOTATION";
//   const partyLabel = (type === "purchase" || type === "purchaseOrder") ? "Bill From" : "Bill To";
//   const docNumber = invoice.invoiceNo || invoice.purchaseNo || invoice.quotationNo || invoice.poNo;

//   return (
//     <div className="bg-white max-w-3xl mx-auto" style={{ fontFamily: "Poppins, Arial, sans-serif" }}>
//       {/* Colorful Header Band */}
//       <div className="bg-brand text-white px-8 py-6 flex justify-between items-start">
//         <div>
//           <p className="text-2xl font-bold">{businessSettings.businessName}</p>
//           <p className="text-xs opacity-90 mt-1">{businessSettings.phone}</p>
//           <p className="text-xs opacity-90">{businessSettings.state}, State Code: {stateCodeMap[businessSettings.state]}</p>
//         </div>
//         <div className="text-right">
//           <p className="text-xl font-bold tracking-wide">{docTitle}</p>
//           <p className="text-[10px] bg-white/20 px-2 py-0.5 rounded mt-1 inline-block">ORIGINAL FOR RECIPIENT</p>
//         </div>
//       </div>

//       <div className="px-8 py-6">
//         {/* Invoice Info + Party */}
//         <div className="grid grid-cols-2 gap-6 mb-5">
//           <div>
//             <p className="text-xs font-semibold text-brand uppercase tracking-wide mb-1">{partyLabel}</p>
//             <p className="font-semibold text-ink">{party?.name || "Cash Sale"}</p>
//             <p className="text-xs text-gray-500 mt-0.5">Mobile: {party?.mobile || businessSettings.phone}</p>
//             {party?.gstin && <p className="text-xs text-gray-500">GSTIN: {party.gstin}</p>}
//           </div>
//           <div className="text-right">
//             <p className="text-xs text-gray-500">Invoice No.</p>
//             <p className="font-semibold text-ink">{docNumber}</p>
//             <p className="text-xs text-gray-500 mt-2">Invoice Date</p>
//             <p className="font-semibold text-ink">{new Date(invoice.date).toLocaleDateString("en-GB")}</p>
//           </div>
//         </div>

//         {/* Items Table — Colorful Header */}
//         <table className="w-full text-sm border-collapse mb-4">
//           <thead>
//             <tr className="bg-brand-light text-brand">
//               <th className="text-left py-2 px-2 font-semibold rounded-l-lg">No.</th>
//               <th className="text-left py-2 px-2 font-semibold">Items</th>
//               <th className="text-center py-2 px-2 font-semibold">Qty.</th>
//               <th className="text-right py-2 px-2 font-semibold">Rate</th>
//               <th className="text-right py-2 px-2 font-semibold">Tax</th>
//               <th className="text-right py-2 px-2 font-semibold rounded-r-lg">Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {lines.map((line, idx) => {
//               const lineTotal = line.qty * line.rate;
//               const lineTax = (lineTotal * line.gstPercent) / 100;
//               return (
//                 <tr key={idx} className="border-b border-gray-100">
//                   <td className="py-2 px-2 text-gray-500">{idx + 1}</td>
//                   <td className="py-2 px-2 font-medium text-ink">{line.name}</td>
//                   <td className="py-2 px-2 text-center text-gray-600">{line.qty} {line.unit}</td>
//                   <td className="py-2 px-2 text-right text-gray-600">{line.rate.toLocaleString("en-IN")}</td>
//                   <td className="py-2 px-2 text-right text-gray-600">{lineTax.toLocaleString("en-IN", { maximumFractionDigits: 0 })} ({line.gstPercent}%)</td>
//                   <td className="py-2 px-2 text-right font-semibold text-ink">{(lineTotal + lineTax).toLocaleString("en-IN")}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>

//         <div className="grid grid-cols-2 gap-8">
//           {/* Left: Terms + Amount in Words */}
//           <div>
//             <p className="text-xs font-semibold text-brand uppercase tracking-wide mb-1.5">Terms & Conditions</p>
//             <p className="text-xs text-gray-500 whitespace-pre-line mb-4">{businessSettings.defaultTerms}</p>

//             <p className="text-xs font-semibold text-brand uppercase tracking-wide mb-1">Total Amount (in words)</p>
//             <p className="text-xs text-gray-700 italic">{numberToWords(grandTotal)}</p>
//           </div>

//           {/* Right: Totals Box */}
//           <div className="bg-paper rounded-xl p-4 text-sm space-y-1.5">
//             <div className="flex justify-between text-gray-600">
//               <span>Taxable Amount</span><span>₹{subtotal.toLocaleString("en-IN")}</span>
//             </div>
//             {isSameState ? (
//               <>
//                 <div className="flex justify-between text-gray-600"><span>CGST</span><span>₹{(gstTotal / 2).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div>
//                 <div className="flex justify-between text-gray-600"><span>SGST</span><span>₹{(gstTotal / 2).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div>
//               </>
//             ) : (
//               <div className="flex justify-between text-gray-600"><span>IGST</span><span>₹{gstTotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div>
//             )}
//             <div className="flex justify-between font-bold text-ink border-t border-gray-200 pt-1.5 mt-1.5">
//               <span>Total Amount</span><span>₹{grandTotal.toLocaleString("en-IN")}</span>
//             </div>
//             {type === "sales" && (
//               <>
//                 <div className="flex justify-between text-status-paid">
//                   <span>Received Amount</span><span>₹{amountReceived.toLocaleString("en-IN")}</span>
//                 </div>
//                 <div className="flex justify-between font-semibold text-status-overdue">
//                   <span>Balance</span><span>₹{balance.toLocaleString("en-IN")}</span>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Bank Details + QR (sales only) */}
//         {type === "sales" && (businessSettings.bankName || businessSettings.paymentQrCode) && (
//           <div className="flex justify-between items-start border-t border-gray-200 pt-4 mt-5 text-xs">
//             <div>
//               <p className="font-semibold text-brand uppercase tracking-wide mb-1">Bank Details</p>
//               {businessSettings.accountHolderName && <p>A/C Name: {businessSettings.accountHolderName}</p>}
//               {businessSettings.bankName && <p>Bank: {businessSettings.bankName}</p>}
//               {businessSettings.accountNumber && <p>A/C No: {businessSettings.accountNumber}</p>}
//               {businessSettings.ifscCode && <p>IFSC: {businessSettings.ifscCode}</p>}
//             </div>
//             {businessSettings.paymentQrCode && (
//               <div className="text-center">
//                 <img src={businessSettings.paymentQrCode} alt="QR" className="w-20 h-20 object-contain" />
//                 <p className="text-[10px] mt-0.5">Scan & Pay</p>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Signature */}
//         <div className="flex justify-end mt-6">
//           <div className="text-center">
//             {businessSettings.signature ? (
//               <img src={businessSettings.signature} alt="Signature" className="w-32 h-14 object-contain" />
//             ) : (
//               <div className="w-32 h-14 border-b-2 border-brand" />
//             )}
//             <p className="text-xs mt-1 font-medium text-ink">Authorized Signatory</p>
//             <p className="text-xs text-gray-500">For {businessSettings.businessName}</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-brand-light text-center py-2 text-xs text-brand font-medium">
//         Thank you for your business!
//       </div>
//     </div>
//   );
// }




import { useBusiness } from "../../context/BusinessContext";
import { stateCodeMap } from "../../data/dummyData";
import { numberToWords } from "../../utils/numberToWords";

export default function ColorfulTemplate({ invoice, party, lines, type = "sales" }) {
  const { businessSettings } = useBusiness();
  if (!businessSettings) return null;

  const isSameState = party?.state === businessSettings.state;

  const subtotal = lines.reduce((sum, l) => sum + l.qty * l.rate, 0);
  const gstTotal = lines.reduce((sum, l) => sum + (l.qty * l.rate * l.gstPercent) / 100, 0);
  const grandTotal = subtotal + gstTotal;
  const amountReceived = invoice.amountReceived ?? invoice.amountPaid ?? 0;
  const balance = grandTotal - amountReceived;

  const docTitle =
    type === "sales" ? "TAX INVOICE" :
    type === "purchase" ? "PURCHASE INVOICE" :
    type === "purchaseOrder" ? "PURCHASE ORDER" :
    "QUOTATION";
  const partyLabel = (type === "purchase" || type === "purchaseOrder") ? "Bill From" : "Bill To";
  const docNumber = invoice.invoiceNo || invoice.purchaseNo || invoice.quotationNo || invoice.poNo;

  return (
    <div className="bg-white max-w-3xl mx-auto" style={{ fontFamily: "Poppins, Arial, sans-serif" }}>
      {/* Colorful Header Band */}
      <div className="bg-brand text-white px-8 py-6 flex justify-between items-start">
        <div className="flex items-center gap-3">
          {businessSettings.logo ? (
            <img
              src={businessSettings.logo}
              alt="Logo"
              className="w-14 h-14 object-contain bg-white rounded-lg p-1 shrink-0"
            />
          ) : (
            <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center font-bold text-xl shrink-0">
              {businessSettings.businessName?.charAt(0)}
            </div>
          )}
          <div>
            <p className="text-2xl font-bold">{businessSettings.businessName}</p>
            <p className="text-xs opacity-90 mt-1">{businessSettings.phone}</p>
            <p className="text-xs opacity-90">{businessSettings.state}, State Code: {stateCodeMap[businessSettings.state]}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold tracking-wide">{docTitle}</p>
          <p className="text-[10px] bg-white/20 px-2 py-0.5 rounded mt-1 inline-block">ORIGINAL FOR RECIPIENT</p>
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Invoice Info + Party */}
        <div className="grid grid-cols-2 gap-6 mb-5">
          <div>
            <p className="text-xs font-semibold text-brand uppercase tracking-wide mb-1">{partyLabel}</p>
            <p className="font-semibold text-ink">{party?.name || "Cash Sale"}</p>
            <p className="text-xs text-gray-500 mt-0.5">Mobile: {party?.mobile || businessSettings.phone}</p>
            {party?.gstin && <p className="text-xs text-gray-500">GSTIN: {party.gstin}</p>}
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Invoice No.</p>
            <p className="font-semibold text-ink">{docNumber}</p>
            <p className="text-xs text-gray-500 mt-2">Invoice Date</p>
            <p className="font-semibold text-ink">{new Date(invoice.date).toLocaleDateString("en-GB")}</p>
          </div>
        </div>

        {/* Items Table — Colorful Header */}
        <table className="w-full text-sm border-collapse mb-4">
          <thead>
            <tr className="bg-brand-light text-brand">
              <th className="text-left py-2 px-2 font-semibold rounded-l-lg">No.</th>
              <th className="text-left py-2 px-2 font-semibold">Items</th>
              <th className="text-center py-2 px-2 font-semibold">Qty.</th>
              <th className="text-right py-2 px-2 font-semibold">Rate</th>
              <th className="text-right py-2 px-2 font-semibold">Tax</th>
              <th className="text-right py-2 px-2 font-semibold rounded-r-lg">Total</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line, idx) => {
              const lineTotal = line.qty * line.rate;
              const lineTax = (lineTotal * line.gstPercent) / 100;
              return (
                <tr key={idx} className="border-b border-gray-100">
                  <td className="py-2 px-2 text-gray-500">{idx + 1}</td>
                  <td className="py-2 px-2 font-medium text-ink">{line.name}</td>
                  <td className="py-2 px-2 text-center text-gray-600">{line.qty} {line.unit}</td>
                  <td className="py-2 px-2 text-right text-gray-600">{line.rate.toLocaleString("en-IN")}</td>
                  <td className="py-2 px-2 text-right text-gray-600">{lineTax.toLocaleString("en-IN", { maximumFractionDigits: 0 })} ({line.gstPercent}%)</td>
                  <td className="py-2 px-2 text-right font-semibold text-ink">{(lineTotal + lineTax).toLocaleString("en-IN")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="grid grid-cols-2 gap-8">
          {/* Left: Terms + Amount in Words */}
          <div>
            <p className="text-xs font-semibold text-brand uppercase tracking-wide mb-1.5">Terms & Conditions</p>
            <p className="text-xs text-gray-500 whitespace-pre-line mb-4">{businessSettings.defaultTerms}</p>

            <p className="text-xs font-semibold text-brand uppercase tracking-wide mb-1">Total Amount (in words)</p>
            <p className="text-xs text-gray-700 italic">{numberToWords(grandTotal)}</p>
          </div>

          {/* Right: Totals Box */}
          <div className="bg-paper rounded-xl p-4 text-sm space-y-1.5">
            <div className="flex justify-between text-gray-600">
              <span>Taxable Amount</span><span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            {isSameState ? (
              <>
                <div className="flex justify-between text-gray-600"><span>CGST</span><span>₹{(gstTotal / 2).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div>
                <div className="flex justify-between text-gray-600"><span>SGST</span><span>₹{(gstTotal / 2).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div>
              </>
            ) : (
              <div className="flex justify-between text-gray-600"><span>IGST</span><span>₹{gstTotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div>
            )}
            <div className="flex justify-between font-bold text-ink border-t border-gray-200 pt-1.5 mt-1.5">
              <span>Total Amount</span><span>₹{grandTotal.toLocaleString("en-IN")}</span>
            </div>
            {type === "sales" && (
              <>
                <div className="flex justify-between text-status-paid">
                  <span>Received Amount</span><span>₹{amountReceived.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between font-semibold text-status-overdue">
                  <span>Balance</span><span>₹{balance.toLocaleString("en-IN")}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Bank Details + QR (sales only) */}
        {type === "sales" && (businessSettings.bankName || businessSettings.paymentQrCode) && (
          <div className="flex justify-between items-start border-t border-gray-200 pt-4 mt-5 text-xs">
            <div>
              <p className="font-semibold text-brand uppercase tracking-wide mb-1">Bank Details</p>
              {businessSettings.accountHolderName && <p>A/C Name: {businessSettings.accountHolderName}</p>}
              {businessSettings.bankName && <p>Bank: {businessSettings.bankName}</p>}
              {businessSettings.accountNumber && <p>A/C No: {businessSettings.accountNumber}</p>}
              {businessSettings.ifscCode && <p>IFSC: {businessSettings.ifscCode}</p>}
            </div>
            {businessSettings.paymentQrCode && (
              <div className="text-center">
                <img src={businessSettings.paymentQrCode} alt="QR" className="w-20 h-20 object-contain" />
                <p className="text-[10px] mt-0.5">Scan & Pay</p>
              </div>
            )}
          </div>
        )}

        {/* Signature */}
        <div className="flex justify-end mt-6">
          <div className="text-center">
            {businessSettings.signature ? (
              <img src={businessSettings.signature} alt="Signature" className="w-32 h-14 object-contain" />
            ) : (
              <div className="w-32 h-14 border-b-2 border-brand" />
            )}
            <p className="text-xs mt-1 font-medium text-ink">Authorized Signatory</p>
            <p className="text-xs text-gray-500">For {businessSettings.businessName}</p>
          </div>
        </div>
      </div>

      <div className="bg-brand-light text-center py-2 text-xs text-brand font-medium">
        Thank you for your business!
      </div>
    </div>
  );
}