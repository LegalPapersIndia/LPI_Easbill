

// import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// export default function SalesTrendChart({ salesTrend }) {
//   return (
//     <div className="bg-white border border-border rounded-xl p-4 sm:p-5">
//       <p className="font-display font-semibold text-ink mb-4">Sales Trend</p>
//       <div className="h-56 sm:h-64">
//         <ResponsiveContainer width="100%" height="100%">
//           <AreaChart data={salesTrend}>
//             <defs>
//               <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="0%" stopColor="#0B4F4A" stopOpacity={0.25} />
//                 <stop offset="100%" stopColor="#0B4F4A" stopOpacity={0} />
//               </linearGradient>
//             </defs>
//             <CartesianGrid strokeDasharray="3 3" stroke="#E4E7E2" vertical={false} />
//             <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#5B6B65" }} axisLine={false} tickLine={false} />
//             <YAxis tick={{ fontSize: 12, fill: "#5B6B65" }} axisLine={false} tickLine={false} width={40} />
//             <Tooltip
//               formatter={(v) => [`₹${v.toLocaleString("en-IN")}`, "Sales"]}
//               contentStyle={{ borderRadius: 8, border: "1px solid #E4E7E2", fontSize: 13 }}
//             />
//             <Area type="monotone" dataKey="sales" stroke="#0B4F4A" strokeWidth={2} fill="url(#salesFill)" />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }



import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function SalesTrendChart({ salesTrend }) {
  const currentMonth = new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  return (
    <div className="group bg-linear-to-br from-teal-50 via-white to-white border border-border rounded-xl p-4 sm:p-5 hover:shadow-lg hover:-translate-y-1 hover:border-brand/30 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <p className="font-display font-semibold text-ink">Sales Trend</p>
        <span className="text-xs px-2 py-0.5 rounded-full bg-brand-light text-brand font-medium">
          {currentMonth}
        </span>
      </div>
      <div className="h-56 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={salesTrend}>
            <defs>
              <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0B4F4A" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#0B4F4A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4E7E2" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#5B6B65" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#5B6B65" }} axisLine={false} tickLine={false} width={40} />
            <Tooltip
              formatter={(v) => [`₹${v.toLocaleString("en-IN")}`, "Sales"]}
              contentStyle={{ borderRadius: 8, border: "1px solid #E4E7E2", fontSize: 13, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
              cursor={{ stroke: "#0B4F4A", strokeWidth: 1, strokeDasharray: "4 4" }}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#0B4F4A"
              strokeWidth={2.5}
              fill="url(#salesFill)"
              activeDot={{ r: 6, fill: "#0B4F4A", stroke: "#fff", strokeWidth: 2 }}
              animationDuration={1200}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}