import { useState } from "react";
import { Plus, Check, X } from "lucide-react";

export default function InlineAddSelect({ label, value, onChange, options, onAddOption }) {
  const [adding, setAdding] = useState(false);
  const [newValue, setNewValue] = useState("");

  const handleSelectChange = (e) => {
    if (e.target.value === "__add_new__") {
      setAdding(true);
      return;
    }
    onChange(e.target.value);
  };

  const handleAddSubmit = () => {
    const trimmed = newValue.trim();
    if (!trimmed) return;
    onAddOption(trimmed);
    onChange(trimmed);
    setNewValue("");
    setAdding(false);
  };

  if (adding) {
    return (
      <div>
        <label className="text-xs font-medium text-ink-muted">{label}</label>
        <div className="flex items-center gap-1.5 mt-1">
          <input
            autoFocus
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSubmit())}
            placeholder={`New ${label.toLowerCase()} name`}
            className="flex-1 border border-brand rounded-lg px-3 py-2 text-sm outline-none"
          />
          <button type="button" onClick={handleAddSubmit} className="bg-brand text-white p-2 rounded-lg hover:bg-brand-dark transition-colors shrink-0">
            <Check size={16} />
          </button>
          <button type="button" onClick={() => { setAdding(false); setNewValue(""); }} className="border border-border text-ink-muted p-2 rounded-lg hover:bg-paper transition-colors shrink-0">
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <label className="text-xs font-medium text-ink-muted">{label}</label>
      <select
        value={value}
        onChange={handleSelectChange}
        className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        <option value="__add_new__" className="text-brand font-medium">+ Add New {label}</option>
      </select>
    </div>
  );
}