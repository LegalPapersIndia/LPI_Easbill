

// import { useState, useEffect } from "react";
// import { X, FileText, Boxes, Wallet } from "lucide-react";
// import { unitOptions } from "../../data/dummyData";
// import BasicDetailsTab from "./tabs/BasicDetailsTab";
// import StockDetailsTab from "./tabs/StockDetailsTab";
// import PricingDetailsTab from "./tabs/PricingDetailsTab";

// const emptyForm = {
//   itemType: "Product", name: "", sku: "", group: "", brand: "",
//   purchasePrice: "", purchasePriceType: "without_tax",
//   salePrice: "", salePriceType: "with_tax",
//   serviceCharge: "", minServiceCharge: "",
//   gstPercent: 0, discountPercent: 0, hsnCode: "",
//   stockQty: "", unit: "PCS", altUnit: "",
//   lowStockEnabled: false, lowStockThreshold: 0,
//   description: "", asOfDate: new Date().toISOString().slice(0, 10),
// };

// const tabs = [
//   { key: "basic", label: "Basic Details", icon: FileText },
//   { key: "stock", label: "Stock Details", icon: Boxes },
//   { key: "pricing", label: "Pricing Details", icon: Wallet },
// ];

// export default function ItemFormModal({ open, onClose, onSave, editingItem, groups, brands, onAddGroup, onAddBrand }) {
//   const [form, setForm] = useState(emptyForm);
//   const [activeTab, setActiveTab] = useState("basic");

//   useEffect(() => {
//     if (open) {
//       setForm(editingItem ? { ...editingItem } : emptyForm);
//       setActiveTab("basic");
//     }
//   }, [editingItem, open]);

//   if (!open) return null;

//   const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!form.name) {
//       setActiveTab("basic");
//       return alert("Item Name zaroori hai");
//     }
//     onSave({
//       ...form,
//       _id: editingItem?._id || `itm${Date.now()}`,
//       category: form.group, // backward-compat, purani ItemsTable/filter "category" use karta hai
//       purchasePrice: Number(form.purchasePrice) || 0,
//       salePrice: Number(form.salePrice) || 0,
//       gstPercent: Number(form.gstPercent) || 0,
//       discountPercent: Number(form.discountPercent) || 0,
//       stockQty: Number(form.stockQty) || 0,
//       lowStockThreshold: Number(form.lowStockThreshold) || 0,
//     });
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-ink/40 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
//       <div className="bg-white w-full sm:max-w-3xl sm:rounded-xl rounded-t-2xl max-h-[92vh] overflow-hidden flex flex-col">
//         <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
//           <h2 className="font-display font-semibold text-ink">
//             {editingItem ? "Edit Item" : "Create New Item"}
//           </h2>
//           <button onClick={onClose} className="text-ink-muted hover:text-ink">
//             <X size={20} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="flex-1 overflow-hidden flex flex-col sm:flex-row min-h-0">
//           <div className="sm:w-52 shrink-0 border-b sm:border-b-0 sm:border-r border-border">
//             <div className="flex sm:flex-col overflow-x-auto sm:overflow-visible p-3 gap-1">
//               {tabs.map(({ key, label, icon: Icon }) => (
//                 <button
//                   key={key}
//                   type="button"
//                   onClick={() => setActiveTab(key)}
//                   className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
//                     ${activeTab === key ? "bg-brand-light text-brand" : "text-ink-muted hover:bg-paper"}`}
//                 >
//                   <Icon size={16} />
//                   {label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="flex-1 overflow-y-auto p-5 min-h-0">
//             {activeTab === "basic" && (
//               <BasicDetailsTab
//                 form={form}
//                 onChange={handleChange}
//                 groups={groups}
//                 brands={brands}
//                 onAddGroup={onAddGroup}
//                 onAddBrand={onAddBrand}
//                 unitOptions={unitOptions}
//               />
//             )}
//             {activeTab === "stock" && (
//               <StockDetailsTab form={form} onChange={handleChange} unitOptions={unitOptions} />
//             )}
//             {activeTab === "pricing" && (
//               <PricingDetailsTab form={form} onChange={handleChange} />
//             )}
//           </div>
//         </form>

