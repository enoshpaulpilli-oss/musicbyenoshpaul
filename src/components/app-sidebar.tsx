import { Link, useRouterState } from "@tanstack/react-router";
import { motion, LayoutGroup } from "framer-motion";
import {
  LayoutDashboard, BookOpen, Guitar, Wand2, Timer,
  Library, FolderKanban, Sparkles, Settings, Music2, Sun, Moon,
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { EASE } from "@/components/motion";

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
    <motion.aside
      initial={{ opacity: 0, x: -20, filter: "blur(6px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="hidden md:flex fixed inset-y-3 left-3 w-64 flex-col glass-strong rounded-2xl z-30 p-3 border border-white/10"
    >
      <Link to="/" className="flex items-center gap-2 px-3 py-3 group">
        <motion.div
          whileHover={{ rotate: -8, scale: 1.05 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-[0_0_30px_var(--color-glow)]"
        >
          <Music2 className="h-4 w-4 text-primary-foreground" />
        </motion.div>
        <div className="flex flex-col leading-tight">
          <span className="font-display text-base font-bold tracking-tight">MusicOS</span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">v1.0 · beta</span>
        </div>
      </Link>

      <LayoutGroup id="sidebar-nav">
        <nav className="mt-4 flex-1 space-y-0.5 overflow-y-auto pr-1">
          {nav.map(({ to, label, icon: Icon }, i) => {
            const active = pathname === to || (to !== "/dashboard" && pathname.startsWith(to));
            return (
              <motion.div
                key={to}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.04, duration: 0.5, ease: EASE }}
              >
                <Link
                  to={to}
                  className={
                    "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors " +
                    (active ? "text-foreground" : "text-muted-foreground hover:text-foreground")
                  }
                >
                  {active && (
                    <motion.span
                      layoutId="active-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/25 to-accent/10 ring-1 ring-inset ring-primary/30"
                    />
                  )}
                  <motion.span
                    whileHover={{ scale: 1.15, rotate: -6 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="relative"
                  >
                    <Icon className={"h-4 w-4 shrink-0 " + (active ? "text-primary" : "")} />
                  </motion.span>
                  <span className="relative truncate">{label}</span>
                  {active && (
                    <motion.span
                      layoutId="active-dot"
                      className="relative ml-auto h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-glow)]"
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </LayoutGroup>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5, ease: EASE }}
        className="mt-3 rounded-xl glass p-3 border border-white/10"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium">Appearance</p>
            <p className="text-[10px] text-muted-foreground capitalize">{theme} mode</p>
          </div>
          <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.1, rotate: 12 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Toggle theme"
            className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 hover:bg-white/10 transition"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </motion.button>
        </div>
      </motion.div>
    </motion.aside>
  );
}

export function MobileNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="md:hidden fixed bottom-3 inset-x-3 z-30 glass-strong rounded-2xl px-2 py-2 border border-white/10"
    >
      <LayoutGroup id="mobile-nav">
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar">
          {nav.slice(0, 6).map(({ to, label, icon: Icon }) => {
            const active = pathname === to || (to !== "/dashboard" && pathname.startsWith(to));
            return (
              <Link key={to} to={to} className={"relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-[10px] transition-colors " + (active ? "text-primary" : "text-muted-foreground")}>
                {active && (
                  <motion.span
                    layoutId="mobile-active"
                    className="absolute inset-0 rounded-lg bg-primary/15"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className="relative h-4 w-4" />
                <span className="relative">{label}</span>
              </Link>
            );
          })}
        </div>
      </LayoutGroup>
    </motion.div>
  );
}
