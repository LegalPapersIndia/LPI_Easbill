

// import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// export default function SalesTrendChart({ salesTrend }) {
//   const currentMonth = new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" });

//   return (
//     <div className="group bg-linear-to-br from-teal-50 via-white to-white border border-border rounded-xl p-4 sm:p-5 hover:shadow-lg hover:-translate-y-1 hover:border-brand/30 transition-all duration-200">
//       <div className="flex items-center justify-between mb-4">
//         <p className="font-display font-semibold text-ink">Sales Trend</p>
//         <span className="text-xs px-2 py-0.5 rounded-full bg-brand-light text-brand font-medium">
//           {currentMonth}
//         </span>
//       </div>
//       <div className="h-56 sm:h-64">
//         <ResponsiveContainer width="100%" height="100%">
//           <AreaChart data={salesTrend}>
//             <defs>
//               <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="0%" stopColor="#0B4F4A" stopOpacity={0.35} />
//                 <stop offset="100%" stopColor="#0B4F4A" stopOpacity={0} />
//               </linearGradient>
//             </defs>
//             <CartesianGrid strokeDasharray="3 3" stroke="#E4E7E2" vertical={false} />
//             <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#5B6B65" }} axisLine={false} tickLine={false} />
//             <YAxis tick={{ fontSize: 12, fill: "#5B6B65" }} axisLine={false} tickLine={false} width={40} />
//             <Tooltip
//               formatter={(v) => [`₹${v.toLocaleString("en-IN")}`, "Sales"]}
//               contentStyle={{ borderRadius: 8, border: "1px solid #E4E7E2", fontSize: 13, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
//               cursor={{ stroke: "#0B4F4A", strokeWidth: 1, strokeDasharray: "4 4" }}
//             />
//             <Area
//               type="monotone"
//               dataKey="sales"
//               stroke="#0B4F4A"
//               strokeWidth={2.5}
//               fill="url(#salesFill)"
//               activeDot={{ r: 6, fill: "#0B4F4A", stroke: "#fff", strokeWidth: 2 }}
//               animationDuration={1200}
//               animationEasing="ease-out"
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }




import { useState, useEffect } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { getSalesTrend } from "../../api/dashboardApi";

export default function SalesTrendChart() {
  const [range, setRange] = useState("monthly");
  const [salesTrend, setSalesTrend] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentMonth = new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  useEffect(() => {
    const fetchTrend = async () => {
      try {
        setLoading(true);
        const { data } = await getSalesTrend(range);
        setSalesTrend(data.salesTrend || []);
      } catch (err) {
        console.error("Sales trend load karne mein error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrend();
  }, [range]);

  return (
    <div className="group bg-linear-to-br from-teal-50 via-white to-white border border-border rounded-xl p-4 sm:p-5 hover:shadow-lg hover:-translate-y-1 hover:border-brand/30 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <p className="font-display font-semibold text-ink">Sales Trend</p>
        <div className="flex items-center gap-2">
          <div className="flex bg-paper rounded-lg p-0.5 border border-border">
            <button
              type="button"
              onClick={() => setRange("monthly")}
              className={`text-xs font-medium px-2.5 py-1 rounded-md transition-colors ${
                range === "monthly" ? "bg-white text-brand shadow-sm" : "text-ink-muted"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setRange("daily")}
              className={`text-xs font-medium px-2.5 py-1 rounded-md transition-colors ${
                range === "daily" ? "bg-white text-brand shadow-sm" : "text-ink-muted"
              }`}
            >
              Daily
            </button>
          </div>
          {range === "monthly" && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-brand-light text-brand font-medium">
              {currentMonth}
            </span>
          )}
        </div>
      </div>
      <div className="h-56 sm:h-64">
        {loading ? (
          <div className="h-full flex items-center justify-center text-sm text-ink-muted">Loading...</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesTrend}>
              <defs>
                <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0B4F4A" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#0B4F4A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4E7E2" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 12, fill: "#5B6B65" }}
                axisLine={false}
                tickLine={false}
                interval={range === "daily" ? 4 : 0}
              />
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
        )}
      </div>
    </div>
  );
}