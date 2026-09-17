import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

const gstPoints = [
  "State-aware CGST / SGST / IGST split — calculated automatically",
  "HSN codes attached to every item",
  "Invoice numbering that follows the financial year",
  "Payment status tracked against every invoice",
];

const gstLines = [
  { label: "Taxable Value", value: "₹26,340.00" },
  { label: "CGST @ 9%", value: "₹2,370.60" },
  { label: "SGST @ 9%", value: "₹2,370.60" },
];

export default function GstSection() {
  return (
    <section
      id="gst"
      className="relative overflow-hidden bg-linear-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#FFF7ED] py-16 sm:py-20"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob-anim absolute -top-16 -left-16 w-72 h-72 bg-[#1D4ED8]/10 rounded-full blur-3xl" />
        <div className="blob-anim-slow absolute -bottom-16 -right-16 w-72 h-72 bg-[#F97316]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-2 sm:px-3">
        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-sm text-[#F97316] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#F97316]/15 shadow-sm mb-5 w-fit">
              <ShieldCheck className="w-3.5 h-3.5" />
              GST Compliance
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight mb-4">
              The GST math, worked out
              <br className="hidden sm:block" /> before you hit send.
            </h2>
            <p className="text-[#64748B] text-sm sm:text-base mb-7 max-w-md">
              CGST, SGST, and IGST split automatically based on the
              customer's state — so the number on the invoice is the number
              that's actually correct.
            </p>
            <ul className="space-y-3">
              {gstPoints.map((point, i) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#1D4ED8] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#0F172A]">{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right: GST breakdown card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xl shadow-[#1D4ED8]/10 p-7 sm:p-9 flex flex-col justify-center"
          >
            <div className="flex items-center justify-between mb-7">
              <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">
                Invoice Summary
              </p>
              <span className="text-[10px] font-semibold text-[#16A34A] bg-[#F0FDF4] px-2.5 py-1 rounded-full">
                GST Verified
              </span>
            </div>

            <div className="space-y-5">
              {gstLines.map((line, i) => (
                <motion.div
                  key={line.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="flex justify-between items-center text-sm pb-4 border-b border-dashed border-[#E2E8F0]"
                >
                  <span className="text-[#64748B]">{line.label}</span>
                  <span className="font-mono text-[#0F172A]">{line.value}</span>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex justify-between items-center rounded-xl bg-linear-to-r from-[#1D4ED8] to-[#1E3A8A] px-5 py-4 mt-2"
              >
                <span className="text-sm font-semibold text-white">Total Payable</span>
                <span className="font-mono text-xl font-bold text-white">₹31,081.20</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}