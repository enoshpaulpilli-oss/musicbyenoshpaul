import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Sparkles, Send, Music2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_app/assistant")({
  head: () => ({ meta: [{ title: "AI Assistant · MusicOS" }] }),
  component: Assistant,
});

type Msg = { role: "user" | "assistant"; text: string };

const SUGGESTIONS = [
  "Suggest a chord substitution for G7 in a jazz ballad.",
  "What scale fits over an F#m7 to Bmaj7 change?",
  "Give me a 4-chord loop with a cinematic mood.",
  "Explain modal interchange with an example.",
];

function Assistant() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", text: "Hi — I'm your studio partner. Ask me about theory, harmony, songwriting or practice." },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [
      ...m,
      { role: "user", text },
      { role: "assistant", text: "The audio engine and language model wire up in v1.1 — for now, this is the interface you'll be talking to." },
    ]);
    setInput("");
  };

  return (
    <div>
      <PageHeader eyebrow="Studio partner" title="AI Assistant" description="A calm, knowledgeable companion for music theory, songwriting and practice." />

      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        <div className="glass-strong rounded-2xl flex flex-col min-h-[520px] max-h-[70vh]">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {msgs.map((m, i) => (
              <div key={i} className={"flex gap-3 " + (m.role === "user" ? "justify-end" : "")}>
                {m.role === "assistant" && (
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent">
                    <Music2 className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
                <div className={"max-w-[80%] rounded-2xl px-4 py-2.5 text-sm " + (m.role === "user" ? "bg-primary text-primary-foreground" : "glass")}>{m.text}</div>
              </div>
            ))}
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="border-t border-white/5 p-3 flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a chord, a scale, a song…"
              className="flex-1 rounded-xl bg-white/5 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button type="submit" className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition ring-glow">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

        <aside className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-primary" />
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Try asking</p>
          </div>
          <div className="space-y-2">
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => send(s)} className="w-full text-left text-sm rounded-xl bg-white/[0.03] hover:bg-white/[0.06] p-3 transition">
                {s}
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
