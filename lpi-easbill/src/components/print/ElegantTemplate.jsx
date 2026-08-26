// // import { businessSettings, stateCodeMap } from "../../data/dummyData";
// // import { numberToWords } from "../../utils/numberToWords";

// // export default function ElegantTemplate({ invoice, party, lines, type = "sales" }) {
// //   const isSameState = party?.state === businessSettings.state;

// //   const subtotal = lines.reduce((sum, l) => sum + l.qty * l.rate, 0);
// //   const gstTotal = lines.reduce((sum, l) => sum + (l.qty * l.rate * l.gstPercent) / 100, 0);
// //   const grandTotal = subtotal + gstTotal;
// //   const totalQty = lines.reduce((sum, l) => sum + l.qty, 0);
// //   const amountReceived = invoice.amountReceived ?? invoice.amountPaid ?? 0;
// //   const balance = grandTotal - amountReceived;

// //   const docTitle =
// //     type === "sales" ? "TAX INVOICE" :
// //     type === "purchase" ? "PURCHASE INVOICE" :
// //     type === "purchaseOrder" ? "PURCHASE ORDER" :
// //     "QUOTATION";
// //   const partyLabel = (type === "purchase" || type === "purchaseOrder") ? "Bill From" : "Bill To";
// //   const invoiceNoValue = invoice.invoiceNo || invoice.purchaseNo || invoice.quotationNo || invoice.poNo;

// //   return (
// //     <div className="bg-white max-w-3xl mx-auto p-2" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
// //       {/* Outer decorative border */}
// //       <div className="border-2 border-amber-700 relative">
// //         {/* Corner ornaments */}
// //         <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-amber-700" />
// //         <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-amber-700" />
// //         <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-amber-700" />
// //         <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-amber-700" />

// //         <div className="p-8">
// //           {/* Header */}
// //           <div className="flex justify-between items-start pb-4 border-b border-amber-700">
// //             <div>
// //               <p className="text-2xl font-bold text-ink">{businessSettings.businessName}</p>
// //               <p className="text-xs text-gray-600 mt-1.5 flex items-center gap-1">
// //                 📞 {businessSettings.phone}
// //               </p>
// //               <p className="text-xs text-gray-600 flex items-center gap-1">
// //                 📍 {businessSettings.state}{businessSettings.city ? `, ${businessSettings.city}` : ""}
// //               </p>
// //               {businessSettings.isGstRegistered && (
// //                 <p className="text-xs text-gray-600 mt-1">GSTIN: {businessSettings.gstin}</p>
// //               )}
// //             </div>
// //             <div className="text-right">
// //               <p className="text-lg font-bold tracking-wide text-ink">{docTitle}</p>
// //               <p className="text-[9px] border border-gray-400 px-2 py-0.5 mt-1 inline-block text-gray-600">
// //                 ORIGINAL FOR RECIPIENT
// //               </p>
// //             </div>
// //           </div>

// //           {/* Invoice No / Date */}
// //           <div className="grid grid-cols-2 gap-4 py-3 border-b border-amber-700 text-xs">
// //             <div>
// //               <p className="text-gray-500 font-semibold">Invoice No.</p>
// //               <p className="text-ink font-medium mt-0.5">{invoiceNoValue}</p>
// //             </div>
// //             <div>
// //               <p className="text-gray-500 font-semibold">Invoice Date</p>
// //               <p className="text-ink font-medium mt-0.5">{new Date(invoice.date).toLocaleDateString("en-GB")}</p>
// //             </div>
// //           </div>

// //           {/* Bill To */}
// //           <div className="py-3 border-b border-amber-700 text-xs">
// //             <p className="text-gray-500 font-semibold mb-1">{partyLabel}</p>
// //             <p className="text-ink font-semibold">{party?.name || "Cash Sale"}</p>
// //             <p className="text-gray-600 mt-0.5">Mobile: {party?.mobile || businessSettings.phone}</p>
// //             {party?.gstin && <p className="text-gray-600">GSTIN: {party.gstin}</p>}
// //             {party?.state && (
// //               <p className="text-gray-600">State Code: {stateCodeMap[party.state]}</p>
// //             )}
// //           </div>

