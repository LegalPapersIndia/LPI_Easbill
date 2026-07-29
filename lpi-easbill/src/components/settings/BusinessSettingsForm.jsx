// import { useState } from "react";
// import { ImagePlus, PenLine, QrCode, X } from "lucide-react";
// import {
//   businessSettings,
//   indianStates,
//   stateCodeMap,
//   businessTypeOptions,
//   industryTypeOptions,
//   registrationTypeOptions,
// } from "../../data/dummyData";

// export default function BusinessSettingsForm() {
//   const [form, setForm] = useState(businessSettings);
//   const [logoPreview, setLogoPreview] = useState(null);
//   const [signaturePreview, setSignaturePreview] = useState(null);
//   const [qrPreview, setQrPreview] = useState(null);

//   const handleChange = (field, value) =>
//     setForm((prev) => ({ ...prev, [field]: value }));

//   const handleFileUpload = (e, setPreview) => {
//     const file = e.target.files[0];
//     if (file) setPreview(URL.createObjectURL(file));
//   };

//   const toggleBusinessType = (type) => {
//     setForm((prev) => ({
//       ...prev,
//       businessType: prev.businessType.includes(type)
//         ? prev.businessType.filter((t) => t !== type)
//         : [...prev.businessType, type],
//     }));
//   };

//   const handleSave = () => {
//     console.log("Business settings saved (dummy):", form);
//     alert(
//       "Business Settings save ho gaye! (Console mein dekho — abhi backend connect nahi hai)",
//     );
//   };

//   return (
//     <div className="space-y-4">
//       {/* Logo + Basic Info */}
//       <div className="bg-white border border-border rounded-xl p-4 sm:p-5">
//         <div className="flex flex-col sm:flex-row gap-5">
//           <div>
//             <label className="text-xs font-medium text-ink-muted block mb-2">
//               Business Logo
//             </label>
//             <label className="w-28 h-28 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:border-brand transition-colors overflow-hidden">
//               {logoPreview ? (
//                 <img
//                   src={logoPreview}
//                   alt="Logo"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <>
//                   <ImagePlus size={20} className="text-ink-muted" />
//                   <span className="text-[11px] text-ink-muted text-center px-2">
//                     Upload Logo
//                   </span>
//                 </>
//               )}
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={(e) => handleFileUpload(e, setLogoPreview)}
//               />
//             </label>
//             <p className="text-[11px] text-ink-muted mt-1.5">
//               PNG/JPG, max 5MB
//             </p>
//           </div>

//           <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="sm:col-span-2">
//               <label className="text-xs font-medium text-ink-muted">
//                 Business Name *
//               </label>
//               <input
//                 value={form.businessName}
//                 onChange={(e) => handleChange("businessName", e.target.value)}
//                 className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
//               />
//             </div>
//             <div>
//               <label className="text-xs font-medium text-ink-muted">
//                 Company Phone
//               </label>
//               <input
//                 value={form.phone}
//                 onChange={(e) => handleChange("phone", e.target.value)}
//                 className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
//               />
//             </div>
//             <div>
//               <label className="text-xs font-medium text-ink-muted">
//                 Company Email
//               </label>
//               <input
//                 type="email"
//                 value={form.email}
//                 onChange={(e) => handleChange("email", e.target.value)}
//                 placeholder="Enter company email"
//                 className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Address */}
//       <div className="bg-white border border-border rounded-xl p-4 sm:p-5">
//         <p className="font-display font-semibold text-ink mb-4">Address</p>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div className="sm:col-span-2">
//             <label className="text-xs font-medium text-ink-muted">
//               Billing Address
//             </label>
//             <textarea
//               value={form.billingAddress}
//               onChange={(e) => handleChange("billingAddress", e.target.value)}
//               rows={2}
//               placeholder="Enter billing address"
//               className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand resize-none"
//             />
//           </div>
//         <div>
//             <label className="text-xs font-medium text-ink-muted">State</label>
//             <select
//               value={form.state}
//               onChange={(e) => handleChange("state", e.target.value)}
//               className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
//             >
//               {indianStates.map((s) => (
//                 <option key={s} value={s}>
//                   {stateCodeMap[s]} - {s}
//                 </option>
//               ))}
//             </select>
//             {form.state && (
//               <p className="text-[11px] text-ink-muted mt-1">
//                 State Code:{" "}
//                 <span className="tabular-num font-medium text-ink">
//                   {stateCodeMap[form.state]}
//                 </span>
//               </p>
//             )}
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="text-xs font-medium text-ink-muted">
//                 Pincode
//               </label>
//               <input
//                 value={form.pincode}
//                 onChange={(e) => handleChange("pincode", e.target.value)}
//                 className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
//               />
//             </div>
//             <div>
//               <label className="text-xs font-medium text-ink-muted">City</label>
//               <input
//                 value={form.city}
//                 onChange={(e) => handleChange("city", e.target.value)}
//                 className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* GST & Business Details */}
//       <div className="bg-white border border-border rounded-xl p-4 sm:p-5">
//         <p className="font-display font-semibold text-ink mb-4">
//           GST & Business Details
//         </p>

