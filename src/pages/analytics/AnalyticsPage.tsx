import { TrendingUp, BarChart3, PieChart, Activity } from "lucide-react";
import RevenueChart from "../../components/charts/RevenueChart";
import PerformanceChart from "../../components/charts/PerformanceChart";
import PaymentPieChart from "../../components/charts/PaymentPieChart";
import ROIChart from "../../components/charts/ROIChart";
import StatCard from "../../components/ui/StatCard";

export default function AnalyticsPage() {
  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-slate-100 tracking-tight">
          Analytics
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Fleet financial performance and insights
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Avg Monthly Revenue"
          value="₦903,333"
          change="+14.2%"
          changeType="up"
          icon={TrendingUp}
          iconColor="text-accent"
        />
        <StatCard
          title="Fleet ROI"
          value="28.4%"
          change="+2.3%"
          changeType="up"
          icon={BarChart3}
          iconColor="text-emerald-400"
        />
        <StatCard
          title="Default Rate"
          value="9.1%"
          change="-1.2%"
          changeType="up"
          icon={PieChart}
          iconColor="text-amber-400"
          subtitle="Lower is better"
        />
        <StatCard
          title="Collection Rate"
          value="91%"
          change="+3%"
          changeType="up"
          icon={Activity}
          iconColor="text-violet-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <div className="mb-5">
            <h2 className="section-title">Monthly Revenue Trend</h2>
            <p className="section-sub">Revenue vs collections over 6 months</p>
          </div>
          <RevenueChart />
        </div>

        <div className="card p-5">
          <div className="mb-5">
            <h2 className="section-title">Fleet ROI</h2>
            <p className="section-sub">Return on investment per month</p>
          </div>
          <ROIChart />
        </div>

        <div className="card p-5">
          <div className="mb-5">
            <h2 className="section-title">Driver Performance</h2>
            <p className="section-sub">Performance score comparison</p>
          </div>
          <PerformanceChart />
        </div>

        <div className="card p-5">
          <div className="mb-5">
            <h2 className="section-title">Payment Status Distribution</h2>
            <p className="section-sub">Overall payment health</p>
          </div>
          <PaymentPieChart />
          <div className="grid grid-cols-3 gap-3 mt-2">
            {[
              { label: "On-Time Rate", val: "73%", color: "text-emerald-400" },
              { label: "Default Rate", val: "9%", color: "text-red-400" },
              { label: "Pending Rate", val: "18%", color: "text-amber-400" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white/[0.03] rounded-lg p-3 text-center"
              >
                <p className={`text-xl font-bold ${s.color}`}>{s.val}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="card p-5">
        <h2 className="section-title mb-4">Key Insights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              icon: "🏆",
              title: "Top Performer",
              desc: "Emeka Obi has maintained a 95+ score for 3 consecutive months.",
            },
            {
              icon: "⚠️",
              title: "High Risk Driver",
              desc: "Fatima Bello has ₦84,000 outstanding and a 78/100 risk score.",
            },
            {
              icon: "📈",
              title: "Revenue Growth",
              desc: "Fleet revenue grew 30.8% over the last 6 months.",
            },
            {
              icon: "🔧",
              title: "Maintenance Due",
              desc: "Kia Cerato (OGN-789-TU) service is overdue by 12 days.",
            },
            {
              icon: "💰",
              title: "Best ROI Month",
              desc: "March 2024 projected at 28.4% — highest in 6 months.",
            },
            {
              icon: "🎯",
              title: "Collection Target",
              desc: "Fleet is on track to hit ₦1.02M collection target this month.",
            },
          ].map((i) => (
            <div
              key={i.title}
              className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-4"
            >
              <div className="text-2xl mb-2">{i.icon}</div>
              <p className="font-semibold text-slate-200 text-sm">{i.title}</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {i.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
