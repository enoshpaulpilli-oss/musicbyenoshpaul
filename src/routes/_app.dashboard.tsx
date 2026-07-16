import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { CircleOfFifths } from "@/components/circle-of-fifths";
import { PROGRESSIONS, TIPS, CHORDS, SCALES } from "@/lib/music-data";
import { Flame, Clock, Music, Star, Play, Pause, Shuffle, Sparkles, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · MusicOS" }] }),
  component: Dashboard,
});

function Dashboard() {
  const [tipIdx, setTipIdx] = useState(0);
  const [chord, setChord] = useState(CHORDS[0]);
  const [scale, setScale] = useState(SCALES[0]);
  const [prog, setProg] = useState(PROGRESSIONS[0]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Welcome back"
        title="Your studio, at a glance."
        description="Widgets you can rearrange and edit. Everything is connected across MusicOS."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={Flame} label="Practice streak" value="12 days" trend="+3 this week" tone="primary" />
        <StatCard icon={Clock} label="Today's practice" value="42 min" trend="Goal: 60 min" tone="accent" />
        <StatCard icon={Music} label="Saved projects" value="8" trend="2 in progress" tone="primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Widget className="lg:col-span-2" title="Circle of Fifths" subtitle="Foundation · Interactive" cta={<Link to="/theory" className="text-xs text-primary hover:underline flex items-center gap-1">Open Theory <ArrowRight className="h-3 w-3" /></Link>}>
          <CircleOfFifths compact />
        </Widget>

        <div className="space-y-4">
          <Metronome />
          <PracticeTimer />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Widget
          title="Random chord"
          subtitle={chord.quality}
          cta={
            <button onClick={() => setChord(CHORDS[Math.floor(Math.random() * CHORDS.length)])} className="text-xs text-primary hover:underline flex items-center gap-1">
              <Shuffle className="h-3 w-3" /> Shuffle
            </button>
          }
        >
          <div className="text-3xl font-display font-bold">{chord.name}</div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {chord.notes.map((n) => (
              <span key={n} className="rounded-md bg-primary/15 text-primary font-mono text-xs px-2 py-1">{n}</span>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Formula {chord.formula}</p>
        </Widget>

        <Widget
          title="Random scale"
          subtitle="Mood"
          cta={
            <button onClick={() => setScale(SCALES[Math.floor(Math.random() * SCALES.length)])} className="text-xs text-primary hover:underline flex items-center gap-1">
              <Shuffle className="h-3 w-3" /> Shuffle
            </button>
          }
        >
          <div className="text-2xl font-display font-bold">{scale.name}</div>
          <div className="mt-2 text-xs text-muted-foreground">{scale.mood}</div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {scale.notes.map((n) => (
              <span key={n} className="rounded-md bg-accent/15 text-accent-foreground/90 font-mono text-xs px-2 py-1">{n}</span>
            ))}
          </div>
        </Widget>

        <Widget
          title="Random progression"
          subtitle={prog.genre}
          cta={
            <button onClick={() => setProg(PROGRESSIONS[Math.floor(Math.random() * PROGRESSIONS.length)])} className="text-xs text-primary hover:underline flex items-center gap-1">
              <Shuffle className="h-3 w-3" /> Shuffle
            </button>
          }
        >
          <div className="text-xl font-display font-bold">{prog.name}</div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {prog.chords.map((c, i) => (
              <span key={i} className="rounded-md bg-white/5 font-mono text-xs px-2.5 py-1.5 border border-white/5">{c}</span>
            ))}
          </div>
        </Widget>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Widget title="Recently viewed chords" className="md:col-span-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CHORDS.slice(0, 6).map((c) => (
              <div key={c.name} className="rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition p-3">
                <p className="font-medium text-sm">{c.name}</p>
                <p className="text-[10px] text-muted-foreground">{c.notes.join(" · ")}</p>
              </div>
            ))}
          </div>
        </Widget>

        <Widget title="Daily tip" subtitle="Theory" cta={<button onClick={() => setTipIdx((i) => (i + 1) % TIPS.length)} className="text-xs text-primary hover:underline">Next</button>}>
          <Sparkles className="h-5 w-5 text-primary" />
          <p className="mt-3 text-sm leading-relaxed">{TIPS[tipIdx]}</p>
        </Widget>
      </div>

      <Widget title="Recent activity">
        <ul className="divide-y divide-white/5">
          {ACTIVITY.map((a, i) => (
            <li key={i} className="flex items-center gap-3 py-3 text-sm">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/5">
                <Star className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate">{a.label}</p>
                <p className="text-xs text-muted-foreground">{a.when}</p>
              </div>
              <span className="text-xs text-muted-foreground">{a.tag}</span>
            </li>
          ))}
        </ul>
      </Widget>
    </div>
  );
}

