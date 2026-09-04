// // import { Eye, Pencil, Trash2 } from "lucide-react";
// // import { calculateInvoiceStatus, getStatusStyle } from "../../utils/statusHelpers";
// // import { useNavigate } from "react-router-dom";

// // export default function PurchaseListTable({ purchases, onDelete }) {
// //   if (purchases.length === 0) {
// //     return (
// //       <div className="bg-white border border-border rounded-xl p-10 text-center">
// //         <p className="text-ink-muted text-sm">Koi purchase invoice nahi mila.</p>
// //       </div>
// //     );
// //   }
// // const navigate = useNavigate();
// //   return (
// //     <div className="bg-white border border-border rounded-xl overflow-hidden">
// //       <div className="overflow-x-auto">
// //         <table className="w-full min-w-170 text-sm">
// //           <thead>
// //             <tr className="text-left text-ink-muted bg-paper border-b border-border">
// //               <th className="py-3 px-4 font-medium">Date</th>
// //               <th className="py-3 px-4 font-medium">Purchase No</th>
// //               <th className="py-3 px-4 font-medium">Supplier</th>
// //               <th className="py-3 px-4 font-medium text-right">Amount</th>
// //               <th className="py-3 px-4 font-medium text-right">Status</th>
// //               <th className="py-3 px-4 font-medium text-right">Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {purchases.map((p) => {
// //               const status = calculateInvoiceStatus(p);
// //               return (
// //                 <tr key={p._id} className="border-b border-border last:border-0 hover:bg-paper/60 transition-colors">
// //                   <td className="py-3 px-4 text-ink-muted tabular-num">
// //                     {new Date(p.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
// //                   </td>
// //                   <td className="py-3 px-4 tabular-num text-ink font-medium">{p.purchaseNo}</td>
// //                   <td className="py-3 px-4 text-ink">{p.supplierName}</td>
// //                   <td className="py-3 px-4 tabular-num text-right text-ink font-medium">₹{p.grandTotal.toLocaleString("en-IN")}</td>
// //                   <td className="py-3 px-4 text-right">
// //                     <span className={`capitalize text-xs px-2 py-1 rounded-full font-medium ${getStatusStyle(status)}`}>{status}</span>
// //                   </td>
// //                   <td className="py-3 px-4">
// //                     <div className="flex items-center justify-end gap-2">
// //                      <button onClick={() => navigate(`/print/invoice/${p._id}?type=purchase`)} className="text-ink-muted hover:text-brand transition-colors">
// //   <Eye size={16} />
// // </button>
// //                       <button className="text-ink-muted hover:text-brand transition-colors"><Pencil size={16} /></button>
// //                       <button onClick={() => onDelete(p._id)} className="text-ink-muted hover:text-status-overdue transition-colors"><Trash2 size={16} /></button>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               );
// //             })}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }

// // import { Eye, Pencil, Trash2 } from "lucide-react";
// // import { calculateInvoiceStatus, getStatusStyle } from "../../utils/statusHelpers";
// // import { useNavigate } from "react-router-dom";

// // export default function PurchaseListTable({ purchases, onDelete }) {
// //   if (purchases.length === 0) {
// //     return (
// //       <div className="bg-white border border-border rounded-xl p-10 text-center">
// //         <p className="text-ink-muted text-sm">No purchase invoice received..</p>
// //       </div>
// //     );
// //   }

// //   const navigate = useNavigate();