//         <div className="mb-4">
//           <label className="text-xs font-medium text-ink-muted block mb-2">
//             Are you GST Registered?
//           </label>
//           <div className="flex gap-3">
//             {["Yes", "No"].map((opt) => (
//               <button
//                 key={opt}
//                 type="button"
//                 onClick={() => handleChange("isGstRegistered", opt === "Yes")}
//                 className={`px-5 py-2 rounded-lg text-sm font-medium border transition-colors
//                   ${(opt === "Yes") === form.isGstRegistered ? "border-brand bg-brand-light text-brand" : "border-border text-ink-muted"}`}
//               >
//                 {opt}
//               </button>
//             ))}
//           </div>
//         </div>

//         {form.isGstRegistered && (
//           <div className="mb-4">
//             <label className="text-xs font-medium text-ink-muted">GSTIN</label>
//             <input
//               value={form.gstin}
//               onChange={(e) => handleChange("gstin", e.target.value)}
//               placeholder="ex: 29XXXXX9438X1XX"
//               className="w-full sm:w-72 mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
//             />
//           </div>
//         )}

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label className="text-xs font-medium text-ink-muted block mb-2">
//               Business Type
//             </label>
//             <div className="flex flex-wrap gap-2">
//               {businessTypeOptions.map((type) => (
//                 <button
//                   key={type}
//                   type="button"
//                   onClick={() => toggleBusinessType(type)}
//                   className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors
//                     ${form.businessType.includes(type) ? "border-brand bg-brand-light text-brand" : "border-border text-ink-muted"}`}
//                 >
//                   {type}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div>
//             <label className="text-xs font-medium text-ink-muted">
//               Industry Type
//             </label>
//             <select
//               value={form.industryType}
//               onChange={(e) => handleChange("industryType", e.target.value)}
//               className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
//             >
//               <option value="">Select Industry Type</option>
//               {industryTypeOptions.map((i) => (
//                 <option key={i} value={i}>
//                   {i}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="text-xs font-medium text-ink-muted">
//               Business Registration Type
//             </label>
//             <select
//               value={form.registrationType}
//               onChange={(e) => handleChange("registrationType", e.target.value)}
//               className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
//             >
//               {registrationTypeOptions.map((r) => (
//                 <option key={r} value={r}>
//                   {r}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="text-xs font-medium text-ink-muted">
//               PAN Number
//             </label>
//             <input
//               value={form.panNumber}
//               onChange={(e) => handleChange("panNumber", e.target.value)}
//               placeholder="Enter your PAN Number"
//               className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Bank Account Details + Payment QR (NAYA SECTION) */}
//       <div className="bg-white border border-border rounded-xl p-4 sm:p-5">
//         <p className="font-display font-semibold text-ink mb-1">
//           Bank Account Details
//         </p>
//         <p className="text-xs text-ink-muted mb-4">
//           Ye details invoices ke footer mein customer ko dikhengi, taaki wo
//           payment kar sake.
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
//           <div>
//             <label className="text-xs font-medium text-ink-muted">
//               Account Holder Name
//             </label>
//             <input
//               value={form.accountHolderName}
//               onChange={(e) =>
//                 handleChange("accountHolderName", e.target.value)
//               }
//               placeholder="ex: Legal Papers India"
//               className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
//             />
//           </div>
//           <div>
//             <label className="text-xs font-medium text-ink-muted">
//               Bank Name
//             </label>
//             <input
//               value={form.bankName}
//               onChange={(e) => handleChange("bankName", e.target.value)}
//               placeholder="ex: HDFC Bank"
//               className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
//             />
//           </div>
//           <div>
//             <label className="text-xs font-medium text-ink-muted">
//               Account Number
//             </label>
//             <input
//               value={form.accountNumber}
//               onChange={(e) => handleChange("accountNumber", e.target.value)}
//               className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
//             />
//           </div>
//           <div>
//             <label className="text-xs font-medium text-ink-muted">
//               IFSC Code
//             </label>
//             <input
//               value={form.ifscCode}
//               onChange={(e) => handleChange("ifscCode", e.target.value)}
//               placeholder="ex: HDFC0001234"
//               className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
//             />
//           </div>
//           <div>
//             <label className="text-xs font-medium text-ink-muted">
//               Branch Name (Optional)
//             </label>
//             <input
//               value={form.branchName}
//               onChange={(e) => handleChange("branchName", e.target.value)}
//               className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
//             />
//           </div>
//         </div>