// //           {/* Items Table */}
// //           <table className="w-full text-xs mt-4">
// //             <thead>
// //               <tr className="border-b border-amber-700 text-gray-600">
// //                 <th className="text-left py-2 font-semibold">No</th>
// //                 <th className="text-left py-2 font-semibold">Items</th>
// //                 <th className="text-center py-2 font-semibold">Qty.</th>
// //                 <th className="text-right py-2 font-semibold">Rate</th>
// //                 <th className="text-right py-2 font-semibold">Tax</th>
// //                 <th className="text-right py-2 font-semibold">Total</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {lines.map((line, idx) => {
// //                 const lineTotal = line.qty * line.rate;
// //                 const lineTax = (lineTotal * line.gstPercent) / 100;
// //                 return (
// //                   <tr key={idx}>
// //                     <td className="py-2 text-gray-500">{idx + 1}</td>
// //                     <td className="py-2 text-ink">{line.name}</td>
// //                     <td className="py-2 text-center text-gray-600">{line.qty} {line.unit}</td>
// //                     <td className="py-2 text-right text-gray-600">{line.rate.toLocaleString("en-IN")}</td>
// //                     <td className="py-2 text-right text-gray-600">
// //                       {lineTax.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
// //                       <span className="text-[9px]"> ({line.gstPercent}%)</span>
// //                     </td>
// //                     <td className="py-2 text-right font-medium text-ink">{(lineTotal + lineTax).toLocaleString("en-IN")}</td>
// //                   </tr>
// //                 );
// //               })}
// //             </tbody>
// //           </table>

// //           {/* Subtotal Row — shaded */}
// //           <div className="bg-amber-50 flex justify-between px-2 py-2 mt-1 text-xs font-semibold text-ink border-y border-amber-700">
// //             <span>SUBTOTAL</span>
// //             <div className="flex gap-8">
// //               <span>{totalQty}</span>
// //               <span>₹{(subtotal / totalQty || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
// //               <span>₹{grandTotal.toLocaleString("en-IN")}</span>
// //             </div>
// //           </div>

// //           {/* Terms + Totals */}
// //           <div className="grid grid-cols-2 gap-8 mt-4">
// //             <div className="text-xs">
// //               <p className="font-semibold text-ink mb-1">Terms & Conditions</p>
// //               <p className="text-gray-600 whitespace-pre-line leading-relaxed">{businessSettings.defaultTerms}</p>
// //             </div>

// //             <div className="text-xs space-y-1.5">
// //               <div className="flex justify-between text-gray-600">
// //                 <span>Taxable Amount</span><span>₹{subtotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
// //               </div>
// //               {isSameState ? (
// //                 <>
// //                   <div className="flex justify-between text-gray-600"><span>CGST @9%</span><span>₹{(gstTotal / 2).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div>
// //                   <div className="flex justify-between text-gray-600"><span>SGST @9%</span><span>₹{(gstTotal / 2).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div>
// //                 </>
// //               ) : (
// //                 <div className="flex justify-between text-gray-600"><span>IGST</span><span>₹{gstTotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div>
// //               )}
// //               <div className="flex justify-between font-bold text-ink border-t border-amber-700 pt-1.5 mt-1.5">
// //                 <span>Total Amount</span><span>₹{grandTotal.toLocaleString("en-IN")}</span>
// //               </div>
// //               {type === "sales" && (
// //                 <>
// //                   <div className="flex justify-between text-gray-600 pt-1">
// //                     <span>Received Amount</span><span>₹{amountReceived.toLocaleString("en-IN")}</span>
// //                   </div>
// //                   <div className="flex justify-between font-bold text-ink">
// //                     <span>Balance</span><span>₹{balance.toLocaleString("en-IN")}</span>
// //                   </div>
// //                 </>
// //               )}
// //             </div>
// //           </div>

// //           {/* Amount in Words */}
// //           <div className="mt-4 text-xs">
// //             <p className="font-semibold text-ink">Total Amount (in words)</p>
// //             <p className="text-gray-600 mt-0.5">{numberToWords(grandTotal)}</p>
// //           </div>

// //           {/* Bank Details (sales only) */}
// //           {type === "sales" && (businessSettings.bankName || businessSettings.paymentQrCode) && (
// //             <div className="flex justify-between items-start border-t border-amber-700 pt-3 mt-4 text-xs">
// //               <div>
// //                 <p className="font-semibold text-ink mb-1">Bank Details</p>
// //                 {businessSettings.accountHolderName && <p className="text-gray-600">A/C Name: {businessSettings.accountHolderName}</p>}
// //                 {businessSettings.bankName && <p className="text-gray-600">Bank: {businessSettings.bankName}</p>}
// //                 {businessSettings.accountNumber && <p className="text-gray-600">A/C No: {businessSettings.accountNumber}</p>}
// //                 {businessSettings.ifscCode && <p className="text-gray-600">IFSC: {businessSettings.ifscCode}</p>}
// //               </div>
// //               {businessSettings.paymentQrCode && (
// //                 <div className="text-center">
// //                   <img src={businessSettings.paymentQrCode} alt="QR" className="w-20 h-20 object-contain" />
// //                   <p className="text-[9px] mt-0.5 text-gray-500">Scan & Pay</p>
// //                 </div>
// //               )}
// //             </div>
// //           )}

