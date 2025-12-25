import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import {
  User,
  Briefcase,
  CirclesThreePlus,
  Command,
  Moon,
  Bell,
  SquaresFour,
  ArrowsLeftRight,
  ChartLineUp,
  CurrencyCircleDollar,
  Invoice,
  ClockCounterClockwise,
  ShieldWarning,
  Gear,
} from '@phosphor-icons/react/dist/ssr';

// --- Types ---
interface NavItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  isActive?: boolean;
}

interface ContextButtonProps {
  icon: ReactNode;
  label: string;
  isActive?: boolean;
}

export default async function AppLayout({ children }: { children: ReactNode }) {
  // 1. Secure Server-Side Auth Check
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/auth/login');
  }

  return (
    <div className="flex h-screen w-full bg-[#fefeea] dark:bg-[#0a0e12] text-[#4e594a] dark:text-[#e3e8f1] font-sans transition-colors duration-300">
      {/* SIDEBAR (Desktop) */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-black/5 dark:border-white/10 bg-white/50 dark:bg-[#0f141a]/50 backdrop-blur-md">
        <div className="p-4 h-16 flex items-center gap-3 border-b border-black/5 dark:border-white/10">
          {/* Logo */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold shadow-sm shadow-emerald-500/20">
            D
          </div>
          <span className="font-semibold font-poppins text-lg tracking-tight">
            Dollarbaz OS
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavItem
            href="/app/overview"
            icon={<SquaresFour size={18} weight="bold" />}
            label="Overview"
            isActive
          />
          <NavItem
            href="/app/move-money"
            icon={<ArrowsLeftRight size={18} weight="bold" />}
            label="Move Money"
          />
          <NavItem
            href="/app/trading"
            icon={<ChartLineUp size={18} weight="bold" />}
            label="Invest"
          />
          <NavItem
            href="/app/fx"
            icon={<CurrencyCircleDollar size={18} weight="bold" />}
            label="FX & Convert"
          />
          <NavItem
            href="/app/payments"
            icon={<Invoice size={18} weight="bold" />}
            label="Payments"
          />

          <div className="pt-6 pb-2">
            <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest pl-3">
              Insights
            </p>
          </div>

          <NavItem
            href="/app/history"
            icon={<ClockCounterClockwise size={18} weight="bold" />}
            label="History"
          />
          <NavItem
            href="/app/risk"
            icon={<ShieldWarning size={18} weight="bold" />}
            label="Risk Center"
          />
          <NavItem
            href="/app/settings"
            icon={<Gear size={18} weight="bold" />}
            label="Settings"
          />
        </nav>

        {/* User Mini Profile (Optional Footer) */}
        <div className="p-4 border-t border-black/5 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 shadow-sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.email}</p>
              <p className="text-[10px] text-muted-foreground">Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* TOP HEADER */}
        <header className="h-16 flex-none bg-white/80 dark:bg-[#0a0e12]/80 backdrop-blur-xl border-b border-black/5 dark:border-white/10 flex items-center justify-between px-4 z-50 sticky top-0">
          {/* Left: Context Switcher */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button would go here */}
            <div className="hidden md:flex bg-black/5 dark:bg-white/5 rounded-full p-1 gap-0.5 border border-black/5 dark:border-white/5">
              <ContextButton
                icon={<User size={14} weight="bold" />}
                label="Personal"
                isActive
              />
              <ContextButton
                icon={<Briefcase size={14} weight="bold" />}
                label="Business"
              />
              <ContextButton
                icon={<CirclesThreePlus size={14} weight="bold" />}
                label="All"
              />
            </div>
          </div>

          {/* Center: Command Bar */}
          <div className="flex-1 max-w-xl mx-4 group">
            <div className="relative cursor-text transition-transform active:scale-[0.99]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground/50 group-focus-within:text-emerald-600 transition-colors">
                <Command size={16} weight="bold" />
              </div>
              <input
                type="text"
                className="block w-full rounded-xl border border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/5 py-2.5 pl-10 pr-12 text-sm placeholder:text-muted-foreground/50 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition-all shadow-sm group-focus-within:shadow-md"
                placeholder="Ask AI Brain or type '/' for commands..."
              />
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <kbd className="hidden sm:inline-flex items-center h-5 px-1.5 text-[10px] font-medium text-muted-foreground/70 font-mono bg-black/5 dark:bg-white/10 rounded border border-black/5 dark:border-white/5">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground">
              <Moon size={20} weight="duotone" />
            </button>
            <button className="relative p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground">
              <Bell size={20} weight="duotone" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#fefeea] dark:border-[#0a0e12]"></span>
            </button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 scroll-smooth">
          {children}
        </main>
      </div>
    </div>
  );
}

// --- Sub-components (Optimized for reuse) ---

function NavItem({ href, icon, label, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
        isActive
          ? 'bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 shadow-sm ring-1 ring-emerald-500/20'
          : 'text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground'
      }`}
    >
      <span
        className={
          isActive
            ? 'text-emerald-600 dark:text-emerald-400'
            : 'text-muted-foreground group-hover:text-foreground transition-colors'
        }
      >
        {icon}
      </span>
      {label}
    </Link>
  );
}

function ContextButton({ icon, label, isActive }: ContextButtonProps) {
  return (
    <button
      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
        isActive
          ? 'bg-white dark:bg-[#1a232e] shadow-sm text-foreground ring-1 ring-black/5 dark:ring-white/10'
          : 'text-muted-foreground hover:bg-white/50 dark:hover:bg-white/5 hover:text-foreground'
      }`}
    >
      {icon} {label}
    </button>
  );
}
