export default function ReturnsToggle({ type, onTypeChange }) {
  return (
    <div className="inline-flex bg-paper border border-border rounded-lg p-1 mb-5">
      {["sales", "purchase"].map((t) => (
        <button
          key={t}
          onClick={() => onTypeChange(t)}
          className={`px-5 py-2 rounded-md text-sm font-medium capitalize transition-colors
            ${type === t ? "bg-white text-brand shadow-sm" : "text-ink-muted hover:text-ink"}`}
        >
          {t} Return
        </button>
      ))}
    </div>
  );
}