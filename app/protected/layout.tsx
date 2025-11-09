import type { ReactNode } from 'react';
import { AuthButton } from '@/components/auth-button';
import { ThemeSwitcher } from '@/components/theme-switcher';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-4 py-3 border-b">
        <span className="text-sm font-semibold">
          Dollarbaz – Protected area
        </span>
        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          <AuthButton />
        </div>
      </header>

      <main className="flex-1 px-4 py-6">{children}</main>
    </div>
  );
}
