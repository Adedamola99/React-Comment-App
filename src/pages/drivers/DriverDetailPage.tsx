import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, Mail, Car, AlertTriangle } from "lucide-react";
import Avatar from "../../components/ui/Avatar";
import Badge from "../../components/ui/Badge";
import { drivers, vehicles, payments } from "../../data/mockData";
import { formatCurrency, formatDate } from "../../utils/format";

export default function DriverDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const driver = drivers.find((d) => d.id === id);
  const vehicle = vehicles.find((v) => v.id === driver?.vehicleId);
  const driverPayments = payments.filter((p) => p.driverId === id);

  if (!driver)
    return (
      <div className="text-center py-20 text-slate-500">
        <p>Driver not found.</p>
        <button
          onClick={() => navigate("/drivers")}
          className="btn btn-secondary mt-4"
        >
          Back to Drivers
        </button>
      </div>
    );

  const riskColor =
    driver.riskScore >= 70
      ? "text-red-400"
      : driver.riskScore >= 40
        ? "text-amber-400"
        : "text-emerald-400";
  const riskBg =
    driver.riskScore >= 70
      ? "bg-red-400"
      : driver.riskScore >= 40
        ? "bg-amber-400"
        : "bg-emerald-400";

  return (
    <div className="space-y-5 animate-fade-in max-w-5xl">
      <button
        onClick={() => navigate("/drivers")}
        className="btn btn-ghost btn-sm"
      >
        <ArrowLeft size={14} /> Back to Drivers
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Profile card */}
        <div className="card p-6 flex flex-col gap-5">
          <div className="flex flex-col items-center text-center gap-3">
            <Avatar initials={driver.avatar} size="lg" />
            <div>
              <h2 className="font-bold text-slate-100 text-lg">
                {driver.name}
              </h2>
              <Badge status={driver.status} />
            </div>
          </div>
          <div className="space-y-3 border-t border-white/[0.06] pt-4">
            <div className="flex items-center gap-2.5 text-sm text-slate-400">
              <Mail size={14} className="text-slate-600" /> {driver.email}
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-400">
              <Phone size={14} className="text-slate-600" /> {driver.phone}
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-400">
              <Car size={14} className="text-slate-600" />
              {vehicle ? `${vehicle.make} ${vehicle.model}` : "No vehicle"}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 border-t border-white/[0.06] pt-4">
            {[
              {
                label: "Total Paid",
                val: formatCurrency(driver.totalPaid),
                color: "text-emerald-400",
              },
              {
                label: "Outstanding",
                val: formatCurrency(driver.outstandingBalance),
                color:
                  driver.outstandingBalance > 0
                    ? "text-red-400"
                    : "text-emerald-400",
              },
              {
                label: "Weekly Rate",
                val: formatCurrency(driver.weeklyPayment),
                color: "text-accent",
              },
              {
                label: "Joined",
                val: formatDate(driver.joinDate),
                color: "text-slate-400",
              },
            ].map((s) => (
              <div key={s.label} className="bg-white/[0.03] rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-0.5">{s.label}</p>
                <p className={`text-sm font-bold ${s.color}`}>{s.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Performance & Risk */}
          <div className="card p-5">
            <h3 className="section-title mb-4">Performance & Risk</h3>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-500 uppercase tracking-wide">
                    Performance Score
                  </span>
                  <span className="text-sm font-bold text-slate-200">
                    {driver.performanceScore}/100
                  </span>
                </div>
                <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${driver.performanceScore >= 80 ? "bg-emerald-400" : driver.performanceScore >= 60 ? "bg-amber-400" : "bg-red-400"}`}
                    style={{ width: `${driver.performanceScore}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-500 uppercase tracking-wide">
                    Risk Score
                  </span>
                  <span className={`text-sm font-bold ${riskColor}`}>
                    {driver.riskScore}/100
                  </span>
                </div>
                <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${riskBg}`}
                    style={{ width: `${driver.riskScore}%` }}
                  />
                </div>
              </div>
            </div>
            {driver.riskScore >= 50 && (
              <div className="mt-4 flex items-start gap-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg px-4 py-3">
                <AlertTriangle
                  size={15}
                  className="text-amber-400 flex-shrink-0 mt-0.5"
                />
                <p className="text-xs text-amber-300">
                  This driver has a high risk score. Consider reviewing their
                  payment history and vehicle usage.
                </p>
              </div>
            )}
          </div>

          {/* Vehicle info */}
          {vehicle && (
            <div className="card p-5">
              <h3 className="section-title mb-4">Assigned Vehicle</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    label: "Vehicle",
                    val: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
                  },
                  { label: "Plate", val: vehicle.plate },
                  { label: "Status", val: vehicle.status },
                  {
                    label: "Mileage",
                    val: `${vehicle.mileage.toLocaleString()} km`,
                  },
                  {
                    label: "Last Service",
                    val: formatDate(vehicle.lastService),
                  },
                  {
                    label: "Next Service",
                    val: formatDate(vehicle.nextService),
                  },
                ].map((s) => (
                  <div key={s.label} className="bg-white/[0.03] rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-0.5">{s.label}</p>
                    <p className="text-sm font-semibold text-slate-200">
                      {s.val}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment history */}
          <div className="card overflow-hidden">
            <div className="p-5 border-b border-white/[0.06]">
              <h3 className="section-title">Payment History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-white/[0.06]">
                  <tr>
                    <th className="th">Week Ending</th>
                    <th className="th">Amount</th>
                    <th className="th">Status</th>
                    <th className="th">Paid At</th>
                    <th className="th">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {driverPayments.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-8 text-slate-500 text-sm"
                      >
                        No payments recorded.
                      </td>
                    </tr>
                  ) : (
                    driverPayments.map((p) => (
                      <tr key={p.id} className="table-row">
                        <td className="td">{formatDate(p.weekEnding)}</td>
                        <td className="td font-mono">
                          {formatCurrency(p.amount)}
                        </td>
                        <td className="td">
                          <Badge status={p.status} />
                        </td>
                        <td className="td">
                          {p.paidAt ? (
                            formatDate(p.paidAt)
                          ) : (
                            <span className="text-slate-500">—</span>
                          )}
                        </td>
                        <td className="td text-slate-500 text-xs">
                          {p.note || "—"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
