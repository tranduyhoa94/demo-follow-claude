"use client";

import type { CSSProperties } from "react";
import type { Player } from "@/lib/game";

type WinPopupProps = {
  winner: Player;
  onReplay: () => void;
};

const PARTICLE_COUNT = 10;
const PARTICLE_COLORS = [
  "var(--accent-x)",
  "var(--accent-o)",
  "#facc15",
  "#22c55e",
  "#ec4899",
];

const FIREWORK_BURSTS: { top: string; left: string; delay: string }[] = [
  { top: "18%", left: "20%", delay: "0s" },
  { top: "12%", left: "72%", delay: "0.35s" },
  { top: "38%", left: "46%", delay: "0.7s" },
  { top: "22%", left: "88%", delay: "1.05s" },
  { top: "30%", left: "8%", delay: "1.4s" },
];

type ParticleStyle = CSSProperties & { "--angle"?: string };

function Firework({
  top,
  left,
  delay,
}: {
  top: string;
  left: string;
  delay: string;
}) {
  return (
    <div className="absolute" style={{ top, left }}>
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
        const angle = (360 / PARTICLE_COUNT) * i;
        const style: ParticleStyle = {
          "--angle": `${angle}deg`,
          backgroundColor: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
          animationDelay: delay,
        };

        return <span key={i} className="firework-particle" style={style} />;
      })}
    </div>
  );
}

export default function WinPopup({ winner, onReplay }: WinPopupProps) {
  const accentClass = winner === "X" ? "text-accent-x" : "text-accent-o";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${winner} đã thắng`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {FIREWORK_BURSTS.map((burst, i) => (
          <Firework key={i} {...burst} />
        ))}
      </div>

      <div className="relative flex flex-col items-center gap-6 rounded-2xl border border-white/40 bg-white/90 p-8 text-center shadow-2xl shadow-indigo-950/20 backdrop-blur-sm animate-win-popup-in dark:border-white/10 dark:bg-zinc-900/90">
        <p className={`text-3xl font-bold tracking-wide ${accentClass}`}>
          {winner} đã thắng!
        </p>
        <button
          type="button"
          onClick={onReplay}
          className="rounded-md bg-gradient-to-r from-accent-x to-accent-o px-6 py-2 font-medium text-white shadow-sm transition-all duration-200 hover:scale-105 hover:brightness-110"
        >
          Chơi lại
        </button>
      </div>
    </div>
  );
}
