import { createFileRoute } from "@tanstack/react-router";
import { useGame } from "@/hooks/useGame";
import { Award, Lock } from "lucide-react";

export const Route = createFileRoute("/achievements")({
  component: Achievements,
});

function Achievements() {
  const { state, setName, resetAll } = useGame();
  const unlocked = state.achievements.filter((a) => a.unlocked).length;

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-extrabold">Conquistas</h1>
        <p className="text-sm text-muted-foreground">{unlocked} de {state.achievements.length} desbloqueadas</p>
      </header>

      <section className="card-rpg p-5">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">Perfil</h2>
        <label className="text-xs text-muted-foreground">Nome do herói
          <input
            value={state.avatarName}
            onChange={(e) => setName(e.target.value || "Herói")}
            className="mt-1 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
        <button onClick={resetAll} className="mt-4 text-xs text-destructive hover:underline">
          Resetar todo o progresso
        </button>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        {state.achievements.map((a) => (
          <div
            key={a.id}
            className={`card-rpg flex items-center gap-3 p-4 transition ${a.unlocked ? "animate-fade-up" : "opacity-60"}`}
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                a.unlocked ? "bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]" : "bg-muted text-muted-foreground"
              }`}
            >
              {a.unlocked ? <Award className="h-6 w-6" /> : <Lock className="h-5 w-5" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{a.title}</p>
              <p className="text-xs text-muted-foreground">{a.description}</p>
              {a.unlockedAt && <p className="mt-0.5 text-[10px] text-[color:var(--gold)]">Desbloqueado em {a.unlockedAt}</p>}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
