import { Wrench, AlertCircle, CheckCircle, Clock } from "lucide-react";
import StatCard from "../../components/ui/StatCard";
import { vehicles } from "../../data/mockData";
import { formatDate } from "../../utils/format";

const maintenanceRecords = [
  {
    id: "m1",
    vehicleId: "v1",
    type: "Oil Change",
    cost: 15000,
    date: "2024-01-15",
    description: "Full synthetic oil change + filter",
    status: "Completed",
  },
  {
    id: "m2",
    vehicleId: "v4",
    type: "Brake Service",
    cost: 45000,
    date: "2024-03-01",
    description: "Front and rear brake pad replacement",
    status: "In Progress",
  },
  {
    id: "m3",
    vehicleId: "v2",
    type: "Tyre Rotation",
    cost: 8000,
    date: "2024-02-01",
    description: "4-wheel tyre rotation and balance",
    status: "Completed",
  },
  {
    id: "m4",
    vehicleId: "v3",
    type: "AC Service",
    cost: 22000,
    date: "2024-01-28",
    description: "Air conditioning regas and filter clean",
    status: "Completed",
  },
  {
    id: "m5",
    vehicleId: "v5",
    type: "Battery Replace",
    cost: 35000,
    date: "2024-02-14",
    description: "Battery replacement — OEM spec",
    status: "Completed",
  },
  {
    id: "m6",
    vehicleId: "v6",
    type: "Full Service",
    cost: 55000,
    date: "2024-04-05",
    description: "Scheduled 10,000km full service",
    status: "Upcoming",
  },
];

export default function MaintenancePage() {
  const totalCost = maintenanceRecords
    .filter((r) => r.status === "Completed")
    .reduce((s, r) => s + r.cost, 0);
  const inProgress = maintenanceRecords.filter(
    (r) => r.status === "In Progress",
  ).length;
  const upcoming = maintenanceRecords.filter(
    (r) => r.status === "Upcoming",
  ).length;

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-slate-100 tracking-tight">
          Maintenance
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Track vehicle service history and upcoming schedules
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="YTD Cost"
          value={`₦${(totalCost / 1000).toFixed(0)}k`}
          icon={Wrench}
          iconColor="text-accent"
        />
        <StatCard
          title="In Progress"
          value={String(inProgress)}
          icon={Clock}
          iconColor="text-amber-400"
        />
        <StatCard
          title="Upcoming"
          value={String(upcoming)}
          icon={AlertCircle}
          iconColor="text-blue-400"
        />
        <StatCard
          title="Completed"
          value={String(
            maintenanceRecords.filter((r) => r.status === "Completed").length,
          )}
          icon={CheckCircle}
          iconColor="text-emerald-400"
        />
      </div>
      <div className="card p-5">
        <h2 className="section-title mb-4">Service Schedule</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {vehicles.map((v) => {
            const daysToService = Math.round(
              (new Date(v.nextService).getTime() - Date.now()) / 86400000,
            );
            const urgency =
              daysToService < 0
                ? "Overdue"
                : daysToService < 30
                  ? "Due Soon"
                  : "OK";
            return (
              <div
                key={v.id}
                className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: v.color }}
                  />
                  <p className="font-semibold text-slate-200 text-sm">
                    {v.make} {v.model}
                  </p>
                  <span className="font-mono text-xs text-slate-500 ml-auto">
                    {v.plate}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Last service</span>
                    <span className="text-slate-400">
                      {formatDate(v.lastService)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Next service</span>
                    <span
                      className={
                        urgency === "Overdue"
                          ? "text-red-400"
                          : urgency === "Due Soon"
                            ? "text-amber-400"
                            : "text-emerald-400"
                      }
                    >
                      {formatDate(v.nextService)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Mileage</span>
                    <span className="text-slate-400">
                      {v.mileage.toLocaleString()} km
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${urgency === "Overdue" ? "bg-red-500/15 text-red-400" : urgency === "Due Soon" ? "bg-amber-500/15 text-amber-400" : "bg-emerald-500/15 text-emerald-400"}`}
                  >
                    {urgency}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="card overflow-hidden">
        <div className="p-5 border-b border-white/[0.06]">
          <h2 className="section-title">Service History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/[0.06]">
              <tr>
                <th className="th">Vehicle</th>
                <th className="th">Service</th>
                <th className="th">Description</th>
                <th className="th">Date</th>
                <th className="th">Cost</th>
                <th className="th">Status</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceRecords.map((r) => {
                const v = vehicles.find((veh) => veh.id === r.vehicleId);
                return (
                  <tr key={r.id} className="table-row">
                    <td className="td">
                      <p className="text-sm text-slate-300">
                        {v?.make} {v?.model}
                      </p>
                      <p className="text-xs font-mono text-slate-500">
                        {v?.plate}
                      </p>
                    </td>
                    <td className="td font-semibold text-slate-200 text-sm">
                      {r.type}
                    </td>
                    <td className="td text-xs text-slate-400">
                      {r.description}
                    </td>
                    <td className="td text-sm text-slate-400">
                      {formatDate(r.date)}
                    </td>
                    <td className="td font-mono text-slate-300">
                      ₦{r.cost.toLocaleString()}
                    </td>
                    <td className="td">
                      <span
                        className={`badge ${r.status === "Completed" ? "badge-green" : r.status === "In Progress" ? "badge-yellow" : "badge-blue"}`}
                      >
                        {r.status}
                      </span>
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
