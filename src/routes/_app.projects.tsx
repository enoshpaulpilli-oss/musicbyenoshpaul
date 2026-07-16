import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { FolderKanban, Plus } from "lucide-react";

export const Route = createFileRoute("/_app/projects")({
  head: () => ({ meta: [{ title: "Projects · MusicOS" }] }),
  component: Projects,
});

const PROJECTS = [
  { name: "Neon Ballad", key: "F# Minor", updated: "2h ago", tags: ["Draft", "Composer"] },
  { name: "Sunday Etude", key: "C Major", updated: "Yesterday", tags: ["Practice"] },
  { name: "Modal Study #3", key: "D Dorian", updated: "3 days ago", tags: ["Theory"] },
  { name: "Blue Room", key: "Bb Blues", updated: "Last week", tags: ["Composer", "Draft"] },
];

function Projects() {
  return (
    <div>
      <PageHeader
        eyebrow="Workspace"
        title="Projects"
        description="Save, revisit and evolve your musical ideas."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-xl bg-primary text-primary-foreground px-3 py-2 text-sm">
            <Plus className="h-4 w-4" /> New project
          </button>
        }
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROJECTS.map((p) => (
          <div key={p.name} className="glass rounded-2xl p-5 hover-lift group cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 text-primary">
                <FolderKanban className="h-5 w-5" />
              </div>
              <div className="flex flex-wrap gap-1 justify-end">
                {p.tags.map((t) => (
                  <span key={t} className="text-[10px] rounded-md bg-white/5 px-1.5 py-0.5 text-muted-foreground">{t}</span>
                ))}
              </div>
            </div>
            <h3 className="mt-4 font-display font-semibold text-lg">{p.name}</h3>
            <p className="text-xs text-muted-foreground">{p.key} · Updated {p.updated}</p>
          </div>
        ))}
        <button className="rounded-2xl border border-dashed border-white/15 p-5 text-sm text-muted-foreground hover:bg-white/[0.03] transition flex flex-col items-center justify-center gap-2 min-h-[140px]">
          <Plus className="h-5 w-5" />
          New project
        </button>
      </div>
    </div>
  );
}
