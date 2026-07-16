import { createFileRoute, Link } from "@tanstack/react-router";
import { Music2, ArrowRight, Sparkles, Waves, Grid3x3, Radio, Play } from "lucide-react";

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
    <div className="aurora-bg min-h-screen">
      {/* Nav */}
      <header className="fixed top-3 inset-x-3 z-40 mx-auto max-w-6xl glass-strong rounded-2xl px-4 py-2.5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <Music2 className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold tracking-tight">MusicOS</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#theory" className="hover:text-foreground transition">Theory</a>
          <a href="#composer" className="hover:text-foreground transition">Composer</a>
        </nav>
        <Link
          to="/dashboard"
          className="group inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
        >
          Launch app
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </header>

      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6">
        <FloatingParticles />
        <div className="relative mx-auto max-w-5xl text-center animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
            Version 1 · Now in open beta
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            The operating system
            <br />
            for <span className="text-gradient">musicians.</span>
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground">
            Learn theory, explore harmony visually, practice, compose, and analyze songs — inside a calm, interactive workspace built with the fluidity of a native app.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/dashboard"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-lg hover:shadow-[0_20px_50px_-10px_var(--color-glow)] transition-all"
            >
              <Play className="h-4 w-4" />
              Open MusicOS
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/theory"
              className="inline-flex items-center gap-2 rounded-xl glass px-5 py-3 text-sm font-medium hover:bg-white/5 transition"
            >
              Explore Theory
            </Link>
          </div>
        </div>

        {/* Preview card */}
        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="glass-strong rounded-3xl p-2 ring-glow">
            <div className="rounded-2xl aurora-bg p-8 grid md:grid-cols-3 gap-4">
              {[
                { icon: Grid3x3, label: "Circle of Fifths", note: "Interactive" },
                { icon: Waves, label: "Scale Explorer", note: "11 scales" },
                { icon: Radio, label: "Chord Lab", note: "Diagrams" },
              ].map((c, i) => (
                <div key={i} className="glass rounded-2xl p-5 hover-lift">
                  <c.icon className="h-5 w-5 text-primary" />
                  <p className="mt-3 font-display font-semibold">{c.label}</p>
                  <p className="text-xs text-muted-foreground">{c.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl mb-14">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground mb-3">Features</p>
            <h2 className="font-display text-4xl font-bold tracking-tight">Everything a musician needs, connected.</h2>
            <p className="mt-3 text-muted-foreground">
              A modular workspace where theory, practice and composition speak the same language.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="group glass rounded-2xl p-6 hover-lift animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display font-semibold text-lg">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="composer" className="relative py-24 px-6">
        <div className="mx-auto max-w-4xl text-center glass-strong rounded-3xl p-12 ring-glow animate-fade-up">
          <Sparkles className="mx-auto h-8 w-8 text-primary animate-pulse-glow" />
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight">Compose without friction.</h2>
          <p className="mt-3 mx-auto max-w-xl text-muted-foreground">
            Sketch progressions, analyze songs, and let the AI assistant suggest substitutions and modal borrowings — all inside one workspace.
          </p>
          <Link
            to="/dashboard"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
          >
            Enter MusicOS
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="px-6 py-10 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} MusicOS · Designed for musicians.
      </footer>
    </div>
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

function FloatingParticles() {
  const dots = Array.from({ length: 18 });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => {
        const size = 6 + ((i * 7) % 14);
        return (
          <span
            key={i}
            className="absolute rounded-full bg-primary/30 blur-[2px] animate-float-slow"
            style={{
              width: size,
              height: size,
              top: `${(i * 53) % 100}%`,
              left: `${(i * 37) % 100}%`,
              animationDelay: `${(i * 0.4) % 4}s`,
              animationDuration: `${8 + (i % 5)}s`,
              opacity: 0.4 + ((i % 5) / 10),
            }}
          />
        );
      })}
    </div>
  );
}
