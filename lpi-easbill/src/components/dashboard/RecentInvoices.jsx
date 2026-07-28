import { recentInvoices } from "../../data/dummyData";

const statusStyle = {
  paid: "bg-status-paid/10 text-status-paid",
  pending: "bg-status-pending/10 text-status-pending",
  overdue: "bg-status-overdue/10 text-status-overdue",
};

export default function RecentInvoices() {
  return (
    <div className="bg-white border border-border rounded-xl p-4 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="font-display font-semibold text-ink">Recent Invoices</p>
        <button className="text-sm text-brand font-medium hover:underline">View all</button>
      </div>

      {/* Mobile: scrollable table, jaisa LPI-B2B pattern mein use kiya */}
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="text-left text-ink-muted border-b border-border">
              <th className="py-2 px-4 sm:px-0 font-medium">Invoice</th>
              <th className="py-2 px-4 font-medium">Customer</th>
              <th className="py-2 px-4 font-medium">Date</th>
              <th className="py-2 px-4 font-medium text-right">Amount</th>
              <th className="py-2 px-4 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentInvoices.map((inv) => (
              <tr key={inv._id} className="border-b border-border last:border-0">
                <td className="py-3 px-4 sm:px-0 tabular-num text-ink font-medium">{inv.invoiceNo}</td>
                <td className="py-3 px-4 text-ink">{inv.customerName}</td>
                <td className="py-3 px-4 text-ink-muted">{inv.date}</td>
                <td className="py-3 px-4 tabular-num text-right text-ink">
                  ₹{inv.total.toLocaleString("en-IN")}
                </td>
                <td className="py-3 px-4 text-right">
                  <span className={`capitalize text-xs px-2 py-1 rounded-full ${statusStyle[inv.status]}`}>
                    {inv.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}