// //   return (
// //     <div className="bg-white border border-border rounded-xl overflow-hidden">
// //       <div className="overflow-x-auto">
// //         <table className="w-full min-w-170 text-sm">
// //           <thead>
// //             <tr className="text-left text-ink-muted bg-paper border-b border-border">
// //               <th className="py-3 px-4 font-medium">Date</th>
// //               <th className="py-3 px-4 font-medium">Purchase No</th>
// //               <th className="py-3 px-4 font-medium">Supplier</th>
// //               <th className="py-3 px-4 font-medium text-right">Amount</th>
// //               <th className="py-3 px-4 font-medium text-right">Status</th>
// //               <th className="py-3 px-4 font-medium text-right">Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {purchases.map((p) => {
// //               const status = calculateInvoiceStatus(p);
// //               return (
// //                 <tr key={p._id} className="border-b border-border last:border-0 hover:bg-paper/60 transition-colors">
// //                   <td className="py-3 px-4 text-ink-muted tabular-num">
// //                     {new Date(p.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
// //                   </td>
// //                   <td className="py-3 px-4 tabular-num text-ink font-medium">{p.purchaseNo}</td>
// //                   <td className="py-3 px-4 text-ink">{p.supplierId?.name || "N/A"}</td>
// //                   <td className="py-3 px-4 tabular-num text-right text-ink font-medium">₹{p.grandTotal.toLocaleString("en-IN")}</td>
// //                   <td className="py-3 px-4 text-right">
// //                     <span className={`capitalize text-xs px-2 py-1 rounded-full font-medium ${getStatusStyle(status)}`}>{status}</span>
// //                   </td>
// //                   <td className="py-3 px-4">
// //                     <div className="flex items-center justify-end gap-2">
// //                      <button onClick={() => navigate(`/print/invoice/${p._id}?type=purchase`)} className="text-ink-muted hover:text-brand transition-colors">
// //   <Eye size={16} />
// // </button>
// //                       <button className="text-ink-muted hover:text-brand transition-colors"><Pencil size={16} /></button>
// //                       <button onClick={() => onDelete(p._id)} className="text-ink-muted hover:text-status-overdue transition-colors"><Trash2 size={16} /></button>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               );
// //             })}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }

// // import { useState } from "react";
// // import {
// //   Eye,
// //   Pencil,
// //   Trash2,
// //   Download,
// //   FileSpreadsheet,
// //   FileText,
// //   ChevronDown,
// // } from "lucide-react";
// // import {
// //   calculateInvoiceStatus,
// //   getStatusStyle,
// // } from "../../utils/statusHelpers";
// // import { useNavigate } from "react-router-dom";
// // import * as XLSX from "xlsx";
// // import jsPDF from "jspdf";
// // import autoTable from "jspdf-autotable";

// // export default function PurchaseListTable({ purchases, onDelete }) {
// //   const [selectedIds, setSelectedIds] = useState([]);
// //   const [downloadOpen, setDownloadOpen] = useState(false);

// //   if (purchases.length === 0) {
// //     return (
// //       <div className="bg-white border border-border rounded-xl p-10 text-center">
// //         <p className="text-ink-muted text-sm">No purchase invoice received..</p>
// //       </div>
// //     );
// //   }

// //   const navigate = useNavigate();

// //   const allSelected = selectedIds.length === purchases.length;

// //   const toggleSelectAll = () => {
// //     if (allSelected) {
// //       setSelectedIds([]);
// //     } else {
// //       setSelectedIds(purchases.map((p) => p._id));
// //     }
// //   };

// //   const toggleSelectOne = (id) => {
// //     setSelectedIds((prev) =>
// //       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
// //     );
// //   };

// //   const getSelectedPurchases = () =>
// //     purchases.filter((p) => selectedIds.includes(p._id));

// //   const handleExportExcel = () => {
// //     const rows = getSelectedPurchases().map((p) => ({
// //       Date: new Date(p.date).toLocaleDateString("en-IN", {
// //         day: "2-digit",
// //         month: "short",
// //         year: "numeric",
// //       }),
// //       "Purchase No": p.purchaseNo,
// //       Supplier: p.supplierId?.name || "N/A",
// //       Amount: p.grandTotal,
// //       Status: calculateInvoiceStatus(p),
// //     }));

// //     const worksheet = XLSX.utils.json_to_sheet(rows);
// //     const workbook = XLSX.utils.book_new();
// //     XLSX.utils.book_append_sheet(workbook, worksheet, "Purchase Invoices");
// //     XLSX.writeFile(workbook, "purchase-invoices.xlsx");
// //     setDownloadOpen(false);
// //   };

// //   const handleExportPDF = () => {
// //     const doc = new jsPDF();
// //     const rows = getSelectedPurchases().map((p) => [
// //       new Date(p.date).toLocaleDateString("en-IN", {
// //         day: "2-digit",
// //         month: "short",
// //         year: "numeric",
// //       }),
// //       p.purchaseNo,
// //       p.supplierId?.name || "N/A",
// //       `Rs ${p.grandTotal.toLocaleString("en-IN")}`,
// //       calculateInvoiceStatus(p),
// //     ]);

