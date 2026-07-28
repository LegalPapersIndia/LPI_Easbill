import { Search, Plus, Filter } from "lucide-react";

export default function ContactsToolbar({ search, onSearchChange, typeFilter, onTypeFilterChange, onAddClick }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
      <div className="flex items-center gap-2 bg-white border border-border rounded-lg px-3 py-2 flex-1">
        <Search size={16} className="text-ink-muted shrink-0" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name or mobile..."
          className="bg-transparent text-sm outline-none w-full placeholder:text-ink-muted"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-white border border-border rounded-lg px-3 py-2">
          <Filter size={16} className="text-ink-muted shrink-0" />
          <select
            value={typeFilter}
            onChange={(e) => onTypeFilterChange(e.target.value)}
            className="bg-transparent text-sm outline-none text-ink"
          >
            <option value="">All Types</option>
            <option value="Customer">Customer</option>
            <option value="Supplier">Supplier</option>
          </select>
        </div>

        <button
          onClick={onAddClick}
          className="flex items-center gap-2 bg-brand text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors whitespace-nowrap"
        >
          <Plus size={16} />
          Add Contact
        </button>
      </div>
    </div>
  );
}