const ACTIVITY = [
  { label: "Practiced C Major scale · 12 min", when: "Today, 09:12", tag: "Practice" },
  { label: "Saved 'Andalusian Cadence' to Library", when: "Yesterday", tag: "Library" },
  { label: "Composed a new 8-bar progression", when: "2 days ago", tag: "Composer" },
  { label: "Explored F# Minor chord family", when: "3 days ago", tag: "Theory" },
];

function StatCard({ icon: Icon, label, value, trend, tone }: { icon: React.ComponentType<{className?: string}>; label: string; value: string; trend: string; tone: "primary" | "accent"; }) {
  return (
    <div className="glass rounded-2xl p-5 hover-lift">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
        <div className={"grid h-8 w-8 place-items-center rounded-lg " + (tone === "primary" ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent-foreground")}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-2 font-display text-3xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{trend}</p>
    </div>
  );
}

export function Widget({
  title,
  subtitle,
  cta,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  cta?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={"glass rounded-2xl p-5 " + (className ?? "")}>
      <header className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display font-semibold">{title}</h3>
          {subtitle && <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{subtitle}</p>}
        </div>
        {cta}
      </header>
      {children}
    </section>
  );
}

function Metronome() {
  const [bpm, setBpm] = useState(90);
  const [playing, setPlaying] = useState(false);
  const [beat, setBeat] = useState(0);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) {
      if (ref.current) window.clearInterval(ref.current);
      return;
    }
    ref.current = window.setInterval(() => {
      setBeat((b) => (b + 1) % 4);
    }, (60 / bpm) * 1000);
    return () => {
      if (ref.current) window.clearInterval(ref.current);
    };
  }, [playing, bpm]);

  return (
    <Widget title="Metronome" subtitle={`${bpm} BPM`}>
      <div className="flex items-center gap-1.5 mb-4">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={"h-2 flex-1 rounded-full transition-all " + (playing && beat === i ? "bg-primary shadow-[0_0_12px_var(--color-glow)]" : "bg-white/10")} />
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setPlaying((p) => !p)}
          className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground hover:opacity-90 transition"
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <input
          type="range"
          min={40}
          max={220}
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
          className="flex-1 accent-[var(--color-primary)]"
        />
      </div>
    </Widget>
  );
}

function PracticeTimer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [running]);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return (
    <Widget title="Practice timer" subtitle={running ? "Running" : "Paused"}>
      <div className="font-mono font-bold text-4xl tracking-tight">{mm}:{ss}</div>
      <div className="mt-3 flex gap-2">
        <button onClick={() => setRunning((r) => !r)} className="flex-1 rounded-lg bg-primary text-primary-foreground text-xs py-2 hover:opacity-90 transition">
          {running ? "Pause" : "Start"}
        </button>
        <button onClick={() => { setSeconds(0); setRunning(false); }} className="rounded-lg bg-white/5 hover:bg-white/10 text-xs py-2 px-3 transition">Reset</button>
      </div>
    </Widget>
  );
}
