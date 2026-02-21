import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Eye, Plus } from "lucide-react";
import Badge from "../../components/ui/Badge";
import Avatar from "../../components/ui/Avatar";
import { vehicles, drivers } from "../../data/mockData";
import { formatCurrency, formatDate } from "../../utils/format";
import type { VehicleStatus } from "../../types";

export default function VehiclesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<VehicleStatus | "All">(
    "All",
  );

  const filtered = vehicles.filter(
    (v) =>
      (statusFilter === "All" || v.status === statusFilter) &&
      `${v.make} ${v.model} ${v.plate}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-100 tracking-tight">
            Vehicles
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {vehicles.length} vehicles in fleet
          </p>
        </div>
        <button className="btn btn-primary btn-sm">
          <Plus size={15} /> Add Vehicle
        </button>
      </div>

      {/* Fleet summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Active",
            count: vehicles.filter((v) => v.status === "Active").length,
            color: "text-emerald-400",
          },
          {
            label: "In Maintenance",
            count: vehicles.filter((v) => v.status === "Maintenance").length,
            color: "text-amber-400",
          },
          {
            label: "Inactive",
            count: vehicles.filter((v) => v.status === "Inactive").length,
            color: "text-slate-400",
          },
        ].map((s) => (
          <div key={s.label} className="card p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            className="input pl-9 py-2 text-xs"
            placeholder="Search vehicles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {(["All", "Active", "Maintenance", "Inactive"] as const).map((s) => (
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
                <th className="th">Vehicle</th>
                <th className="th">Plate</th>
                <th className="th">Assigned Driver</th>
                <th className="th">Weekly Target</th>
                <th className="th">Total Revenue</th>
                <th className="th">Mileage</th>
                <th className="th">Next Service</th>
                <th className="th">Status</th>
                <th className="th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v) => {
                const driver = drivers.find((d) => d.id === v.driverId);
                return (
                  <tr key={v.id} className="table-row">
                    <td className="td">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-2 h-8 rounded-full flex-shrink-0"
                          style={{ background: v.color }}
                        />
                        <div>
                          <p className="font-semibold text-slate-200 text-sm">
                            {v.year} {v.make} {v.model}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="td font-mono text-slate-400 text-xs">
                      {v.plate}
                    </td>
                    <td className="td">
                      {driver ? (
                        <div className="flex items-center gap-2">
                          <Avatar initials={driver.avatar} size="sm" />
                          <span className="text-sm text-slate-300">
                            {driver.name}
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-500 text-xs">
                          Unassigned
                        </span>
                      )}
                    </td>
                    <td className="td font-mono text-slate-300">
                      {formatCurrency(v.weeklyTarget)}
                    </td>
                    <td className="td font-mono text-emerald-400 font-semibold">
                      {formatCurrency(v.totalRevenue)}
                    </td>
                    <td className="td text-slate-400 text-xs">
                      {v.mileage.toLocaleString()} km
                    </td>
                    <td className="td text-xs text-slate-400">
                      {formatDate(v.nextService)}
                    </td>
                    <td className="td">
                      <Badge status={v.status} />
                    </td>
                    <td className="td">
                      <button
                        onClick={() => navigate(`/vehicles/${v.id}`)}
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
        </div>
      </div>
    </div>
  );
}
