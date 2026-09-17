import { motion } from "framer-motion";
import { Receipt, Sparkles } from "lucide-react";

const highlights = [
  { value: "2026", label: "Founded" },
  { value: "GST", label: "Compliant by design" },
  { value: "100%", label: "Built in India" },
];

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background panel with dot-grid + glow, same language as Home Hero */}
      <div className="absolute inset-0 bg-linear-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#FFF7ED]">
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: "radial-gradient(#1D4ED8 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="blob-anim absolute -top-24 -left-20 w-80 h-80 bg-[#1D4ED8]/15 rounded-full blur-3xl" />
        <div className="blob-anim-slow absolute top-6 -right-16 w-80 h-80 bg-[#F97316]/12 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-sm text-[#1D4ED8] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#1D4ED8]/15 shadow-sm mb-5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          About BillFlow
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-bold text-[#0F172A] leading-tight tracking-tight mb-5"
        >
          Billing software built by
          <br className="hidden sm:block" />{" "}
          <span className="bg-linear-to-r from-[#1D4ED8] to-[#1E3A8A] bg-clip-text text-transparent">
            watching real businesses bill.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#64748B] text-sm sm:text-base max-w-2xl mx-auto mb-10"
        >
          BillFlow is built by Legal Papers India to solve a problem we kept
          seeing up close: small and mid-sized businesses spending more time
          fighting spreadsheets and GST math than actually running their
          business.
        </motion.p>

        {/* Highlight stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-6 sm:gap-10 bg-white/70 backdrop-blur-sm border border-[#E2E8F0] rounded-2xl px-6 py-5 max-w-xl mx-auto shadow-sm"
        >
          {highlights.map((h, i) => (
            <div key={h.label} className="flex items-center gap-6 sm:gap-10">
              <div className="text-center">
                <p className="text-lg sm:text-2xl font-bold text-[#1D4ED8]">
                  {h.value}
                </p>
                <p className="text-[11px] sm:text-xs text-[#64748B] mt-1">
                  {h.label}
                </p>
              </div>
              {i < highlights.length - 1 && (
                <div className="w-px h-8 bg-[#E2E8F0]" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}