//         <div className="pt-4 border-t border-border">
//           <p className="text-sm font-medium text-ink mb-1">Payment QR Code</p>
//           <p className="text-xs text-ink-muted mb-3">
//             Apne UPI/bank app se QR code ka image upload karo — invoice pe "Scan
//             & Pay" ke saath dikhega.
//           </p>

//           {qrPreview ? (
//             <div className="relative w-32 h-32 border border-border rounded-lg overflow-hidden">
//               <img
//                 src={qrPreview}
//                 alt="Payment QR"
//                 className="w-full h-full object-contain bg-paper"
//               />
//               <button
//                 onClick={() => setQrPreview(null)}
//                 className="absolute top-1 right-1 bg-white border border-border rounded-full p-1 text-status-overdue hover:bg-paper"
//               >
//                 <X size={12} />
//               </button>
//             </div>
//           ) : (
//             <label className="w-32 h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:border-brand transition-colors">
//               <QrCode size={20} className="text-ink-muted" />
//               <span className="text-[11px] text-ink-muted text-center px-2">
//                 Upload QR Code
//               </span>
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={(e) => handleFileUpload(e, setQrPreview)}
//               />
//             </label>
//           )}
//         </div>
//       </div>

//       {/* Signature */}
//       <div className="bg-white border border-border rounded-xl p-4 sm:p-5">
//         <p className="font-display font-semibold text-ink mb-1">Signature</p>
//         <p className="text-xs text-ink-muted mb-4">
//           Ye signature invoices pe dikhega.
//         </p>

//         {signaturePreview ? (
//           <div className="relative w-48 h-24 border border-border rounded-lg overflow-hidden">
//             <img
//               src={signaturePreview}
//               alt="Signature"
//               className="w-full h-full object-contain"
//             />
//             <button
//               onClick={() => setSignaturePreview(null)}
//               className="absolute top-1 right-1 bg-white border border-border rounded-full p-1 text-status-overdue hover:bg-paper"
//             >
//               <X size={12} />
//             </button>
//           </div>
//         ) : (
//           <label className="w-48 h-24 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:border-brand transition-colors">
//             <PenLine size={18} className="text-ink-muted" />
//             <span className="text-[11px] text-ink-muted">Upload Signature</span>
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={(e) => handleFileUpload(e, setSignaturePreview)}
//             />
//           </label>
//         )}
//       </div>