// //           {/* Signature Box */}
// //           <div className="flex justify-end mt-6">
// //             <div className="border border-gray-300 rounded px-8 py-6 text-center min-w-[180px]">
// //               {businessSettings.signature ? (
// //                 <img src={businessSettings.signature} alt="Signature" className="w-28 h-12 object-contain mx-auto mb-1" />
// //               ) : (
// //                 <div className="h-10" />
// //               )}
// //               <p className="text-xs font-medium text-ink">Signature</p>
// //               <p className="text-xs text-gray-500">{businessSettings.businessName}</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }





// import { Phone, MapPin } from "lucide-react";
// import { stateCodeMap } from "../../data/dummyData";
// import { numberToWords } from "../../utils/numberToWords";

// export default function ElegantTemplate({ invoice, party, lines, type = "sales", business }) {
//   const businessSettings = business || {};

//   const isSameState = party?.state === businessSettings.state;

//   const subtotal = lines.reduce((sum, l) => sum + l.qty * l.rate, 0);
//   const gstTotal = lines.reduce((sum, l) => sum + (l.qty * l.rate * l.gstPercent) / 100, 0);
//   const grandTotal = subtotal + gstTotal;
//   const totalQty = lines.reduce((sum, l) => sum + l.qty, 0);
//   const amountReceived = invoice.amountReceived ?? invoice.amountPaid ?? 0;
//   const balance = grandTotal - amountReceived;

//   const docTitle =
//     type === "sales" ? "TAX INVOICE" :
//     type === "purchase" ? "PURCHASE INVOICE" :
//     type === "purchaseOrder" ? "PURCHASE ORDER" :
//     "QUOTATION";
//   const partyLabel = (type === "purchase" || type === "purchaseOrder") ? "Bill From" : "Bill To";
//   const invoiceNoValue = invoice.invoiceNo || invoice.purchaseNo || invoice.quotationNo || invoice.poNo;

//   return (
//     <div className="bg-white max-w-3xl mx-auto p-2" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
//       {/* Outer decorative border */}
//       <div className="border-2 border-amber-700 relative">
//         {/* Corner ornaments */}
//         <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-amber-700" />
//         <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-amber-700" />
//         <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-amber-700" />
//         <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-amber-700" />

//         <div className="p-8">
//           {/* Header */}
//           <div className="flex justify-between items-start pb-4 border-b border-amber-700">
//             <div className="flex items-start gap-3">
//               {businessSettings.logo ? (
//                 <img
//                   src={businessSettings.logo}
//                   alt="Logo"
//                   className="w-14 h-14 object-contain border border-amber-700/40 rounded p-1 shrink-0"
//                 />
//               ) : (
//                 <div className="w-14 h-14 border border-amber-700/40 rounded flex items-center justify-center font-bold text-xl text-amber-700 shrink-0">
//                   {businessSettings.businessName ? businessSettings.businessName.charAt(0) : "?"}
//                 </div>
//               )}
//               <div>
//                 <p className="text-2xl font-bold text-ink">{businessSettings.businessName || "Business Name"}</p>
//                 <p className="text-xs text-gray-600 mt-1.5 flex items-center gap-1">
//                   <Phone size={11} className="text-amber-700" /> {businessSettings.phone}
//                 </p>
//                 <p className="text-xs text-gray-600 flex items-center gap-1">
//                   <MapPin size={11} className="text-amber-700" /> {businessSettings.state}{businessSettings.city ? `, ${businessSettings.city}` : ""}
//                 </p>
//                 {businessSettings.isGstRegistered && (
//                   <p className="text-xs text-gray-600 mt-1">GSTIN: {businessSettings.gstin}</p>
//                 )}
//               </div>
//             </div>
//             <div className="text-right">
//               <p className="text-lg font-bold tracking-wide text-ink">{docTitle}</p>
//               <p className="text-[9px] border border-gray-400 px-2 py-0.5 mt-1 inline-block text-gray-600">
//                 ORIGINAL FOR RECIPIENT
//               </p>
//             </div>
//           </div>

//           {/* Invoice No / Date */}
//           <div className="grid grid-cols-2 gap-4 py-3 border-b border-amber-700 text-xs">
//             <div>
//               <p className="text-gray-500 font-semibold">Invoice No.</p>
//               <p className="text-ink font-medium mt-0.5">{invoiceNoValue}</p>
//             </div>
//             <div>
//               <p className="text-gray-500 font-semibold">Invoice Date</p>
//               <p className="text-ink font-medium mt-0.5">{new Date(invoice.date).toLocaleDateString("en-GB")}</p>
//             </div>
//           </div>

