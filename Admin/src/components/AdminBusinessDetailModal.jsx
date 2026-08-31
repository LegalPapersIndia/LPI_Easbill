import { X, Building2 } from "lucide-react";

function Row({ label, value }) {
  if (!value && value !== false) return null;
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-[#F1F5F9] last:border-0">
      <span className="text-xs text-[#64748B]">{label}</span>
      <span className="text-sm text-[#0F172A] font-medium text-right">
        {typeof value === "boolean" ? (value ? "Yes" : "No") : value}
      </span>
    </div>
  );
}

export default function AdminBusinessDetailModal({ user, onClose }) {
  if (!user) return null;

  const biz = user.companyId || {};

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0] sticky top-0 bg-white">
          <div className="flex items-center gap-2">
            <Building2 size={18} className="text-[#1D4ED8]" />
            <p className="font-semibold text-[#0F172A]">Business Details</p>
          </div>
          <button onClick={onClose} className="text-[#64748B] hover:text-[#0F172A]">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Owner / Account Info */}
          <div>
            <p className="text-xs font-semibold text-[#1D4ED8] uppercase tracking-wide mb-2">
              Account Info
            </p>
            <div className="bg-[#F8FAFC] rounded-lg px-4">
              <Row label="Owner Name" value={user.name} />
              <Row label="Email" value={user.email} />
              <Row label="Phone" value={user.phone} />
              <Row
                label="Registered On"
                value={new Date(user.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              />
            </div>
          </div>

          {/* Business Info */}
          {biz.businessName ? (
            <>
              {biz.logo && (
                <div>
                  <p className="text-xs font-semibold text-[#1D4ED8] uppercase tracking-wide mb-2">
                    Logo
                  </p>
                  <img
                    src={biz.logo}
                    alt="Logo"
                    className="w-16 h-16 object-contain border border-[#E2E8F0] rounded-lg"
                  />
                </div>
              )}

              <div>
                <p className="text-xs font-semibold text-[#1D4ED8] uppercase tracking-wide mb-2">
                  Business Info
                </p>
                <div className="bg-[#F8FAFC] rounded-lg px-4">
                  <Row label="Business Name" value={biz.businessName} />
                  <Row label="Company Phone" value={biz.phone} />
                  <Row label="Company Email" value={biz.email} />
                  <Row label="Billing Address" value={biz.billingAddress} />
                  <Row label="City" value={biz.city} />
                  <Row label="State" value={biz.state} />
                  <Row label="Pincode" value={biz.pincode} />
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-[#1D4ED8] uppercase tracking-wide mb-2">
                  GST & Registration
                </p>
                <div className="bg-[#F8FAFC] rounded-lg px-4">
                  <Row label="GST Registered" value={biz.isGstRegistered} />
                  <Row label="GSTIN" value={biz.gstin} />
                  <Row label="Business Type" value={(biz.businessType || []).join(", ")} />
                  <Row label="Industry Type" value={biz.industryType} />
                  <Row label="Registration Type" value={biz.registrationType} />
                  <Row label="PAN Number" value={biz.panNumber} />
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-[#1D4ED8] uppercase tracking-wide mb-2">
                  Bank Details
                </p>
                <div className="bg-[#F8FAFC] rounded-lg px-4">
                  <Row label="Account Holder Name" value={biz.accountHolderName} />
                  <Row label="Bank Name" value={biz.bankName} />
                  <Row label="Account Number" value={biz.accountNumber} />
                  <Row label="IFSC Code" value={biz.ifscCode} />
                  <Row label="Branch Name" value={biz.branchName} />
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-[#1D4ED8] uppercase tracking-wide mb-2">
                  Invoice Settings
                </p>
                <div className="bg-[#F8FAFC] rounded-lg px-4">
                  <Row label="Invoice Prefix" value={biz.invoicePrefix} />
                  <Row label="Starting Number" value={biz.invoiceStartNumber} />
                  <Row label="Invoice Template" value={biz.invoiceTemplate} />
                  <Row label="Setup Complete" value={biz.isSetupComplete} />
                </div>
              </div>

              {biz.defaultTerms && (
                <div>
                  <p className="text-xs font-semibold text-[#1D4ED8] uppercase tracking-wide mb-2">
                    Default Terms & Conditions
                  </p>
                  <p className="text-sm text-[#0F172A] bg-[#F8FAFC] rounded-lg px-4 py-3 whitespace-pre-line">
                    {biz.defaultTerms}
                  </p>
                </div>
              )}

              {(biz.signature || biz.paymentQrCode) && (
                <div className="flex gap-6">
                  {biz.signature && (
                    <div>
                      <p className="text-xs font-semibold text-[#1D4ED8] uppercase tracking-wide mb-2">
                        Signature
                      </p>
                      <img
                        src={biz.signature}
                        alt="Signature"
                        className="w-32 h-16 object-contain border border-[#E2E8F0] rounded-lg"
                      />
                    </div>
                  )}
                  {biz.paymentQrCode && (
                    <div>
                      <p className="text-xs font-semibold text-[#1D4ED8] uppercase tracking-wide mb-2">
                        Payment QR
                      </p>
                      <img
                        src={biz.paymentQrCode}
                        alt="QR"
                        className="w-20 h-20 object-contain border border-[#E2E8F0] rounded-lg"
                      />
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-[#64748B] text-center py-4">
              Is user ne abhi tak Business Settings fill nahi ki hai.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}