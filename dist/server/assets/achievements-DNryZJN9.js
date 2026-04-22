import { T as jsxRuntimeExports } from "./worker-entry-Dd1yEBJp.js";
import { c as createLucideIcon, u as useGame, a as Award } from "./router-CCakqlgZ.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode);
function Achievements() {
  const {
    state,
    setName,
    resetAll
  } = useGame();
  const unlocked = state.achievements.filter((a) => a.unlocked).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: "Conquistas" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        unlocked,
        " de ",
        state.achievements.length,
        " desbloqueadas"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "card-rpg p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground", children: "Perfil" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs text-muted-foreground", children: [
        "Nome do herói",
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: state.avatarName, onChange: (e) => setName(e.target.value || "Herói"), className: "mt-1 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: resetAll, className: "mt-4 text-xs text-destructive hover:underline", children: "Resetar todo o progresso" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "grid gap-3 sm:grid-cols-2", children: state.achievements.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `card-rpg flex items-center gap-3 p-4 transition ${a.unlocked ? "animate-fade-up" : "opacity-60"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${a.unlocked ? "bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]" : "bg-muted text-muted-foreground"}`, children: a.unlocked ? /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-6 w-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-semibold", children: a.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: a.description }),
        a.unlockedAt && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-[10px] text-[color:var(--gold)]", children: [
          "Desbloqueado em ",
          a.unlockedAt
        ] })
      ] })
    ] }, a.id)) })
  ] });
}
export {
  Achievements as component
};
