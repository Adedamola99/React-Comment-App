import { Bell, Shield, Building, CreditCard, Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-5 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-xl font-bold text-slate-100 tracking-tight">
          Settings
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Manage your fleet account preferences
        </p>
      </div>
      {[
        {
          icon: Building,
          title: "Company Details",
          fields: [
            {
              label: "Company Name",
              value: "FleetOS Nigeria Ltd",
              type: "text",
            },
            {
              label: "Business Email",
              value: "admin@fleeetos.com",
              type: "email",
            },
            { label: "Phone Number", value: "+234 800 000 0000", type: "tel" },
            {
              label: "Address",
              value: "25 Marina Street, Lagos Island",
              type: "text",
            },
          ],
        },
        {
          icon: CreditCard,
          title: "Payment Settings",
          fields: [
            { label: "Weekly Cycle", value: "Sunday - Saturday", type: "text" },
            { label: "Grace Period", value: "2 days", type: "text" },
            { label: "Currency", value: "NGN (₦)", type: "text" },
          ],
        },
      ].map((section) => (
        <div key={section.title} className="card p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <section.icon size={18} className="text-accent" />
            <h2 className="section-title">{section.title}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {section.fields.map((f) => (
              <div key={f.label}>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  {f.label}
                </label>
                <input type={f.type} className="input" defaultValue={f.value} />
              </div>
            ))}
          </div>
          <button className="btn btn-primary btn-sm mt-5">
            <Save size={14} /> Save Changes
          </button>
        </div>
      ))}
      <div className="card p-6">
        <div className="flex items-center gap-2.5 mb-5">
          <Bell size={18} className="text-accent" />
          <h2 className="section-title">Notifications</h2>
        </div>
        <div className="space-y-3">
          {[
            {
              label: "Late payment alerts",
              desc: "Get notified when drivers miss payments",
              on: true,
            },
            {
              label: "Weekly summary report",
              desc: "Email summary every Monday morning",
              on: true,
            },
            {
              label: "Maintenance reminders",
              desc: "Alerts when vehicles are due for service",
              on: true,
            },
            {
              label: "New driver registration",
              desc: "Notify when a new driver is onboarded",
              on: false,
            },
          ].map((n) => (
            <div
              key={n.label}
              className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0"
            >
              <div>
                <p className="text-sm font-semibold text-slate-200">
                  {n.label}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{n.desc}</p>
              </div>
              <div
                className={`relative w-10 h-5 rounded-full cursor-pointer transition-colors ${n.on ? "bg-accent" : "bg-white/[0.1]"}`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${n.on ? "translate-x-5" : "translate-x-0.5"}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card p-6 border border-red-500/20">
        <div className="flex items-center gap-2.5 mb-4">
          <Shield size={18} className="text-red-400" />
          <h2 className="text-base font-bold text-red-400">Danger Zone</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-200">
              Delete Account
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Permanently delete your fleet account and all data
            </p>
          </div>
          <button className="btn btn-danger btn-sm">Delete Account</button>
        </div>
      </div>
    </div>
  );
}
