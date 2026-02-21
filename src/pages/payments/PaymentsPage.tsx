import { useState } from "react";
import {
  DollarSign,
  AlertTriangle,
  Clock,
  CheckCircle,
  Search,
} from "lucide-react";
import Badge from "../../components/ui/Badge";
import Avatar from "../../components/ui/Avatar";
import StatCard from "../../components/ui/StatCard";
import { payments, drivers, vehicles } from "../../data/mockData";
import { formatCurrency, formatDate } from "../../utils/format";
import type { PaymentStatus } from "../../types";

export default function PaymentsPage() {
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | "All">(
    "All",
  );
  const [search, setSearch] = useState("");

  const paid = payments.filter((p) => p.status === "Paid");
  const late = payments.filter((p) => p.status === "Late");
  const pending = payments.filter((p) => p.status === "Pending");
  const totalCollected = paid.reduce((s, p) => s + p.amount, 0);
  const totalOutstanding = [...late, ...pending].reduce(
    (s, p) => s + p.amount,
    0,
  );

  const filtered = payments.filter((p) => {
    const driver = drivers.find((d) => d.id === p.driverId);
    const matchSearch =
      !search || driver?.name.toLowerCase().includes(search.toLowerCase());
    return (statusFilter === "All" || p.status === statusFilter) && matchSearch;
  });

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-slate-100 tracking-tight">
          Payments
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Track weekly driver payments and collections
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Collected"
          value={formatCurrency(totalCollected)}
          icon={CheckCircle}
          iconColor="text-emerald-400"
          change="+8.2%"
          changeType="up"
        />
        <StatCard
          title="Outstanding"
          value={formatCurrency(totalOutstanding)}
          icon={AlertTriangle}
          iconColor="text-amber-400"
          subtitle={`${late.length + pending.length} payments`}
        />
        <StatCard
          title="On Time Rate"
          value={`${Math.round((paid.length / payments.length) * 100)}%`}
          icon={Clock}
          iconColor="text-accent"
        />
        <StatCard
          title="This Week"
          value={formatCurrency(
            payments
              .filter((p) => p.weekEnding === "2024-03-17")
              .reduce((s, p) => s + p.amount, 0),
          )}
          icon={DollarSign}
          iconColor="text-violet-400"
        />
      </div>

      {/* Weekly summary */}
      <div className="card p-5">
        <h2 className="section-title mb-4">Week Ending March 17, 2024</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              label: "Expected",
              val: formatCurrency(203000),
              color: "text-slate-200",
            },
            {
              label: "Collected",
              val: formatCurrency(113000),
              color: "text-emerald-400",
            },
            {
              label: "Remaining",
              val: formatCurrency(90000),
              color: "text-amber-400",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white/[0.03] rounded-lg p-4 text-center"
            >
              <p className="text-xs text-slate-500 mb-1">{s.label}</p>
              <p className={`text-xl font-bold ${s.color}`}>{s.val}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Collection progress</span>
            <span>{Math.round((113000 / 203000) * 100)}%</span>
          </div>
          <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full"
              style={{ width: `${Math.round((113000 / 203000) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filters + Table */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            className="input pl-9 py-2 text-xs"
            placeholder="Search driver..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {(["All", "Paid", "Late", "Pending"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`btn btn-sm ${statusFilter === s ? "btn-primary" : "btn-secondary"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/[0.06]">
              <tr>
                <th className="th">Driver</th>
                <th className="th">Vehicle</th>
                <th className="th">Amount</th>
                <th className="th">Week Ending</th>
                <th className="th">Status</th>
                <th className="th">Paid At</th>
                <th className="th">Note</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const driver = drivers.find((d) => d.id === p.driverId);
                const vehicle = vehicles.find((v) => v.id === p.vehicleId);
                return (
                  <tr key={p.id} className="table-row">
                    <td className="td">
                      <div className="flex items-center gap-2.5">
                        {driver && (
                          <Avatar initials={driver.avatar} size="sm" />
                        )}
                        <span className="text-sm text-slate-300">
                          {driver?.name ?? "—"}
                        </span>
                      </div>
                    </td>
                    <td className="td text-xs font-mono text-slate-400">
                      {vehicle?.plate ?? "—"}
                    </td>
                    <td className="td font-mono font-semibold text-slate-200">
                      {formatCurrency(p.amount)}
                    </td>
                    <td className="td text-sm text-slate-400">
                      {formatDate(p.weekEnding)}
                    </td>
                    <td className="td">
                      <Badge status={p.status} />
                    </td>
                    <td className="td text-sm text-slate-400">
                      {p.paidAt ? (
                        formatDate(p.paidAt)
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                    <td className="td text-xs text-slate-500">
                      {p.note || "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-10 text-slate-500 text-sm">
              No payments match your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
