import { type LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  subtitle?: string;
}

export default function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "text-accent",
  subtitle,
}: StatCardProps) {
  return (
    <div className="stat-card card-hover animate-fade-in">
      <div className="flex items-start justify-between">
        <div className={`p-2.5 rounded-lg bg-white/[0.05] ${iconColor}`}>
          <Icon size={18} strokeWidth={2} />
        </div>
        {change && (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              changeType === "up"
                ? "text-emerald-400 bg-emerald-500/10"
                : changeType === "down"
                  ? "text-red-400 bg-red-500/10"
                  : "text-slate-400 bg-white/[0.05]"
            }`}
          >
            {change}
          </span>
        )}
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          {title}
        </p>
        <p className="text-2xl font-bold text-slate-100 mt-1 tracking-tight">
          {value}
        </p>
        {subtitle && (
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
