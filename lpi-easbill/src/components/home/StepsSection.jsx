import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const steps = [
  {
    num: "1",
    title: "Add your business details",
    desc: "GSTIN, address, and bank details — filled in once, used on every invoice from then on.",
  },
  {
    num: "2",
    title: "Add your items or services",
    desc: "Set prices, HSN codes, and opening stock. Reuse them across every sale and purchase.",
  },
  {
    num: "3",
    title: "Create and send",
    desc: "Pick a customer, add line items, and send a GST-correct invoice — print, download, or share.",
  },
];

export default function StepsSection() {
  return (
    <section id="steps" className="max-w-7xl mx-auto px-2 sm:px-3 pb-16 sm:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#1D4ED8] to-[#1E3A8A] px-6 sm:px-12 py-14 sm:py-16"
      >
        <div className="blob-anim absolute -top-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="blob-anim-slow absolute -bottom-16 -right-16 w-64 h-64 bg-[#F97316]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-white/10 text-orange-200 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/15 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Getting Started
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
            Your first invoice, three steps away.
          </h2>
          <p className="text-blue-100 text-sm sm:text-base">
            No accountant needed to set this up. Most businesses send their
            first invoice the same day.
          </p>
        </div>

        <div className="relative grid sm:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl p-7 hover:bg-white/12 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white font-bold text-sm mb-5">
                {step.num}
              </div>
              <h3 className="text-white font-semibold mb-2">{step.title}</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}