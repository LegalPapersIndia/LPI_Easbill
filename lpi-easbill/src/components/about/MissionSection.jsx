import { motion } from "framer-motion";
import { X, Check, Receipt } from "lucide-react";

const oldWay = [
  "Manually calculating CGST/SGST on every invoice",
  "Stock counts that never match the register",
  "Chasing customers for payment status in notebooks",
];

const newWay = [
  "GST split calculated automatically, every time",
  "Stock updates the moment a sale is made",
  "Every payment tracked against its invoice",
];

export default function MissionSection() {
  return (
   <section className="max-w-7xl mx-auto px-2 sm:px-3 pb-16 sm:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <div className="inline-flex items-center gap-1.5 bg-[#EFF6FF] text-[#1D4ED8] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#1D4ED8]/10 mb-4">
          <Receipt className="w-3.5 h-3.5" />
          Why we built BillFlow
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
          We kept seeing the same problem.
        </h2>
        <p className="text-[#64748B] text-sm sm:text-base mt-4">
          Most billing tools are either built for large enterprises with
          dedicated accounting teams, or too basic to handle real GST
          compliance. So we built something in between.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Old way */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl border border-[#E2E8F0] p-7 sm:p-8"
        >
          <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-5">
            The old way
          </p>
          <ul className="space-y-4">
            {oldWay.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#FEF2F2] flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5 text-[#DC2626]" />
                </span>
                <span className="text-sm text-[#64748B] leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* BillFlow way */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative bg-linear-to-br from-[#1D4ED8] to-[#1E3A8A] rounded-2xl p-7 sm:p-8 overflow-hidden"
        >
          <div className="blob-anim absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <p className="relative text-xs font-semibold text-blue-200 uppercase tracking-wide mb-5">
            With BillFlow
          </p>
          <ul className="relative space-y-4">
            {newWay.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-white" />
                </span>
                <span className="text-sm text-blue-50 leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}