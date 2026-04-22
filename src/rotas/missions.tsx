import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useGame } from "@/hooks/useGame";
import { ATTRIBUTE_META, AttributeKey, todayStr } from "@/lib/game";
import { Check, Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/missions")({
  component: Missions,
});

function Missions() {
  const { state, addTask, toggleTask, removeTask } = useGame();
  const [title, setTitle] = useState("");
  const [xp, setXp] = useState(20);
  const [attribute, setAttribute] = useState<AttributeKey>("intelligence");

  const today = todayStr();
  const dailies = state.tasks.filter((t) => t.daily && t.date === today);
  const customs = state.tasks.filter((t) => !t.daily && t.date === today);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({ title: title.trim(), xp, attribute });
    setTitle("");
  };

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-extrabold">Missões</h1>
        <p className="text-sm text-muted-foreground">Complete tarefas e ganhe XP.</p>
      </header>

      <section className="card-rpg p-5">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">Missões diárias</h2>
        <ul className="space-y-2">
          {dailies.map((t) => (
            <TaskRow key={t.id} task={t} onToggle={() => toggleTask(t.id)} />
          ))}
        </ul>
      </section>

      <section className="card-rpg p-5">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">Suas missões</h2>
        <form onSubmit={submit} className="mb-4 grid gap-2 sm:grid-cols-[1fr_100px_140px_auto]">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nova missão..."
            className="rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            type="number"
            min={1}
            value={xp}
            onChange={(e) => setXp(parseInt(e.target.value || "0"))}
            className="rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <select
            value={attribute}
            onChange={(e) => setAttribute(e.target.value as AttributeKey)}
            className="rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            {(Object.keys(ATTRIBUTE_META) as AttributeKey[]).map((k) => (
              <option key={k} value={k}>{ATTRIBUTE_META[k].emoji} {ATTRIBUTE_META[k].label}</option>
            ))}
          </select>
          <button className="flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
            <Plus className="h-4 w-4" /> Add
          </button>
        </form>

        {customs.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">Nenhuma missão personalizada hoje.</p>
        ) : (
          <ul className="space-y-2">
            {customs.map((t) => (
              <TaskRow key={t.id} task={t} onToggle={() => toggleTask(t.id)} onRemove={() => removeTask(t.id)} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function TaskRow({ task, onToggle, onRemove }: { task: any; onToggle: () => void; onRemove?: () => void }) {
  const meta = ATTRIBUTE_META[task.attribute as AttributeKey];
  return (
    <li className={`flex items-center gap-3 rounded-lg border border-border bg-secondary/50 p-3 transition ${task.done ? "opacity-60" : ""}`}>
      <button
        onClick={onToggle}
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2 transition ${
          task.done ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"
        }`}
      >
        {task.done && <Check className="h-4 w-4" />}
      </button>
      <div className="min-w-0 flex-1">
        <p className={`text-sm font-medium ${task.done ? "line-through" : ""}`}>{task.title}</p>
        <p className="text-xs text-muted-foreground">{meta.emoji} {meta.label} · +{task.xp} XP</p>
      </div>
      {onRemove && (
        <button onClick={onRemove} className="text-muted-foreground hover:text-destructive">
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </li>
  );
}
