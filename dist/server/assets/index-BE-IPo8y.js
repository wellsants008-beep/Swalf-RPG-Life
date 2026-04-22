import { T as jsxRuntimeExports } from "./worker-entry-Dd1yEBJp.js";
import { u as useGame, L as Link, S as Swords, T as Trophy } from "./router-CCakqlgZ.js";
import { F as Flame, S as Sparkles, a as Shield, A as AttributeBar } from "./AttributeBar-CxQKZCEa.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function Dashboard() {
  const {
    state,
    level
  } = useGame();
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const todayTasks = state.tasks.filter((t) => t.date === today);
  const doneToday = todayTasks.filter((t) => t.done).length;
  const dailyProgress = todayTasks.length > 0 ? doneToday / todayTasks.length * 100 : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "card-rpg-glow relative overflow-hidden p-6 sm:p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[image:var(--gradient-primary)] opacity-25 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -bottom-20 -left-12 h-48 w-48 rounded-full bg-[image:var(--gradient-gold)] opacity-15 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "pointer-events-none absolute right-4 top-4 h-24 w-24 animate-rune-spin opacity-20", viewBox: "0 0 100 100", fill: "none", stroke: "currentColor", strokeWidth: "0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "50", r: "45" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "50", r: "35", strokeDasharray: "2 4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M50 5 L50 95 M5 50 L95 50 M20 20 L80 80 M80 20 L20 80" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "50", r: "20" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-muted-foreground", children: "⚜ Sua Jornada ⚜" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-2 font-extrabold leading-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-sm uppercase tracking-widest text-muted-foreground", children: "Nível" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-6xl text-gradient sm:text-7xl", children: level.level })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-4 w-4 text-[color:var(--strength)]" }), value: state.streak, label: "dias seguidos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-[color:var(--xp)]" }), value: state.totalXp, label: "XP total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4 text-[color:var(--gold)]" }), value: state.spendableXp, label: "XP disponível", gold: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex justify-between text-[10px] font-semibold uppercase tracking-widest text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Progresso para Nível ",
              level.level + 1
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              level.currentXp,
              " / ",
              level.neededXp
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-3 overflow-hidden rounded-full border border-border bg-black/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-[image:var(--gradient-xp)] transition-all duration-700", style: {
              width: `${level.currentXp / level.neededXp * 100}%`
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer-bar absolute inset-0" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "card-rpg p-5 sm:p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold", children: "Atributos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/profile", className: "text-xs font-semibold text-primary hover:underline", children: "Ver perfil →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AttributeBar, { attr: "strength", value: state.attributes.strength }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AttributeBar, { attr: "intelligence", value: state.attributes.intelligence }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AttributeBar, { attr: "vitality", value: state.attributes.vitality })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/missions", className: "card-rpg group block overflow-hidden p-5 transition hover:scale-[1.01] hover:shadow-[var(--shadow-glow)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Swords, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold uppercase tracking-wider text-sm", children: "Missões de hoje" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-4xl font-extrabold", children: [
          doneToday,
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-base font-normal text-muted-foreground", children: [
            "/",
            todayTasks.length
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mt-3 h-2.5 overflow-hidden rounded-full bg-black/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-[image:var(--gradient-primary)] transition-all", style: {
          width: `${dailyProgress}%`
        } }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/boss", className: "card-rpg group block overflow-hidden p-5 transition hover:scale-[1.01] hover:shadow-[var(--shadow-gold)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-5 w-5 text-[color:var(--gold)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold uppercase tracking-wider text-sm", children: "Boss da semana" })
        ] }),
        state.boss ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-1 text-sm text-muted-foreground", children: state.boss.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-3xl font-extrabold", children: [
            state.boss.currentXp,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-normal text-muted-foreground", children: [
              "/",
              state.boss.goalXp
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-2.5 overflow-hidden rounded-full bg-black/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-[image:var(--gradient-boss)] transition-all", style: {
            width: `${state.boss.currentXp / state.boss.goalXp * 100}%`
          } }) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Defina um boss semanal" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "card-rpg p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-sm font-bold uppercase tracking-widest text-muted-foreground", children: "Atalhos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/missions", className: "rounded-xl border border-border bg-secondary/60 p-3 text-center text-sm font-medium transition hover:border-primary hover:bg-accent", children: "⚔️ Missões" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "rounded-xl border border-border bg-secondary/60 p-3 text-center text-sm font-medium transition hover:border-primary hover:bg-accent", children: "🛒 Loja" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/calendar", className: "rounded-xl border border-border bg-secondary/60 p-3 text-center text-sm font-medium transition hover:border-primary hover:bg-accent", children: "📅 Agenda" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/achievements", className: "rounded-xl border border-border bg-secondary/60 p-3 text-center text-sm font-medium transition hover:border-primary hover:bg-accent", children: "🏆 Conquistas" })
      ] })
    ] })
  ] });
}
function Stat({
  icon,
  value,
  label,
  gold
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 rounded-full border border-border bg-black/30 px-3 py-1.5 text-sm backdrop-blur-sm", children: [
    icon,
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-bold ${gold ? "text-[color:var(--gold)]" : ""}`, children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label })
  ] });
}
export {
  Dashboard as component
};