//           {/* Bill To */}
//           <div className="py-3 border-b border-amber-700 text-xs">
//             <p className="text-gray-500 font-semibold mb-1">{partyLabel}</p>
//             <p className="text-ink font-semibold">{party?.name || "Cash Sale"}</p>
//             <p className="text-gray-600 mt-0.5">Mobile: {party?.mobile || businessSettings.phone}</p>
//             {party?.gstin && <p className="text-gray-600">GSTIN: {party.gstin}</p>}
//             {party?.state && (
//               <p className="text-gray-600">State Code: {stateCodeMap[party.state]}</p>
//             )}
//           </div>

//           {/* Items Table */}
//           <table className="w-full text-xs mt-4">
//             <thead>
//               <tr className="border-b border-amber-700 text-gray-600">
//                 <th className="text-left py-2 font-semibold">No</th>
//                 <th className="text-left py-2 font-semibold">Items</th>
//                 <th className="text-center py-2 font-semibold">Qty.</th>
//                 <th className="text-right py-2 font-semibold">Rate</th>
//                 <th className="text-right py-2 font-semibold">Tax</th>
//                 <th className="text-right py-2 font-semibold">Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               {lines.map((line, idx) => {
//                 const lineTotal = line.qty * line.rate;
//                 const lineTax = (lineTotal * line.gstPercent) / 100;
//                 return (
//                   <tr key={idx}>
//                     <td className="py-2 text-gray-500">{idx + 1}</td>
//                     <td className="py-2 text-ink">{line.name}</td>
//                     <td className="py-2 text-center text-gray-600">{line.qty} {line.unit}</td>
//                     <td className="py-2 text-right text-gray-600">{line.rate.toLocaleString("en-IN")}</td>
//                     <td className="py-2 text-right text-gray-600">
//                       {lineTax.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
//                       <span className="text-[9px]"> ({line.gstPercent}%)</span>
//                     </td>
//                     <td className="py-2 text-right font-medium text-ink">{(lineTotal + lineTax).toLocaleString("en-IN")}</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>

//           {/* Subtotal Row — shaded */}
//           <div className="bg-amber-50 flex justify-between px-2 py-2 mt-1 text-xs font-semibold text-ink border-y border-amber-700">
//             <span>SUBTOTAL</span>
//             <div className="flex gap-8">
//               <span>{totalQty}</span>
//               <span>₹{(subtotal / totalQty || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
//               <span>₹{grandTotal.toLocaleString("en-IN")}</span>
//             </div>
//           </div>

//           {/* Terms + Totals */}
//           <div className="grid grid-cols-2 gap-8 mt-4">
//             <div className="text-xs">
//               <p className="font-semibold text-ink mb-1">Terms & Conditions</p>
//               <p className="text-gray-600 whitespace-pre-line leading-relaxed">{businessSettings.defaultTerms}</p>
//             </div>

//             <div className="text-xs space-y-1.5">
//               <div className="flex justify-between text-gray-600">
//                 <span>Taxable Amount</span><span>₹{subtotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
//               </div>
//               {isSameState ? (
//                 <>
//                   <div className="flex justify-between text-gray-600"><span>CGST @9%</span><span>₹{(gstTotal / 2).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div>
//                   <div className="flex justify-between text-gray-600"><span>SGST @9%</span><span>₹{(gstTotal / 2).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div>
//                 </>
//               ) : (
//                 <div className="flex justify-between text-gray-600"><span>IGST</span><span>₹{gstTotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div>
//               )}
//               <div className="flex justify-between font-bold text-ink border-t border-amber-700 pt-1.5 mt-1.5">
//                 <span>Total Amount</span><span>₹{grandTotal.toLocaleString("en-IN")}</span>
//               </div>
//               {type === "sales" && (
//                 <>
//                   <div className="flex justify-between text-gray-600 pt-1">
//                     <span>Received Amount</span><span>₹{amountReceived.toLocaleString("en-IN")}</span>
//                   </div>
//                   <div className="flex justify-between font-bold text-ink">
//                     <span>Balance</span><span>₹{balance.toLocaleString("en-IN")}</span>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Amount in Words */}
//           <div className="mt-4 text-xs">
//             <p className="font-semibold text-ink">Total Amount (in words)</p>
//             <p className="text-gray-600 mt-0.5">{numberToWords(grandTotal)}</p>
//           </div>

