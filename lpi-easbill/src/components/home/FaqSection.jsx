import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Plus } from "lucide-react";

const faqs = [
  {
    q: "Is my business data safe with BillFlow?",
    a: "Yes. Your data is stored securely on the cloud and is only accessible to your business account — no one else can view your invoices, contacts, or stock data.",
  },
  {
    q: "Do I need any accounting knowledge to use this?",
    a: "No. BillFlow is built so any business owner can start billing without training. GST calculations, invoice numbering, and stock updates all happen automatically.",
  },
  {
    q: "Can I use BillFlow on my phone?",
    a: "Yes. BillFlow works on mobile, tablet, and desktop — you can create invoices, check payments, and manage stock from any device with a browser.",
  },
  {
    q: "What if I stop using BillFlow — do I lose my data?",
    a: "Your invoices, contacts, and reports remain accessible as long as your account is active. You can also export your data whenever you need to.",
  },
  {
    q: "Does BillFlow support multiple users in my team?",
    a: "Yes. You can add team members with different roles — Admin, Accountant, or Sales Staff — so everyone only sees what they need to.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#FFF7ED] py-16 sm:py-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob-anim absolute -top-16 -right-16 w-72 h-72 bg-[#1D4ED8]/10 rounded-full blur-3xl" />
        <div className="blob-anim-slow absolute -bottom-16 -left-16 w-72 h-72 bg-[#F97316]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-2 sm:px-3">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-sm text-[#1D4ED8] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#1D4ED8]/15 shadow-sm mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            FAQ
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
            Questions, answered.
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`rounded-2xl border transition-colors duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-white border-[#1D4ED8]/25 shadow-md shadow-[#1D4ED8]/5"
                    : "bg-white/70 backdrop-blur-sm border-[#E2E8F0]"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left"
                >
                  <span
                    className={`text-sm sm:text-base font-semibold transition-colors ${
                      isOpen ? "text-[#1D4ED8]" : "text-[#0F172A]"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                      isOpen ? "bg-[#1D4ED8] text-white" : "bg-[#F8FAFC] text-[#64748B]"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-[#64748B] leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}