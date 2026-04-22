import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { useGame } from "@/hooks/useGame";
import { AttributeBar } from "@/components/AttributeBar";
import { ATTRIBUTE_META, AttributeKey, xpForLevel } from "@/lib/game";
import { Crown, Flame, Sparkles, Shield, Swords, Award } from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  const { state, level, setName } = useGame();

  const stats = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const totalDone = state.tasks.filter((t) => t.done).length;
    const totalCreated = state.tasks.length;
    const xpToday = state.history.find((h) => h.date === today)?.xp ?? 0;
    const last7 = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const iso = d.toISOString().slice(0, 10);
      return { iso, day: d.toLocaleDateString("pt-BR", { weekday: "short" }).slice(0, 3), xp: state.history.find((h) => h.date === iso)?.xp ?? 0 };
    });
    const maxXp = Math.max(1, ...last7.map((d) => d.xp));
    const unlocked = state.achievements.filter((a) => a.unlocked).length;
    return { totalDone, totalCreated, xpToday, last7, maxXp, unlocked };
  }, [state]);

  const dominant = useMemo(() => {
    const entries = Object.entries(state.attributes) as [AttributeKey, number][];
    entries.sort((a, b) => b[1] - a[1]);
    return entries[0];
  }, [state.attributes]);

  const heroClass = useMemo(() => {
    if (dominant[1] === 0) return "Aprendiz";
    return { strength: "Guerreiro", intelligence: "Mago Erudito", vitality: "Druida" }[dominant[0]];
  }, [dominant]);

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-extrabold">Perfil do Personagem</h1>
        <p className="text-sm text-muted-foreground">Sua ficha completa de aventureiro.</p>
      </header>

      {/* Character card */}
      <section className="card-rpg-glow relative overflow-hidden p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[image:var(--gradient-primary)] opacity-25 blur-3xl" />
        <svg className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 animate-rune-spin opacity-15" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          <circle cx="50" cy="50" r="45" />
          <circle cx="50" cy="50" r="30" strokeDasharray="3 5" />
          <path d="M50 5 L50 95 M5 50 L95 50" />
          <polygon points="50,15 60,40 85,40 65,55 75,80 50,65 25,80 35,55 15,40 40,40" />
        </svg>

        <div className="relative flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="absolute inset-0 animate-glow rounded-full" />
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-[oklch(0.72_0.18_290)] bg-[image:var(--gradient-primary)] text-5xl font-extrabold text-primary-foreground shadow-[var(--shadow-glow-strong)]">
              {state.avatarName.charAt(0).toUpperCase()}
              <Crown className="absolute -top-3 left-1/2 h-7 w-7 -translate-x-1/2 text-[color:var(--gold)] drop-shadow-[0_0_8px_oklch(0.82_0.16_85_/_0.8)] animate-float-slow" />
            </div>
          </div>

          {/* Identity */}
          <div className="flex-1 text-center sm:text-left">
            <input
              value={state.avatarName}
              onChange={(e) => setName(e.target.value || "Herói")}
              className="w-full bg-transparent text-center text-2xl font-extrabold outline-none focus:text-gradient sm:text-left sm:text-3xl"
            />
            <p className="mt-1 text-sm uppercase tracking-widest text-[color:var(--gold)]">⚜ {heroClass} ⚜</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <Badge>Nível {level.level}</Badge>
              <Badge gold>🔥 {state.streak} dias</Badge>
              <Badge>{stats.unlocked}/{state.achievements.length} 🏆</Badge>
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="relative mt-6">
          <div className="mb-1 flex justify-between text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            <span>Experiência</span>
            <span>{level.currentXp} / {level.neededXp}</span>
          </div>
          <div className="relative h-3.5 overflow-hidden rounded-full border border-border bg-black/40">
            <div
              className="h-full rounded-full bg-[image:var(--gradient-xp)] transition-all duration-700"
              style={{ width: `${(level.currentXp / level.neededXp) * 100}%` }}
            />
            <div className="shimmer-bar absolute inset-0" />
          </div>
          <p className="mt-1 text-right text-[10px] text-muted-foreground">
            Próximo nível em <span className="font-bold text-[color:var(--xp)]">{level.neededXp - level.currentXp} XP</span>
          </p>
        </div>
      </section>

      {/* Stats grid */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard icon={<Sparkles className="h-5 w-5 text-[color:var(--xp)]" />} value={state.totalXp} label="XP Total" />
        <StatCard icon={<Shield className="h-5 w-5 text-[color:var(--gold)]" />} value={state.spendableXp} label="XP Disponível" />
        <StatCard icon={<Swords className="h-5 w-5 text-primary" />} value={stats.totalDone} label="Missões feitas" />
        <StatCard icon={<Flame className="h-5 w-5 text-[color:var(--strength)]" />} value={stats.xpToday} label="XP de hoje" />
      </section>

      {/* Atributos */}
      <section className="card-rpg p-5 sm:p-6">
        <h2 className="mb-4 text-lg font-bold">Atributos</h2>
        <div className="space-y-4">
          <AttributeBar attr="strength" value={state.attributes.strength} />
          <AttributeBar attr="intelligence" value={state.attributes.intelligence} />
          <AttributeBar attr="vitality" value={state.attributes.vitality} />
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Atributo dominante: <span className="font-bold text-foreground">{ATTRIBUTE_META[dominant[0]].emoji} {ATTRIBUTE_META[dominant[0]].label}</span>
        </p>
      </section>

      {/* XP Last 7 days chart */}
      <section className="card-rpg p-5">
        <h2 className="mb-4 text-lg font-bold">Últimos 7 dias</h2>
        <div className="flex items-end justify-between gap-2 h-32">
          {stats.last7.map((d) => (
            <div key={d.iso} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="relative w-full flex-1 flex items-end">
                <div
                  className="w-full rounded-t-md bg-[image:var(--gradient-primary)] transition-all duration-500"
                  style={{ height: `${(d.xp / stats.maxXp) * 100}%`, minHeight: d.xp > 0 ? "4px" : "0" }}
                  title={`${d.xp} XP`}
                />
              </div>
              <span className="text-[10px] capitalize text-muted-foreground">{d.day}</span>
              <span className="text-[10px] font-semibold">{d.xp}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Latest achievements */}
      <section className="card-rpg p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">Conquistas recentes</h2>
          <Link to="/achievements" className="text-xs font-semibold text-primary hover:underline">Ver todas →</Link>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {state.achievements.filter((a) => a.unlocked).slice(0, 4).map((a) => (
            <div key={a.id} className="flex flex-col items-center gap-1 rounded-lg border border-border bg-secondary/40 p-3 text-center">
              <Award className="h-6 w-6 text-[color:var(--gold)]" />
              <p className="text-xs font-semibold">{a.title}</p>
            </div>
          ))}
          {state.achievements.filter((a) => a.unlocked).length === 0 && (
            <p className="col-span-full py-4 text-center text-sm text-muted-foreground">Nenhuma conquista ainda. Complete missões!</p>
          )}
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <div className="card-rpg p-4">
      <div className="mb-1 flex items-center gap-1.5">{icon}</div>
      <p className="text-2xl font-extrabold">{value}</p>
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
}

function Badge({ children, gold }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${gold ? "border-[color:var(--gold)] text-[color:var(--gold)]" : "border-border bg-black/30"}`}>
      {children}
    </span>
  );
}

// touch xpForLevel to avoid unused import warning
void xpForLevel;
