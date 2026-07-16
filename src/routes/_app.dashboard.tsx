"use client";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/page-header";
import { CircleOfFifths } from "@/components/circle-of-fifths";
import { PROGRESSIONS, TIPS, CHORDS, SCALES } from "@/lib/music-data";
import { Flame, Clock, Music, Star, Play, Pause, Shuffle, Sparkles, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatedCard, AnimatedButton, MotionContainer, MotionItem, EASE } from "@/components/motion";

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

      <MotionContainer className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MotionItem><StatCard icon={Flame} label="Practice streak" value="12 days" trend="+3 this week" tone="primary" /></MotionItem>
        <MotionItem><StatCard icon={Clock} label="Today's practice" value="42 min" trend="Goal: 60 min" tone="accent" /></MotionItem>
        <MotionItem><StatCard icon={Music} label="Saved projects" value="8" trend="2 in progress" tone="primary" /></MotionItem>
      </MotionContainer>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <AnimatedCard className="lg:col-span-2" tilt={false}>
          <WidgetHeader title="Circle of Fifths" subtitle="Foundation · Interactive" cta={<Link to="/theory" className="text-xs text-primary hover:underline flex items-center gap-1">Open Theory <ArrowRight className="h-3 w-3" /></Link>} />
          <CircleOfFifths compact />
        </AnimatedCard>

        <div className="space-y-4">
          <Metronome />
          <PracticeTimer />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnimatedCard delay={0.05}>
          <WidgetHeader
            title="Random chord"
            subtitle={chord.quality}
            cta={
              <AnimatedButton size="sm" variant="ghost" onClick={() => setChord(CHORDS[Math.floor(Math.random() * CHORDS.length)])}>
                <Shuffle className="h-3 w-3" /> Shuffle
              </AnimatedButton>
            }
          />
          <motion.div
            key={chord.name}
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="text-3xl font-display font-bold tracking-tight">{chord.name}</div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {chord.notes.map((n) => (
                <span key={n} className="rounded-md bg-primary/15 text-primary font-mono text-xs px-2 py-1">{n}</span>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Formula {chord.formula}</p>
          </motion.div>
        </AnimatedCard>

        <AnimatedCard delay={0.1}>
          <WidgetHeader
            title="Random scale"
            subtitle="Mood"
            cta={
              <AnimatedButton size="sm" variant="ghost" onClick={() => setScale(SCALES[Math.floor(Math.random() * SCALES.length)])}>
                <Shuffle className="h-3 w-3" /> Shuffle
              </AnimatedButton>
            }
          />
          <motion.div
            key={scale.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="text-2xl font-display font-bold tracking-tight">{scale.name}</div>
            <div className="mt-2 text-xs text-muted-foreground">{scale.mood}</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {scale.notes.map((n) => (
                <span key={n} className="rounded-md bg-accent/15 text-accent-foreground/90 font-mono text-xs px-2 py-1">{n}</span>
              ))}
            </div>
          </motion.div>
        </AnimatedCard>

        <AnimatedCard delay={0.15}>
          <WidgetHeader
            title="Random progression"
            subtitle={prog.genre}
            cta={
              <AnimatedButton size="sm" variant="ghost" onClick={() => setProg(PROGRESSIONS[Math.floor(Math.random() * PROGRESSIONS.length)])}>
                <Shuffle className="h-3 w-3" /> Shuffle
              </AnimatedButton>
            }
          />
          <motion.div
            key={prog.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="text-xl font-display font-bold tracking-tight">{prog.name}</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {prog.chords.map((c, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4, ease: EASE }}
                  className="rounded-md bg-white/5 font-mono text-xs px-2.5 py-1.5 border border-white/10"
                >
                  {c}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </AnimatedCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnimatedCard className="md:col-span-2" tilt={false}>
          <WidgetHeader title="Recently viewed chords" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CHORDS.slice(0, 6).map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.5, ease: EASE }}
                whileHover={{ y: -3, scale: 1.02 }}
                className="rounded-lg bg-white/[0.03] hover:bg-white/[0.07] transition-colors p-3 border border-white/5 cursor-pointer"
              >
                <p className="font-medium text-sm">{c.name}</p>
                <p className="text-[10px] text-muted-foreground">{c.notes.join(" · ")}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedCard>

        <AnimatedCard>
          <WidgetHeader
            title="Daily tip"
            subtitle="Theory"
            cta={<AnimatedButton size="sm" variant="ghost" onClick={() => setTipIdx((i) => (i + 1) % TIPS.length)}>Next</AnimatedButton>}
          />
          <motion.div
            animate={{ rotate: [0, 8, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            <Sparkles className="h-5 w-5 text-primary" />
          </motion.div>
          <motion.p
            key={tipIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mt-3 text-sm leading-relaxed"
          >
            {TIPS[tipIdx]}
          </motion.p>
        </AnimatedCard>
      </div>

      <AnimatedCard tilt={false}>
        <WidgetHeader title="Recent activity" />
        <ul className="divide-y divide-white/5">
          {ACTIVITY.map((a, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: EASE }}
              className="flex items-center gap-3 py-3 text-sm"
            >
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/5">
                <Star className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate">{a.label}</p>
                <p className="text-xs text-muted-foreground">{a.when}</p>
              </div>
              <span className="text-xs text-muted-foreground">{a.tag}</span>
            </motion.li>
          ))}
        </ul>
      </AnimatedCard>
    </div>
  );
}

const ACTIVITY = [
  { label: "Practiced C Major scale · 12 min", when: "Today, 09:12", tag: "Practice" },
  { label: "Saved 'Andalusian Cadence' to Library", when: "Yesterday", tag: "Library" },
  { label: "Composed a new 8-bar progression", when: "2 days ago", tag: "Composer" },
  { label: "Explored F# Minor chord family", when: "3 days ago", tag: "Theory" },
];

function StatCard({ icon: Icon, label, value, trend, tone }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; trend: string; tone: "primary" | "accent"; }) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.35, ease: EASE } }}
      className="group relative glass rounded-2xl p-5 border border-white/10 overflow-hidden hover:shadow-[0_25px_60px_-25px_var(--color-glow)] transition-shadow"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/10 to-transparent" />
      <div className="relative flex items-center justify-between">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
        <motion.div
          whileHover={{ rotate: -12, scale: 1.1 }}
          transition={{ duration: 0.35, ease: EASE }}
          className={"grid h-9 w-9 place-items-center rounded-lg " + (tone === "primary" ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent-foreground")}
        >
          <Icon className="h-4 w-4" />
        </motion.div>
      </div>
      <p className="relative mt-2 font-display text-3xl font-bold tracking-tight">{value}</p>
      <p className="relative text-xs text-muted-foreground mt-1">{trend}</p>
    </motion.div>
  );
}

