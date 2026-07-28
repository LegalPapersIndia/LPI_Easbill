import { useState } from "react";
import { Search, X, FileText } from "lucide-react";

export default function LinkInvoiceSearch({ invoices, selectedInvoice, onSelect, type }) {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const numberField = type === "sales" ? "invoiceNo" : "purchaseNo";
  const partyField = type === "sales" ? "customerName" : "supplierName";

  const filtered = invoices.filter((inv) =>
    inv[numberField].toLowerCase().includes(query.toLowerCase()) ||
    inv[partyField].toLowerCase().includes(query.toLowerCase())
  );

  if (selectedInvoice) {
    return (
      <div className="flex items-center justify-between bg-brand-light border border-brand/20 rounded-lg px-4 py-3">
        <div className="flex items-center gap-3">
          <FileText size={18} className="text-brand" />
          <div>
            <p className="text-sm font-medium text-ink tabular-num">{selectedInvoice[numberField]}</p>
            <p className="text-xs text-ink-muted">{selectedInvoice[partyField]} · ₹{selectedInvoice.grandTotal.toLocaleString("en-IN")}</p>
          </div>
        </div>
        <button onClick={() => onSelect(null)} className="text-ink-muted hover:text-status-overdue">
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-white border border-border rounded-lg px-3 py-2">
        <Search size={16} className="text-ink-muted shrink-0" />
        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setShowResults(true); }}
          onFocus={() => setShowResults(true)}
          placeholder={`Search ${type === "sales" ? "sales invoice" : "purchase invoice"} no or party...`}
          className="bg-transparent text-sm outline-none w-full placeholder:text-ink-muted"
        />
      </div>

      {showResults && query && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-border rounded-lg shadow-lg max-h-52 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="px-4 py-3 text-sm text-ink-muted">Koi invoice nahi mila</p>
          ) : (
            filtered.map((inv) => (
              <button
                key={inv._id}
                type="button"
                onClick={() => { onSelect(inv); setShowResults(false); setQuery(""); }}
                className="w-full text-left px-4 py-2.5 hover:bg-paper transition-colors border-b border-border last:border-0"
              >
                <p className="text-sm font-medium text-ink tabular-num">{inv[numberField]}</p>
                <p className="text-xs text-ink-muted">{inv[partyField]} · ₹{inv.grandTotal.toLocaleString("en-IN")}</p>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}