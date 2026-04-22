import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useGame } from "@/hooks/useGame";
import { ATTRIBUTE_META, AttributeKey } from "@/lib/game";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/calendar")({
  component: CalendarPage,
});

function CalendarPage() {
  const { state, toggleTask } = useGame();
  const [cursor, setCursor] = useState(new Date());

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const first = new Date(year, month, 1);
  const startWeekday = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const [selected, setSelected] = useState<string>(new Date().toISOString().slice(0, 10));
  const dayTasks = state.tasks.filter((t) => t.date === selected);

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between">
        <button onClick={() => setCursor(new Date(year, month - 1, 1))} className="rounded-lg bg-secondary p-2 hover:bg-accent">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h1 className="text-xl font-extrabold capitalize">
          {cursor.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
        </h1>
        <button onClick={() => setCursor(new Date(year, month + 1, 1))} className="rounded-lg bg-secondary p-2 hover:bg-accent">
          <ChevronRight className="h-4 w-4" />
        </button>
      </header>

      <section className="card-rpg p-3 sm:p-4">
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
          {["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"].map((d) => <div key={d} className="py-1 font-semibold">{d}</div>)}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {cells.map((d, i) => {
            if (!d) return <div key={i} />;
            const iso = d.toISOString().slice(0, 10);
            const count = state.tasks.filter((t) => t.date === iso).length;
            const doneCount = state.tasks.filter((t) => t.date === iso && t.done).length;
            const isSelected = iso === selected;
            const isToday = iso === new Date().toISOString().slice(0, 10);
            return (
              <button
                key={iso}
                onClick={() => setSelected(iso)}
                className={`relative aspect-square rounded-lg p-1 text-xs transition ${
                  isSelected ? "bg-primary text-primary-foreground" : "bg-secondary/50 hover:bg-accent"
                } ${isToday && !isSelected ? "ring-1 ring-primary" : ""}`}
              >
                <span className="font-semibold">{d.getDate()}</span>
                {count > 0 && (
                  <span className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-0.5">
                    <span className="h-1 w-1 rounded-full bg-[color:var(--xp)]" />
                    {doneCount === count && <span className="h-1 w-1 rounded-full bg-[color:var(--vitality)]" />}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <section className="card-rpg p-5">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          {new Date(selected + "T12:00:00").toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
        </h2>
        {dayTasks.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">Nenhuma missão neste dia.</p>
        ) : (
          <ul className="space-y-2">
            {dayTasks.map((t) => {
              const meta = ATTRIBUTE_META[t.attribute as AttributeKey];
              return (
                <li key={t.id} className={`flex items-center gap-3 rounded-lg bg-secondary/50 p-3 ${t.done ? "opacity-60" : ""}`}>
                  <button onClick={() => toggleTask(t.id)} className={`h-5 w-5 rounded border-2 ${t.done ? "border-primary bg-primary" : "border-border"}`} />
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${t.done ? "line-through" : ""}`}>{t.title}</p>
                    <p className="text-xs text-muted-foreground">{meta.emoji} +{t.xp} XP</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
