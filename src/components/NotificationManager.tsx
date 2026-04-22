import { useEffect, useState } from "react";
import { useGame } from "@/hooks/useGame";
import { todayStr } from "@/lib/game";
import { Bell, BellOff } from "lucide-react";

const SETTINGS_KEY = "life-rpg-notifications-v1";
const SENT_KEY = "life-rpg-notif-sent-v1";

// Reminder times (24h)
const REMINDER_HOURS = [9, 13, 18, 21];

type Settings = { enabled: boolean };

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { enabled: false };
}

function getSentToday(): number[] {
  try {
    const raw = localStorage.getItem(SENT_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (data.date === todayStr()) return data.hours || [];
    }
  } catch {}
  return [];
}

function markSent(hour: number) {
  const hours = Array.from(new Set([...getSentToday(), hour]));
  localStorage.setItem(SENT_KEY, JSON.stringify({ date: todayStr(), hours }));
}

export function NotificationManager() {
  const { state } = useGame();
  const [settings, setSettings] = useState<Settings>(() => loadSettings());
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof window !== "undefined" && "Notification" in window ? Notification.permission : "denied"
  );

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  // Check every minute and send reminder if it's time
  useEffect(() => {
    if (!settings.enabled || permission !== "granted") return;

    const check = () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      if (minute > 5) return; // only fire in first 5 min of the hour
      if (!REMINDER_HOURS.includes(hour)) return;
      if (getSentToday().includes(hour)) return;

      const today = todayStr();
      const pending = state.tasks.filter((t) => t.date === today && !t.done);
      if (pending.length === 0) return;

      const titles = pending.slice(0, 3).map((t) => `• ${t.title}`).join("\n");
      const extra = pending.length > 3 ? `\n+${pending.length - 3} outras` : "";
      try {
        new Notification("⚔️ Missões pendentes hoje", {
          body: `${pending.length} missão(ões) te esperando:\n${titles}${extra}`,
          icon: "/favicon.ico",
          tag: `life-rpg-${today}-${hour}`,
        });
        markSent(hour);
      } catch (e) {
        console.warn("Notification failed", e);
      }
    };

    check();
    const interval = setInterval(check, 60_000);
    return () => clearInterval(interval);
  }, [settings.enabled, permission, state.tasks]);

  const toggle = async () => {
    if (!("Notification" in window)) {
      alert("Seu navegador não suporta notificações.");
      return;
    }
    if (settings.enabled) {
      setSettings({ enabled: false });
      return;
    }
    let perm = Notification.permission;
    if (perm === "default") perm = await Notification.requestPermission();
    setPermission(perm);
    if (perm === "granted") {
      setSettings({ enabled: true });
      new Notification("🔔 Lembretes ativados!", {
        body: `Você receberá lembretes às ${REMINDER_HOURS.map((h) => `${h}h`).join(", ")}.`,
      });
    } else {
      alert("Permissão de notificação negada. Habilite nas configurações do navegador.");
    }
  };

  const active = settings.enabled && permission === "granted";

  return (
    <button
      onClick={toggle}
      title={active ? "Lembretes ativos" : "Ativar lembretes diários"}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border transition ${
        active ? "bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]" : "bg-secondary text-muted-foreground hover:text-foreground"
      }`}
    >
      {active ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
    </button>
  );
}
