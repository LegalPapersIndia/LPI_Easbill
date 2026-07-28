import { businessSettings, stateCodeMap } from "../../data/dummyData";

export default function InvoicePrintTemplate({ invoice, party, lines, type = "sales" }) {
  const isSameState = party?.state === businessSettings.state;

  const subtotal = lines.reduce((sum, l) => sum + l.qty * l.rate, 0);
  const gstTotal = lines.reduce((sum, l) => sum + (l.qty * l.rate * l.gstPercent) / 100, 0);
  const grandTotal = subtotal + gstTotal;

  const docTitle = type === "sales" ? "TAX INVOICE" : type === "purchase" ? "PURCHASE INVOICE" : "QUOTATION";
  const partyLabel = type === "purchase" ? "Bill From" : "Bill To";

  return (
    <div className="bg-white text-black max-w-3xl mx-auto p-8 print:p-0" style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-4">
        <div className="flex items-center gap-3">
          {businessSettings.logo ? (
            <img src={businessSettings.logo} alt="Logo" className="w-14 h-14 object-contain" />
          ) : (
            <div className="w-14 h-14 bg-gray-100 flex items-center justify-center font-bold text-xl">
              {businessSettings.businessName.charAt(0)}
            </div>
          )}
          <div>
            <p className="text-lg font-bold">{businessSettings.businessName}</p>
            <p className="text-xs text-gray-600">{businessSettings.billingAddress}</p>
            <p className="text-xs text-gray-600">{businessSettings.city}, {businessSettings.state} - {businessSettings.pincode}</p>
            {businessSettings.isGstRegistered && (
              <p className="text-xs text-gray-600">GSTIN: {businessSettings.gstin} · State Code: {stateCodeMap[businessSettings.state]}</p>
            )}
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold tracking-wide">{docTitle}</p>
          <p className="text-xs text-gray-600 mt-1">No: <span className="font-semibold text-black">{invoice.invoiceNo}</span></p>
          <p className="text-xs text-gray-600">Date: <span className="font-semibold text-black">{new Date(invoice.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span></p>
        </div>
      </div>

      {/* Bill To / Ship To */}
      <div className="grid grid-cols-2 gap-6 mb-4 text-xs">
        <div>
          <p className="font-bold text-sm mb-1">{partyLabel}</p>
          <p className="font-semibold">{party?.name}</p>
          <p className="text-gray-600">{party?.billingAddress}</p>
          <p className="text-gray-600">{party?.state} {party?.state && `· State Code: ${stateCodeMap[party.state]}`}</p>
          <p className="text-gray-600">GSTIN: {party?.gstin || "N/A"}</p>
        </div>
        {type === "sales" && (
          <div>
            <p className="font-bold text-sm mb-1">Ship To</p>
            <p className="font-semibold">{party?.name}</p>
            <p className="text-gray-600">{party?.sameAsBilling ? party?.billingAddress : party?.shippingAddress}</p>
            <p className="text-gray-600">{party?.state} {party?.state && `· State Code: ${stateCodeMap[party.state]}`}</p>
          </div>
        )}
      </div>

      {/* Items Table */}
      <table className="w-full text-xs border-collapse mb-4">
        <thead>
          <tr className="bg-gray-100 border-y border-black">
            <th className="text-left py-1.5 px-2 font-semibold">Sr</th>
            <th className="text-left py-1.5 px-2 font-semibold">Description</th>
            <th className="text-center py-1.5 px-2 font-semibold">HSN</th>
            <th className="text-right py-1.5 px-2 font-semibold">Qty</th>
            <th className="text-left py-1.5 px-2 font-semibold">Unit</th>
            <th className="text-right py-1.5 px-2 font-semibold">Rate</th>
            <th className="text-right py-1.5 px-2 font-semibold">Total</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((line, idx) => (
            <tr key={idx} className="border-b border-gray-300">
              <td className="py-1.5 px-2">{idx + 1}</td>
              <td className="py-1.5 px-2">{line.name}</td>
              <td className="py-1.5 px-2 text-center">{line.hsnCode}</td>
              <td className="py-1.5 px-2 text-right">{line.qty}</td>
              <td className="py-1.5 px-2">{line.unit}</td>
              <td className="py-1.5 px-2 text-right">{line.rate.toLocaleString("en-IN")}</td>
              <td className="py-1.5 px-2 text-right">{(line.qty * line.rate).toLocaleString("en-IN")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end mb-4">
        <div className="w-64 text-xs space-y-1">
          <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
          {isSameState ? (
            <>
              <div className="flex justify-between"><span>CGST</span><span>₹{(gstTotal / 2).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div>
              <div className="flex justify-between"><span>SGST</span><span>₹{(gstTotal / 2).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div>
            </>
          ) : (
            <div className="flex justify-between"><span>IGST</span><span>₹{gstTotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div>
          )}
          <div className="flex justify-between font-bold text-sm border-t border-black pt-1 mt-1">
            <span>Total Amount</span><span>₹{grandTotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>

      {/* Bank Details + QR (only for sales-type documents) */}
      {type === "sales" && (businessSettings.bankName || businessSettings.paymentQrCode) && (
        <div className="flex justify-between items-start border-t border-gray-300 pt-3 mb-4 text-xs">
          <div>
            <p className="font-bold mb-1">Bank Details</p>
            {businessSettings.accountHolderName && <p>A/C Name: {businessSettings.accountHolderName}</p>}
            {businessSettings.bankName && <p>Bank: {businessSettings.bankName}</p>}
            {businessSettings.accountNumber && <p>A/C No: {businessSettings.accountNumber}</p>}
            {businessSettings.ifscCode && <p>IFSC: {businessSettings.ifscCode}</p>}
          </div>
          {businessSettings.paymentQrCode && (
            <div className="text-center">
              <img src={businessSettings.paymentQrCode} alt="QR" className="w-20 h-20 object-contain" />
              <p className="text-[10px] mt-0.5">Scan & Pay</p>
            </div>
          )}
        </div>
      )}

      {/* Terms + Signature */}
      <div className="flex justify-between items-end border-t border-gray-300 pt-3 text-xs">
        <div className="max-w-xs">
          <p className="font-bold mb-1">Terms & Conditions</p>
          <p className="text-gray-600 whitespace-pre-line">{businessSettings.defaultTerms}</p>
        </div>
        <div className="text-center">
          {businessSettings.signature ? (
            <img src={businessSettings.signature} alt="Signature" className="w-32 h-14 object-contain" />
          ) : (
            <div className="w-32 h-14 border-b border-black" />
          )}
          <p className="mt-1">Authorized Signatory</p>
          <p className="text-gray-600">For {businessSettings.businessName}</p>
        </div>
      </div>

      <p className="text-center text-xs text-gray-500 mt-6">Thank you for your business!</p>
    </div>
  );
}