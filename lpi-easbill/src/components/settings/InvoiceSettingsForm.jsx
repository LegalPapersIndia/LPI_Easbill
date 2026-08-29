// import { useState } from "react";
// import { invoicePrintSettings } from "../../data/dummyData";

// const toggleFields = [
//   { key: "showLogo", label: "Show Company Logo", desc: "Invoice header mein logo dikhega" },
//   { key: "showSignature", label: "Show Signature", desc: "Authorized signatory image dikhega" },
//   { key: "showQrCode", label: "Show Payment QR Code", desc: "Sales Invoice pe scan-and-pay QR dikhega" },
//   { key: "showBankDetails", label: "Show Bank Details", desc: "Sales Invoice footer mein bank account dikhega" },
//   { key: "showHsnCode", label: "Show HSN Code", desc: "Items table mein HSN code column dikhega" },
//   { key: "showItemDiscount", label: "Show Item-wise Discount", desc: "Har item ka discount alag column mein dikhega" },
//   { key: "showShippingAddress", label: "Show Shipping Address", desc: "Bill To ke saath Ship To bhi dikhega" },
//   { key: "roundOffTotal", label: "Auto Round Off Total", desc: "Grand Total ko nearest rupee tak round karega" },
// ];

// const templateOptions = ["Standard", "Elegant", "Colorful"];

// export default function InvoiceSettingsForm() {
//   const [form, setForm] = useState(invoicePrintSettings);

//   const handleToggle = (key) => setForm((prev) => ({ ...prev, [key]: !prev[key] }));
//   const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

//   const handleSave = () => {
//     console.log("Invoice settings saved (dummy):", form);
//     alert("Invoice Settings save ho gaye! (Console mein dekho — abhi backend connect nahi hai)");
//   };

//   return (
//     <div className="space-y-4">
//       {/* Template Selection */}
//       <div className="bg-white border border-border rounded-xl p-4 sm:p-5">
//         <p className="font-display font-semibold text-ink mb-1">Invoice Template</p>
//         <p className="text-xs text-ink-muted mb-4">Print/PDF layout ka style select karo.</p>

//         <div className="flex flex-wrap gap-3">
//           {templateOptions.map((t) => (
//             <button
//               key={t}
//               type="button"
//               onClick={() => handleChange("invoiceTemplate", t)}
//               className={`px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors
//                 ${form.invoiceTemplate === t ? "border-brand bg-brand-light text-brand" : "border-border text-ink-muted"}`}
//             >
//               {t}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Display Toggles */}
//       <div className="bg-white border border-border rounded-xl p-4 sm:p-5">
//         <p className="font-display font-semibold text-ink mb-4">Invoice Mein Kya Dikhana Hai</p>

//         <div className="divide-y divide-border">
//           {toggleFields.map(({ key, label, desc }) => (
//             <label key={key} className="flex items-center justify-between py-3 cursor-pointer">
//               <div>
//                 <p className="text-sm font-medium text-ink">{label}</p>
//                 <p className="text-xs text-ink-muted">{desc}</p>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => handleToggle(key)}
//                 className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ml-4
//                   ${form[key] ? "bg-brand" : "bg-border"}`}
//               >
//                 <span
//                   className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform
//                     ${form[key] ? "translate-x-5.5" : "translate-x-0.5"}`}
//                 />
//               </button>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Additional Notes */}
//       <div className="bg-white border border-border rounded-xl p-4 sm:p-5">
//         <label className="text-xs font-medium text-ink-muted">Footer Message</label>
//         <p className="text-xs text-ink-muted mb-2">Ye message invoice ke sabse neeche dikhega.</p>
//         <textarea
//           value={form.additionalNotes}
//           onChange={(e) => handleChange("additionalNotes", e.target.value)}
//           rows={2}
//           className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand resize-none"
//         />
//       </div>

//       <div className="flex justify-end gap-3 pb-2">
//         <button className="border border-border text-ink-muted font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-paper transition-colors">
//           Cancel
//         </button>
//         <button
//           onClick={handleSave}
//           className="bg-brand text-white font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-brand-dark transition-colors"
//         >
//           Save Changes
//         </button>
//       </div>
//     </div>
//   );
// }



import { Check } from "lucide-react";
import { useSettings } from "../../context/SettingsContext";

const templates = [
  { key: "Standard", label: "Standard", desc: "Clean black & white, professional look" },
  { key: "Colorful", label: "Colorful", desc: "Blue header band, modern feel" },
  { key: "Elegant", label: "Elegant", desc: "Gold border, serif font, formal invoices" },
];

export default function InvoiceSettingsForm() {
  const { printSettings, updateTemplate } = useSettings();

  return (
    <div className="space-y-4">
      {/* Template Selection */}
      <div className="bg-white border border-border rounded-xl p-4 sm:p-5">
        <p className="font-display font-semibold text-ink mb-1">Invoice Template</p>
        <p className="text-xs text-ink-muted mb-4">Whichever template you select will immediately appear in the print preview.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {templates.map((t) => {
            const isSelected = printSettings.invoiceTemplate === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => updateTemplate(t.key)}
                className={`relative text-left p-4 rounded-xl border-2 transition-colors
                  ${isSelected ? "border-brand bg-brand-light" : "border-border hover:border-brand/40"}`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 w-5 h-5 bg-brand rounded-full flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                )}
                <p className={`text-sm font-semibold ${isSelected ? "text-brand" : "text-ink"}`}>{t.label}</p>
                <p className="text-xs text-ink-muted mt-1">{t.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white border border-border rounded-xl p-4 sm:p-5">
        <p className="text-xs text-ink-muted">
          Currently selected: <span className="font-medium text-ink">{printSettings.invoiceTemplate}</span>
        </p>
        <p className="text-xs text-ink-muted mt-1">
          You can instantly view this template by clicking the "eye" icon on any sales invoice, quotation, purchase invoice, or PO.
        </p>
      </div>
    </div>
  );
}