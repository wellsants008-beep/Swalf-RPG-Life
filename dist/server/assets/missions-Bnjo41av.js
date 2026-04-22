import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-Dd1yEBJp.js";
import { c as createLucideIcon, u as useGame, t as todayStr, A as ATTRIBUTE_META } from "./router-CCakqlgZ.js";
import { P as Plus, T as Trash2 } from "./trash-2-CLq0uyG7.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode);
function Missions() {
  const {
    state,
    addTask,
    toggleTask,
    removeTask
  } = useGame();
  const [title, setTitle] = reactExports.useState("");
  const [xp, setXp] = reactExports.useState(20);
  const [attribute, setAttribute] = reactExports.useState("intelligence");
  const today = todayStr();
  const dailies = state.tasks.filter((t) => t.daily && t.date === today);
  const customs = state.tasks.filter((t) => !t.daily && t.date === today);
  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({
      title: title.trim(),
      xp,
      attribute
    });
    setTitle("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: "Missões" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Complete tarefas e ganhe XP." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "card-rpg p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground", children: "Missões diárias" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: dailies.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(TaskRow, { task: t, onToggle: () => toggleTask(t.id) }, t.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "card-rpg p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground", children: "Suas missões" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "mb-4 grid gap-2 sm:grid-cols-[1fr_100px_140px_auto]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Nova missão...", className: "rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 1, value: xp, onChange: (e) => setXp(parseInt(e.target.value || "0")), className: "rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: attribute, onChange: (e) => setAttribute(e.target.value), className: "rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring", children: Object.keys(ATTRIBUTE_META).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: k, children: [
          ATTRIBUTE_META[k].emoji,
          " ",
          ATTRIBUTE_META[k].label
        ] }, k)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Add"
        ] })
      ] }),
      customs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-6 text-center text-sm text-muted-foreground", children: "Nenhuma missão personalizada hoje." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: customs.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(TaskRow, { task: t, onToggle: () => toggleTask(t.id), onRemove: () => removeTask(t.id) }, t.id)) })
    ] })
  ] });
}
function TaskRow({
  task,
  onToggle,
  onRemove
}) {
  const meta = ATTRIBUTE_META[task.attribute];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: `flex items-center gap-3 rounded-lg border border-border bg-secondary/50 p-3 transition ${task.done ? "opacity-60" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onToggle, className: `flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2 transition ${task.done ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`, children: task.done && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-sm font-medium ${task.done ? "line-through" : ""}`, children: task.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        meta.emoji,
        " ",
        meta.label,
        " · +",
        task.xp,
        " XP"
      ] })
    ] }),
    onRemove && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onRemove, className: "text-muted-foreground hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
  ] });
}
export {
  Missions as component
};
