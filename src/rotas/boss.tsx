import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useGame } from "@/hooks/useGame";
import { Trophy } from "lucide-react";

export const Route = createFileRoute("/boss")({
  component: BossPage,
});

function BossPage() {
  const { state, setBoss } = useGame();
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState(500);
  const [reward, setReward] = useState(300);

  const boss = state.boss;
  const pct = boss ? (boss.currentXp / boss.goalXp) * 100 : 0;
  const defeated = boss && boss.currentXp >= boss.goalXp;

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-extrabold">Boss da semana</h1>
        <p className="text-sm text-muted-foreground">Uma meta semanal difícil. Concentre-se e derrote o boss!</p>
      </header>

      {boss && (
        <section className={`card-rpg overflow-hidden p-6 ${defeated ? "animate-glow" : ""}`}>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Trophy className="h-4 w-4 text-[color:var(--gold)]" /> Semana de {boss.weekStart}
          </div>
          <h2 className="text-2xl font-extrabold">{boss.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">Recompensa: <span className="font-bold text-[color:var(--gold)]">+{boss.rewardXp} XP</span></p>

          <div className="mt-5">
            <div className="mb-1.5 flex justify-between text-sm">
              <span className="font-semibold">{defeated ? "🏆 Derrotado!" : "HP do Boss"}</span>
              <span>{boss.currentXp} / {boss.goalXp} XP</span>
            </div>
            <div className="relative h-5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-[image:var(--gradient-boss)] transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </section>
      )}

      <section className="card-rpg p-5">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">Definir novo boss</h2>
        <form
          onSubmit={(e) => { e.preventDefault(); if (title.trim()) { setBoss(title.trim(), goal, reward); setTitle(""); } }}
          className="grid gap-3"
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Estudar 15h esta semana"
            className="rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs text-muted-foreground">
              Meta (XP)
              <input type="number" min={50} value={goal} onChange={(e) => setGoal(parseInt(e.target.value || "0"))}
                className="mt-1 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" />
            </label>
            <label className="text-xs text-muted-foreground">
              Recompensa (XP)
              <input type="number" min={10} value={reward} onChange={(e) => setReward(parseInt(e.target.value || "0"))}
                className="mt-1 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" />
            </label>
          </div>
          <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
            Salvar boss
          </button>
        </form>
      </section>
    </div>
  );
}
