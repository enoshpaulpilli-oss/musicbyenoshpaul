import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { PROGRESSIONS } from "@/lib/music-data";
import { Wand2, ScanSearch, Music4, Plus, Shuffle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_app/composer")({
  head: () => ({ meta: [{ title: "Composer · MusicOS" }] }),
  component: Composer,
});

function Composer() {
  const [chords, setChords] = useState<string[]>(["C", "G", "Am", "F"]);
  return (
    <div>
      <PageHeader eyebrow="Studio" title="Composer" description="Sketch ideas quickly. Progressions, melodies, and song analysis in one place." />

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-6">
          <Section icon={Wand2} title="Chord Progression Generator">
            <div className="flex flex-wrap items-center gap-2">
              {chords.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setChords((cs) => cs.filter((_, j) => j !== i))}
                  className="group rounded-xl glass px-4 py-3 font-mono font-medium hover-lift"
                >
                  <span>{c}</span>
                  <span className="ml-2 text-[10px] text-muted-foreground group-hover:text-destructive">×</span>
                </button>
              ))}
              <button
                onClick={() => setChords((cs) => [...cs, ["C", "G", "Am", "F", "Dm", "Em"][cs.length % 6]])}
                className="rounded-xl border border-dashed border-white/15 px-4 py-3 text-sm text-muted-foreground hover:bg-white/5 flex items-center gap-1.5"
              >
                <Plus className="h-4 w-4" /> Add chord
              </button>
              <button
                onClick={() => setChords(PROGRESSIONS[Math.floor(Math.random() * PROGRESSIONS.length)].chords)}
                className="rounded-xl bg-primary/15 text-primary px-4 py-3 text-sm flex items-center gap-1.5 hover:bg-primary/25 transition"
              >
                <Shuffle className="h-4 w-4" /> Suggest
              </button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Tip: drag support and MIDI playback arrive with the audio engine in v1.1.</p>
          </Section>

          <Section icon={ScanSearch} title="Song Analyzer">
            <textarea
              placeholder="Paste chords or a snippet of a song (e.g. 'Am F C G')"
              className="w-full min-h-32 rounded-xl glass p-4 text-sm outline-none focus:ring-2 focus:ring-primary/40 font-mono"
            />
            <div className="mt-3 flex justify-end">
              <button className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm">Analyze</button>
            </div>
          </Section>

          <Section icon={Music4} title="Melody Tools">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {["Motif generator", "Contour sketcher", "Interval trainer", "Rhythm dice"].map((t) => (
                <div key={t} className="rounded-xl glass p-4 text-sm hover-lift cursor-pointer">
                  <p className="font-medium">{t}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Coming soon</p>
                </div>
              ))}
            </div>
          </Section>
        </div>

        <aside className="space-y-4">
          <div className="glass rounded-2xl p-5">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Suggested progressions</p>
            <div className="mt-3 space-y-2">
              {PROGRESSIONS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => setChords(p.chords)}
                  className="w-full text-left rounded-xl bg-white/[0.03] hover:bg-white/[0.06] p-3 transition"
                >
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="text-[10px] text-muted-foreground">{p.genre} · {p.chords.join(" ")}</p>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Section({ icon: Icon, title, children }: { icon: React.ComponentType<{className?:string}>; title: string; children: React.ReactNode }) {
  return (
    <section className="glass-strong rounded-2xl p-6">
      <header className="mb-4 flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <h3 className="font-display font-semibold">{title}</h3>
      </header>
      {children}
    </section>
  );
}
