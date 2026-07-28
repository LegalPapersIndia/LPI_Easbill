import { businessSettings } from "../../data/dummyData";

export default function QuotationFooter({ notes, onNotesChange, terms, onTermsChange }) {
  return (
    <div className="bg-white border border-border rounded-xl p-4 sm:p-5 mb-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Notes + Terms */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-ink-muted">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => onNotesChange(e.target.value)}
              rows={2}
              placeholder="Koi extra note (optional)"
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand resize-none"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-ink-muted">Terms & Conditions</label>
            <textarea
              value={terms}
              onChange={(e) => onTermsChange(e.target.value)}
              rows={3}
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand resize-none"
            />
          </div>
        </div>

        {/* Right: Signature only (no payment tracking on quotation) */}
        <div className="flex flex-col justify-end items-end">
          <div className="text-center">
            <div className="w-40 h-16 border border-border rounded-lg flex items-center justify-center overflow-hidden bg-paper">
              {businessSettings.signature ? (
                <img src={businessSettings.signature} alt="Signature" className="w-full h-full object-contain" />
              ) : (
                <span className="text-xs text-ink-muted">No signature set</span>
              )}
            </div>
            <p className="text-[11px] text-ink-muted mt-1">Authorized Signatory</p>
          </div>
        </div>
      </div>
    </div>
  );
}