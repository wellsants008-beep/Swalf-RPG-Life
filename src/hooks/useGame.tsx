import { createContext, useContext, useEffect, useMemo, useState, ReactNode, useCallback } from "react";
import {
  GameState,
  initialState,
  todayStr,
  mondayOfWeek,
  DEFAULT_DAILY_TEMPLATE,
  Task,
  Reward,
  AttributeKey,
  levelFromXp,
} from "@/lib/game";

const STORAGE_KEY = "life-rpg-state-v1";

type Ctx = {
  state: GameState;
  level: ReturnType<typeof levelFromXp>;
  addTask: (t: Omit<Task, "id" | "done" | "date">, date?: string) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  addReward: (r: Omit<Reward, "id">) => void;
  removeReward: (id: string) => void;
  buyReward: (id: string) => boolean;
  setBoss: (title: string, goalXp: number, rewardXp: number) => void;
  setName: (name: string) => void;
  resetAll: () => void;
  pendingXpAnim: number | null;
};

const GameContext = createContext<Ctx | null>(null);

function load(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...initialState(), ...JSON.parse(raw) };
  } catch {}
  return initialState();
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(() => load());
  const [pendingXpAnim, setPendingXpAnim] = useState<number | null>(null);

  // Persist
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Daily reset + boss reset
  useEffect(() => {
    setState((prev) => {
      const today = todayStr();
      const week = mondayOfWeek();
      let next = { ...prev };

      // Generate daily missions if none exist for today
      const hasToday = prev.tasks.some((t) => t.daily && t.date === today);
      if (!hasToday) {
        const newDailies: Task[] = DEFAULT_DAILY_TEMPLATE.map((t, i) => ({
          ...t,
          id: `daily-${today}-${i}`,
          done: false,
          date: today,
        }));
        next = { ...next, tasks: [...next.tasks.filter((t) => !(t.daily && t.date !== today && !t.done)), ...newDailies] };
      }

      // Reset boss if new week
      if (!next.boss || next.boss.weekStart !== week) {
        next.boss = next.boss && next.boss.weekStart === week
          ? next.boss
          : { id: `boss-${week}`, title: "Estudar 10h esta semana", goalXp: 500, currentXp: 0, rewardXp: 300, weekStart: week };
      }
      return next;
    });
  }, []);

  const level = useMemo(() => levelFromXp(state.totalXp), [state.totalXp]);

  const triggerXpAnim = (xp: number) => {
    setPendingXpAnim(xp);
    setTimeout(() => setPendingXpAnim(null), 700);
  };

  const checkAchievements = (s: GameState): GameState => {
    const lv = levelFromXp(s.totalXp).level;
    const unlock = (id: string, cond: boolean) => {
      const a = s.achievements.find((x) => x.id === id);
      if (a && !a.unlocked && cond) {
        a.unlocked = true;
        a.unlockedAt = todayStr();
      }
    };
    unlock("a1", s.tasks.some((t) => t.done));
    unlock("a2", lv >= 5);
    unlock("a3", lv >= 10);
    unlock("a4", s.streak >= 7);
    unlock("a5", s.streak >= 30);
    unlock("a7", s.attributes.intelligence >= 100);
    unlock("a8", s.attributes.strength >= 100);
    return { ...s, achievements: [...s.achievements] };
  };

  const addTask: Ctx["addTask"] = (t, date = todayStr()) => {
    setState((prev) => ({
      ...prev,
      tasks: [...prev.tasks, { ...t, id: crypto.randomUUID(), done: false, date }],
    }));
  };

  const toggleTask: Ctx["toggleTask"] = (id) => {
    setState((prev) => {
      const task = prev.tasks.find((t) => t.id === id);
      if (!task) return prev;
      const willBeDone = !task.done;
      const delta = willBeDone ? task.xp : -task.xp;
      const tasks = prev.tasks.map((t) => (t.id === id ? { ...t, done: willBeDone } : t));
      const attributes = { ...prev.attributes, [task.attribute]: Math.max(0, prev.attributes[task.attribute] + delta) };
      const totalXp = Math.max(0, prev.totalXp + delta);
      const spendableXp = Math.max(0, prev.spendableXp + delta);

      // streak
      let streak = prev.streak;
      let lastActiveDate = prev.lastActiveDate;
      if (willBeDone) {
        const today = todayStr();
        if (lastActiveDate !== today) {
          const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
          streak = lastActiveDate === yesterday ? streak + 1 : 1;
          lastActiveDate = today;
        }
        triggerXpAnim(task.xp);
      }

      // boss progress (intelligence-based example: any task contributes)
      let boss = prev.boss;
      if (boss && willBeDone) {
        boss = { ...boss, currentXp: Math.min(boss.goalXp, boss.currentXp + task.xp) };
      }

      // history
      const today = todayStr();
      const history = [...prev.history];
      const idx = history.findIndex((h) => h.date === today);
      if (idx >= 0) history[idx] = { date: today, xp: history[idx].xp + delta };
      else if (delta > 0) history.push({ date: today, xp: delta });

      let next: GameState = { ...prev, tasks, attributes, totalXp, spendableXp, streak, lastActiveDate, boss, history };

      // Boss completion bonus
      if (boss && boss.currentXp >= boss.goalXp && prev.boss && prev.boss.currentXp < prev.boss.goalXp) {
        next.totalXp += boss.rewardXp;
        next.spendableXp += boss.rewardXp;
        const a = next.achievements.find((x) => x.id === "a6");
        if (a) { a.unlocked = true; a.unlockedAt = todayStr(); }
        triggerXpAnim(boss.rewardXp);
      }

      return checkAchievements(next);
    });
  };

  const removeTask: Ctx["removeTask"] = (id) =>
    setState((prev) => ({ ...prev, tasks: prev.tasks.filter((t) => t.id !== id) }));

  const addReward: Ctx["addReward"] = (r) =>
    setState((prev) => ({ ...prev, rewards: [...prev.rewards, { ...r, id: crypto.randomUUID() }] }));

  const removeReward: Ctx["removeReward"] = (id) =>
    setState((prev) => ({ ...prev, rewards: prev.rewards.filter((r) => r.id !== id) }));

  const buyReward: Ctx["buyReward"] = (id) => {
    let success = false;
    setState((prev) => {
      const r = prev.rewards.find((x) => x.id === id);
      if (!r || prev.spendableXp < r.cost) return prev;
      success = true;
      return { ...prev, spendableXp: prev.spendableXp - r.cost };
    });
    return success;
  };

  const setBoss: Ctx["setBoss"] = (title, goalXp, rewardXp) =>
    setState((prev) => ({
      ...prev,
      boss: { id: `boss-${mondayOfWeek()}`, title, goalXp, rewardXp, currentXp: 0, weekStart: mondayOfWeek() },
    }));

  const setName: Ctx["setName"] = (name) => setState((prev) => ({ ...prev, avatarName: name }));

  const resetAll = useCallback(() => {
    if (confirm("Resetar todo o progresso?")) {
      localStorage.removeItem(STORAGE_KEY);
      setState(initialState());
    }
  }, []);

  return (
    <GameContext.Provider
      value={{ state, level, addTask, toggleTask, removeTask, addReward, removeReward, buyReward, setBoss, setName, resetAll, pendingXpAnim }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be inside GameProvider");
  return ctx;
}
