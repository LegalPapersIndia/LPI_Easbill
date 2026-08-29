// import { useState, useMemo } from "react";
// import DashboardLayout from "../components/layout/DashboardLayout";
// import ContactsToolbar from "../components/contacts/ContactsToolbar";
// import ContactsTable from "../components/contacts/ContactsTable";
// import ContactFormModal from "../components/contacts/ContactFormModal";
// import { contactsList } from "../data/dummyData";

// export default function Contacts() {
//   const [contacts, setContacts] = useState(contactsList);
//   const [search, setSearch] = useState("");
//   const [typeFilter, setTypeFilter] = useState("");
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingContact, setEditingContact] = useState(null);

//   const filteredContacts = useMemo(() => {
//     return contacts.filter((c) => {
//       const matchesSearch =
//         c.name.toLowerCase().includes(search.toLowerCase()) ||
//         c.mobile.includes(search);
//       const matchesType = typeFilter ? c.contactType === typeFilter : true;
//       return matchesSearch && matchesType;
//     });
//   }, [contacts, search, typeFilter]);

//   const stats = useMemo(() => {
//     const toCollect = contacts.filter((c) => c.balanceType === "collect").reduce((sum, c) => sum + c.openingBalance, 0);
//     const toPay = contacts.filter((c) => c.balanceType === "pay").reduce((sum, c) => sum + c.openingBalance, 0);
//     return { total: contacts.length, toCollect, toPay };
//   }, [contacts]);

//   const handleSave = (contactData) => {
//     setContacts((prev) => {
//       const exists = prev.find((c) => c._id === contactData._id);
//       if (exists) return prev.map((c) => (c._id === contactData._id ? contactData : c));
//       return [...prev, contactData];
//     });
//   };

//   const handleEdit = (contact) => {
//     setEditingContact(contact);
//     setModalOpen(true);
//   };

//   const handleDelete = (id) => setContacts((prev) => prev.filter((c) => c._id !== id));

//   const handleAddClick = () => {
//     setEditingContact(null);
//     setModalOpen(true);
//   };

//   return (
//     <DashboardLayout>
//       <div className="mb-6">
//         <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">Contacts</h1>
//         <p className="text-sm text-ink-muted mt-1">Apne customers aur suppliers yahan manage karo.</p>
//       </div>

//       <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-5">
//         <div className="bg-white border border-border rounded-xl p-4">
//           <p className="text-xs text-ink-muted font-medium">All Contacts</p>
//           <p className="tabular-num text-xl font-semibold text-ink mt-1">{stats.total}</p>
//         </div>
//         <div className="bg-white border border-border rounded-xl p-4">
//           <p className="text-xs text-ink-muted font-medium">To Collect</p>
//           <p className="tabular-num text-xl font-semibold text-status-paid mt-1">₹{stats.toCollect.toLocaleString("en-IN")}</p>
//         </div>
//         <div className="bg-white border border-border rounded-xl p-4">
//           <p className="text-xs text-ink-muted font-medium">To Pay</p>
//           <p className="tabular-num text-xl font-semibold text-status-overdue mt-1">₹{stats.toPay.toLocaleString("en-IN")}</p>
//         </div>
//       </div>

//       <ContactsToolbar
//         search={search}
//         onSearchChange={setSearch}
//         typeFilter={typeFilter}
//         onTypeFilterChange={setTypeFilter}
//         onAddClick={handleAddClick}
//       />

//       <ContactsTable contacts={filteredContacts} onEdit={handleEdit} onDelete={handleDelete} />

//       <ContactFormModal
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//         onSave={handleSave}
//         editingContact={editingContact}
//       />
//     </DashboardLayout>
//   );
// }




import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import ContactsToolbar from "../components/contacts/ContactsToolbar";
import ContactsTable from "../components/contacts/ContactsTable";
import ContactFormModal from "../components/contacts/ContactFormModal";
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  getContactStats,
} from "../api/contactsApi";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({ total: 0, toCollect: 0, toPay: 0 });
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ── CONTACTS FETCH KARO (search/filter change hone pe bhi) ──
  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (typeFilter) params.contactType = typeFilter;

      const { data } = await getContacts(params);
      setContacts(data.contacts);
    } catch (err) {
      setError("Contacts load karne mein error aaya");
    } finally {
      setLoading(false);
    }
  }, [search, typeFilter]);

  // ── STATS FETCH KARO (alag se, filter se independent) ──
  const fetchStats = async () => {
    try {
      const { data } = await getContactStats();
      setStats(data.stats);
    } catch (err) {
      console.error("Stats load karne mein error:", err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSave = async (contactData) => {
    try {
      if (editingContact) {
        await updateContact(editingContact._id, contactData);
      } else {
        await createContact(contactData);
      }
      await fetchContacts();
      await fetchStats();
    } catch (err) {
      setError(err.response?.data?.message || "Contact save karne mein error aaya");
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Ye contact delete karna hai?")) return;
    try {
      await deleteContact(id);
      await fetchContacts();
      await fetchStats();
    } catch (err) {
      setError(err.response?.data?.message || "Delete karne mein error aaya");
    }
  };

  const handleAddClick = () => {
    setEditingContact(null);
    setModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">Contacts</h1>
        <p className="text-sm text-ink-muted mt-1">Manage your customers and suppliers here.</p>
      </div>

      {error && (
        <div className="mb-4 text-sm text-status-overdue bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

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

      {loading ? (
        <div className="bg-white border border-border rounded-xl p-10 text-center text-sm text-ink-muted">
          Loading...
        </div>
      ) : (
        <ContactsTable contacts={contacts} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <ContactFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editingContact={editingContact}
      />
    </DashboardLayout>
  );
}