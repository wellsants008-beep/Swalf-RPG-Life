import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-Dd1yEBJp.js";
import { u as useGame } from "./router-CCakqlgZ.js";
import { T as Trash2, P as Plus } from "./trash-2-CLq0uyG7.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function Shop() {
  const {
    state,
    addReward,
    removeReward,
    buyReward
  } = useGame();
  const [title, setTitle] = reactExports.useState("");
  const [cost, setCost] = reactExports.useState(100);
  const [icon, setIcon] = reactExports.useState("🎁");
  const [msg, setMsg] = reactExports.useState(null);
  const buy = (id, t) => {
    const ok = buyReward(id);
    setMsg(ok ? `🎉 Você resgatou: ${t}` : "XP insuficiente!");
    setTimeout(() => setMsg(null), 2500);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-end justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: "Loja de recompensas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Gaste seu XP em coisas que você ama." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-full bg-secondary px-4 py-2 text-sm font-bold text-[color:var(--gold)]", children: [
        "💰 ",
        state.spendableXp,
        " XP"
      ] })
    ] }),
    msg && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-rpg animate-fade-up p-3 text-center text-sm", children: msg }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "grid gap-3 sm:grid-cols-2", children: state.rewards.map((r) => {
      const canBuy = state.spendableXp >= r.cost;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-rpg flex items-center gap-3 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary text-2xl", children: r.icon || "🎁" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-semibold", children: r.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[color:var(--gold)]", children: [
            "💰 ",
            r.cost,
            " XP"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: !canBuy, onClick: () => buy(r.id, r.title), className: "rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40", children: "Comprar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeReward(r.id), className: "text-muted-foreground hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "mx-auto h-3.5 w-3.5" }) })
        ] })
      ] }, r.id);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "card-rpg p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground", children: "Criar recompensa" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        if (title.trim()) {
          addReward({
            title: title.trim(),
            cost,
            icon
          });
          setTitle("");
        }
      }, className: "grid gap-2 sm:grid-cols-[80px_1fr_120px_auto]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: icon, onChange: (e) => setIcon(e.target.value), maxLength: 2, className: "rounded-lg border border-border bg-input px-3 py-2 text-center text-sm outline-none focus:ring-2 focus:ring-ring" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Ex: Pedir comida favorita", className: "rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 1, value: cost, onChange: (e) => setCost(parseInt(e.target.value || "0")), className: "rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Add"
        ] })
      ] })
    ] })
  ] });
}
export {
  Shop as component
};
