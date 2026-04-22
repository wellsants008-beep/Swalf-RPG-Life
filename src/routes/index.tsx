import { createFileRoute, Link } from "@tanstack/react-router";
import { useGame } from "@/hooks/useGame";
import { AttributeBar } from "@/components/AttributeBar";
import { Flame, Swords, Trophy, Sparkles, Shield } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  const { state, level } = useGame();
  const today = new Date().toISOString().slice(0, 10);
  const todayTasks = state.tasks.filter((t) => t.date === today);
  const doneToday = todayTasks.filter((t) => t.done).length;
  const dailyProgress = todayTasks.length > 0 ? (doneToday / todayTasks.length) * 100 : 0;

  return (
    <div className="space-y-5">
      {/* Hero */}
      <section className="card-rpg-glow relative overflow-hidden p-6 sm:p-8">
        {/* Decorative runes */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[image:var(--gradient-primary)] opacity-25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-12 h-48 w-48 rounded-full bg-[image:var(--gradient-gold)] opacity-15 blur-3xl" />
        <svg className="pointer-events-none absolute right-4 top-4 h-24 w-24 animate-rune-spin opacity-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          <circle cx="50" cy="50" r="45" />
          <circle cx="50" cy="50" r="35" strokeDasharray="2 4" />
          <path d="M50 5 L50 95 M5 50 L95 50 M20 20 L80 80 M80 20 L20 80" />
          <circle cx="50" cy="50" r="20" />
        </svg>

        <div className="relative">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">⚜ Sua Jornada ⚜</p>
          <h1 className="mt-2 font-extrabold leading-none">
            <span className="block text-sm uppercase tracking-widest text-muted-foreground">Nível</span>
            <span className="block text-6xl text-gradient sm:text-7xl">{level.level}</span>
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Stat icon={<Flame className="h-4 w-4 text-[color:var(--strength)]" />} value={state.streak} label="dias seguidos" />
            <Stat icon={<Sparkles className="h-4 w-4 text-[color:var(--xp)]" />} value={state.totalXp} label="XP total" />
            <Stat icon={<Shield className="h-4 w-4 text-[color:var(--gold)]" />} value={state.spendableXp} label="XP disponível" gold />
          </div>

          {/* Mini xp bar */}
          <div className="mt-5">
            <div className="mb-1 flex justify-between text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              <span>Progresso para Nível {level.level + 1}</span>
              <span>{level.currentXp} / {level.neededXp}</span>
            </div>
            <div className="relative h-3 overflow-hidden rounded-full border border-border bg-black/40">
              <div
                className="h-full rounded-full bg-[image:var(--gradient-xp)] transition-all duration-700"
                style={{ width: `${(level.currentXp / level.neededXp) * 100}%` }}
              />
              <div className="shimmer-bar absolute inset-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Atributos */}
      <section className="card-rpg p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Atributos</h2>
          <Link to="/profile" className="text-xs font-semibold text-primary hover:underline">Ver perfil →</Link>
        </div>
        <div className="space-y-4">
          <AttributeBar attr="strength" value={state.attributes.strength} />
          <AttributeBar attr="intelligence" value={state.attributes.intelligence} />
          <AttributeBar attr="vitality" value={state.attributes.vitality} />
        </div>
      </section>

      {/* Daily progress + Boss */}
      <div className="grid gap-4 md:grid-cols-2">
        <Link to="/missions" className="card-rpg group block overflow-hidden p-5 transition hover:scale-[1.01] hover:shadow-[var(--shadow-glow)]">
          <div className="mb-3 flex items-center gap-2">
            <Swords className="h-5 w-5 text-primary" />
            <h3 className="font-bold uppercase tracking-wider text-sm">Missões de hoje</h3>
          </div>
          <p className="text-4xl font-extrabold">{doneToday}<span className="text-base font-normal text-muted-foreground">/{todayTasks.length}</span></p>
          <div className="relative mt-3 h-2.5 overflow-hidden rounded-full bg-black/40">
            <div className="h-full bg-[image:var(--gradient-primary)] transition-all" style={{ width: `${dailyProgress}%` }} />
          </div>
        </Link>

        <Link to="/boss" className="card-rpg group block overflow-hidden p-5 transition hover:scale-[1.01] hover:shadow-[var(--shadow-gold)]">
          <div className="mb-3 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-[color:var(--gold)]" />
            <h3 className="font-bold uppercase tracking-wider text-sm">Boss da semana</h3>
          </div>
          {state.boss ? (
            <>
              <p className="line-clamp-1 text-sm text-muted-foreground">{state.boss.title}</p>
              <p className="mt-1 text-3xl font-extrabold">{state.boss.currentXp}<span className="text-sm font-normal text-muted-foreground">/{state.boss.goalXp}</span></p>
              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-black/40">
                <div className="h-full bg-[image:var(--gradient-boss)] transition-all" style={{ width: `${(state.boss.currentXp / state.boss.goalXp) * 100}%` }} />
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Defina um boss semanal</p>
          )}
        </Link>
      </div>

      {/* Quick actions */}
      <section className="card-rpg p-5">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-muted-foreground">Atalhos</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Link to="/missions" className="rounded-xl border border-border bg-secondary/60 p-3 text-center text-sm font-medium transition hover:border-primary hover:bg-accent">⚔️ Missões</Link>
          <Link to="/shop" className="rounded-xl border border-border bg-secondary/60 p-3 text-center text-sm font-medium transition hover:border-primary hover:bg-accent">🛒 Loja</Link>
          <Link to="/calendar" className="rounded-xl border border-border bg-secondary/60 p-3 text-center text-sm font-medium transition hover:border-primary hover:bg-accent">📅 Agenda</Link>
          <Link to="/achievements" className="rounded-xl border border-border bg-secondary/60 p-3 text-center text-sm font-medium transition hover:border-primary hover:bg-accent">🏆 Conquistas</Link>
        </div>
      </section>
    </div>
  );
}

function Stat({ icon, value, label, gold }: { icon: React.ReactNode; value: number; label: string; gold?: boolean }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-border bg-black/30 px-3 py-1.5 text-sm backdrop-blur-sm">
      {icon}
      <span className={`font-bold ${gold ? "text-[color:var(--gold)]" : ""}`}>{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