//           {/* Bank Details (sales only) */}
//           {type === "sales" && (businessSettings.bankName || businessSettings.paymentQrCode) && (
//             <div className="flex justify-between items-start border-t border-amber-700 pt-3 mt-4 text-xs">
//               <div>
//                 <p className="font-semibold text-ink mb-1">Bank Details</p>
//                 {businessSettings.accountHolderName && <p className="text-gray-600">A/C Name: {businessSettings.accountHolderName}</p>}
//                 {businessSettings.bankName && <p className="text-gray-600">Bank: {businessSettings.bankName}</p>}
//                 {businessSettings.accountNumber && <p className="text-gray-600">A/C No: {businessSettings.accountNumber}</p>}
//                 {businessSettings.ifscCode && <p className="text-gray-600">IFSC: {businessSettings.ifscCode}</p>}
//               </div>
//               {businessSettings.paymentQrCode && (
//                 <div className="text-center">
//                   <img src={businessSettings.paymentQrCode} alt="QR" className="w-20 h-20 object-contain" />
//                   <p className="text-[9px] mt-0.5 text-gray-500">Scan & Pay</p>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Signature Box */}
//           <div className="flex justify-end mt-6">
//             <div className="border border-gray-300 rounded px-8 py-6 text-center min-w-45">
//               {businessSettings.signature ? (
//                 <img src={businessSettings.signature} alt="Signature" className="w-28 h-12 object-contain mx-auto mb-1" />
//               ) : (
//                 <div className="h-10" />
//               )}
//               <p className="text-xs font-medium text-ink">Signature</p>
//               <p className="text-xs text-gray-500">{businessSettings.businessName}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// import { useBusiness } from "../../context/BusinessContext";
// import { stateCodeMap } from "../../data/dummyData";
// import { numberToWords } from "../../utils/numberToWords";

// export default function ElegantTemplate({ invoice, party, lines, type = "sales" }) {
//   const { businessSettings } = useBusiness();
//   if (!businessSettings) return null;

//   const isSameState = party?.state === businessSettings.state;

//   const subtotal = lines.reduce((sum, l) => sum + l.qty * l.rate, 0);
//   const gstTotal = lines.reduce((sum, l) => sum + (l.qty * l.rate * l.gstPercent) / 100, 0);
//   const grandTotal = subtotal + gstTotal;
//   const totalQty = lines.reduce((sum, l) => sum + l.qty, 0);
//   const amountReceived = invoice.amountReceived ?? invoice.amountPaid ?? 0;
//   const balance = grandTotal - amountReceived;

//   const docTitle =
//     type === "sales" ? "TAX INVOICE" :
//     type === "purchase" ? "PURCHASE INVOICE" :
//     type === "purchaseOrder" ? "PURCHASE ORDER" :
//     "QUOTATION";
//   const partyLabel = (type === "purchase" || type === "purchaseOrder") ? "Bill From" : "Bill To";
//   const invoiceNoValue = invoice.invoiceNo || invoice.purchaseNo || invoice.quotationNo || invoice.poNo;

//   return (
//     <div className="bg-white max-w-3xl mx-auto p-2" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
//       <div className="border-2 border-amber-700 relative">
//         <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-amber-700" />
//         <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-amber-700" />
//         <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-amber-700" />
//         <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-amber-700" />

//         <div className="p-8">
//           <div className="flex justify-between items-start pb-4 border-b border-amber-700">
//             <div>
//               <p className="text-2xl font-bold text-ink">{businessSettings.businessName}</p>
//               <p className="text-xs text-gray-600 mt-1.5 flex items-center gap-1">
//                 📞 {businessSettings.phone}
//               </p>
//               <p className="text-xs text-gray-600 flex items-center gap-1">
//                 📍 {businessSettings.state}{businessSettings.city ? `, ${businessSettings.city}` : ""}
//               </p>
//               {businessSettings.isGstRegistered && (
//                 <p className="text-xs text-gray-600 mt-1">GSTIN: {businessSettings.gstin}</p>
//               )}
//             </div>
//             <div className="text-right">
//               <p className="text-lg font-bold tracking-wide text-ink">{docTitle}</p>
//               <p className="text-[9px] border border-gray-400 px-2 py-0.5 mt-1 inline-block text-gray-600">
//                 ORIGINAL FOR RECIPIENT
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4 py-3 border-b border-amber-700 text-xs">
//             <div>
//               <p className="text-gray-500 font-semibold">Invoice No.</p>
//               <p className="text-ink font-medium mt-0.5">{invoiceNoValue}</p>
//             </div>
//             <div>
//               <p className="text-gray-500 font-semibold">Invoice Date</p>
//               <p className="text-ink font-medium mt-0.5">{new Date(invoice.date).toLocaleDateString("en-GB")}</p>
//             </div>
//           </div>

//           <div className="py-3 border-b border-amber-700 text-xs">
//             <p className="text-gray-500 font-semibold mb-1">{partyLabel}</p>
//             <p className="text-ink font-semibold">{party?.name || "Cash Sale"}</p>
//             <p className="text-gray-600 mt-0.5">Mobile: {party?.mobile || businessSettings.phone}</p>
//             {party?.gstin && <p className="text-gray-600">GSTIN: {party.gstin}</p>}
//             {party?.state && (
//               <p className="text-gray-600">State Code: {stateCodeMap[party.state]}</p>
//             )}
//           </div>

