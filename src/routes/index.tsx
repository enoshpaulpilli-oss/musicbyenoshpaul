"use client";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Music2, ArrowRight, Sparkles, Waves, Grid3x3, Radio, Play } from "lucide-react";
import { useEffect, useRef } from "react";
import { AnimatedButton, AnimatedCard, MotionContainer, MotionItem, EASE, FloatingPanel } from "@/components/motion";
import { InteractiveBackground } from "@/components/motion/background";
import { CustomCursor } from "@/components/motion/cursor";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MusicOS — A premium studio for music theory & practice" },
      { name: "description", content: "Learn theory, explore harmony, practice instruments, build progressions and compose — in one beautifully designed workspace." },
      { property: "og:title", content: "MusicOS — Premium music workspace" },
      { property: "og:description", content: "A calm, futuristic operating system for musicians. Theory, harmony, practice and composition, unified." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <CustomCursor />
      <InteractiveBackground notes />

      {/* Nav */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed top-3 inset-x-3 z-40 mx-auto max-w-6xl glass-strong rounded-2xl px-4 py-2.5 flex items-center justify-between border border-white/10"
      >
        <Link to="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: -10, scale: 1.06 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-[0_0_20px_var(--color-glow)]"
          >
            <Music2 className="h-4 w-4 text-primary-foreground" />
          </motion.div>
          <span className="font-display font-bold tracking-tight">MusicOS</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition story-link">Features</a>
          <a href="#theory" className="hover:text-foreground transition story-link">Theory</a>
          <a href="#composer" className="hover:text-foreground transition story-link">Composer</a>
        </nav>
        <Link to="/dashboard">
          <AnimatedButton size="sm">
            Launch app
            <ArrowRight className="h-3.5 w-3.5" />
          </AnimatedButton>
        </Link>
      </motion.header>

      <Hero />

      {/* Features */}
      <section id="features" className="relative py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <MotionContainer inView className="max-w-2xl mb-14">
            <MotionItem>
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground mb-3">Features</p>
            </MotionItem>
            <MotionItem>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
                Everything a musician needs, <span className="text-gradient">connected.</span>
              </h2>
            </MotionItem>
            <MotionItem>
              <p className="mt-3 text-muted-foreground">
                A modular workspace where theory, practice and composition speak the same language.
              </p>
            </MotionItem>
          </MotionContainer>
          <div className="grid md:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <AnimatedCard key={f.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ rotate: -8, scale: 1.1 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/25 to-accent/10 text-primary shadow-[0_0_24px_var(--color-glow)]"
                >
                  <f.icon className="h-5 w-5" />
                </motion.div>
                <h3 className="mt-4 font-display font-semibold text-lg tracking-tight">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="composer" className="relative py-24 px-6">
        <FloatingPanel className="mx-auto max-w-4xl">
          <div className="text-center py-8">
            <motion.div
              animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-[0_0_40px_var(--color-glow)]"
            >
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </motion.div>
            <h2 className="mt-6 font-display text-4xl md:text-5xl font-bold tracking-tight">Compose without friction.</h2>
            <p className="mt-3 mx-auto max-w-xl text-muted-foreground">
              Sketch progressions, analyze songs, and let the AI assistant suggest substitutions and modal borrowings — all inside one workspace.
            </p>
            <div className="mt-8 flex justify-center">
              <Link to="/dashboard">
                <AnimatedButton size="lg">
                  Enter MusicOS
                  <ArrowRight className="h-4 w-4" />
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </FloatingPanel>
      </section>

      <footer className="relative px-6 py-10 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} MusicOS · Designed for musicians.
      </footer>
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -80]);
  const y2 = useTransform(scrollY, [0, 500], [0, -30]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.2]);

  // pointer parallax on the preview card
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-200, 200], [6, -6]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-200, 200], [-6, 6]), { stiffness: 120, damping: 18 });

  useEffect(() => {
    const handle = (e: PointerEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mx.set(e.clientX - cx);
      my.set(e.clientY - cy);
    };
    window.addEventListener("pointermove", handle);
    return () => window.removeEventListener("pointermove", handle);
  }, [mx, my]);

  return (
    <section ref={ref} className="relative pt-40 pb-24 px-6">
      <motion.div style={{ y: y1, opacity }} className="relative mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground mb-6 border border-white/10"
        >
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-primary"
          />
          Version 1 · Now in open beta
        </motion.div>

        <AnimatedHeadline />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
          className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground"
        >
          Learn theory, explore harmony visually, practice, compose, and analyze songs — inside a calm, interactive workspace built with the fluidity of a native app.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7, ease: EASE }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link to="/dashboard">
            <AnimatedButton size="lg">
              <Play className="h-4 w-4" />
              Open MusicOS
              <ArrowRight className="h-4 w-4" />
            </AnimatedButton>
          </Link>
          <Link to="/theory">
            <AnimatedButton size="lg" variant="glass">
              Explore Theory
            </AnimatedButton>
          </Link>
        </motion.div>
      </motion.div>

      {/* Preview card */}
      <motion.div
        style={{ y: y2, rotateX: rx, rotateY: ry, transformPerspective: 1400 }}
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.4, duration: 1, ease: EASE }}
        className="relative mx-auto mt-16 max-w-5xl will-change-transform"
      >
        <div className="glass-strong rounded-3xl p-2 ring-glow border border-white/10">
          <div className="rounded-2xl aurora-bg p-8 grid md:grid-cols-3 gap-4 relative overflow-hidden">
            {[
              { icon: Grid3x3, label: "Circle of Fifths", note: "Interactive" },
              { icon: Waves, label: "Scale Explorer", note: "11 scales" },
              { icon: Radio, label: "Chord Lab", note: "Diagrams" },
            ].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.15, duration: 0.7, ease: EASE }}
                whileHover={{ y: -6, transition: { duration: 0.35, ease: EASE } }}
                className="glass rounded-2xl p-5 border border-white/10 hover:shadow-[0_20px_60px_-20px_var(--color-glow)] transition-shadow"
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                >
                  <c.icon className="h-5 w-5 text-primary" />
                </motion.div>
                <p className="mt-3 font-display font-semibold">{c.label}</p>
                <p className="text-xs text-muted-foreground">{c.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function AnimatedHeadline() {
  const lines = [
    { text: "The operating system", gradient: false },
    { text: "for musicians.", gradient: true },
  ];
  return (
    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.02]">
      {lines.map((line, li) => (
        <span key={li} className="block overflow-hidden">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ delay: 0.15 + li * 0.15, duration: 0.9, ease: EASE }}
            className="inline-block"
          >
            {line.gradient ? <span className="text-gradient">{line.text}</span> : line.text}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

const FEATURES = [
  { title: "Interactive theory", desc: "Circle of fifths, scales and modes rendered as living, tactile objects.", icon: Grid3x3 },
  { title: "Chord Explorer", desc: "Search any chord and see notes, formulas, diagrams and companions.", icon: Radio },
  { title: "Instrument labs", desc: "Piano and guitar surfaces designed to grow into full workstations.", icon: Music2 },
  { title: "Practice suite", desc: "Metronome, timer, ear training and goals — with streaks that stick.", icon: Waves },
  { title: "Composer", desc: "Sketch progressions, analyze songs, and hear ideas back instantly.", icon: Sparkles },
  { title: "AI Assistant", desc: "A studio partner that knows harmony, voice leading and your taste.", icon: Sparkles },
];
