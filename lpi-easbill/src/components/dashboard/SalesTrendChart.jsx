import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { salesTrend } from "../../data/dummyData";

export default function SalesTrendChart() {
  return (
    <div className="bg-white border border-border rounded-xl p-4 sm:p-5">
      <p className="font-display font-semibold text-ink mb-4">Sales Trend</p>
      <div className="h-56 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={salesTrend}>
            <defs>
              <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0B4F4A" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#0B4F4A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4E7E2" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#5B6B65" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#5B6B65" }} axisLine={false} tickLine={false} width={40} />
            <Tooltip
              formatter={(v) => [`₹${v.toLocaleString("en-IN")}`, "Sales"]}
              contentStyle={{ borderRadius: 8, border: "1px solid #E4E7E2", fontSize: 13 }}
            />
            <Area type="monotone" dataKey="sales" stroke="#0B4F4A" strokeWidth={2} fill="url(#salesFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}