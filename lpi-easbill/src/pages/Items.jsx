

// import { useState, useMemo } from "react";
// import DashboardLayout from "../components/layout/DashboardLayout";
// import ItemsToolbar from "../components/items/ItemsToolbar";
// import ItemsTable from "../components/items/ItemsTable";
// import ItemFormModal from "../components/items/ItemFormModal";
// import { itemsList, servicesList, categories, groupsList, brandsList } from "../data/dummyData";

// export default function Items() {
//   const [items, setItems] = useState([...itemsList, ...servicesList]);
//   const [groups, setGroups] = useState(groupsList.map((g) => g.name));
//   const [brands, setBrands] = useState(brandsList.map((b) => b.name));
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);

//   const filteredItems = useMemo(() => {
//     return items.filter((item) => {
//       const matchesSearch =
//         item.name.toLowerCase().includes(search.toLowerCase()) ||
//         item.sku.toLowerCase().includes(search.toLowerCase());
//       const matchesCategory = category ? item.category === category : true;
//       return matchesSearch && matchesCategory;
//     });
//   }, [items, search, category]);

//   const handleSave = (itemData) => {
//     setItems((prev) => {
//       const exists = prev.find((i) => i._id === itemData._id);
//       if (exists) return prev.map((i) => (i._id === itemData._id ? itemData : i));
//       return [...prev, itemData];
//     });
//   };

//   const handleAddGroup = (name) => setGroups((prev) => [...prev, name]);
//   const handleAddBrand = (name) => setBrands((prev) => [...prev, name]);

//   const handleEdit = (item) => {
//     setEditingItem(item);
//     setModalOpen(true);
//   };

//   const handleDelete = (id) => {
//     setItems((prev) => prev.filter((i) => i._id !== id));
//   };

//   const handleAddClick = () => {
//     setEditingItem(null);
//     setModalOpen(true);
//   };

//   return (
//     <DashboardLayout>
//       <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//         <div>
//           <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">Items</h1>
//           <p className="text-sm text-ink-muted mt-1">Apne products/services yahan manage karo.</p>
//         </div>
//       </div>

//       <ItemsToolbar
//         search={search}
//         onSearchChange={setSearch}
//         category={category}
//         onCategoryChange={setCategory}
//         categories={categories}
//         onAddClick={handleAddClick}
//       />

//       <ItemsTable items={filteredItems} onEdit={handleEdit} onDelete={handleDelete} />

//       <ItemFormModal
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//         onSave={handleSave}
//         editingItem={editingItem}
//         groups={groups}
//         brands={brands}
//         onAddGroup={handleAddGroup}
//         onAddBrand={handleAddBrand}
//       />
//     </DashboardLayout>
//   );
// }




import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import ItemsToolbar from "../components/items/ItemsToolbar";
import ItemsTable from "../components/items/ItemsTable";
import ItemFormModal from "../components/items/ItemFormModal";
import {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  getGroups,
  createGroup,
  getBrands,
  createBrand,
} from "../api/itemsApi";

export default function Items() {
  const [items, setItems] = useState([]);
  const [groups, setGroups] = useState([]);
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  const [groupFilter, setGroupFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ── ITEMS FETCH KARO (search/filter change hone pe bhi) ──
  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (groupFilter) params.group = groupFilter;

      const { data } = await getItems(params);
      setItems(data.items);
    } catch (err) {
      setError("An error occurred while loading items.");
    } finally {
      setLoading(false);
    }
  }, [search, groupFilter]);

  // ── GROUPS + BRANDS FETCH KARO ──
  const fetchGroupsAndBrands = async () => {
    try {
      const [groupsRes, brandsRes] = await Promise.all([getGroups(), getBrands()]);
      setGroups(groupsRes.data.groups.map((g) => g.name));
      setBrands(brandsRes.data.brands.map((b) => b.name));
    } catch (err) {
      console.error("Groups/Brands load karne mein error:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    fetchGroupsAndBrands();
  }, []);

  const handleSave = async (itemData) => {
    try {
      if (editingItem) {
        await updateItem(editingItem._id, itemData);
      } else {
        await createItem(itemData);
      }
      await fetchItems();
    } catch (err) {
      setError(err.response?.data?.message || "Item save karne mein error aaya");
    }
  };

  const handleAddGroup = async (name) => {
    try {
      await createGroup(name);
      await fetchGroupsAndBrands();
    } catch (err) {
      console.error("Group add karne mein error:", err);
    }
  };

  const handleAddBrand = async (name) => {
    try {
      await createBrand(name);
      await fetchGroupsAndBrands();
    } catch (err) {
      console.error("Brand add karne mein error:", err);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Ye item delete karna hai?")) return;
    try {
      await deleteItem(id);
      await fetchItems();
    } catch (err) {
      setError(err.response?.data?.message || "Delete karne mein error aaya");
    }
  };

  const handleAddClick = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">Items</h1>
          <p className="text-sm text-ink-muted mt-1">Apne products/services yahan manage karo.</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 text-sm text-status-overdue bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <ItemsToolbar
        search={search}
        onSearchChange={setSearch}
        category={groupFilter}
        onCategoryChange={setGroupFilter}
        categories={groups}
        onAddClick={handleAddClick}
      />

      {loading ? (
        <div className="bg-white border border-border rounded-xl p-10 text-center text-sm text-ink-muted">
          Loading...
        </div>
      ) : (
        <ItemsTable items={items} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <ItemFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editingItem={editingItem}
        groups={groups}
        brands={brands}
        onAddGroup={handleAddGroup}
        onAddBrand={handleAddBrand}
      />
    </DashboardLayout>
  );
}