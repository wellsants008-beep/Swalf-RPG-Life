import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-Dd1yEBJp.js";
import { u as useGame, T as Trophy } from "./router-CCakqlgZ.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function BossPage() {
  const {
    state,
    setBoss
  } = useGame();
  const [title, setTitle] = reactExports.useState("");
  const [goal, setGoal] = reactExports.useState(500);
  const [reward, setReward] = reactExports.useState(300);
  const boss = state.boss;
  const pct = boss ? boss.currentXp / boss.goalXp * 100 : 0;
  const defeated = boss && boss.currentXp >= boss.goalXp;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: "Boss da semana" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Uma meta semanal difícil. Concentre-se e derrote o boss!" })
    ] }),
    boss && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: `card-rpg overflow-hidden p-6 ${defeated ? "animate-glow" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center gap-2 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4 text-[color:var(--gold)]" }),
        " Semana de ",
        boss.weekStart
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-extrabold", children: boss.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
        "Recompensa: ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-[color:var(--gold)]", children: [
          "+",
          boss.rewardXp,
          " XP"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1.5 flex justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: defeated ? "🏆 Derrotado!" : "HP do Boss" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            boss.currentXp,
            " / ",
            boss.goalXp,
            " XP"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-5 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-[image:var(--gradient-boss)] transition-all duration-700", style: {
          width: `${pct}%`
        } }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "card-rpg p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground", children: "Definir novo boss" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        if (title.trim()) {
          setBoss(title.trim(), goal, reward);
          setTitle("");
        }
      }, className: "grid gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Ex: Estudar 15h esta semana", className: "rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs text-muted-foreground", children: [
            "Meta (XP)",
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 50, value: goal, onChange: (e) => setGoal(parseInt(e.target.value || "0")), className: "mt-1 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs text-muted-foreground", children: [
            "Recompensa (XP)",
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 10, value: reward, onChange: (e) => setReward(parseInt(e.target.value || "0")), className: "mt-1 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90", children: "Salvar boss" })
      ] })
    ] })
  ] });
}
export {
  BossPage as component
};
