import {
  DollarSign,
  Users,
  Car,
  AlertTriangle,
  TrendingUp,
  Clock,
} from "lucide-react";
import StatCard from "../../components/ui/StatCard";
import RevenueChart from "../../components/charts/RevenueChart";
import PaymentPieChart from "../../components/charts/PaymentPieChart";
import Avatar from "../../components/ui/Avatar";
import Badge from "../../components/ui/Badge";
import {
  drivers,
  vehicles,
  payments,
  recentActivity,
} from "../../data/mockData";
import { formatCurrency, formatRelativeTime } from "../../utils/format";

export default function DashboardPage() {
  const totalRevenue = drivers.reduce((s, d) => s + d.totalPaid, 0);
  const weeklyExpected = drivers
    .filter((d) => d.status === "Active")
    .reduce((s, d) => s + d.weeklyPayment, 0);
  const outstanding = drivers.reduce((s, d) => s + d.outstandingBalance, 0);
  const activeDrivers = drivers.filter((d) => d.status === "Active").length;
  const activeVehicles = vehicles.filter((v) => v.status === "Active").length;
  const weeklyPayments = payments.filter((p) => p.weekEnding === "2024-03-17");
  const collectionRate = Math.round(
    (weeklyPayments.filter((p) => p.status === "Paid").length /
      weeklyPayments.length) *
      100,
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-100 tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Week ending March 17, 2024
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 rounded-lg">
          <Clock size={13} />
          Updated just now
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          change="+12.4%"
          changeType="up"
          icon={DollarSign}
          iconColor="text-accent"
        />
        <StatCard
          title="Weekly Expected"
          value={formatCurrency(weeklyExpected)}
          subtitle="This week"
          icon={TrendingUp}
          iconColor="text-emerald-400"
        />
        <StatCard
          title="Outstanding"
          value={formatCurrency(outstanding)}
          change={outstanding > 0 ? "Action needed" : "All clear"}
          changeType={outstanding > 0 ? "down" : "up"}
          icon={AlertTriangle}
          iconColor="text-amber-400"
        />
        <StatCard
          title="Active Drivers"
          value={`${activeDrivers}/${drivers.length}`}
          change="+1 this month"
          changeType="up"
          icon={Users}
          iconColor="text-violet-400"
        />
        <StatCard
          title="Active Vehicles"
          value={`${activeVehicles}/${vehicles.length}`}
          subtitle="1 in maintenance"
          icon={Car}
          iconColor="text-cyan-400"
        />
        <StatCard
          title="Collection Rate"
          value={`${collectionRate}%`}
          change={collectionRate >= 80 ? "Good" : "Below target"}
          changeType={collectionRate >= 80 ? "up" : "down"}
          icon={TrendingUp}
          iconColor="text-emerald-400"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue chart */}
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="section-title">Revenue Trend</h2>
              <p className="section-sub">Last 6 months</p>
            </div>
          </div>
          <RevenueChart />
        </div>

        {/* Payment status pie */}
        <div className="card p-5">
          <div className="mb-4">
            <h2 className="section-title">Payment Status</h2>
            <p className="section-sub">This week</p>
          </div>
          <PaymentPieChart />
          <div className="grid grid-cols-3 gap-2 mt-2">
            {[
              { label: "Paid", val: "73%", color: "text-emerald-400" },
              { label: "Pending", val: "18%", color: "text-amber-400" },
              { label: "Late", val: "9%", color: "text-red-400" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className={`text-base font-bold ${s.color}`}>{s.val}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent activity */}
        <div className="card p-5">
          <h2 className="section-title mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((a) => (
              <div
                key={a.id}
                className="flex items-start gap-3 py-2.5 border-b border-white/[0.04] last:border-0"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    a.type === "payment"
                      ? "bg-emerald-400"
                      : a.type === "vehicle"
                        ? "bg-amber-400"
                        : a.type === "driver"
                          ? "bg-red-400"
                          : "bg-blue-400"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300 leading-snug">
                    {a.message}
                  </p>
                  {a.meta && (
                    <p className="text-xs font-semibold text-accent mt-0.5">
                      {a.meta}
                    </p>
                  )}
                </div>
                <span className="text-xs text-slate-500 flex-shrink-0">
                  {formatRelativeTime(a.timestamp)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top drivers */}
        <div className="card p-5">
          <h2 className="section-title mb-4">Driver Overview</h2>
          <div className="space-y-3">
            {drivers.map((d) => (
              <div
                key={d.id}
                className="flex items-center gap-3 py-2 border-b border-white/[0.04] last:border-0"
              >
                <Avatar initials={d.avatar} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-200 truncate">
                    {d.name}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden max-w-[80px]">
                      <div
                        className="h-full bg-accent rounded-full"
                        style={{ width: `${d.performanceScore}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-500">
                      {d.performanceScore}
                    </span>
                  </div>
                </div>
                <Badge status={d.status} />
                <span className="text-xs font-mono text-slate-400">
                  {formatCurrency(d.weeklyPayment)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