// //     doc.text("Purchase Invoices", 14, 12);
// //     autoTable(doc, {
// //       startY: 18,
// //       head: [["Date", "Purchase No", "Supplier", "Amount", "Status"]],
// //       body: rows,
// //     });
// //     doc.save("purchase-invoices.pdf");
// //     setDownloadOpen(false);
// //   };

// //   return (
// //     <div className="bg-white border border-border rounded-xl overflow-hidden">
// //       {/* Toolbar */}
// //       <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-paper">
// //         <span className="text-sm text-ink-muted">
// //           {selectedIds.length > 0
// //             ? `${selectedIds.length} selected`
// //             : "Select purchases to download"}
// //         </span>

// //         <div className="relative">
// //           <button
// //             onClick={() => setDownloadOpen((o) => !o)}
// //             disabled={selectedIds.length === 0}
// //             className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg bg-status-overdue text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-red-700 transition-colors"
// //           >
// //             <Download size={15} />
// //             Download
// //             <ChevronDown size={14} />
// //           </button>

// //           {downloadOpen && selectedIds.length > 0 && (
// //             <div className="absolute right-0 mt-1 w-44 bg-white border border-border rounded-lg shadow-lg z-10 overflow-hidden">
// //               <button
// //                 onClick={handleExportExcel}
// //                 className="w-full flex items-center gap-2 px-3 py-2 text-sm text-ink hover:bg-paper transition-colors"
// //               >
// //                 <FileSpreadsheet size={15} />
// //                 Export as Excel
// //               </button>
// //               <button
// //                 onClick={handleExportPDF}
// //                 className="w-full flex items-center gap-2 px-3 py-2 text-sm text-ink hover:bg-paper transition-colors"
// //               >
// //                 <FileText size={15} />
// //                 Export as PDF
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       <div className="overflow-x-auto">
// //         <table className="w-full min-w-170 text-sm">
// //           <thead>
// //             <tr className="text-left text-ink-muted bg-paper border-b border-border">
// //               <th className="py-3 px-4 font-medium w-10">
// //                 <input
// //                   type="checkbox"
// //                   checked={allSelected}
// //                   onChange={toggleSelectAll}
// //                   className="accent-brand w-4 h-4 cursor-pointer"
// //                 />
// //               </th>
// //               <th className="py-3 px-4 font-medium">Date</th>
// //               <th className="py-3 px-4 font-medium">Purchase No</th>
// //               <th className="py-3 px-4 font-medium">Supplier</th>
// //               <th className="py-3 px-4 font-medium text-right">Amount</th>
// //               <th className="py-3 px-4 font-medium text-right">Status</th>
// //               <th className="py-3 px-4 font-medium text-right">Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {purchases.map((p) => {
// //               const status = calculateInvoiceStatus(p);
// //               return (
// //                 <tr
// //                   key={p._id}
// //                   className="border-b border-border last:border-0 hover:bg-paper/60 transition-colors"
// //                 >
// //                   <td className="py-3 px-4">
// //                     <input
// //                       type="checkbox"
// //                       checked={selectedIds.includes(p._id)}
// //                       onChange={() => toggleSelectOne(p._id)}
// //                       className="accent-brand w-4 h-4 cursor-pointer"
// //                     />
// //                   </td>
// //                   <td className="py-3 px-4 text-ink-muted tabular-num">
// //                     {new Date(p.date).toLocaleDateString("en-IN", {
// //                       day: "2-digit",
// //                       month: "short",
// //                       year: "numeric",
// //                     })}
// //                   </td>
// //                   <td className="py-3 px-4 tabular-num text-ink font-medium">
// //                     {p.purchaseNo}
// //                   </td>
// //                   <td className="py-3 px-4 text-ink">
// //                     {p.supplierId?.name || "N/A"}
// //                   </td>
// //                   <td className="py-3 px-4 tabular-num text-right text-ink font-medium">
// //                     ₹{p.grandTotal.toLocaleString("en-IN")}
// //                   </td>
// //                   <td className="py-3 px-4 text-right">
// //                     <span
// //                       className={`capitalize text-xs px-2 py-1 rounded-full font-medium ${getStatusStyle(status)}`}
// //                     >
// //                       {status}
// //                     </span>
// //                   </td>
// //                   <td className="py-3 px-4">
// //                     <div className="flex items-center justify-end gap-2">
// //                       <button
// //                         onClick={() =>
// //                           navigate(`/print/invoice/${p._id}?type=purchase`)
// //                         }
// //                         className="text-ink-muted hover:text-brand transition-colors"
// //                       >
// //                         <Eye size={16} />
// //                       </button>
// //                       <button className="text-ink-muted hover:text-brand transition-colors">
// //                         <Pencil size={16} />
// //                       </button>
// //                       <button
// //                         onClick={() => onDelete(p._id)}
// //                         className="text-ink-muted hover:text-status-overdue transition-colors"
// //                       >
// //                         <Trash2 size={16} />
// //                       </button>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               );
// //             })}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }





// import { useState } from "react";
// import {
//   Eye,
//   Pencil,
//   Trash2,
//   Download,
//   FileSpreadsheet,
//   FileText,
//   ChevronDown,
// } from "lucide-react";
// import {
//   calculateInvoiceStatus,
//   getStatusStyle,
// } from "../../utils/statusHelpers";
// import { useNavigate } from "react-router-dom";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import { getPurchaseInvoiceById } from "../../api/purchaseInvoiceApi";

// export default function PurchaseListTable({ purchases, onDelete }) {
//   const [selectedIds, setSelectedIds] = useState([]);
//   const [downloadOpen, setDownloadOpen] = useState(false);
//   const [exporting, setExporting] = useState(false);

//   if (purchases.length === 0) {
//     return (
//       <div className="bg-white border border-border rounded-xl p-10 text-center">
//         <p className="text-ink-muted text-sm">No purchase invoice received..</p>
//       </div>
//     );
//   }

//   const navigate = useNavigate();

//   const allSelected = selectedIds.length === purchases.length;

//   const toggleSelectAll = () => {
//     if (allSelected) {
//       setSelectedIds([]);
//     } else {
//       setSelectedIds(purchases.map((p) => p._id));
//     }
//   };

//   const toggleSelectOne = (id) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
//     );
//   };

//   // ── Selected purchases ka POORA data backend se fetch karo (line items ke sath) ──
//   const fetchFullPurchases = async () => {
//     const results = await Promise.all(
//       selectedIds.map((id) => getPurchaseInvoiceById(id).then((res) => res.data.purchase))
//     );
//     return results;
//   };

//   const formatDate = (d) =>
//     new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

//   const handleExportExcel = async () => {
//     try {
//       setExporting(true);
//       const fullPurchases = await fetchFullPurchases();

//       const rows = [];

//       fullPurchases.forEach((p, idx) => {
//         const supplier = p.supplierId || {};
//         const balance = p.grandTotal - (p.amountPaid || 0);

//         rows.push(["Purchase No:", p.purchaseNo, "", "Original Invoice No:", p.originalInvoiceNo || "-", "", "Date:", formatDate(p.date)]);
//         rows.push(["Due Date:", p.dueDate ? formatDate(p.dueDate) : "-", "", "Payment Terms (Days):", p.paymentTerms ?? "-", "", "Payment Mode:", p.paymentMode || "-"]);
//         rows.push(["Supplier:", supplier.name || "N/A", "", "GSTIN:", supplier.gstin || "N/A", "", "Mobile:", supplier.mobile || "N/A"]);
//         rows.push(["Billing Address:", supplier.billingAddress || "-", "", "State:", supplier.state || "-"]);
//         rows.push([]);
//         rows.push(["Item", "HSN", "Qty", "Unit", "Rate", "GST %", "Amount"]);

//         (p.lines || []).forEach((line) => {
//           const amount = line.qty * line.rate;
//           rows.push([
//             line.name,
//             line.hsnCode || "-",
//             line.qty,
//             line.unit || "-",
//             line.rate,
//             line.gstPercent || 0,
//             amount,
//           ]);
//         });

//         rows.push([]);
//         rows.push(["", "", "", "", "", "Subtotal", p.subtotal]);
//         rows.push(["", "", "", "", "", "GST", p.gstBreakup || 0]);
//         rows.push(["", "", "", "", "", "Grand Total", p.grandTotal]);
//         rows.push(["", "", "", "", "", "Amount Paid", p.amountPaid || 0]);
//         rows.push(["", "", "", "", "", "Balance", balance]);
//         rows.push([]);
//         rows.push(["Notes:", p.notes || "-"]);
//         rows.push(["Terms & Conditions:", p.terms || "-"]);

//         if (idx !== fullPurchases.length - 1) {
//           rows.push([]);
//           rows.push(["=========================================="]);
//           rows.push([]);
//         }
//       });