//           <table className="w-full text-xs mt-4">
//             <thead>
//               <tr className="border-b border-amber-700 text-gray-600">
//                 <th className="text-left py-2 font-semibold">No</th>
//                 <th className="text-left py-2 font-semibold">Items</th>
//                 <th className="text-center py-2 font-semibold">Qty.</th>
//                 <th className="text-right py-2 font-semibold">Rate</th>
//                 <th className="text-right py-2 font-semibold">Tax</th>
//                 <th className="text-right py-2 font-semibold">Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               {lines.map((line, idx) => {
//                 const lineTotal = line.qty * line.rate;
//                 const lineTax = (lineTotal * line.gstPercent) / 100;
//                 return (
//                   <tr key={idx}>
//                     <td className="py-2 text-gray-500">{idx + 1}</td>
//                     <td className="py-2 text-ink">{line.name}</td>
//                     <td className="py-2 text-center text-gray-600">{line.qty} {line.unit}</td>
//                     <td className="py-2 text-right text-gray-600">{line.rate.toLocaleString("en-IN")}</td>
//                     <td className="py-2 text-right text-gray-600">
//                       {lineTax.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
//                       <span className="text-[9px]"> ({line.gstPercent}%)</span>
//                     </td>
//                     <td className="py-2 text-right font-medium text-ink">{(lineTotal + lineTax).toLocaleString("en-IN")}</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>

//           <div className="bg-amber-50 flex justify-between px-2 py-2 mt-1 text-xs font-semibold text-ink border-y border-amber-700">
//             <span>SUBTOTAL</span>
//             <div className="flex gap-8">
//               <span>{totalQty}</span>
//               <span>₹{(subtotal / totalQty || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
//               <span>₹{grandTotal.toLocaleString("en-IN")}</span>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-8 mt-4">
//             <div className="text-xs">
//               <p className="font-semibold text-ink mb-1">Terms & Conditions</p>
//               <p className="text-gray-600 whitespace-pre-line leading-relaxed">{businessSettings.defaultTerms}</p>
//             </div>

//             <div className="text-xs space-y-1.5">
//               <div className="flex justify-between text-gray-600">
//                 <span>Taxable Amount</span><span>₹{subtotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
//               </div>
//               {isSameState ? (
//                 <>
//                   <div className="flex justify-between text-gray-600"><span>CGST @9%</span><span>₹{(gstTotal / 2).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div>
//                   <div className="flex justify-between text-gray-600"><span>SGST @9%</span><span>₹{(gstTotal / 2).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div>
//                 </>
//               ) : (
//                 <div className="flex justify-between text-gray-600"><span>IGST</span><span>₹{gstTotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div>
//               )}
//               <div className="flex justify-between font-bold text-ink border-t border-amber-700 pt-1.5 mt-1.5">
//                 <span>Total Amount</span><span>₹{grandTotal.toLocaleString("en-IN")}</span>
//               </div>
//               {type === "sales" && (
//                 <>
//                   <div className="flex justify-between text-gray-600 pt-1">
//                     <span>Received Amount</span><span>₹{amountReceived.toLocaleString("en-IN")}</span>
//                   </div>
//                   <div className="flex justify-between font-bold text-ink">
//                     <span>Balance</span><span>₹{balance.toLocaleString("en-IN")}</span>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>

//           <div className="mt-4 text-xs">
//             <p className="font-semibold text-ink">Total Amount (in words)</p>
//             <p className="text-gray-600 mt-0.5">{numberToWords(grandTotal)}</p>
//           </div>

//           {type === "sales" && (businessSettings.bankName || businessSettings.paymentQrCode) && (
//             <div className="flex justify-between items-start border-t border-amber-700 pt-3 mt-4 text-xs">
//               <div>
//                 <p className="font-semibold text-ink mb-1">Bank Details</p>
//                 {businessSettings.accountHolderName && <p className="text-gray-600">A/C Name: {businessSettings.accountHolderName}</p>}
//                 {businessSettings.bankName && <p className="text-gray-600">Bank: {businessSettings.bankName}</p>}
//                 {businessSettings.accountNumber && <p className="text-gray-600">A/C No: {businessSettings.accountNumber}</p>}
//                 {businessSettings.ifscCode && <p className="text-gray-600">IFSC: {businessSettings.ifscCode}</p>}
//               </div>
//               {businessSettings.paymentQrCode && (
//                 <div className="text-center">
//                   <img src={businessSettings.paymentQrCode} alt="QR" className="w-20 h-20 object-contain" />
//                   <p className="text-[9px] mt-0.5 text-gray-500">Scan & Pay</p>
//                 </div>
//               )}
//             </div>
//           )}

