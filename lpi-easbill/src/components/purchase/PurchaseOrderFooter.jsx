export default function PurchaseOrderFooter({ notes, onNotesChange, terms, onTermsChange }) {
  return (
    <div className="bg-white border border-border rounded-xl p-4 sm:p-5 mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            rows={2}
            className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand resize-none"
          />
        </div>
      </div>
    </div>
  );
}