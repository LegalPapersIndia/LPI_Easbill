// // gst auto fill code 


// import { useState } from "react";
// import { X } from "lucide-react";
// import { indianStates, stateCodeMap } from "../../data/dummyData";
// import { createContact } from "../../api/contactsApi";
// import { lookupGstin } from "../../api/gstApi";

// const emptyForm = {
//   name: "",
//   mobile: "",
//   gstin: "",
//   state: "",
//   billingAddress: "",
// };

// export default function QuickAddCustomerModal({
//   open,
//   onClose,
//   onCreated,
//   contactType = "Customer",
// }) {
//   const [form, setForm] = useState(emptyForm);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");
//   const [fetchingGst, setFetchingGst] = useState(false);

//   if (!open) return null;

//   const handleChange = (field, value) =>
//     setForm((prev) => ({ ...prev, [field]: value }));

//   const fetchGstDetails = async (gstin) => {
//     try {
//       setFetchingGst(true);
//       const { data } = await lookupGstin(gstin);
//       const info = data.data;
//       setForm((prev) => ({
//         ...prev,
//         name: prev.name || info.trade_name || info.legal_name || prev.name,
//         billingAddress: info.address || prev.billingAddress,
//       }));
//     } catch (err) {
//       // GST invalid ho ya API fail ho jaye, chup-chaap ignore karo — user manually bhar sakta hai
//       console.error("GST lookup fail:", err);
//     } finally {
//       setFetchingGst(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       setSaving(true);
//       const { data } = await createContact({
//         name: form.name,
//         mobile: form.mobile,
//         gstin: form.gstin,
//         state: form.state,
//         stateCode: stateCodeMap[form.state] || "",
//         billingAddress: form.billingAddress,
//         shippingAddress: form.billingAddress,
//         sameAsBilling: true,
//         contactType, // ← "Customer" ya "Supplier", prop se aayega
//       });
//       onCreated(data.contact);
//       setForm(emptyForm);
//       onClose();
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Customer add karne mein error aaya",
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-ink/40 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
//       <div className="bg-white w-full sm:max-w-md sm:rounded-xl rounded-t-2xl max-h-[90vh] overflow-y-auto">
//         <div className="flex items-center justify-between px-5 py-4 border-b border-border sticky top-0 bg-white">
//           <h2 className="font-display font-semibold text-ink">
//             Quick Add {contactType}
//           </h2>
//           <button onClick={onClose} className="text-ink-muted hover:text-ink">
//             <X size={20} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-5 space-y-4">
//           {error && (
//             <div className="text-sm text-status-overdue bg-red-50 border border-red-100 rounded-lg px-3 py-2">
//               {error}
//             </div>
//           )}

//           <div>
//             <label className="text-xs font-medium text-ink-muted">Name *</label>
//             <input
//               required
//               value={form.name}
//               onChange={(e) => handleChange("name", e.target.value)}
//               className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
//             />
//           </div>

//           <div>
//             <label className="text-xs font-medium text-ink-muted">
//               Mobile Number
//             </label>
//             <input
//               value={form.mobile}
//               onChange={(e) => handleChange("mobile", e.target.value)}
//               className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
//             />
//           </div>

//           <div>
//             <label className="text-xs font-medium text-ink-muted">
//               GSTIN (you can leave this blank)
//             </label>
//             <input
//               value={form.gstin}
//               onChange={(e) => {
//                 const value = e.target.value.toUpperCase();
//                 setForm((prev) => {
//                   const updated = { ...prev, gstin: value };
//                   // GST ke pehle 2 digits state code hote hain — match milte hi State auto-fill
//                   const code = value.slice(0, 2);
//                   const matchedState = Object.keys(stateCodeMap).find(
//                     (state) => stateCodeMap[state] === code,
//                   );
//                   if (matchedState) updated.state = matchedState;
//                   return updated;
//                 });