//           <div className="flex justify-end mt-6">
//             <div className="border border-gray-300 rounded px-8 py-6 text-center min-w-[180px]">
//               {businessSettings.signature ? (
//                 <img src={businessSettings.signature} alt="Signature" className="w-28 h-12 object-contain mx-auto mb-1" />
//               ) : (
//                 <div className="h-10" />
//               )}
//               <p className="text-xs font-medium text-ink">Signature</p>
//               <p className="text-xs text-gray-500">{businessSettings.businessName}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { Phone, MapPin } from "lucide-react";
import { useBusiness } from "../../context/BusinessContext";
import { stateCodeMap } from "../../data/dummyData";
import { numberToWords } from "../../utils/numberToWords";

export default function ElegantTemplate({ invoice, party, lines, type = "sales" }) {
  const { businessSettings } = useBusiness();
  if (!businessSettings) return null;

  const isSameState = party?.state === businessSettings.state;

  const subtotal = lines.reduce((sum, l) => sum + l.qty * l.rate, 0);
  const gstTotal = lines.reduce((sum, l) => sum + (l.qty * l.rate * l.gstPercent) / 100, 0);
  const grandTotal = subtotal + gstTotal;
  const totalQty = lines.reduce((sum, l) => sum + l.qty, 0);
  const amountReceived = invoice.amountReceived ?? invoice.amountPaid ?? 0;
  const balance = grandTotal - amountReceived;

  const docTitle =
    type === "sales" ? "TAX INVOICE" :
    type === "purchase" ? "PURCHASE INVOICE" :
    type === "purchaseOrder" ? "PURCHASE ORDER" :
    "QUOTATION";
  const partyLabel = (type === "purchase" || type === "purchaseOrder") ? "Bill From" : "Bill To";
  const invoiceNoValue = invoice.invoiceNo || invoice.purchaseNo || invoice.quotationNo || invoice.poNo;

  return (
    <div className="bg-white max-w-3xl mx-auto p-2" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
      <div className="border-2 border-amber-700 relative">
        <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-amber-700" />
        <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-amber-700" />
        <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-amber-700" />
        <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-amber-700" />

        <div className="p-8">
          <div className="flex justify-between items-start pb-4 border-b border-amber-700">
            <div className="flex items-start gap-3">
              {businessSettings.logo ? (
                <img
                  src={businessSettings.logo}
                  alt="Logo"
                  className="w-14 h-14 object-contain border border-amber-700/40 rounded p-1 shrink-0"
                />
              ) : (
                <div className="w-14 h-14 border border-amber-700/40 rounded flex items-center justify-center font-bold text-xl text-amber-700 shrink-0">
                  {businessSettings.businessName?.charAt(0)}
                </div>
              )}
              <div>
                <p className="text-2xl font-bold text-ink">{businessSettings.businessName}</p>
                <p className="text-xs text-gray-600 mt-1.5 flex items-center gap-1">
                  <Phone size={11} className="text-amber-700" /> {businessSettings.phone}
                </p>
                <p className="text-xs text-gray-600 flex items-center gap-1">
                  <MapPin size={11} className="text-amber-700" /> {businessSettings.state}{businessSettings.city ? `, ${businessSettings.city}` : ""}
                </p>
                {businessSettings.isGstRegistered && (
                  <p className="text-xs text-gray-600 mt-1">GSTIN: {businessSettings.gstin}</p>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold tracking-wide text-ink">{docTitle}</p>
              <p className="text-[9px] border border-gray-400 px-2 py-0.5 mt-1 inline-block text-gray-600">
                ORIGINAL FOR RECIPIENT
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-3 border-b border-amber-700 text-xs">
            <div>
              <p className="text-gray-500 font-semibold">Invoice No.</p>
              <p className="text-ink font-medium mt-0.5">{invoiceNoValue}</p>
            </div>
            <div>
              <p className="text-gray-500 font-semibold">Invoice Date</p>
              <p className="text-ink font-medium mt-0.5">{new Date(invoice.date).toLocaleDateString("en-GB")}</p>
            </div>
          </div>

          <div className="py-3 border-b border-amber-700 text-xs">
            <p className="text-gray-500 font-semibold mb-1">{partyLabel}</p>
            <p className="text-ink font-semibold">{party?.name || "Cash Sale"}</p>
            <p className="text-gray-600 mt-0.5">Mobile: {party?.mobile || businessSettings.phone}</p>
            {party?.gstin && <p className="text-gray-600">GSTIN: {party.gstin}</p>}
            {party?.state && (
              <p className="text-gray-600">State Code: {stateCodeMap[party.state]}</p>
            )}
          </div>

          <table className="w-full text-xs mt-4">
            <thead>
              <tr className="border-b border-amber-700 text-gray-600">
                <th className="text-left py-2 font-semibold">No</th>
                <th className="text-left py-2 font-semibold">Items</th>
                <th className="text-center py-2 font-semibold">Qty.</th>
                <th className="text-right py-2 font-semibold">Rate</th>
                <th className="text-right py-2 font-semibold">Tax</th>
                <th className="text-right py-2 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line, idx) => {
                const lineTotal = line.qty * line.rate;
                const lineTax = (lineTotal * line.gstPercent) / 100;
                return (
                  <tr key={idx}>
                    <td className="py-2 text-gray-500">{idx + 1}</td>
                    <td className="py-2 text-ink">{line.name}</td>
                    <td className="py-2 text-center text-gray-600">{line.qty} {line.unit}</td>
                    <td className="py-2 text-right text-gray-600">{line.rate.toLocaleString("en-IN")}</td>
                    <td className="py-2 text-right text-gray-600">
                      {lineTax.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                      <span className="text-[9px]"> ({line.gstPercent}%)</span>
                    </td>
                    <td className="py-2 text-right font-medium text-ink">{(lineTotal + lineTax).toLocaleString("en-IN")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="bg-amber-50 flex justify-between px-2 py-2 mt-1 text-xs font-semibold text-ink border-y border-amber-700">
            <span>SUBTOTAL</span>
            <div className="flex gap-8">
              <span>{totalQty}</span>
              <span>₹{(subtotal / totalQty || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
              <span>₹{grandTotal.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-4">
            <div className="text-xs">
              <p className="font-semibold text-ink mb-1">Terms & Conditions</p>
              <p className="text-gray-600 whitespace-pre-line leading-relaxed">{businessSettings.defaultTerms}</p>
            </div>

            <div className="text-xs space-y-1.5">
              <div className="flex justify-between text-gray-600">
                <span>Taxable Amount</span><span>₹{subtotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
              </div>
              {isSameState ? (
                <>
                  <div className="flex justify-between text-gray-600"><span>CGST @9%</span><span>₹{(gstTotal / 2).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div>
                  <div className="flex justify-between text-gray-600"><span>SGST @9%</span><span>₹{(gstTotal / 2).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div>
                </>
              ) : (
                <div className="flex justify-between text-gray-600"><span>IGST</span><span>₹{gstTotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div>
              )}
              <div className="flex justify-between font-bold text-ink border-t border-amber-700 pt-1.5 mt-1.5">
                <span>Total Amount</span><span>₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>
              {type === "sales" && (
                <>
                  <div className="flex justify-between text-gray-600 pt-1">
                    <span>Received Amount</span><span>₹{amountReceived.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between font-bold text-ink">
                    <span>Balance</span><span>₹{balance.toLocaleString("en-IN")}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="mt-4 text-xs">
            <p className="font-semibold text-ink">Total Amount (in words)</p>
            <p className="text-gray-600 mt-0.5">{numberToWords(grandTotal)}</p>
          </div>

          {type === "sales" && (businessSettings.bankName || businessSettings.paymentQrCode) && (
            <div className="flex justify-between items-start border-t border-amber-700 pt-3 mt-4 text-xs">
              <div>
                <p className="font-semibold text-ink mb-1">Bank Details</p>
                {businessSettings.accountHolderName && <p className="text-gray-600">A/C Name: {businessSettings.accountHolderName}</p>}
                {businessSettings.bankName && <p className="text-gray-600">Bank: {businessSettings.bankName}</p>}
                {businessSettings.accountNumber && <p className="text-gray-600">A/C No: {businessSettings.accountNumber}</p>}
                {businessSettings.ifscCode && <p className="text-gray-600">IFSC: {businessSettings.ifscCode}</p>}
              </div>
              {businessSettings.paymentQrCode && (
                <div className="text-center">
                  <img src={businessSettings.paymentQrCode} alt="QR" className="w-20 h-20 object-contain" />
                  <p className="text-[9px] mt-0.5 text-gray-500">Scan & Pay</p>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end mt-6">
            <div className="border border-gray-300 rounded px-8 py-6 text-center min-w-[180px]">
              {businessSettings.signature ? (
                <img src={businessSettings.signature} alt="Signature" className="w-28 h-12 object-contain mx-auto mb-1" />
              ) : (
                <div className="h-10" />
              )}
              <p className="text-xs font-medium text-ink">Signature</p>
              <p className="text-xs text-gray-500">{businessSettings.businessName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}