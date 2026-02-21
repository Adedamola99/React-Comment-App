import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Car,
  CreditCard,
  Wrench,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/drivers", icon: Users, label: "Drivers" },
  { to: "/vehicles", icon: Car, label: "Vehicles" },
  { to: "/payments", icon: CreditCard, label: "Payments" },
  { to: "/maintenance", icon: Wrench, label: "Maintenance" },
  { to: "/analytics", icon: BarChart3, label: "Analytics" },
];

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={`
      relative flex flex-col bg-navy-900 border-r border-white/[0.06] shadow-sidebar
      transition-all duration-300 ease-in-out flex-shrink-0
      ${collapsed ? "w-16" : "w-60"}
    `}
    >
      {/* Logo */}
      <div
        className={`flex items-center gap-3 px-4 h-16 border-b border-white/[0.06] ${collapsed ? "justify-center" : ""}`}
      >
        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
          <Zap size={16} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <span className="font-bold text-slate-100 tracking-tight">
              FleetOS
            </span>
            <span className="block text-[10px] text-slate-500 -mt-0.5 uppercase tracking-widest">
              Fleet Finance
            </span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""} ${collapsed ? "justify-center px-2" : ""}`
            }
            title={collapsed ? label : undefined}
          >
            <Icon size={18} strokeWidth={2} className="flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Settings */}
      <div className="p-3 border-t border-white/[0.06]">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""} ${collapsed ? "justify-center px-2" : ""}`
          }
          title={collapsed ? "Settings" : undefined}
        >
          <Settings size={18} strokeWidth={2} className="flex-shrink-0" />
          {!collapsed && <span>Settings</span>}
        </NavLink>
      </div>

      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-navy-800 border border-white/[0.12] flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors z-10"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
