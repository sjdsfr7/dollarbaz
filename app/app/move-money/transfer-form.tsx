'use client';

import { useState } from 'react';
// @ts-ignore - Temporary ignore for action type import
import { useFormState } from 'react-dom';
import { processTransfer } from './actions';
import {
  CheckCircle,
  Warning,
  CaretDown,
  PaperPlaneRight,
} from '@phosphor-icons/react/dist/ssr';

// Basic Account Type
type Account = {
  id: string;
  name: string;
  balance: number;
  currency: string;
  type: string;
};

export function TransferForm({ accounts }: { accounts: Account[] }) {
  const [amount, setAmount] = useState('');
  const [selectedFrom, setSelectedFrom] = useState(accounts[0]?.id || '');

  // Use useActionState (new React) or useFormState (Next 14) depending on version.
  // Assuming Next 14 standard:
  const [state, formAction] = useFormState(processTransfer, null);

  const fromAccount = accounts.find((a) => a.id === selectedFrom);

  return (
    <form action={formAction} className="space-y-8">
      {/* 1. FROM / TO SELECTION */}
      <div className="grid md:grid-cols-2 gap-4 relative">
        {/* FROM */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
            From Account
          </label>
          <div className="relative">
            <select
              name="fromAccount"
              value={selectedFrom}
              onChange={(e) => setSelectedFrom(e.target.value)}
              className="w-full appearance-none p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent focus:border-emerald-500 outline-none font-medium transition-all cursor-pointer"
            >
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name} (Available: ${Number(acc.balance).toLocaleString()}
                  )
                </option>
              ))}
            </select>
            <CaretDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
          </div>
        </div>

        {/* Center Arrow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex w-8 h-8 rounded-full bg-white dark:bg-[#1a232e] shadow border border-black/10 items-center justify-center">
          <ArrowsLeftRight size={14} />
        </div>

        {/* TO */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
            To Account
          </label>
          <div className="relative">
            <select
              name="toAccount"
              className="w-full appearance-none p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent focus:border-emerald-500 outline-none font-medium transition-all cursor-pointer"
            >
              {accounts
                .filter((a) => a.id !== selectedFrom)
                .map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name} - {acc.type.toUpperCase()}
                  </option>
                ))}
            </select>
            <CaretDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* 2. AMOUNT INPUT */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
          Amount
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-muted-foreground">
            $
          </span>
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
            className="w-full p-6 pl-10 text-4xl font-bold bg-transparent border-b-2 border-black/10 dark:border-white/10 focus:border-emerald-500 outline-none font-poppins placeholder:text-muted-foreground/20"
          />
        </div>
        {fromAccount && (
          <div className="flex justify-between text-xs mt-2 px-1">
            <span className="text-muted-foreground">
              Balance after transfer:
            </span>
            <span
              className={`font-mono ${
                Number(fromAccount.balance) - Number(amount) < 0
                  ? 'text-rose-500'
                  : 'text-emerald-600'
              }`}
            >
              ${(Number(fromAccount.balance) - Number(amount)).toLocaleString()}
            </span>
          </div>
        )}
      </div>

      {/* 3. META INPUTS */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
          Description (Optional)
        </label>
        <input
          type="text"
          name="description"
          placeholder="e.g. Monthly Savings"
          className="w-full p-3 rounded-lg bg-black/5 dark:bg-white/5 border-0 focus:ring-1 focus:ring-emerald-500 text-sm"
        />
      </div>

      {/* 4. FEEDBACK & SUBMIT */}
      {state?.error && (
        <div className="p-3 rounded-lg bg-rose-100 dark:bg-rose-900/20 text-rose-600 text-sm flex items-center gap-2">
          <Warning size={18} /> {state.error}
        </div>
      )}

      {state?.success && (
        <div className="p-3 rounded-lg bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 text-sm flex items-center gap-2">
          <CheckCircle size={18} /> Transfer successful!
        </div>
      )}

      <button
        type="submit"
        className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
      >
        <PaperPlaneRight size={20} weight="fill" />
        Transfer Funds
      </button>
    </form>
  );
}
