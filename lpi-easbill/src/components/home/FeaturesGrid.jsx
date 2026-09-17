import { FileText, Users, Boxes, Wallet, BarChart3, Smartphone } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Instant Invoicing",
    desc: "Create GST-ready invoices and quotations in seconds, from any device.",
    bg: "bg-[#EFF6FF]",
    border: "border-[#DBEAFE]",
    iconColor: "text-[#1D4ED8]",
    hoverBg: "group-hover:bg-[#1D4ED8]",
  },
  {
    icon: Users,
    title: "Contacts & Parties",
    desc: "Manage customers and suppliers together with balances at a glance.",
    bg: "bg-[#F0FDF4]",
    border: "border-[#DCFCE7]",
    iconColor: "text-[#16A34A]",
    hoverBg: "group-hover:bg-[#16A34A]",
  },
  {
    icon: Boxes,
    title: "Inventory & Items",
    desc: "Track stock, pricing, and HSN codes without spreadsheets.",
    bg: "bg-[#FFF7ED]",
    border: "border-[#FFEDD5]",
    iconColor: "text-[#F97316]",
    hoverBg: "group-hover:bg-[#F97316]",
  },
  {
    icon: Wallet,
    title: "Payments Tracking",
    desc: "Record payments in and out, and always know who owes what.",
    bg: "bg-[#FAF5FF]",
    border: "border-[#F3E8FF]",
    iconColor: "text-[#9333EA]",
    hoverBg: "group-hover:bg-[#9333EA]",
  },
  {
    icon: BarChart3,
    title: "Smart Reports",
    desc: "Sales, purchase, GST and stock reports — exportable anytime.",
    bg: "bg-[#ECFEFF]",
    border: "border-[#CFFAFE]",
    iconColor: "text-[#0891B2]",
    hoverBg: "group-hover:bg-[#0891B2]",
  },
  {
    icon: Smartphone,
    title: "Works Everywhere",
    desc: "Fully responsive — run your billing from mobile, tablet, or desktop.",
    bg: "bg-[#FEF2F2]",
    border: "border-[#FEE2E2]",
    iconColor: "text-[#DC2626]",
    hoverBg: "group-hover:bg-[#DC2626]",
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-2 sm:px-3 py-16 sm:py-20">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight mb-3">
          Everything you need to bill smarter
        </h2>
        <p className="text-[#64748B] text-sm sm:text-base">
          One platform to manage invoices, contacts, inventory, and
          payments — built for how businesses actually work.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <div
            key={f.title}
            className={`fade-up group ${f.bg} rounded-2xl border ${f.border} p-6 hover:bg-white hover:border-transparent hover:shadow-xl hover:shadow-[#1D4ED8]/10 hover:-translate-y-1.5 transition-all duration-300 ease-out`}
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div
              className={`w-11 h-11 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm ${f.hoverBg} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
            >
              <f.icon
                className={`w-5 h-5 ${f.iconColor} group-hover:text-white transition-colors duration-300`}
              />
            </div>
            <h3 className="text-sm font-semibold text-[#0F172A] mb-1.5">
              {f.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}