//                 // 15 character poora hote hi business details bhi fetch karo
//                 if (value.length === 15) {
//                   fetchGstDetails(value);
//                 }
//               }}
//               placeholder="ex: 29XXXXX9438X1XX"
//               maxLength={15}
//               className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num bg-white"
//             />
//             {fetchingGst && (
//               <p className="text-[11px] text-brand mt-1">
//                 Fetching business details...
//               </p>
//             )}
//             {!fetchingGst && !form.gstin && (
//               <p className="text-[11px] text-status-pending mt-1">
//                 GST left blank — this {contactType.toLowerCase()} won't appear
//                 in the Contacts list, but it can still be used to create a{" "}
//                 {contactType === "Supplier" ? "purchase" : "invoice"}.
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="text-xs font-medium text-ink-muted">State</label>
//             <select
//               value={form.state}
//               onChange={(e) => handleChange("state", e.target.value)}
//               className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
//             >
//               <option value="">Select state</option>
//               {indianStates.map((s) => (
//                 <option key={s} value={s}>
//                   {stateCodeMap[s]} - {s}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="text-xs font-medium text-ink-muted">
//               Address
//             </label>
//             <textarea
//               value={form.billingAddress}
//               onChange={(e) => handleChange("billingAddress", e.target.value)}
//               rows={2}
//               className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand resize-none"
//             />
//           </div>

//           <div className="flex gap-3 pt-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 border border-border text-ink-muted font-medium py-2.5 rounded-lg text-sm hover:bg-paper transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={saving}
//               className="flex-1 bg-brand text-white font-medium py-2.5 rounded-lg text-sm hover:bg-brand-dark transition-colors disabled:opacity-60"
//             >
//               {saving ? "Adding..." : "Add & Select"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }






import { useState } from "react";
import { X } from "lucide-react";
import { indianStates, stateCodeMap } from "../../data/dummyData";
import { createContact } from "../../api/contactsApi";

const emptyForm = {
  name: "",
  mobile: "",
  gstin: "",
  state: "",
  billingAddress: "",
};

export default function QuickAddCustomerModal({
  open,
  onClose,
  onCreated,
  contactType = "Customer",
}) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setSaving(true);
      const { data } = await createContact({
        name: form.name,
        mobile: form.mobile,
        gstin: form.gstin,
        state: form.state,
        stateCode: stateCodeMap[form.state] || "",
        billingAddress: form.billingAddress,
        shippingAddress: form.billingAddress,
        sameAsBilling: true,
        contactType, // ← "Customer" ya "Supplier", prop se aayega
      });
      onCreated(data.contact);
      setForm(emptyForm);
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message || "Customer add karne mein error aaya",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-ink/40 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-md sm:rounded-xl rounded-t-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border sticky top-0 bg-white">
          <h2 className="font-display font-semibold text-ink">
            Quick Add {contactType}
          </h2>
          <button onClick={onClose} className="text-ink-muted hover:text-ink">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="text-sm text-status-overdue bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-ink-muted">Name *</label>
            <input
              required
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-ink-muted">
              Mobile Number
            </label>
            <input
              value={form.mobile}
              onChange={(e) => handleChange("mobile", e.target.value)}
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-ink-muted">
              GSTIN (you can leave this blank)
            </label>
            <input
  value={form.gstin}
  onChange={(e) => {
    const value = e.target.value.toUpperCase();
    setForm((prev) => {
      const updated = { ...prev, gstin: value };
      // GST ke pehle 2 digits state code hote hain — match milte hi State auto-fill
      const code = value.slice(0, 2);
      const matchedState = Object.keys(stateCodeMap).find((state) => stateCodeMap[state] === code);
      if (matchedState) updated.state = matchedState;
      return updated;
    });
  }}
  placeholder="ex: 29XXXXX9438X1XX"
  className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num bg-white"
/>
            {!form.gstin && (
              <p className="text-[11px] text-status-pending mt-1">
                GST left blank — this {contactType.toLowerCase()} won't appear
                in the Contacts list, but it can still be used to create a{" "}
                {contactType === "Supplier" ? "purchase" : "invoice"}.
              </p>
            )}
          </div>

          <div>
            <label className="text-xs font-medium text-ink-muted">State</label>
            <select
              value={form.state}
              onChange={(e) => handleChange("state", e.target.value)}
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
            >
              <option value="">Select state</option>
              {indianStates.map((s) => (
                <option key={s} value={s}>
                  {stateCodeMap[s]} - {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-ink-muted">
              Address
            </label>
            <textarea
              value={form.billingAddress}
              onChange={(e) => handleChange("billingAddress", e.target.value)}
              rows={2}
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-border text-ink-muted font-medium py-2.5 rounded-lg text-sm hover:bg-paper transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-brand text-white font-medium py-2.5 rounded-lg text-sm hover:bg-brand-dark transition-colors disabled:opacity-60"
            >
              {saving ? "Adding..." : "Add & Select"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



