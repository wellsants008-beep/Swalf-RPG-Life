import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-Dd1yEBJp.js";
import { c as createLucideIcon, u as useGame, A as ATTRIBUTE_META } from "./router-CCakqlgZ.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$1 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$1);
const __iconNode = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode);
function CalendarPage() {
  const {
    state,
    toggleTask
  } = useGame();
  const [cursor, setCursor] = reactExports.useState(/* @__PURE__ */ new Date());
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const first = new Date(year, month, 1);
  const startWeekday = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  const [selected, setSelected] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const dayTasks = state.tasks.filter((t) => t.date === selected);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCursor(new Date(year, month - 1, 1)), className: "rounded-lg bg-secondary p-2 hover:bg-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-extrabold capitalize", children: cursor.toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric"
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCursor(new Date(year, month + 1, 1)), className: "rounded-lg bg-secondary p-2 hover:bg-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "card-rpg p-3 sm:p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground", children: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-1 font-semibold", children: d }, d)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 grid grid-cols-7 gap-1", children: cells.map((d, i) => {
        if (!d) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}, i);
        const iso = d.toISOString().slice(0, 10);
        const count = state.tasks.filter((t) => t.date === iso).length;
        const doneCount = state.tasks.filter((t) => t.date === iso && t.done).length;
        const isSelected = iso === selected;
        const isToday = iso === (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSelected(iso), className: `relative aspect-square rounded-lg p-1 text-xs transition ${isSelected ? "bg-primary text-primary-foreground" : "bg-secondary/50 hover:bg-accent"} ${isToday && !isSelected ? "ring-1 ring-primary" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: d.getDate() }),
          count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-[color:var(--xp)]" }),
            doneCount === count && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-[color:var(--vitality)]" })
          ] })
        ] }, iso);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "card-rpg p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground", children: (/* @__PURE__ */ new Date(selected + "T12:00:00")).toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long"
      }) }),
      dayTasks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-6 text-center text-sm text-muted-foreground", children: "Nenhuma missão neste dia." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: dayTasks.map((t) => {
        const meta = ATTRIBUTE_META[t.attribute];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: `flex items-center gap-3 rounded-lg bg-secondary/50 p-3 ${t.done ? "opacity-60" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toggleTask(t.id), className: `h-5 w-5 rounded border-2 ${t.done ? "border-primary bg-primary" : "border-border"}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-sm font-medium ${t.done ? "line-through" : ""}`, children: t.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              meta.emoji,
              " +",
              t.xp,
              " XP"
            ] })
          ] })
        ] }, t.id);
      }) })
    ] })
  ] });
}
export {
  CalendarPage as component
};