export function WidgetHeader({ title, subtitle, cta }: { title: string; subtitle?: string; cta?: ReactNode }) {
  return (
    <header className="mb-4 flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h3 className="font-display font-semibold tracking-tight">{title}</h3>
        {subtitle && <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{subtitle}</p>}
      </div>
      {cta}
    </header>
  );
}

// Keep legacy export for other pages
export function Widget({ title, subtitle, cta, children, className }: { title: string; subtitle?: string; cta?: ReactNode; children: ReactNode; className?: string; }) {
  return (
    <section className={"glass rounded-2xl p-5 border border-white/10 " + (className ?? "")}>
      <WidgetHeader title={title} subtitle={subtitle} cta={cta} />
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
    if (!playing) { if (ref.current) window.clearInterval(ref.current); return; }
    ref.current = window.setInterval(() => setBeat((b) => (b + 1) % 4), (60 / bpm) * 1000);
    return () => { if (ref.current) window.clearInterval(ref.current); };
  }, [playing, bpm]);

  return (
    <AnimatedCard tilt={false}>
      <WidgetHeader title="Metronome" subtitle={`${bpm} BPM`} />
      <div className="flex items-center gap-1.5 mb-4">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            animate={{
              backgroundColor: playing && beat === i ? "var(--color-primary)" : "rgba(255,255,255,0.1)",
              boxShadow: playing && beat === i ? "0 0 16px var(--color-glow)" : "0 0 0px transparent",
              scale: playing && beat === i ? 1.05 : 1,
            }}
            transition={{ duration: 0.2, ease: EASE }}
            className="h-2 flex-1 rounded-full"
          />
        ))}
      </div>
      <div className="flex items-center gap-3">
        <motion.button
          onClick={() => setPlaying((p) => !p)}
          whileHover={{ scale: 1.08, boxShadow: "0 0 30px var(--color-glow)" }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.2, ease: EASE }}
          className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground"
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </motion.button>
        <input
          type="range" min={40} max={220} value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
          className="flex-1 accent-[var(--color-primary)]"
        />
      </div>
    </AnimatedCard>
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
    <AnimatedCard tilt={false}>
      <WidgetHeader title="Practice timer" subtitle={running ? "Running" : "Paused"} />
      <motion.div
        animate={{ scale: running ? [1, 1.02, 1] : 1 }}
        transition={{ duration: 1, repeat: running ? Infinity : 0, ease: "easeInOut" }}
        className="font-mono font-bold text-4xl tracking-tight"
      >
        {mm}:{ss}
      </motion.div>
      <div className="mt-3 flex gap-2">
        <AnimatedButton className="flex-1" size="sm" onClick={() => setRunning((r) => !r)}>
          {running ? "Pause" : "Start"}
        </AnimatedButton>
        <AnimatedButton size="sm" variant="glass" onClick={() => { setSeconds(0); setRunning(false); }}>
          Reset
        </AnimatedButton>
      </div>
    </AnimatedCard>
  );
}