//       const worksheet = XLSX.utils.aoa_to_sheet(rows);
//       worksheet["!cols"] = [
//         { wch: 22 }, { wch: 20 }, { wch: 10 }, { wch: 12 }, { wch: 12 }, { wch: 10 }, { wch: 14 },
//       ];

//       const workbook = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(workbook, worksheet, "Purchase Invoices");
//       XLSX.writeFile(workbook, "purchase-invoices-detailed.xlsx");
//     } catch (err) {
//       alert("Export karne mein error aaya");
//       console.error(err);
//     } finally {
//       setExporting(false);
//       setDownloadOpen(false);
//     }
//   };

//   const handleExportPDF = async () => {
//     try {
//       setExporting(true);
//       const fullPurchases = await fetchFullPurchases();

//       const doc = new jsPDF();
//       let cursorY = 14;

//       fullPurchases.forEach((p, idx) => {
//         if (idx > 0) {
//           doc.addPage();
//           cursorY = 14;
//         }

//         const supplier = p.supplierId || {};
//         const balance = p.grandTotal - (p.amountPaid || 0);

//         doc.setFontSize(14);
//         doc.text(`Purchase: ${p.purchaseNo}`, 14, cursorY);
//         cursorY += 7;

//         doc.setFontSize(10);
//         doc.text(`Original Invoice No: ${p.originalInvoiceNo || "-"}`, 14, cursorY);
//         cursorY += 6;
//         doc.text(`Date: ${formatDate(p.date)}    Due Date: ${p.dueDate ? formatDate(p.dueDate) : "-"}`, 14, cursorY);
//         cursorY += 6;
//         doc.text(`Supplier: ${supplier.name || "N/A"}    GSTIN: ${supplier.gstin || "N/A"}    Mobile: ${supplier.mobile || "N/A"}`, 14, cursorY);
//         cursorY += 6;
//         doc.text(`Payment Terms: ${p.paymentTerms ?? "-"} days    Payment Mode: ${p.paymentMode || "-"}`, 14, cursorY);
//         cursorY += 8;

//         const itemRows = (p.lines || []).map((line) => [
//           line.name,
//           line.hsnCode || "-",
//           line.qty,
//           line.unit || "-",
//           `Rs ${line.rate.toLocaleString("en-IN")}`,
//           `${line.gstPercent || 0}%`,
//           `Rs ${(line.qty * line.rate).toLocaleString("en-IN")}`,
//         ]);

//         autoTable(doc, {
//           startY: cursorY,
//           head: [["Item", "HSN", "Qty", "Unit", "Rate", "GST%", "Amount"]],
//           body: itemRows,
//           styles: { fontSize: 9 },
//         });

//         cursorY = doc.lastAutoTable.finalY + 6;

//         doc.setFontSize(10);
//         doc.text(`Subtotal: Rs ${p.subtotal.toLocaleString("en-IN")}`, 140, cursorY); cursorY += 5;
//         doc.text(`GST: Rs ${(p.gstBreakup || 0).toLocaleString("en-IN")}`, 140, cursorY); cursorY += 5;
//         doc.setFont(undefined, "bold");
//         doc.text(`Grand Total: Rs ${p.grandTotal.toLocaleString("en-IN")}`, 140, cursorY); cursorY += 5;
//         doc.setFont(undefined, "normal");
//         doc.text(`Amount Paid: Rs ${(p.amountPaid || 0).toLocaleString("en-IN")}`, 140, cursorY); cursorY += 5;
//         doc.text(`Balance: Rs ${balance.toLocaleString("en-IN")}`, 140, cursorY); cursorY += 8;

//         if (p.notes) {
//           doc.text(`Notes: ${p.notes}`, 14, cursorY);
//           cursorY += 6;
//         }
//         if (p.terms) {
//           const termsLines = doc.splitTextToSize(`Terms: ${p.terms}`, 180);
//           doc.text(termsLines, 14, cursorY);
//         }
//       });

//       doc.save("purchase-invoices-detailed.pdf");
//     } catch (err) {
//       alert("Export karne mein error aaya");
//       console.error(err);
//     } finally {
//       setExporting(false);
//       setDownloadOpen(false);
//     }
//   };