//         <div className="flex gap-3 px-5 py-4 border-t border-border shrink-0">
//           <button type="button" onClick={onClose}
//             className="flex-1 sm:flex-none border border-border text-ink-muted font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-paper transition-colors">
//             Cancel
//           </button>
//           <button type="submit" onClick={handleSubmit}
//             className="flex-1 sm:flex-none sm:ml-auto bg-brand text-white font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-brand-dark transition-colors">
//             {editingItem ? "Save Changes" : "Save Item"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




import { useState, useEffect } from "react";
import { X, FileText, Boxes, Wallet } from "lucide-react";
import { unitOptions } from "../../data/dummyData";
import BasicDetailsTab from "./tabs/BasicDetailsTab";
import StockDetailsTab from "./tabs/StockDetailsTab";
import PricingDetailsTab from "./tabs/PricingDetailsTab";

const emptyForm = {
  itemType: "Product", name: "", sku: "", group: "", brand: "",
  purchasePrice: "", purchasePriceType: "without_tax",
  salePrice: "", salePriceType: "with_tax",
  serviceCharge: "", minServiceCharge: "",
  gstPercent: 0, discountPercent: 0, hsnCode: "",
  stockQty: "", unit: "PCS", altUnit: "",
  lowStockEnabled: false, lowStockThreshold: 0,
  description: "", asOfDate: new Date().toISOString().slice(0, 10),
};

const tabs = [
  { key: "basic", label: "Basic Details", icon: FileText },
  { key: "stock", label: "Stock Details", icon: Boxes },
  { key: "pricing", label: "Pricing Details", icon: Wallet },
];

export default function ItemFormModal({ open, onClose, onSave, editingItem, groups, brands, onAddGroup, onAddBrand }) {
  const [form, setForm] = useState(emptyForm);
  const [activeTab, setActiveTab] = useState("basic");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(editingItem ? { ...editingItem } : emptyForm);
      setActiveTab("basic");
    }
  }, [editingItem, open]);

  if (!open) return null;

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) {
      setActiveTab("basic");
      return alert("Item Name zaroori hai");
    }
    try {
      setSaving(true);
      await onSave({
        ...form,
        purchasePrice: Number(form.purchasePrice) || 0,
        salePrice: Number(form.salePrice) || 0,
        serviceCharge: Number(form.serviceCharge) || 0,
        minServiceCharge: Number(form.minServiceCharge) || 0,
        gstPercent: Number(form.gstPercent) || 0,
        discountPercent: Number(form.discountPercent) || 0,
        stockQty: Number(form.stockQty) || 0,
        lowStockThreshold: Number(form.lowStockThreshold) || 0,
      });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-ink/40 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-3xl sm:rounded-xl rounded-t-2xl max-h-[92vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <h2 className="font-display font-semibold text-ink">
            {editingItem ? "Edit Item" : "Create New Item"}
          </h2>
          <button onClick={onClose} className="text-ink-muted hover:text-ink">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-hidden flex flex-col sm:flex-row min-h-0">
          <div className="sm:w-52 shrink-0 border-b sm:border-b-0 sm:border-r border-border">
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-visible p-3 gap-1">
              {tabs.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
                    ${activeTab === key ? "bg-brand-light text-brand" : "text-ink-muted hover:bg-paper"}`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 min-h-0">
            {activeTab === "basic" && (
              <BasicDetailsTab
                form={form}
                onChange={handleChange}
                groups={groups}
                brands={brands}
                onAddGroup={onAddGroup}
                onAddBrand={onAddBrand}
                unitOptions={unitOptions}
              />
            )}
            {activeTab === "stock" && (
              <StockDetailsTab form={form} onChange={handleChange} unitOptions={unitOptions} />
            )}
            {activeTab === "pricing" && (
              <PricingDetailsTab form={form} onChange={handleChange} />
            )}
          </div>
        </form>

        <div className="flex gap-3 px-5 py-4 border-t border-border shrink-0">
          <button type="button" onClick={onClose}
            className="flex-1 sm:flex-none border border-border text-ink-muted font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-paper transition-colors">
            Cancel
          </button>
          <button type="submit" onClick={handleSubmit} disabled={saving}
            className="flex-1 sm:flex-none sm:ml-auto bg-brand text-white font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-brand-dark transition-colors disabled:opacity-60">
            {saving ? "Saving..." : editingItem ? "Save Changes" : "Save Item"}
          </button>
        </div>
      </div>
    </div>
  );
}