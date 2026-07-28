import { Eye, Pencil, Trash2 } from "lucide-react";
import { calculateInvoiceStatus, getStatusStyle } from "../../utils/statusHelpers";
import { useNavigate } from "react-router-dom";
export default function SalesInvoiceListTable({ invoices, onEdit, onDelete }) {
  if (invoices.length === 0) {
    return (
      <div className="bg-white border border-border rounded-xl p-10 text-center">
        <p className="text-ink-muted text-sm">Koi invoice nahi mila. "New Sales Invoice" se pehla banao.</p>
      </div>
    );
  }
const navigate = useNavigate();
  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-170 text-sm">
          <thead>
            <tr className="text-left text-ink-muted bg-paper border-b border-border">
              <th className="py-3 px-4 font-medium">Date</th>
              <th className="py-3 px-4 font-medium">Invoice No</th>
              <th className="py-3 px-4 font-medium">Customer</th>
              <th className="py-3 px-4 font-medium text-right">Amount</th>
              <th className="py-3 px-4 font-medium text-right">Status</th>
              <th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => {
              const status = calculateInvoiceStatus(inv);
              return (
                <tr key={inv._id} className="border-b border-border last:border-0 hover:bg-paper/60 transition-colors">
                  <td className="py-3 px-4 text-ink-muted tabular-num">
                    {new Date(inv.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                  </td>
                  <td className="py-3 px-4 tabular-num text-ink font-medium">{inv.invoiceNo}</td>
                  <td className="py-3 px-4 text-ink">{inv.customerName}</td>
                  <td className="py-3 px-4 tabular-num text-right text-ink font-medium">
                    ₹{inv.grandTotal.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`capitalize text-xs px-2 py-1 rounded-full font-medium ${getStatusStyle(status)}`}>
                      {status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => navigate(`/print/invoice/${inv._id}?type=sales`)} className="text-ink-muted hover:text-brand transition-colors">
  <Eye size={16} />
</button>
                      <button onClick={() => onEdit(inv)} className="text-ink-muted hover:text-brand transition-colors"><Pencil size={16} /></button>
                      <button onClick={() => onDelete(inv._id)} className="text-ink-muted hover:text-status-overdue transition-colors"><Trash2 size={16} /></button>
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