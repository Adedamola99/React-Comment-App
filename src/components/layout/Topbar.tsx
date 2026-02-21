import { useState } from "react";
import {
  Bell,
  Search,
  ChevronDown,
  Moon,
  Sun,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import Avatar from "../ui/Avatar";
import { recentActivity } from "../../data/mockData";
import { formatRelativeTime } from "../../utils/format";

interface TopbarProps {
  user: { name: string; email: string; role: string } | null;
  onLogout: () => void;
}

export default function Topbar({ user, onLogout }: TopbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const toggleDark = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="h-16 bg-navy-900 border-b border-white/[0.06] flex items-center justify-between px-6 flex-shrink-0">
      {/* Search */}
      <div className="flex items-center gap-3 flex-1 max-w-sm">
        <div className="relative w-full">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="text"
            placeholder="Search drivers, vehicles..."
            className="input pl-9 py-2 text-xs"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Dark mode */}
        <button onClick={toggleDark} className="btn btn-ghost btn-sm p-2">
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="btn btn-ghost btn-sm p-2 relative"
          >
            <Bell size={16} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 card border border-white/[0.08] z-50 overflow-hidden animate-fade-in">
              <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200">
                  Notifications
                </span>
                <span className="text-xs text-accent">
                  {recentActivity.length} new
                </span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {recentActivity.slice(0, 5).map((a) => (
                  <div
                    key={a.id}
                    className="px-4 py-3 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                  >
                    <p className="text-sm text-slate-300">{a.message}</p>
                    <div className="flex items-center justify-between mt-1">
                      {a.meta && (
                        <span className="text-xs font-semibold text-accent">
                          {a.meta}
                        </span>
                      )}
                      <span className="text-xs text-slate-500">
                        {formatRelativeTime(a.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors"
          >
            <Avatar
              initials={
                user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("") ?? "FA"
              }
              size="sm"
            />
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-slate-200 leading-none">
                {user?.name}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">{user?.role}</p>
            </div>
            <ChevronDown size={14} className="text-slate-500" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-12 w-48 card border border-white/[0.08] z-50 py-1 animate-fade-in">
              {[
                { icon: User, label: "Profile" },
                { icon: Settings, label: "Settings" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] transition-colors"
                >
                  <Icon size={15} />
                  {label}
                </button>
              ))}
              <div className="border-t border-white/[0.06] mt-1 pt-1">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut size={15} />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
