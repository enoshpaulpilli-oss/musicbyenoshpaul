import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Ear, Timer, Target, LineChart, Play, Pause } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/_app/practice")({
  head: () => ({ meta: [{ title: "Practice · MusicOS" }] }),
  component: Practice,
});

const TABS = ["Ear Training", "Metronome", "Timer", "Goals", "Statistics"] as const;

function Practice() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Metronome");
  return (
    <div>
      <PageHeader eyebrow="Discipline" title="Practice" description="Small, consistent sessions with tools that stay out of the way." />
      <div className="glass rounded-xl p-1 inline-flex mb-6 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={"px-4 py-2 rounded-lg text-sm transition " + (tab === t ? "bg-gradient-to-r from-primary to-accent text-primary-foreground" : "text-muted-foreground hover:text-foreground")}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="glass-strong rounded-2xl p-8 animate-fade-up">
        {tab === "Ear Training" && <EarTraining />}
        {tab === "Metronome" && <BigMetronome />}
        {tab === "Timer" && <BigTimer />}
        {tab === "Goals" && <Goals />}
        {tab === "Statistics" && <Stats />}
      </div>
    </div>
  );
}

function EarTraining() {
  return (
    <div className="text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-primary/15 text-primary">
        <Ear className="h-8 w-8" />
      </div>
      <h3 className="mt-4 font-display text-2xl font-bold">Interval Trainer</h3>
      <p className="mt-2 text-muted-foreground max-w-md mx-auto">Identify intervals and chord qualities by ear. Audio engine ships in v1.1.</p>
      <button className="mt-6 rounded-xl bg-primary text-primary-foreground px-5 py-3 text-sm">Start session</button>
    </div>
  );
}

function BigMetronome() {
  const [bpm, setBpm] = useState(100);
  const [playing, setPlaying] = useState(false);
  const [beat, setBeat] = useState(0);
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setBeat((b) => (b + 1) % 4), (60 / bpm) * 1000);
    return () => window.clearInterval(id);
  }, [playing, bpm]);
  return (
    <div className="text-center">
      <div className="font-mono font-black text-7xl tracking-tight">{bpm}<span className="text-xl text-muted-foreground ml-2">BPM</span></div>
      <div className="mt-6 flex items-center justify-center gap-3">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={"h-3 w-16 rounded-full transition-all " + (playing && beat === i ? "bg-primary shadow-[0_0_14px_var(--color-glow)]" : "bg-white/10")} />
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center gap-4">
        <button onClick={() => setPlaying((p) => !p)} className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground hover:opacity-90 transition ring-glow">
          {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>
      </div>
      <input type="range" min={40} max={220} value={bpm} onChange={(e) => setBpm(Number(e.target.value))} className="mt-6 w-full max-w-md accent-[var(--color-primary)]" />
    </div>
  );
}

function BigTimer() {
  const [s, setS] = useState(0);
  const [run, setRun] = useState(false);
  const ref = useRef<number | null>(null);
  useEffect(() => {
    if (run) ref.current = window.setInterval(() => setS((v) => v + 1), 1000);
    return () => { if (ref.current) window.clearInterval(ref.current); };
  }, [run]);
  return (
    <div className="text-center">
      <Timer className="mx-auto h-10 w-10 text-primary" />
      <div className="mt-4 font-mono font-black text-7xl">{String(Math.floor(s/60)).padStart(2,'0')}:{String(s%60).padStart(2,'0')}</div>
      <div className="mt-6 flex justify-center gap-3">
        <button onClick={() => setRun((r) => !r)} className="rounded-xl bg-primary text-primary-foreground px-5 py-3 text-sm">{run ? "Pause" : "Start"}</button>
        <button onClick={() => { setS(0); setRun(false); }} className="rounded-xl bg-white/5 hover:bg-white/10 px-5 py-3 text-sm">Reset</button>
      </div>
    </div>
  );
}

function Goals() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Target className="h-6 w-6 text-primary" />
        <h3 className="font-display text-2xl font-bold">Weekly goals</h3>
      </div>
      {[
        { name: "Daily practice · 30 min", pct: 72 },
        { name: "Learn 2 new chords", pct: 50 },
        { name: "Ear training · 3 sessions", pct: 33 },
      ].map((g) => (
        <div key={g.name} className="mb-4">
          <div className="flex justify-between text-sm mb-1.5"><span>{g.name}</span><span className="text-muted-foreground">{g.pct}%</span></div>
          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${g.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Stats() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <LineChart className="h-6 w-6 text-primary" />
        <h3 className="font-display text-2xl font-bold">This week</h3>
      </div>
      <div className="flex items-end gap-2 h-40">
        {[24, 40, 28, 62, 34, 50, 42].map((h, i) => (
          <div key={i} className="flex-1 rounded-t-lg bg-gradient-to-t from-primary/40 to-primary shadow-[0_0_20px_var(--color-glow)]" style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
      </div>
    </div>
  );
}
