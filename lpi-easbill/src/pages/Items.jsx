// import { useState, useMemo } from "react";
// import DashboardLayout from "../components/layout/DashboardLayout";
// import ItemsToolbar from "../components/items/ItemsToolbar";
// import ItemsTable from "../components/items/ItemsTable";
// import ItemFormModal from "../components/items/ItemFormModal";
// import { itemsList, categories } from "../data/dummyData";

// export default function Items() {
//   const [items, setItems] = useState(itemsList);
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
//         categories={categories}
//       />
//     </DashboardLayout>
//   );
// }





import { useState, useMemo } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import ItemsToolbar from "../components/items/ItemsToolbar";
import ItemsTable from "../components/items/ItemsTable";
import ItemFormModal from "../components/items/ItemFormModal";
import { itemsList, servicesList, categories, groupsList, brandsList } from "../data/dummyData";

export default function Items() {
  const [items, setItems] = useState([...itemsList, ...servicesList]);
  const [groups, setGroups] = useState(groupsList.map((g) => g.name));
  const [brands, setBrands] = useState(brandsList.map((b) => b.name));
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.sku.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category ? item.category === category : true;
      return matchesSearch && matchesCategory;
    });
  }, [items, search, category]);

  const handleSave = (itemData) => {
    setItems((prev) => {
      const exists = prev.find((i) => i._id === itemData._id);
      if (exists) return prev.map((i) => (i._id === itemData._id ? itemData : i));
      return [...prev, itemData];
    });
  };

  const handleAddGroup = (name) => setGroups((prev) => [...prev, name]);
  const handleAddBrand = (name) => setBrands((prev) => [...prev, name]);

  const handleEdit = (item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((i) => i._id !== id));
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

      <ItemsToolbar
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
        onAddClick={handleAddClick}
      />

      <ItemsTable items={filteredItems} onEdit={handleEdit} onDelete={handleDelete} />

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