import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { PageHeader } from "@/components/page-header";
import { CircleOfFifths } from "@/components/circle-of-fifths";
import { CHORDS, SCALES } from "@/lib/music-data";
import { Search } from "lucide-react";

export const Route = createFileRoute("/_app/theory")({
  head: () => ({ meta: [{ title: "Theory · MusicOS" }] }),
  component: Theory,
});

const TABS = ["Circle of Fifths", "Chord Explorer", "Scale Explorer"] as const;

function Theory() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Circle of Fifths");
  return (
    <div>
      <PageHeader
        eyebrow="Foundation"
        title="Theory"
        description="Explore harmony visually. Every element is interactive and connected."
      />
      <div className="glass rounded-xl p-1 inline-flex mb-6">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={
              "px-4 py-2 rounded-lg text-sm transition-all " +
              (tab === t
                ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow"
                : "text-muted-foreground hover:text-foreground")
            }
          >
            {t}
          </button>
        ))}
      </div>
      <div className="glass-strong rounded-2xl p-6 animate-fade-up">
        {tab === "Circle of Fifths" && <CircleOfFifths />}
        {tab === "Chord Explorer" && <ChordExplorer />}
        {tab === "Scale Explorer" && <ScaleExplorer />}
      </div>
    </div>
  );
}

function ChordExplorer() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(CHORDS[0]);
  const filtered = useMemo(
    () => CHORDS.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.notes.join("").toLowerCase().includes(q.toLowerCase())),
    [q]
  );
  return (
    <div className="grid md:grid-cols-[280px_1fr] gap-6">
      <div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search chords…"
            className="w-full rounded-xl glass pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <div className="mt-3 space-y-1.5 max-h-[520px] overflow-y-auto pr-1">
          {filtered.map((c) => (
            <button
              key={c.name}
              onClick={() => setSelected(c)}
              className={
                "w-full text-left px-3 py-2.5 rounded-lg text-sm transition " +
                (selected.name === c.name ? "bg-primary/15 text-foreground" : "hover:bg-white/5 text-muted-foreground hover:text-foreground")
              }
            >
              <div className="font-medium">{c.name}</div>
              <div className="text-[10px] text-muted-foreground">{c.quality} · {c.notes.join(" ")}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-5">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Chord</p>
          <h3 className="text-4xl font-display font-bold text-gradient">{selected.name}</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Field label="Notes" value={selected.notes.join(" · ")} />
          <Field label="Formula" value={selected.formula} />
          <Field label="Intervals" value={selected.intervals} />
          <Field label="Quality" value={selected.quality} />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass rounded-xl p-4">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Piano diagram</p>
            <PianoDiagram highlight={selected.notes} />
          </div>
          <div className="glass rounded-xl p-4">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Guitar diagram</p>
            <GuitarDiagram />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass rounded-xl p-4">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Related chords</p>
            <div className="flex flex-wrap gap-1.5">
              {selected.related.map((r) => (
                <span key={r} className="rounded-md bg-primary/15 text-primary font-mono text-xs px-2 py-1">{r}</span>
              ))}
            </div>
          </div>
          <div className="glass rounded-xl p-4">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Compatible scales</p>
            <div className="flex flex-wrap gap-1.5">
              {selected.scales.map((s) => (
                <span key={s} className="rounded-md bg-accent/15 text-accent-foreground/90 font-mono text-xs px-2 py-1">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScaleExplorer() {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(SCALES[0]);
  const filtered = useMemo(() => SCALES.filter((s) => s.name.toLowerCase().includes(q.toLowerCase())), [q]);
  return (
    <div className="grid md:grid-cols-[280px_1fr] gap-6">
      <div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search scales…"
            className="w-full rounded-xl glass pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <div className="mt-3 space-y-1.5 max-h-[520px] overflow-y-auto pr-1">
          {filtered.map((s) => (
            <button
              key={s.name}
              onClick={() => setSel(s)}
              className={
                "w-full text-left px-3 py-2.5 rounded-lg text-sm transition " +
                (sel.name === s.name ? "bg-primary/15 text-foreground" : "hover:bg-white/5 text-muted-foreground hover:text-foreground")
              }
            >
              <div className="font-medium">{s.name}</div>
              <div className="text-[10px] text-muted-foreground truncate">{s.mood}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-5">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Scale</p>
          <h3 className="text-4xl font-display font-bold text-gradient">{sel.name}</h3>
          <p className="mt-1 text-muted-foreground">{sel.mood}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Field label="Formula" value={sel.formula} />
          <Field label="Intervals" value={sel.intervals} />
          <Field label="Root notes" value={sel.notes.join(" ")} />
        </div>
        <div className="glass rounded-xl p-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Piano</p>
          <PianoDiagram highlight={sel.notes} />
        </div>
        <div className="glass rounded-xl p-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Compatible chords</p>
          <div className="flex flex-wrap gap-1.5">
            {sel.chords.map((c) => (
              <span key={c} className="rounded-md bg-white/5 font-mono text-xs px-2 py-1">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-xl p-3">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 font-mono text-sm">{value}</p>
    </div>
  );
}

export function PianoDiagram({ highlight = [] as string[] }: { highlight?: string[] }) {
  const whites = ["C", "D", "E", "F", "G", "A", "B", "C", "D", "E"];
  const blacks: Array<string | null> = ["C#", "D#", null, "F#", "G#", "A#", null, "C#", "D#", null];
  const norm = (n: string) => n.replace("Db", "C#").replace("Eb", "D#").replace("Gb", "F#").replace("Ab", "G#").replace("Bb", "A#");
  const hl = new Set(highlight.map(norm));
  return (
    <div className="relative h-24 flex">
      {whites.map((k, i) => (
        <div
          key={i}
          className={
            "flex-1 rounded-b-md border border-white/10 relative " +
            (hl.has(k) ? "bg-primary/60" : "bg-white/80")
          }
        >
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-mono text-black/60">{k}</span>
        </div>
      ))}
      <div className="absolute inset-y-0 left-0 right-0 flex pointer-events-none">
        {blacks.map((b, i) => (
          <div key={i} className="flex-1 relative">
            {b && (
              <div
                className={
                  "absolute top-0 h-2/3 w-[60%] left-[70%] rounded-b-md border border-black/40 " +
                  (hl.has(b) ? "bg-primary" : "bg-neutral-900")
                }
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function GuitarDiagram() {
  return (
    <div className="grid grid-cols-6 gap-0.5 h-24">
      {Array.from({ length: 6 * 5 }).map((_, i) => {
        const dot = [7, 13, 20, 26].includes(i);
        return (
          <div key={i} className="border border-white/10 relative flex items-center justify-center">
            {dot && <div className="h-3 w-3 rounded-full bg-primary shadow-[0_0_10px_var(--color-glow)]" />}
          </div>
        );
      })}
    </div>
  );
}
