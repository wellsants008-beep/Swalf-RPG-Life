import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, Swords, Trophy, ShoppingBag, Calendar, Award, User } from "lucide-react";
import { GameProvider, useGame } from "@/hooks/useGame";
import { levelFromXp } from "@/lib/game";
import { NotificationManager } from "@/components/NotificationManager";

const navItems = [
  { to: "/", label: "Início", icon: LayoutDashboard },
  { to: "/missions", label: "Missões", icon: Swords },
  { to: "/boss", label: "Boss", icon: Trophy },
  { to: "/shop", label: "Loja", icon: ShoppingBag },
  { to: "/calendar", label: "Agenda", icon: Calendar },
  { to: "/achievements", label: "Conquistas", icon: Award },
  { to: "/profile", label: "Perfil", icon: User },
] as const;

function XpFloater() {
  const { pendingXpAnim } = useGame();
  if (!pendingXpAnim) return null;
  return (
    <div className="pointer-events-none fixed left-1/2 top-1/3 z-50 -translate-x-1/2 animate-xp-pop text-3xl font-extrabold text-[color:var(--xp)] drop-shadow-[0_0_12px_oklch(0.78_0.18_85_/_0.7)]">
      +{pendingXpAnim} XP
    </div>
  );
}

function TopBar() {
  const { state, level } = useGame();
  const lv = level;
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[image:var(--gradient-primary)] text-lg font-bold text-primary-foreground shadow-[var(--shadow-glow)]">
          {state.avatarName.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="truncate text-sm font-semibold">{state.avatarName}</p>
            <p className="text-xs text-muted-foreground">Nv. <span className="font-bold text-foreground">{lv.level}</span></p>
          </div>
          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-[image:var(--gradient-xp)] transition-all duration-500"
              style={{ width: `${(lv.currentXp / lv.neededXp) * 100}%` }}
            />
          </div>
          <p className="mt-0.5 text-[10px] text-muted-foreground">{lv.currentXp} / {lv.neededXp} XP</p>
        </div>
        <div className="hidden sm:flex flex-col items-end text-xs">
          <span className="text-muted-foreground">XP disponível</span>
          <span className="font-bold text-[color:var(--gold)]">💰 {state.spendableXp}</span>
        </div>
        <NotificationManager />
      </div>
    </header>
  );
}

function BottomNav() {
  const loc = useLocation();
  return (
    <nav className="sticky bottom-0 z-30 border-t border-border bg-background/90 backdrop-blur-md md:top-[68px] md:bottom-auto md:border-b md:border-t-0">
      <div className="mx-auto flex max-w-6xl items-center justify-around gap-1 px-2 py-1.5 md:justify-start md:gap-1 md:px-4">
        {navItems.map(({ to, label, icon: Icon }) => {
          const active = loc.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-1 flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 text-[10px] font-medium transition-colors md:flex-none md:flex-row md:gap-2 md:text-sm ${
                active ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function Inner() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <BottomNav />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-5 pb-24 md:pb-8 animate-fade-up">
        <Outlet />
      </main>
      <XpFloater />
    </div>
  );
}

export function AppShell() {
  return (
    <GameProvider>
      <Inner />
    </GameProvider>
  );
}

export { levelFromXp };
