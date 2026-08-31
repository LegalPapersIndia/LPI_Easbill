import { Building2, CalendarPlus, CheckCircle2, ShieldCheck } from "lucide-react";
import StatCard from "./StatCard";

export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      <StatCard
        label="Total Businesses"
        value={stats ? stats.totalBusinesses : "—"}
        icon={Building2}
        tone="orange"
      />
      <StatCard
        label="New This Month"
        value={stats ? stats.newThisMonth : "—"}
        icon={CalendarPlus}
        tone="blue"
      />
      <StatCard
        label="Setup Complete"
        value={stats ? `${stats.setupComplete} / ${stats.totalBusinesses}` : "—"}
        icon={CheckCircle2}
        tone="green"
      />
      <StatCard
        label="GST Registered"
        value={stats ? stats.gstRegistered : "—"}
        icon={ShieldCheck}
        tone="amber"
      />
    </div>
  );
}