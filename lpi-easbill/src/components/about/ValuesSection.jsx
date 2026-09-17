import { motion } from "framer-motion";
import { Users, ShieldCheck, Zap } from "lucide-react";

const values = [
  {
    icon: Zap,
    title: "Simple by default",
    desc: "Billing shouldn't need a manual. Every feature is built to be understood in seconds, not learned over weeks.",
    bg: "bg-[#EFF6FF]",
    border: "border-[#DBEAFE]",
    iconColor: "text-[#1D4ED8]",
    hoverBg: "group-hover:bg-[#1D4ED8]",
  },
  {
    icon: ShieldCheck,
    title: "GST-first",
    desc: "Compliance isn't an afterthought — it's baked into how every invoice, return, and report is built.",
    bg: "bg-[#FFF7ED]",
    border: "border-[#FFEDD5]",
    iconColor: "text-[#F97316]",
    hoverBg: "group-hover:bg-[#F97316]",
  },
  {
    icon: Users,
    title: "Built for real businesses",
    desc: "Every feature comes from watching how wholesalers and traders actually bill, not how software textbooks say they should.",
    bg: "bg-[#F0FDF4]",
    border: "border-[#DCFCE7]",
    iconColor: "text-[#16A34A]",
    hoverBg: "group-hover:bg-[#16A34A]",
  },
];

export default function ValuesSection() {
  return (
    <section className="max-w-7xl mx-auto px-2 sm:px-3 pb-16 sm:pb-20">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight mb-3">
          What we care about
        </h2>
      </div>
      <div className="grid sm:grid-cols-3 gap-5">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`group ${v.bg} rounded-2xl border ${v.border} p-6 hover:bg-white hover:border-transparent hover:shadow-xl hover:shadow-[#1D4ED8]/10 hover:-translate-y-1.5 transition-all duration-300 ease-out`}
          >
            <div
              className={`w-11 h-11 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm ${v.hoverBg} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
            >
              <v.icon
                className={`w-5 h-5 ${v.iconColor} group-hover:text-white transition-colors duration-300`}
              />
            </div>
            <h3 className="text-sm font-semibold text-[#0F172A] mb-1.5">
              {v.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              {v.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}