//       {/* Invoice Settings */}
//       <div className="bg-white border border-border rounded-xl p-4 sm:p-5">
//         <p className="font-display font-semibold text-ink mb-4">
//           Invoice Settings
//         </p>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="text-xs font-medium text-ink-muted">
//               Invoice Number Prefix
//             </label>
//             <input
//               value={form.invoicePrefix}
//               onChange={(e) => handleChange("invoicePrefix", e.target.value)}
//               className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
//             />
//           </div>
//           <div>
//             <label className="text-xs font-medium text-ink-muted">
//               Starting Number
//             </label>
//             <input
//               type="number"
//               value={form.invoiceStartNumber}
//               onChange={(e) =>
//                 handleChange("invoiceStartNumber", Number(e.target.value))
//               }
//               className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
//             />
//           </div>
//         </div>
//         <div>
//           <label className="text-xs font-medium text-ink-muted">
//             Default Terms & Conditions
//           </label>
//           <textarea
//             value={form.defaultTerms}
//             onChange={(e) => handleChange("defaultTerms", e.target.value)}
//             rows={3}
//             className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand resize-none"
//           />
//         </div>
//       </div>

//       {/* Save */}
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



import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePlus, PenLine, QrCode, X } from "lucide-react";
import {
  indianStates,
  stateCodeMap,
  businessTypeOptions,
  industryTypeOptions,
  registrationTypeOptions,
} from "../../data/dummyData";
import {
  createBusinessSettings,
  getMyBusinessSettings,
  updateBusinessSettings,
} from "../../api/businessSettingsApi";

const emptyForm = {
  businessName: "",
  phone: "",
  email: "",
  billingAddress: "",
  state: "",
  pincode: "",
  city: "",
  isGstRegistered: false,
  gstin: "",
  businessType: [],
  industryType: "",
  registrationType: "",
  panNumber: "",
  accountHolderName: "",
  bankName: "",
  accountNumber: "",
  ifscCode: "",
  branchName: "",
  invoicePrefix: "INV",
  invoiceStartNumber: 1,
  defaultTerms: "",
};

export default function BusinessSettingsForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [isNew, setIsNew] = useState(false);

  const [logoPreview, setLogoPreview] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);
  const [qrPreview, setQrPreview] = useState(null);

  const [logoFile, setLogoFile] = useState(null);
  const [signatureFile, setSignatureFile] = useState(null);
  const [qrFile, setQrFile] = useState(null);

  // ── EXISTING DATA FETCH KARO (agar hai) ──
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getMyBusinessSettings();
const cleanedBusinessType = (data.businessSettings.businessType || [])
  .map((t) => {
    try {
      const parsed = JSON.parse(t);
      return Array.isArray(parsed) ? parsed[0] : t;
    } catch {
      return t;
    }
  })
  .filter((v, i, arr) => arr.indexOf(v) === i); // duplicates hatao