//   return (
//     <div className="bg-white border border-border rounded-xl overflow-hidden">
//       {/* Toolbar */}
//       <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-paper">
//         <span className="text-sm text-ink-muted">
//           {selectedIds.length > 0
//             ? `${selectedIds.length} selected`
//             : "Select purchases to download"}
//         </span>

//         <div className="relative">
//           <button
//             onClick={() => setDownloadOpen((o) => !o)}
//             disabled={selectedIds.length === 0 || exporting}
//             className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg bg-status-overdue text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-red-700 transition-colors"
//           >
//             <Download size={15} />
//             {exporting ? "Preparing..." : "Download"}
//             <ChevronDown size={14} />
//           </button>

//           {downloadOpen && selectedIds.length > 0 && (
//             <div className="absolute right-0 mt-1 w-44 bg-white border border-border rounded-lg shadow-lg z-10 overflow-hidden">
//               <button
//                 onClick={handleExportExcel}
//                 disabled={exporting}
//                 className="w-full flex items-center gap-2 px-3 py-2 text-sm text-ink hover:bg-paper transition-colors disabled:opacity-50"
//               >
//                 <FileSpreadsheet size={15} />
//                 Export as Excel
//               </button>
//               <button
//                 onClick={handleExportPDF}
//                 disabled={exporting}
//                 className="w-full flex items-center gap-2 px-3 py-2 text-sm text-ink hover:bg-paper transition-colors disabled:opacity-50"
//               >
//                 <FileText size={15} />
//                 Export as PDF
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full min-w-170 text-sm">
//           <thead>
//             <tr className="text-left text-ink-muted bg-paper border-b border-border">
//               <th className="py-3 px-4 font-medium w-10">
//                 <input
//                   type="checkbox"
//                   checked={allSelected}
//                   onChange={toggleSelectAll}
//                   className="accent-brand w-4 h-4 cursor-pointer"
//                 />
//               </th>
//               <th className="py-3 px-4 font-medium">Date</th>
//               <th className="py-3 px-4 font-medium">Purchase No</th>
//               <th className="py-3 px-4 font-medium">Supplier</th>
//               <th className="py-3 px-4 font-medium text-right">Amount</th>
//               <th className="py-3 px-4 font-medium text-right">Status</th>
//               <th className="py-3 px-4 font-medium text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {purchases.map((p) => {
//               const status = calculateInvoiceStatus(p);
//               return (
//                 <tr
//                   key={p._id}
//                   className="border-b border-border last:border-0 hover:bg-paper/60 transition-colors"
//                 >
//                   <td className="py-3 px-4">
//                     <input
//                       type="checkbox"
//                       checked={selectedIds.includes(p._id)}
//                       onChange={() => toggleSelectOne(p._id)}
//                       className="accent-brand w-4 h-4 cursor-pointer"
//                     />
//                   </td>
//                   <td className="py-3 px-4 text-ink-muted tabular-num">
//                     {new Date(p.date).toLocaleDateString("en-IN", {
//                       day: "2-digit",
//                       month: "short",
//                       year: "numeric",
//                     })}
//                   </td>
//                   <td className="py-3 px-4 tabular-num text-ink font-medium">
//                     {p.purchaseNo}
//                   </td>
//                   <td className="py-3 px-4 text-ink">
//                     {p.supplierId?.name || "N/A"}
//                   </td>
//                   <td className="py-3 px-4 tabular-num text-right text-ink font-medium">
//                     ₹{p.grandTotal.toLocaleString("en-IN")}
//                   </td>
//                   <td className="py-3 px-4 text-right">
//                     <span
//                       className={`capitalize text-xs px-2 py-1 rounded-full font-medium ${getStatusStyle(status)}`}
//                     >
//                       {status}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4">
//                     <div className="flex items-center justify-end gap-2">
//                       <button
//                         onClick={() =>
//                           navigate(`/print/invoice/${p._id}?type=purchase`)
//                         }
//                         className="text-ink-muted hover:text-brand transition-colors"
//                       >
//                         <Eye size={16} />
//                       </button>
//                       <button className="text-ink-muted hover:text-brand transition-colors">
//                         <Pencil size={16} />
//                       </button>
//                       <button
//                         onClick={() => onDelete(p._id)}
//                         className="text-ink-muted hover:text-status-overdue transition-colors"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }





import { useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  Download,
  FileSpreadsheet,
  FileText,
  ChevronDown,
} from "lucide-react";
import {
  calculateInvoiceStatus,
  getStatusStyle,
} from "../../utils/statusHelpers";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getPurchaseInvoiceById } from "../../api/purchaseInvoiceApi";

export default function PurchaseListTable({ purchases, onDelete }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [exporting, setExporting] = useState(false);

  if (purchases.length === 0) {
    return (
      <div className="bg-white border border-border rounded-xl p-10 text-center">
        <p className="text-ink-muted text-sm">No purchase invoice received..</p>
      </div>
    );
  }

  const navigate = useNavigate();

  const allSelected = selectedIds.length === purchases.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(purchases.map((p) => p._id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  // ── Selected purchases ka POORA data backend se fetch karo (line items ke sath) ──
  const fetchFullPurchases = async () => {
    const results = await Promise.all(
      selectedIds.map((id) => getPurchaseInvoiceById(id).then((res) => res.data.purchase))
    );
    return results;
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  // ── Ek hi flat table: upar header row, niche har line-item ki detail row ──
  const EXCEL_HEADERS = [
    "Purchase No", "Original Invoice No", "Purchase Date", "Due Date",
    "Supplier Name", "GSTIN", "Mobile", "State", "Payment Mode", "Item Name",
    "HSN Code", "Qty", "Unit", "Rate", "GST %", "Amount", "Subtotal",
    "Total GST", "Grand Total", "Amount Paid", "Balance", "Notes", "Terms",
  ];

  const buildFlatRows = (fullPurchases) => {
    const rows = [];
    fullPurchases.forEach((p) => {
      const supplier = p.supplierId || {};
      const balance = p.grandTotal - (p.amountPaid || 0);
      const lines = p.lines && p.lines.length ? p.lines : [{}];

      lines.forEach((line) => {
        const amount = line.qty && line.rate ? line.qty * line.rate : 0;
        rows.push([
          p.purchaseNo,
          p.originalInvoiceNo || "-",
          formatDate(p.date),
          p.dueDate ? formatDate(p.dueDate) : "-",
          supplier.name || "N/A",
          supplier.gstin || "N/A",
          supplier.mobile || "N/A",
          supplier.state || "-",
          p.paymentMode || "-",
          line.name || "-",
          line.hsnCode || "-",
          line.qty ?? "-",
          line.unit || "-",
          line.rate ?? "-",
          line.gstPercent || 0,
          amount,
          p.subtotal,
          p.gstBreakup || 0,
          p.grandTotal,
          p.amountPaid || 0,
          balance,
          p.notes || "-",
          p.terms || "-",
        ]);
      });
    });
    return rows;
  };

  const handleExportExcel = async () => {
    try {
      setExporting(true);
      const fullPurchases = await fetchFullPurchases();

      const rows = [EXCEL_HEADERS, ...buildFlatRows(fullPurchases)];

      const worksheet = XLSX.utils.aoa_to_sheet(rows);
      worksheet["!cols"] = EXCEL_HEADERS.map(() => ({ wch: 16 }));

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Purchase Invoices");
      XLSX.writeFile(workbook, "purchase-invoices-detailed.xlsx");
    } catch (err) {
      alert("Export karne mein error aaya");
      console.error(err);
    } finally {
      setExporting(false);
      setDownloadOpen(false);
    }
  };

  const handleExportPDF = async () => {
    try {
      setExporting(true);
      const fullPurchases = await fetchFullPurchases();

      const doc = new jsPDF({ orientation: "landscape" });

      const head = [[
        "Purchase No", "Orig. Invoice No", "Date", "Due Date", "Supplier",
        "GSTIN", "Mobile", "State", "Pay Mode", "Item", "HSN", "Qty", "Unit",
        "Rate", "GST%", "Amount", "Subtotal", "GST", "Grand Total", "Paid",
        "Balance", "Notes", "Terms",
      ]];

      const body = [];
      fullPurchases.forEach((p) => {
        const supplier = p.supplierId || {};
        const balance = p.grandTotal - (p.amountPaid || 0);
        const lines = p.lines && p.lines.length ? p.lines : [{}];

        lines.forEach((line) => {
          const amount = line.qty && line.rate ? line.qty * line.rate : 0;
          body.push([
            p.purchaseNo,
            p.originalInvoiceNo || "-",
            formatDate(p.date),
            p.dueDate ? formatDate(p.dueDate) : "-",
            supplier.name || "N/A",
            supplier.gstin || "N/A",
            supplier.mobile || "N/A",
            supplier.state || "-",
            p.paymentMode || "-",
            line.name || "-",
            line.hsnCode || "-",
            line.qty ?? "-",
            line.unit || "-",
            line.rate ? `Rs ${line.rate.toLocaleString("en-IN")}` : "-",
            `${line.gstPercent || 0}%`,
            `Rs ${amount.toLocaleString("en-IN")}`,
            `Rs ${p.subtotal.toLocaleString("en-IN")}`,
            `Rs ${(p.gstBreakup || 0).toLocaleString("en-IN")}`,
            `Rs ${p.grandTotal.toLocaleString("en-IN")}`,
            `Rs ${(p.amountPaid || 0).toLocaleString("en-IN")}`,
            `Rs ${balance.toLocaleString("en-IN")}`,
            p.notes || "-",
            p.terms || "-",
          ]);
        });
      });

      autoTable(doc, {
        head,
        body,
        startY: 14,
        styles: { fontSize: 6.5, cellPadding: 1.5 },
        headStyles: { fillColor: [29, 78, 216], textColor: 255, fontStyle: "bold" },
        theme: "grid",
      });

      doc.save("purchase-invoices-detailed.pdf");
    } catch (err) {
      alert("Export karne mein error aaya");
      console.error(err);
    } finally {
      setExporting(false);
      setDownloadOpen(false);
    }
  };

  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-paper">
        <span className="text-sm text-ink-muted">
          {selectedIds.length > 0
            ? `${selectedIds.length} selected`
            : "Select purchases to download"}
        </span>

        <div className="relative">
          <button
            onClick={() => setDownloadOpen((o) => !o)}
            disabled={selectedIds.length === 0 || exporting}
            className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg bg-status-overdue text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-red-700 transition-colors"
          >
            <Download size={15} />
            {exporting ? "Preparing..." : "Download"}
            <ChevronDown size={14} />
          </button>

          {downloadOpen && selectedIds.length > 0 && (
            <div className="absolute right-0 mt-1 w-44 bg-white border border-border rounded-lg shadow-lg z-10 overflow-hidden">
              <button
                onClick={handleExportExcel}
                disabled={exporting}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-ink hover:bg-paper transition-colors disabled:opacity-50"
              >
                <FileSpreadsheet size={15} />
                Export as Excel
              </button>
              <button
                onClick={handleExportPDF}
                disabled={exporting}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-ink hover:bg-paper transition-colors disabled:opacity-50"
              >
                <FileText size={15} />
                Export as PDF
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-170 text-sm">
          <thead>
            <tr className="text-left text-ink-muted bg-paper border-b border-border">
              <th className="py-3 px-4 font-medium w-10">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  className="accent-brand w-4 h-4 cursor-pointer"
                />
              </th>
              <th className="py-3 px-4 font-medium">Date</th>
              <th className="py-3 px-4 font-medium">Purchase No</th>
              <th className="py-3 px-4 font-medium">Supplier</th>
              <th className="py-3 px-4 font-medium text-right">Amount</th>
              <th className="py-3 px-4 font-medium text-right">Status</th>
              <th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((p) => {
              const status = calculateInvoiceStatus(p);
              return (
                <tr
                  key={p._id}
                  className="border-b border-border last:border-0 hover:bg-paper/60 transition-colors"
                >
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(p._id)}
                      onChange={() => toggleSelectOne(p._id)}
                      className="accent-brand w-4 h-4 cursor-pointer"
                    />
                  </td>
                  <td className="py-3 px-4 text-ink-muted tabular-num">
                    {new Date(p.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-3 px-4 tabular-num text-ink font-medium">
                    {p.purchaseNo}
                  </td>
                  <td className="py-3 px-4 text-ink">
                    {p.supplierId?.name || "N/A"}
                  </td>
                  <td className="py-3 px-4 tabular-num text-right text-ink font-medium">
                    ₹{p.grandTotal.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`capitalize text-xs px-2 py-1 rounded-full font-medium ${getStatusStyle(status)}`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() =>
                          navigate(`/print/invoice/${p._id}?type=purchase`)
                        }
                        className="text-ink-muted hover:text-brand transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                      <button className="text-ink-muted hover:text-brand transition-colors">
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(p._id)}
                        className="text-ink-muted hover:text-status-overdue transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}