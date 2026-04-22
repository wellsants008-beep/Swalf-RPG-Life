export type AttributeKey = "strength" | "intelligence" | "vitality";

export interface Task {
  id: string;
  title: string;
  xp: number;
  attribute: AttributeKey;
  done: boolean;
  date: string; // YYYY-MM-DD
  daily?: boolean;
}

export interface Reward {
  id: string;
  title: string;
  cost: number;
  icon?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface Boss {
  id: string;
  title: string;
  goalXp: number;
  currentXp: number;
  rewardXp: number;
  weekStart: string; // YYYY-MM-DD (monday)
}

export interface GameState {
  avatarName: string;
  totalXp: number; // lifetime
  spendableXp: number; // for the shop
  attributes: Record<AttributeKey, number>;
  tasks: Task[];
  rewards: Reward[];
  achievements: Achievement[];
  boss: Boss | null;
  streak: number;
  lastActiveDate: string | null;
  history: { date: string; xp: number }[];
}

export const xpForLevel = (level: number) => Math.round(100 * Math.pow(level, 1.5));
export const levelFromXp = (xp: number) => {
  let lvl = 1;
  let total = 0;
  while (total + xpForLevel(lvl) <= xp) {
    total += xpForLevel(lvl);
    lvl++;
  }
  return { level: lvl, currentXp: xp - total, neededXp: xpForLevel(lvl) };
};

export const todayStr = () => new Date().toISOString().slice(0, 10);

export const mondayOfWeek = (d = new Date()) => {
  const date = new Date(d);
  const day = (date.getDay() + 6) % 7; // 0 = monday
  date.setDate(date.getDate() - day);
  return date.toISOString().slice(0, 10);
};

export const ATTRIBUTE_META: Record<AttributeKey, { label: string; color: string; emoji: string }> = {
  strength: { label: "Força", color: "var(--strength)", emoji: "⚔️" },
  intelligence: { label: "Inteligência", color: "var(--intelligence)", emoji: "🧠" },
  vitality: { label: "Vitalidade", color: "var(--vitality)", emoji: "💚" },
};

export const DEFAULT_DAILY_TEMPLATE: Omit<Task, "id" | "done" | "date">[] = [
  { title: "Beber 2L de água", xp: 15, attribute: "vitality", daily: true },
  { title: "Treinar 30 minutos", xp: 30, attribute: "strength", daily: true },
  { title: "Estudar 1 hora", xp: 35, attribute: "intelligence", daily: true },
  { title: "Dormir antes da meia-noite", xp: 20, attribute: "vitality", daily: true },
  { title: "Ler 10 páginas", xp: 20, attribute: "intelligence", daily: true },
];

export const DEFAULT_REWARDS: Reward[] = [
  { id: "r1", title: "Assistir 1 episódio de série", cost: 50, icon: "📺" },
  { id: "r2", title: "1h de jogo", cost: 80, icon: "🎮" },
  { id: "r3", title: "Sair com amigos", cost: 200, icon: "🍻" },
  { id: "r4", title: "Comprar algo que quero", cost: 500, icon: "🎁" },
];

export const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  { id: "a1", title: "Primeiros passos", description: "Complete sua primeira missão", unlocked: false },
  { id: "a2", title: "Nível 5", description: "Alcance o nível 5", unlocked: false },
  { id: "a3", title: "Nível 10", description: "Alcance o nível 10", unlocked: false },
  { id: "a4", title: "Streak de 7 dias", description: "7 dias produtivos seguidos", unlocked: false },
  { id: "a5", title: "Streak de 30 dias", description: "30 dias produtivos seguidos", unlocked: false },
  { id: "a6", title: "Caçador de Boss", description: "Derrote seu primeiro boss semanal", unlocked: false },
  { id: "a7", title: "Mente Brilhante", description: "100 pontos de Inteligência", unlocked: false },
  { id: "a8", title: "Guerreiro", description: "100 pontos de Força", unlocked: false },
];

export const initialState = (): GameState => ({
  avatarName: "Herói",
  totalXp: 0,
  spendableXp: 0,
  attributes: { strength: 0, intelligence: 0, vitality: 0 },
  tasks: [],
  rewards: DEFAULT_REWARDS,
  achievements: DEFAULT_ACHIEVEMENTS,
  boss: null,
  streak: 0,
  lastActiveDate: null,
  history: [],
});
