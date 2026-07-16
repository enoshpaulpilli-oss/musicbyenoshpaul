import { useMemo, useState } from "react";
import {
  NOTES,
  KEY_SIGNATURES,
  RELATIVE_MINOR,
  ROMAN,
  diatonicChords,
  type Note,
} from "@/lib/music-data";

export function CircleOfFifths({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState<Note>("C");
  const size = compact ? 320 : 460;
  const radius = size / 2 - 40;
  const inner = radius - 60;

  const positions = useMemo(
    () =>
      NOTES.map((note, i) => {
        const angle = (i / NOTES.length) * Math.PI * 2 - Math.PI / 2;
        return {
          note,
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          xi: Math.cos(angle) * inner,
          yi: Math.sin(angle) * inner,
          angle: (i / NOTES.length) * 360,
        };
      }),
    [radius, inner]
  );

  const diatonic = diatonicChords(selected);
  const selectedIndex = NOTES.indexOf(selected);

  return (
    <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center">
      <div className="relative mx-auto" style={{ width: size, height: size }}>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 via-transparent to-accent/10 blur-2xl" />
        <svg
          viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`}
          width={size}
          height={size}
          className="relative"
        >
          <defs>
            <radialGradient id="cof-glow" cx="50%" cy="50%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle r={radius + 4} fill="none" stroke="currentColor" strokeOpacity="0.08" />
          <circle r={inner - 4} fill="none" stroke="currentColor" strokeOpacity="0.08" />
          <g
            style={{
              transition: "transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1)",
              transform: `rotate(${-positions[selectedIndex].angle}deg)`,
            }}
          >
            <circle r={radius + 4} fill="url(#cof-glow)" opacity="0.5" />
            {positions.map((p, i) => {
              const active = p.note === selected;
              return (
                <g key={p.note}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={active ? 28 : 22}
                    className={
                      "cursor-pointer transition-all duration-500 " +
                      (active
                        ? "fill-[var(--color-primary)]"
                        : "fill-[color-mix(in_oklab,var(--color-surface-elevated)_90%,transparent)] hover:fill-[color-mix(in_oklab,var(--color-primary)_25%,var(--color-surface-elevated))]")
                    }
                    stroke={active ? "var(--color-primary)" : "color-mix(in oklab, currentColor 15%, transparent)"}
                    strokeWidth={active ? 2 : 1}
                    onClick={() => setSelected(p.note)}
                    style={{ filter: active ? "drop-shadow(0 0 12px var(--color-glow))" : undefined }}
                  />
                  <text
                    x={p.x}
                    y={p.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className={"pointer-events-none select-none font-display font-bold " + (active ? "fill-[var(--color-primary-foreground)]" : "fill-current")}
                    fontSize={active ? 15 : 13}
                    style={{ transform: `rotate(${positions[selectedIndex].angle}deg)`, transformOrigin: `${p.x}px ${p.y}px` }}
                  >
                    {p.note}
                  </text>
                  <text
                    x={p.xi}
                    y={p.yi}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="pointer-events-none select-none fill-current opacity-40 text-[11px]"
                    style={{ transform: `rotate(${positions[selectedIndex].angle}deg)`, transformOrigin: `${p.xi}px ${p.yi}px` }}
                  >
                    {RELATIVE_MINOR[p.note].split(" ")[0]}m
                  </text>
                </g>
              );
            })}
          </g>
          <g>
            <circle r={54} fill="color-mix(in oklab, var(--color-surface-elevated) 90%, transparent)" stroke="var(--color-primary)" strokeOpacity="0.4" />
            <text textAnchor="middle" dominantBaseline="central" y="-8" className="fill-current font-display font-bold" fontSize="26">{selected}</text>
            <text textAnchor="middle" dominantBaseline="central" y="14" className="fill-current opacity-60" fontSize="10">MAJOR</text>
          </g>
        </svg>
      </div>

      <div className="space-y-5">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Selected key</p>
          <h3 className="mt-1 text-4xl font-display font-bold text-gradient">{selected} Major</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="glass rounded-xl p-4">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Key signature</p>
            <p className="mt-1 font-medium">{KEY_SIGNATURES[selected]}</p>
          </div>
          <div className="glass rounded-xl p-4">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Relative minor</p>
            <p className="mt-1 font-medium">{RELATIVE_MINOR[selected]}</p>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Diatonic chords</p>
          <div className="grid grid-cols-7 gap-1.5">
            {diatonic.map((c, i) => (
              <div key={i} className="rounded-lg bg-white/5 hover:bg-white/10 transition p-2 text-center">
                <div className="text-[10px] text-muted-foreground">{ROMAN[i]}</div>
                <div className="text-sm font-mono font-medium">{c}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
