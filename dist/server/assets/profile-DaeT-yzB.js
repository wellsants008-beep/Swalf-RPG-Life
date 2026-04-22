import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-Dd1yEBJp.js";
import { c as createLucideIcon, u as useGame, S as Swords, A as ATTRIBUTE_META, L as Link, a as Award } from "./router-CCakqlgZ.js";
import { S as Sparkles, a as Shield, F as Flame, A as AttributeBar } from "./AttributeBar-CxQKZCEa.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  [
    "path",
    {
      d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
      key: "1vdc57"
    }
  ],
  ["path", { d: "M5 21h14", key: "11awu3" }]
];
const Crown = createLucideIcon("crown", __iconNode);
function Profile() {
  const {
    state,
    level,
    setName
  } = useGame();
  const stats = reactExports.useMemo(() => {
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const totalDone = state.tasks.filter((t) => t.done).length;
    const totalCreated = state.tasks.length;
    const xpToday = state.history.find((h) => h.date === today)?.xp ?? 0;
    const last7 = Array.from({
      length: 7
    }).map((_, i) => {
      const d = /* @__PURE__ */ new Date();
      d.setDate(d.getDate() - (6 - i));
      const iso = d.toISOString().slice(0, 10);
      return {
        iso,
        day: d.toLocaleDateString("pt-BR", {
          weekday: "short"
        }).slice(0, 3),
        xp: state.history.find((h) => h.date === iso)?.xp ?? 0
      };
    });
    const maxXp = Math.max(1, ...last7.map((d) => d.xp));
    const unlocked = state.achievements.filter((a) => a.unlocked).length;
    return {
      totalDone,
      totalCreated,
      xpToday,
      last7,
      maxXp,
      unlocked
    };
  }, [state]);
  const dominant = reactExports.useMemo(() => {
    const entries = Object.entries(state.attributes);
    entries.sort((a, b) => b[1] - a[1]);
    return entries[0];
  }, [state.attributes]);
  const heroClass = reactExports.useMemo(() => {
    if (dominant[1] === 0) return "Aprendiz";
    return {
      strength: "Guerreiro",
      intelligence: "Mago Erudito",
      vitality: "Druida"
    }[dominant[0]];
  }, [dominant]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: "Perfil do Personagem" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Sua ficha completa de aventureiro." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "card-rpg-glow relative overflow-hidden p-6 sm:p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[image:var(--gradient-primary)] opacity-25 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 animate-rune-spin opacity-15", viewBox: "0 0 100 100", fill: "none", stroke: "currentColor", strokeWidth: "0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "50", r: "45" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "50", r: "30", strokeDasharray: "3 5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M50 5 L50 95 M5 50 L95 50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "50,15 60,40 85,40 65,55 75,80 50,65 25,80 35,55 15,40 40,40" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 animate-glow rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-[oklch(0.72_0.18_290)] bg-[image:var(--gradient-primary)] text-5xl font-extrabold text-primary-foreground shadow-[var(--shadow-glow-strong)]", children: [
            state.avatarName.charAt(0).toUpperCase(),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "absolute -top-3 left-1/2 h-7 w-7 -translate-x-1/2 text-[color:var(--gold)] drop-shadow-[0_0_8px_oklch(0.82_0.16_85_/_0.8)] animate-float-slow" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-center sm:text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: state.avatarName, onChange: (e) => setName(e.target.value || "Herói"), className: "w-full bg-transparent text-center text-2xl font-extrabold outline-none focus:text-gradient sm:text-left sm:text-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm uppercase tracking-widest text-[color:var(--gold)]", children: [
            "⚜ ",
            heroClass,
            " ⚜"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { children: [
              "Nível ",
              level.level
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { gold: true, children: [
              "🔥 ",
              state.streak,
              " dias"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { children: [
              stats.unlocked,
              "/",
              state.achievements.length,
              " 🏆"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex justify-between text-[10px] font-semibold uppercase tracking-widest text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Experiência" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            level.currentXp,
            " / ",
            level.neededXp
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-3.5 overflow-hidden rounded-full border border-border bg-black/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-[image:var(--gradient-xp)] transition-all duration-700", style: {
            width: `${level.currentXp / level.neededXp * 100}%`
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer-bar absolute inset-0" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-right text-[10px] text-muted-foreground", children: [
          "Próximo nível em ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-[color:var(--xp)]", children: [
            level.neededXp - level.currentXp,
            " XP"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid grid-cols-2 gap-3 sm:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-[color:var(--xp)]" }), value: state.totalXp, label: "XP Total" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-5 w-5 text-[color:var(--gold)]" }), value: state.spendableXp, label: "XP Disponível" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Swords, { className: "h-5 w-5 text-primary" }), value: stats.totalDone, label: "Missões feitas" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-5 w-5 text-[color:var(--strength)]" }), value: stats.xpToday, label: "XP de hoje" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "card-rpg p-5 sm:p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-lg font-bold", children: "Atributos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AttributeBar, { attr: "strength", value: state.attributes.strength }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AttributeBar, { attr: "intelligence", value: state.attributes.intelligence }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AttributeBar, { attr: "vitality", value: state.attributes.vitality })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-xs text-muted-foreground", children: [
        "Atributo dominante: ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-foreground", children: [
          ATTRIBUTE_META[dominant[0]].emoji,
          " ",
          ATTRIBUTE_META[dominant[0]].label
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "card-rpg p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-lg font-bold", children: "Últimos 7 dias" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end justify-between gap-2 h-32", children: stats.last7.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full flex-1 flex items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full rounded-t-md bg-[image:var(--gradient-primary)] transition-all duration-500", style: {
          height: `${d.xp / stats.maxXp * 100}%`,
          minHeight: d.xp > 0 ? "4px" : "0"
        }, title: `${d.xp} XP` }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] capitalize text-muted-foreground", children: d.day }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold", children: d.xp })
      ] }, d.iso)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "card-rpg p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold", children: "Conquistas recentes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/achievements", className: "text-xs font-semibold text-primary hover:underline", children: "Ver todas →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-4", children: [
        state.achievements.filter((a) => a.unlocked).slice(0, 4).map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1 rounded-lg border border-border bg-secondary/40 p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-6 w-6 text-[color:var(--gold)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold", children: a.title })
        ] }, a.id)),
        state.achievements.filter((a) => a.unlocked).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "col-span-full py-4 text-center text-sm text-muted-foreground", children: "Nenhuma conquista ainda. Complete missões!" })
      ] })
    ] })
  ] });
}
function StatCard({
  icon,
  value,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-rpg p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 flex items-center gap-1.5", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-extrabold", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: label })
  ] });
}
function Badge({
  children,
  gold
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full border px-3 py-1 text-xs font-semibold ${gold ? "border-[color:var(--gold)] text-[color:var(--gold)]" : "border-border bg-black/30"}`, children });
}
export {
  Profile as component
};
