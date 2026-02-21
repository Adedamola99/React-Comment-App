import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Badge from "../../components/ui/Badge";
import Avatar from "../../components/ui/Avatar";
import { vehicles, drivers } from "../../data/mockData";
import { formatCurrency, formatDate } from "../../utils/format";

export default function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const vehicle = vehicles.find((v) => v.id === id);
  const driver = drivers.find((d) => d.id === vehicle?.driverId);

  if (!vehicle)
    return (
      <div className="text-center py-20 text-slate-500">
        <p>Vehicle not found.</p>
        <button
          onClick={() => navigate("/vehicles")}
          className="btn btn-secondary mt-4"
        >
          Back to Vehicles
        </button>
      </div>
    );

  const daysToService = Math.round(
    (new Date(vehicle.nextService).getTime() - Date.now()) / 86400000,
  );
  const serviceUrgent = daysToService < 30;

  return (
    <div className="space-y-5 animate-fade-in max-w-4xl">
      <button
        onClick={() => navigate("/vehicles")}
        className="btn btn-ghost btn-sm"
      >
        <ArrowLeft size={14} /> Back to Vehicles
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Vehicle card */}
        <div className="card p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex-shrink-0"
              style={{
                background: vehicle.color + "33",
                border: `2px solid ${vehicle.color}`,
              }}
            />
            <div>
              <h2 className="font-bold text-slate-100">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h2>
              <p className="text-xs font-mono text-slate-400">
                {vehicle.plate}
              </p>
            </div>
          </div>
          <Badge status={vehicle.status} />
          <div className="space-y-3 border-t border-white/[0.06] pt-4">
            {[
              {
                label: "Total Revenue",
                val: formatCurrency(vehicle.totalRevenue),
                color: "text-emerald-400",
              },
              {
                label: "Weekly Target",
                val: formatCurrency(vehicle.weeklyTarget),
                color: "text-accent",
              },
              {
                label: "Mileage",
                val: `${vehicle.mileage.toLocaleString()} km`,
                color: "text-slate-300",
              },
              {
                label: "Last Service",
                val: formatDate(vehicle.lastService),
                color: "text-slate-300",
              },
              {
                label: "Next Service",
                val: formatDate(vehicle.nextService),
                color: serviceUrgent ? "text-amber-400" : "text-slate-300",
              },
            ].map((s) => (
              <div key={s.label} className="flex justify-between items-center">
                <span className="text-xs text-slate-500">{s.label}</span>
                <span className={`text-sm font-semibold ${s.color}`}>
                  {s.val}
                </span>
              </div>
            ))}
          </div>
          {serviceUrgent && (
            <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2.5">
              <AlertCircle
                size={14}
                className="text-amber-400 flex-shrink-0 mt-0.5"
              />
              <p className="text-xs text-amber-300">
                Service due in {daysToService} days
              </p>
            </div>
          )}
        </div>

        {/* Right */}
        <div className="lg:col-span-2 space-y-4">
          {driver && (
            <div className="card p-5">
              <h3 className="section-title mb-4">Assigned Driver</h3>
              <div className="flex items-center gap-4">
                <Avatar initials={driver.avatar} size="lg" />
                <div className="flex-1">
                  <p className="font-bold text-slate-100">{driver.name}</p>
                  <p className="text-xs text-slate-500">{driver.email}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge status={driver.status} />
                    <span className="text-xs text-slate-400">
                      Score: {driver.performanceScore}/100
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Weekly payment</p>
                  <p className="font-bold text-accent">
                    {formatCurrency(driver.weeklyPayment)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="card p-5">
            <h3 className="section-title mb-4">Vehicle Stats</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "Fleet Position", val: "#3 by Revenue" },
                {
                  label: "Avg Weekly",
                  val: formatCurrency(vehicle.totalRevenue / 52),
                },
                { label: "Utilisation", val: driver ? "100%" : "0%" },
                { label: "ROI Est.", val: "24.6%" },
                { label: "Service Interval", val: "15,000 km" },
                {
                  label: "Remaining",
                  val: `${(15000 - (vehicle.mileage % 15000)).toLocaleString()} km`,
                },
              ].map((s) => (
                <div key={s.label} className="bg-white/[0.03] rounded-lg p-3">
                  <p className="text-xs text-slate-500 mb-0.5">{s.label}</p>
                  <p className="text-sm font-bold text-slate-200">{s.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
