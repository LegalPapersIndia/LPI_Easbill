import { Pencil, Trash2 } from "lucide-react";

export default function ContactsTable({ contacts, onEdit, onDelete }) {
  if (contacts.length === 0) {
    return (
      <div className="bg-white border border-border rounded-xl p-10 text-center">
        <p className="text-ink-muted text-sm">Koi contact nahi mila. Naya add karo ya search/filter check karo.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-170 text-sm">
          <thead>
            <tr className="text-left text-ink-muted bg-paper border-b border-border">
              <th className="py-3 px-4 font-medium">Name</th>
              <th className="py-3 px-4 font-medium">Category</th>
              <th className="py-3 px-4 font-medium">Mobile</th>
              <th className="py-3 px-4 font-medium">Type</th>
              <th className="py-3 px-4 font-medium text-right">Balance</th>
              <th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c._id} className="border-b border-border last:border-0 hover:bg-paper/60 transition-colors">
                <td className="py-3 px-4">
                  <p className="text-ink font-medium">{c.name}</p>
                  <p className="text-xs text-ink-muted tabular-num">{c.gstin || "No GSTIN"}</p>
                </td>
                <td className="py-3 px-4 text-ink-muted">{c.category || "-"}</td>
                <td className="py-3 px-4 tabular-num text-ink-muted">{c.mobile}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium
                    ${c.contactType === "Customer" ? "bg-brand-light text-brand" : "bg-status-pending/10 text-status-pending"}`}>
                    {c.contactType}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <span className={`tabular-num font-medium ${c.balanceType === "collect" ? "text-status-paid" : "text-status-overdue"}`}>
                    ₹{c.openingBalance.toLocaleString("en-IN")}
                  </span>
                  <p className="text-[11px] text-ink-muted">{c.balanceType === "collect" ? "To Collect" : "To Pay"}</p>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => onEdit(c)} className="text-ink-muted hover:text-brand transition-colors">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => onDelete(c._id)} className="text-ink-muted hover:text-status-overdue transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}