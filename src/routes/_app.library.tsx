import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { CHORDS, SCALES, PROGRESSIONS } from "@/lib/music-data";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/_app/library")({
  head: () => ({ meta: [{ title: "Library · MusicOS" }] }),
  component: Library,
});

const CATS = ["Chords", "Scales", "Progressions", "Exercises"] as const;

function Library() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("Chords");
  const [q, setQ] = useState("");

  const items = useMemo(() => {
    const lower = q.toLowerCase();
    if (cat === "Chords") return CHORDS.filter((c) => c.name.toLowerCase().includes(lower)).map((c) => ({ title: c.name, meta: c.quality, sub: c.notes.join(" · ") }));
    if (cat === "Scales") return SCALES.filter((c) => c.name.toLowerCase().includes(lower)).map((c) => ({ title: c.name, meta: c.mood, sub: c.notes.join(" ") }));
    if (cat === "Progressions") return PROGRESSIONS.filter((c) => c.name.toLowerCase().includes(lower)).map((c) => ({ title: c.name, meta: c.genre, sub: c.chords.join(" ") }));
    return [
      { title: "Diatonic warm-up", meta: "5 min", sub: "Scales & arpeggios" },
      { title: "ii-V-I circuit", meta: "8 min", sub: "All 12 keys" },
      { title: "Rhythm dictation", meta: "10 min", sub: "Ear training" },
    ];
  }, [cat, q]);

  return (
    <div>
      <PageHeader eyebrow="Reference" title="Library" description="A searchable index of everything you can learn, save and remix." />

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="glass rounded-xl p-1 inline-flex">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={"px-4 py-2 rounded-lg text-sm transition " + (cat === c ? "bg-gradient-to-r from-primary to-accent text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>{c}</button>
          ))}
        </div>
        <div className="relative flex-1 min-w-52">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${cat.toLowerCase()}…`} className="w-full rounded-xl glass pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((it, i) => (
          <div key={i} className="glass rounded-2xl p-5 hover-lift">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{it.meta}</p>
            <h3 className="mt-1 font-display font-semibold text-lg">{it.title}</h3>
            <p className="mt-2 font-mono text-xs text-muted-foreground">{it.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
