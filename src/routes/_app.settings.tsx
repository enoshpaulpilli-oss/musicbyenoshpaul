import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { useTheme } from "@/hooks/use-theme";
import { Check } from "lucide-react";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings · MusicOS" }] }),
  component: Settings,
});

const ACCENTS = [
  { name: "Violet", value: "oklch(0.72 0.2 295)" },
  { name: "Cyan", value: "oklch(0.78 0.16 195)" },
  { name: "Rose", value: "oklch(0.7 0.2 15)" },
  { name: "Amber", value: "oklch(0.8 0.16 75)" },
  { name: "Emerald", value: "oklch(0.7 0.16 160)" },
];

function Settings() {
  const { theme, toggle } = useTheme();

  const setAccent = (v: string) => {
    document.documentElement.style.setProperty("--primary", v);
    document.documentElement.style.setProperty("--ring", v);
  };

  return (
    <div>
      <PageHeader eyebrow="Preferences" title="Settings" description="Personalize MusicOS to match your workflow and taste." />

      <div className="space-y-6 max-w-3xl">
        <Section title="Appearance" desc="Choose your preferred theme.">
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => theme === "dark" ? null : toggle()} className={"rounded-xl p-4 text-left border transition " + (theme === "dark" ? "border-primary bg-primary/10" : "border-white/10 hover:bg-white/5")}>
              <p className="font-medium">Dark</p>
              <p className="text-xs text-muted-foreground">Default · easier at night</p>
            </button>
            <button onClick={() => theme === "light" ? null : toggle()} className={"rounded-xl p-4 text-left border transition " + (theme === "light" ? "border-primary bg-primary/10" : "border-white/10 hover:bg-white/5")}>
              <p className="font-medium">Light</p>
              <p className="text-xs text-muted-foreground">Bright & airy</p>
            </button>
          </div>
        </Section>

        <Section title="Accent color" desc="Choose the color that leads the interface.">
          <div className="flex flex-wrap gap-3">
            {ACCENTS.map((a) => (
              <button key={a.name} onClick={() => setAccent(a.value)} className="group rounded-xl glass p-3 flex items-center gap-3 hover-lift">
                <span className="h-6 w-6 rounded-full ring-glow" style={{ background: a.value }} />
                <span className="text-sm">{a.name}</span>
              </button>
            ))}
          </div>
        </Section>

        <Section title="Instrument preference" desc="Default instrument for diagrams and lessons.">
          <div className="grid grid-cols-2 gap-3">
            {["Piano", "Guitar"].map((i) => (
              <label key={i} className="rounded-xl glass p-4 flex items-center justify-between cursor-pointer hover:bg-white/[0.06] transition">
                <span className="text-sm font-medium">{i}</span>
                <input type="radio" name="instrument" defaultChecked={i === "Piano"} className="accent-[var(--color-primary)]" />
              </label>
            ))}
          </div>
        </Section>

        <Section title="Accessibility" desc="Optional adjustments for a calmer experience.">
          {[
            "Reduce motion",
            "Higher contrast",
            "Larger text",
          ].map((t) => (
            <label key={t} className="flex items-center justify-between glass rounded-xl p-4 mb-2 cursor-pointer">
              <span className="text-sm">{t}</span>
              <input type="checkbox" className="accent-[var(--color-primary)] h-4 w-4" />
            </label>
          ))}
        </Section>

        <div className="glass rounded-2xl p-5 flex items-center gap-3">
          <Check className="h-4 w-4 text-primary" />
          <p className="text-sm text-muted-foreground">Changes save automatically.</p>
        </div>
      </div>
    </div>
  );
}

function Section({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <section className="glass-strong rounded-2xl p-6">
      <header className="mb-4">
        <h3 className="font-display font-semibold text-lg">{title}</h3>
        {desc && <p className="text-xs text-muted-foreground">{desc}</p>}
      </header>
      {children}
    </section>
  );
}
