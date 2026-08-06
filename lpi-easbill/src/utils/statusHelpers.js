// export function calculateInvoiceStatus(invoice) {
//   const total = invoice.grandTotal || 0;
//   const received = invoice.amountReceived ?? invoice.amountPaid ?? 0;

//   if (received >= total && total > 0) return "paid";

//   const isPastDue = invoice.dueDate && new Date() > new Date(invoice.dueDate);
//   if (isPastDue && received < total) return "overdue";

//   if (received > 0) return "partial";

//   return "pending";
// }

// export function getStatusStyle(status) {
//   const styles = {
//     paid: "bg-status-paid/10 text-status-paid",
//     partial: "bg-status-pending/10 text-status-pending",
//     pending: "bg-status-pending/10 text-status-pending",
//     overdue: "bg-status-overdue/10 text-status-overdue",
//   };
//   return styles[status] || styles.pending;
// }




export function calculateInvoiceStatus(invoice) {
  const total = invoice.grandTotal || 0;
  const received = invoice.amountReceived ?? invoice.amountPaid ?? 0;

  if (received >= total && total > 0) return "paid";

  const isPastDue = invoice.dueDate && new Date() > new Date(invoice.dueDate);
  if (isPastDue && received < total) return "overdue";

  if (received > 0) return "partial";

  return "pending";
}

export function calculateQuotationStatus(quotation) {
  const isExpired = quotation.validTillDate && new Date() > new Date(quotation.validTillDate);
  return isExpired ? "expired" : "active";
}

export function getStatusStyle(status) {
  const styles = {
    paid: "bg-status-paid/10 text-status-paid",
    partial: "bg-status-pending/10 text-status-pending",
    pending: "bg-status-pending/10 text-status-pending",
    overdue: "bg-status-overdue/10 text-status-overdue",
    active: "bg-brand-light text-brand",
    expired: "bg-status-overdue/10 text-status-overdue",
  };
  return styles[status] || styles.pending;
}