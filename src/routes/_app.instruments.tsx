import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { PianoDiagram, GuitarDiagram } from "./_app.theory";
import { Guitar, Piano, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_app/instruments")({
  head: () => ({ meta: [{ title: "Instruments · MusicOS" }] }),
  component: Instruments,
});

function Instruments() {
  return (
    <div>
      <PageHeader
        eyebrow="Labs"
        title="Instruments"
        description="Placeholder surfaces for future full workstations. Explore the foundations now."
      />
      <div className="grid md:grid-cols-2 gap-6">
        <Lab icon={Piano} title="Piano Lab" note="Fully interactive piano coming in v2">
          <PianoDiagram highlight={["C", "E", "G"]} />
          <p className="mt-4 text-xs text-muted-foreground">Displaying C Major triad · click to explore in Theory.</p>
        </Lab>
        <Lab icon={Guitar} title="Guitar Lab" note="Fretboard visualizer coming soon">
          <GuitarDiagram />
          <p className="mt-4 text-xs text-muted-foreground">Standard tuning · shape preview.</p>
        </Lab>
      </div>
    </div>
  );
}

function Lab({ icon: Icon, title, note, children }: { icon: React.ComponentType<{className?:string}>; title: string; note: string; children: React.ReactNode }) {
  return (
    <div className="glass-strong rounded-2xl p-6 hover-lift">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg">{title}</h3>
            <p className="text-xs text-muted-foreground">{note}</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-[10px] rounded-full glass px-2 py-1 text-muted-foreground">
          <Sparkles className="h-3 w-3 text-primary" /> Soon
        </span>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}