setForm({
  ...emptyForm,
  ...data.businessSettings,
  businessType: cleanedBusinessType,
});
        if (data.businessSettings.logo) setLogoPreview(data.businessSettings.logo);
        if (data.businessSettings.signature) setSignaturePreview(data.businessSettings.signature);
        if (data.businessSettings.paymentQrCode) setQrPreview(data.businessSettings.paymentQrCode);
      } catch (err) {
        if (err.response?.status === 404) {
          setIsNew(true);
        } else {
          setError("Business Settings load karne mein error aaya");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleFileUpload = (e, setPreview, setFile) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const toggleBusinessType = (type) => {
    setForm((prev) => ({
      ...prev,
      businessType: prev.businessType.includes(type)
        ? prev.businessType.filter((t) => t !== type)
        : [...prev.businessType, type],
    }));
  };

  const handleSave = async () => {
    setError("");

    if (!form.businessName.trim()) {
      setError("Business Name zaroori hai");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "businessType") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      if (logoFile) formData.append("logo", logoFile);
      if (signatureFile) formData.append("signature", signatureFile);
      if (qrFile) formData.append("paymentQrCode", qrFile);

      if (isNew) {
        await createBusinessSettings(formData);
        navigate("/dashboard");
      } else {
        await updateBusinessSettings(formData);
        alert("Business Settings update ho gaye!");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Save karne mein error aaya");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-ink-muted text-sm">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="text-sm text-status-overdue bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      {/* Logo + Basic Info */}
      <div className="bg-white border border-border rounded-xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row gap-5">
          <div>
            <label className="text-xs font-medium text-ink-muted block mb-2">
              Business Logo
            </label>
            <label className="w-28 h-28 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:border-brand transition-colors overflow-hidden">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <ImagePlus size={20} className="text-ink-muted" />
                  <span className="text-[11px] text-ink-muted text-center px-2">
                    Upload Logo
                  </span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, setLogoPreview, setLogoFile)}
              />
            </label>
            <p className="text-[11px] text-ink-muted mt-1.5">
              PNG/JPG, max 5MB
            </p>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs font-medium text-ink-muted">
                Business Name *
              </label>
              <input
                value={form.businessName}
                onChange={(e) => handleChange("businessName", e.target.value)}
                className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ink-muted">
                Company Phone
              </label>
              <input
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ink-muted">
                Company Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter company email"
                className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white border border-border rounded-xl p-4 sm:p-5">
        <p className="font-display font-semibold text-ink mb-4">Address</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-ink-muted">
              Billing Address
            </label>
            <textarea
              value={form.billingAddress}
              onChange={(e) => handleChange("billingAddress", e.target.value)}
              rows={2}
              placeholder="Enter billing address"
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand resize-none"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-ink-muted">State</label>
            <select
              value={form.state}
              onChange={(e) => handleChange("state", e.target.value)}
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
            >
              <option value="">Select State</option>
              {indianStates.map((s) => (
                <option key={s} value={s}>
                  {stateCodeMap[s]} - {s}
                </option>
              ))}
            </select>
            {form.state && (
              <p className="text-[11px] text-ink-muted mt-1">
                State Code:{" "}
                <span className="tabular-num font-medium text-ink">
                  {stateCodeMap[form.state]}
                </span>
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-ink-muted">
                Pincode
              </label>
              <input
                value={form.pincode}
                onChange={(e) => handleChange("pincode", e.target.value)}
                className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ink-muted">City</label>
              <input
                value={form.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </div>
          </div>
        </div>
      </div>

      {/* GST & Business Details */}
      <div className="bg-white border border-border rounded-xl p-4 sm:p-5">
        <p className="font-display font-semibold text-ink mb-4">
          GST & Business Details
        </p>

        <div className="mb-4">
          <label className="text-xs font-medium text-ink-muted block mb-2">
            Are you GST Registered?
          </label>
          <div className="flex gap-3">
            {["Yes", "No"].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleChange("isGstRegistered", opt === "Yes")}
                className={`px-5 py-2 rounded-lg text-sm font-medium border transition-colors
                  ${(opt === "Yes") === form.isGstRegistered ? "border-brand bg-brand-light text-brand" : "border-border text-ink-muted"}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {form.isGstRegistered && (
          <div className="mb-4">
            <label className="text-xs font-medium text-ink-muted">GSTIN</label>
            <input
              value={form.gstin}
              onChange={(e) => handleChange("gstin", e.target.value)}
              placeholder="ex: 29XXXXX9438X1XX"
              className="w-full sm:w-72 mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-ink-muted block mb-2">
              Business Type
            </label>
            <div className="flex flex-wrap gap-2">
              {businessTypeOptions.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleBusinessType(type)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors
                    ${form.businessType.includes(type) ? "border-brand bg-brand-light text-brand" : "border-border text-ink-muted"}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-ink-muted">
              Industry Type
            </label>
            <select
              value={form.industryType}
              onChange={(e) => handleChange("industryType", e.target.value)}
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
            >
              <option value="">Select Industry Type</option>
              {industryTypeOptions.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-ink-muted">
              Business Registration Type
            </label>
            <select
              value={form.registrationType}
              onChange={(e) => handleChange("registrationType", e.target.value)}
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
            >
              <option value="">Select Type</option>
              {registrationTypeOptions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-ink-muted">
              PAN Number
            </label>
            <input
              value={form.panNumber}
              onChange={(e) => handleChange("panNumber", e.target.value)}
              placeholder="Enter your PAN Number"
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
            />
          </div>
        </div>
      </div>

      {/* Bank Account Details + Payment QR */}
      <div className="bg-white border border-border rounded-xl p-4 sm:p-5">
        <p className="font-display font-semibold text-ink mb-1">
          Bank Account Details
        </p>
        <p className="text-xs text-ink-muted mb-4">
          Ye details invoices ke footer mein customer ko dikhengi, taaki wo
          payment kar sake.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div>
            <label className="text-xs font-medium text-ink-muted">
              Account Holder Name
            </label>
            <input
              value={form.accountHolderName}
              onChange={(e) =>
                handleChange("accountHolderName", e.target.value)
              }
              placeholder="ex: Legal Papers India"
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-ink-muted">
              Bank Name
            </label>
            <input
              value={form.bankName}
              onChange={(e) => handleChange("bankName", e.target.value)}
              placeholder="ex: HDFC Bank"
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-ink-muted">
              Account Number
            </label>
            <input
              value={form.accountNumber}
              onChange={(e) => handleChange("accountNumber", e.target.value)}
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-ink-muted">
              IFSC Code
            </label>
            <input
              value={form.ifscCode}
              onChange={(e) => handleChange("ifscCode", e.target.value)}
              placeholder="ex: HDFC0001234"
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-ink-muted">
              Branch Name (Optional)
            </label>
            <input
              value={form.branchName}
              onChange={(e) => handleChange("branchName", e.target.value)}
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-sm font-medium text-ink mb-1">Payment QR Code</p>
          <p className="text-xs text-ink-muted mb-3">
            Apne UPI/bank app se QR code ka image upload karo — invoice pe "Scan
            & Pay" ke saath dikhega.
          </p>

          {qrPreview ? (
            <div className="relative w-32 h-32 border border-border rounded-lg overflow-hidden">
              <img
                src={qrPreview}
                alt="Payment QR"
                className="w-full h-full object-contain bg-paper"
              />
              <button
                onClick={() => {
                  setQrPreview(null);
                  setQrFile(null);
                }}
                className="absolute top-1 right-1 bg-white border border-border rounded-full p-1 text-status-overdue hover:bg-paper"
              >
                <X size={12} />
              </button>
            </div>
          ) : (
            <label className="w-32 h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:border-brand transition-colors">
              <QrCode size={20} className="text-ink-muted" />
              <span className="text-[11px] text-ink-muted text-center px-2">
                Upload QR Code
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, setQrPreview, setQrFile)}
              />
            </label>
          )}
        </div>
      </div>

      {/* Signature */}
      <div className="bg-white border border-border rounded-xl p-4 sm:p-5">
        <p className="font-display font-semibold text-ink mb-1">Signature</p>
        <p className="text-xs text-ink-muted mb-4">
          Ye signature invoices pe dikhega.
        </p>

        {signaturePreview ? (
          <div className="relative w-48 h-24 border border-border rounded-lg overflow-hidden">
            <img
              src={signaturePreview}
              alt="Signature"
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => {
                setSignaturePreview(null);
                setSignatureFile(null);
              }}
              className="absolute top-1 right-1 bg-white border border-border rounded-full p-1 text-status-overdue hover:bg-paper"
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          <label className="w-48 h-24 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:border-brand transition-colors">
            <PenLine size={18} className="text-ink-muted" />
            <span className="text-[11px] text-ink-muted">Upload Signature</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, setSignaturePreview, setSignatureFile)}
            />
          </label>
        )}
      </div>

      {/* Invoice Settings */}
      <div className="bg-white border border-border rounded-xl p-4 sm:p-5">
        <p className="font-display font-semibold text-ink mb-4">
          Invoice Settings
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs font-medium text-ink-muted">
              Invoice Number Prefix
            </label>
            <input
              value={form.invoicePrefix}
              onChange={(e) => handleChange("invoicePrefix", e.target.value)}
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-ink-muted">
              Starting Number
            </label>
            <input
              type="number"
              value={form.invoiceStartNumber}
              onChange={(e) =>
                handleChange("invoiceStartNumber", Number(e.target.value))
              }
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-ink-muted">
            Default Terms & Conditions
          </label>
          <textarea
            value={form.defaultTerms}
            onChange={(e) => handleChange("defaultTerms", e.target.value)}
            rows={3}
            className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand resize-none"
          />
        </div>
      </div>

      {/* Save */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 pb-2">
        {!isNew && (
          <button className="border border-border text-ink-muted font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-paper transition-colors">
            Cancel
          </button>
        )}
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-brand text-white font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-brand-dark transition-colors disabled:opacity-60"
        >
          {saving ? "Saving..." : isNew ? "Continue" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}