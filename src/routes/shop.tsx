import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useGame } from "@/hooks/useGame";
import { Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/shop")({
  component: Shop,
});

function Shop() {
  const { state, addReward, removeReward, buyReward } = useGame();
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState(100);
  const [icon, setIcon] = useState("🎁");
  const [msg, setMsg] = useState<string | null>(null);

  const buy = (id: string, t: string) => {
    const ok = buyReward(id);
    setMsg(ok ? `🎉 Você resgatou: ${t}` : "XP insuficiente!");
    setTimeout(() => setMsg(null), 2500);
  };

  return (
    <div className="space-y-5">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-extrabold">Loja de recompensas</h1>
          <p className="text-sm text-muted-foreground">Gaste seu XP em coisas que você ama.</p>
        </div>
        <div className="rounded-full bg-secondary px-4 py-2 text-sm font-bold text-[color:var(--gold)]">
          💰 {state.spendableXp} XP
        </div>
      </header>

      {msg && <div className="card-rpg animate-fade-up p-3 text-center text-sm">{msg}</div>}

      <section className="grid gap-3 sm:grid-cols-2">
        {state.rewards.map((r) => {
          const canBuy = state.spendableXp >= r.cost;
          return (
            <div key={r.id} className="card-rpg flex items-center gap-3 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary text-2xl">{r.icon || "🎁"}</div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{r.title}</p>
                <p className="text-sm text-[color:var(--gold)]">💰 {r.cost} XP</p>
              </div>
              <div className="flex flex-col gap-1">
                <button
                  disabled={!canBuy}
                  onClick={() => buy(r.id, r.title)}
                  className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Comprar
                </button>
                <button onClick={() => removeReward(r.id)} className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="mx-auto h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </section>

      <section className="card-rpg p-5">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">Criar recompensa</h2>
        <form
          onSubmit={(e) => { e.preventDefault(); if (title.trim()) { addReward({ title: title.trim(), cost, icon }); setTitle(""); } }}
          className="grid gap-2 sm:grid-cols-[80px_1fr_120px_auto]"
        >
          <input value={icon} onChange={(e) => setIcon(e.target.value)} maxLength={2} className="rounded-lg border border-border bg-input px-3 py-2 text-center text-sm outline-none focus:ring-2 focus:ring-ring" />
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: Pedir comida favorita" className="rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
          <input type="number" min={1} value={cost} onChange={(e) => setCost(parseInt(e.target.value || "0"))} className="rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
          <button className="flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
            <Plus className="h-4 w-4" /> Add
          </button>
        </form>
      </section>
    </div>
  );
}
