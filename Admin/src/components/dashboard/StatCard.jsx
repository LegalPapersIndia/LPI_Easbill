export default function StatCard({ label, value, icon: Icon, tone }) {
  const toneMap = {
    orange: "bg-[#FFF7ED] border-[#FED7AA] text-[#EA580C]",
    blue: "bg-[#EFF6FF] border-[#BFDBFE] text-[#1D4ED8]",
    green: "bg-green-50 border-green-200 text-green-600",
    amber: "bg-amber-50 border-amber-200 text-amber-600",
  };

  return (
    <div
      className={`rounded-xl border p-5 sm:p-6 min-h-[120px] flex items-center gap-4
        transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md cursor-default
        ${toneMap[tone]}`}
    >
      <div className="w-12 h-12 rounded-lg bg-white/70 flex items-center justify-center shrink-0 shadow-sm">
        <Icon size={22} />
      </div>
      <div>
        <p className="text-xs font-medium opacity-80">{label}</p>
        <p className="text-2xl font-semibold text-[#0F172A] tabular-num mt-1">{value}</p>
      </div>
    </div>
  );
}
