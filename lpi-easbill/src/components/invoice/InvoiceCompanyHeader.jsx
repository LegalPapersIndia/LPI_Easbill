// import { businessSettings } from "../../data/dummyData";

// export default function InvoiceCompanyHeader() {
//   return (
//     <div className="bg-white border border-border rounded-xl p-4 sm:p-5 mb-4 flex items-start justify-between gap-4 flex-wrap">
//       <div className="flex items-center gap-3">
//         <div className="w-12 h-12 rounded-lg bg-brand-light flex items-center justify-center shrink-0 overflow-hidden">
//           {businessSettings.logo ? (
//             <img src={businessSettings.logo} alt="Logo" className="w-full h-full object-cover" />
//           ) : (
//             <span className="font-display font-semibold text-brand text-lg">
//               {businessSettings.businessName.charAt(0)}
//             </span>
//           )}
//         </div>
//         <div>
//           <p className="font-display font-semibold text-ink">{businessSettings.businessName}</p>
//           <p className="text-xs text-ink-muted">{businessSettings.billingAddress || "Address not set"}</p>
//           <p className="text-xs text-ink-muted">{businessSettings.city}{businessSettings.city ? ", " : ""}{businessSettings.state} {businessSettings.pincode}</p>
//         </div>
//       </div>

//       <div className="text-xs text-ink-muted text-right space-y-0.5">
//         {businessSettings.isGstRegistered && (
//           <p>GSTIN: <span className="tabular-num text-ink font-medium">{businessSettings.gstin}</span></p>
//         )}
//         <p>Phone: <span className="tabular-num text-ink">{businessSettings.phone}</span></p>
//         {businessSettings.email && <p>Email: <span className="text-ink">{businessSettings.email}</span></p>}
//       </div>
//     </div>
//   );
// }



import { useBusiness } from "../../context/BusinessContext";

export default function InvoiceCompanyHeader() {
  const { businessSettings, loading } = useBusiness();

  if (loading || !businessSettings) {
    return (
      <div className="bg-white border border-border rounded-xl p-4 sm:p-5 mb-4 text-sm text-ink-muted">
        Loading company details...
      </div>
    );
  }

  return (
    <div className="bg-white border border-border rounded-xl p-4 sm:p-5 mb-4 flex items-start justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-brand-light flex items-center justify-center shrink-0 overflow-hidden">
          {businessSettings.logo ? (
            <img src={businessSettings.logo} alt="Logo" className="w-full h-full object-cover" />
          ) : (
            <span className="font-display font-semibold text-brand text-lg">
              {businessSettings.businessName?.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <p className="font-display font-semibold text-ink">{businessSettings.businessName}</p>
          <p className="text-xs text-ink-muted">{businessSettings.billingAddress || "Address not set"}</p>
          <p className="text-xs text-ink-muted">{businessSettings.city}{businessSettings.city ? ", " : ""}{businessSettings.state} {businessSettings.pincode}</p>
        </div>
      </div>

      <div className="text-xs text-ink-muted text-right space-y-0.5">
        {businessSettings.isGstRegistered && (
          <p>GSTIN: <span className="tabular-num text-ink font-medium">{businessSettings.gstin}</span></p>
        )}
        <p>Phone: <span className="tabular-num text-ink">{businessSettings.phone}</span></p>
        {businessSettings.email && <p>Email: <span className="text-ink">{businessSettings.email}</span></p>}
      </div>
    </div>
  );
}