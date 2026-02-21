import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Plus,
  Eye,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import Avatar from "../../components/ui/Avatar";
import Badge from "../../components/ui/Badge";
import { drivers, vehicles } from "../../data/mockData";
import { formatCurrency } from "../../utils/format";
import type { DriverStatus } from "../../types";

export default function DriversPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<DriverStatus | "All">("All");
  const [sortField, setSortField] = useState<
    "name" | "performanceScore" | "weeklyPayment"
  >("performanceScore");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = drivers
    .filter(
      (d) =>
        (statusFilter === "All" || d.status === statusFilter) &&
        (d.name.toLowerCase().includes(search.toLowerCase()) ||
          d.email.toLowerCase().includes(search.toLowerCase())),
    )
    .sort((a, b) => {
      const mul = sortDir === "asc" ? 1 : -1;
      if (sortField === "name") return a.name.localeCompare(b.name) * mul;
      return (a[sortField] - b[sortField]) * mul;
    });

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const SortIcon = ({ field }: { field: typeof sortField }) =>
    sortField === field ? (
      sortDir === "asc" ? (
        <ChevronUp size={12} />
      ) : (
        <ChevronDown size={12} />
      )
    ) : null;

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-100 tracking-tight">
            Drivers
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {drivers.length} total drivers registered
          </p>
        </div>
        <button className="btn btn-primary btn-sm">
          <Plus size={15} /> Add Driver
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            className="input pl-9 py-2 text-xs"
            placeholder="Search drivers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-slate-500" />
          {(["All", "Active", "Suspended", "Inactive"] as const).map((s) => (
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

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/[0.06]">
              <tr>
                <th className="th">Driver</th>
                <th className="th">Vehicle</th>
                <th
                  className="th cursor-pointer hover:text-slate-300"
                  onClick={() => toggleSort("weeklyPayment")}
                >
                  <span className="flex items-center gap-1">
                    Weekly Payment <SortIcon field="weeklyPayment" />
                  </span>
                </th>
                <th className="th">Status</th>
                <th
                  className="th cursor-pointer hover:text-slate-300"
                  onClick={() => toggleSort("performanceScore")}
                >
                  <span className="flex items-center gap-1">
                    Score <SortIcon field="performanceScore" />
                  </span>
                </th>
                <th className="th">Outstanding</th>
                <th className="th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => {
                const v = vehicles.find((v) => v.id === d.vehicleId);
                return (
                  <tr key={d.id} className="table-row">
                    <td className="td">
                      <div className="flex items-center gap-3">
                        <Avatar initials={d.avatar} size="sm" />
                        <div>
                          <p className="font-semibold text-slate-200 text-sm">
                            {d.name}
                          </p>
                          <p className="text-xs text-slate-500">{d.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="td">
                      {v ? (
                        <div>
                          <p className="text-sm text-slate-300">
                            {v.make} {v.model}
                          </p>
                          <p className="text-xs text-slate-500 font-mono">
                            {v.plate}
                          </p>
                        </div>
                      ) : (
                        <span className="text-slate-500 text-xs">
                          Unassigned
                        </span>
                      )}
                    </td>
                    <td className="td font-mono text-slate-300">
                      {formatCurrency(d.weeklyPayment)}
                    </td>
                    <td className="td">
                      <Badge status={d.status} />
                    </td>
                    <td className="td">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${d.performanceScore >= 80 ? "bg-emerald-400" : d.performanceScore >= 60 ? "bg-amber-400" : "bg-red-400"}`}
                            style={{ width: `${d.performanceScore}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-400">
                          {d.performanceScore}
                        </span>
                      </div>
                    </td>
                    <td className="td">
                      {d.outstandingBalance > 0 ? (
                        <span className="text-red-400 font-mono text-xs font-semibold">
                          {formatCurrency(d.outstandingBalance)}
                        </span>
                      ) : (
                        <span className="text-emerald-400 text-xs">
                          Cleared
                        </span>
                      )}
                    </td>
                    <td className="td">
                      <button
                        onClick={() => navigate(`/drivers/${d.id}`)}
                        className="btn btn-ghost btn-sm"
                      >
                        <Eye size={13} /> View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-sm">
              No drivers found matching your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
