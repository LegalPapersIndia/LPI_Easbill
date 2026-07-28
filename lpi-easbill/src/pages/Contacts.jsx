import { useState, useMemo } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import ContactsToolbar from "../components/contacts/ContactsToolbar";
import ContactsTable from "../components/contacts/ContactsTable";
import ContactFormModal from "../components/contacts/ContactFormModal";
import { contactsList } from "../data/dummyData";

export default function Contacts() {
  const [contacts, setContacts] = useState(contactsList);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.mobile.includes(search);
      const matchesType = typeFilter ? c.contactType === typeFilter : true;
      return matchesSearch && matchesType;
    });
  }, [contacts, search, typeFilter]);

  const stats = useMemo(() => {
    const toCollect = contacts.filter((c) => c.balanceType === "collect").reduce((sum, c) => sum + c.openingBalance, 0);
    const toPay = contacts.filter((c) => c.balanceType === "pay").reduce((sum, c) => sum + c.openingBalance, 0);
    return { total: contacts.length, toCollect, toPay };
  }, [contacts]);

  const handleSave = (contactData) => {
    setContacts((prev) => {
      const exists = prev.find((c) => c._id === contactData._id);
      if (exists) return prev.map((c) => (c._id === contactData._id ? contactData : c));
      return [...prev, contactData];
    });
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setModalOpen(true);
  };

  const handleDelete = (id) => setContacts((prev) => prev.filter((c) => c._id !== id));

  const handleAddClick = () => {
    setEditingContact(null);
    setModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">Contacts</h1>
        <p className="text-sm text-ink-muted mt-1">Apne customers aur suppliers yahan manage karo.</p>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-5">
        <div className="bg-white border border-border rounded-xl p-4">
          <p className="text-xs text-ink-muted font-medium">All Contacts</p>
          <p className="tabular-num text-xl font-semibold text-ink mt-1">{stats.total}</p>
        </div>
        <div className="bg-white border border-border rounded-xl p-4">
          <p className="text-xs text-ink-muted font-medium">To Collect</p>
          <p className="tabular-num text-xl font-semibold text-status-paid mt-1">₹{stats.toCollect.toLocaleString("en-IN")}</p>
        </div>
        <div className="bg-white border border-border rounded-xl p-4">
          <p className="text-xs text-ink-muted font-medium">To Pay</p>
          <p className="tabular-num text-xl font-semibold text-status-overdue mt-1">₹{stats.toPay.toLocaleString("en-IN")}</p>
        </div>
      </div>

      <ContactsToolbar
        search={search}
        onSearchChange={setSearch}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        onAddClick={handleAddClick}
      />

      <ContactsTable contacts={filteredContacts} onEdit={handleEdit} onDelete={handleDelete} />

      <ContactFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editingContact={editingContact}
      />
    </DashboardLayout>
  );
}