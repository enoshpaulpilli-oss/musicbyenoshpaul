import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  BookOpen,
  Guitar,
  Wand2,
  Timer,
  Library,
  FolderKanban,
  Sparkles,
  Settings,
  Music2,
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Sun, Moon } from "lucide-react";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/theory", label: "Theory", icon: BookOpen },
  { to: "/instruments", label: "Instruments", icon: Guitar },
  { to: "/composer", label: "Composer", icon: Wand2 },
  { to: "/practice", label: "Practice", icon: Timer },
  { to: "/library", label: "Library", icon: Library },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/assistant", label: "AI Assistant", icon: Sparkles },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { theme, toggle } = useTheme();

  return (
    <aside className="hidden md:flex fixed inset-y-3 left-3 w-64 flex-col glass-strong rounded-2xl z-30 p-3">
      <Link to="/" className="flex items-center gap-2 px-3 py-3 group">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent ring-glow">
          <Music2 className="h-4 w-4 text-primary-foreground" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-display text-base font-bold tracking-tight">MusicOS</span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">v1.0 · beta</span>
        </div>
      </Link>

      <nav className="mt-4 flex-1 space-y-0.5 overflow-y-auto pr-1">
        {nav.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || (to !== "/dashboard" && pathname.startsWith(to));
          return (
            <Link
              key={to}
              to={to}
              className={
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all " +
                (active
                  ? "bg-gradient-to-r from-primary/20 to-accent/10 text-foreground shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-primary)_25%,transparent)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]")
              }
            >
              <Icon className={"h-4 w-4 shrink-0 transition-colors " + (active ? "text-primary" : "")} />
              <span className="truncate">{label}</span>
              {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />}
            </Link>
          );
        })}
      </nav>

      <div className="mt-3 rounded-xl glass p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium">Appearance</p>
            <p className="text-[10px] text-muted-foreground capitalize">{theme} mode</p>
          </div>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 hover:bg-white/10 transition"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="md:hidden fixed bottom-3 inset-x-3 z-30 glass-strong rounded-2xl px-2 py-2">
      <div className="flex items-center justify-between overflow-x-auto no-scrollbar">
        {nav.slice(0, 6).map(({ to, label, icon: Icon }) => {
          const active = pathname === to || (to !== "/dashboard" && pathname.startsWith(to));
          return (
            <Link key={to} to={to} className={"flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-[10px] " + (active ? "text-primary" : "text-muted-foreground")}>
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
