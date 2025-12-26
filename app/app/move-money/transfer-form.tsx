'use client';

import { useState, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { processTransfer, TransferState } from './actions';
import {
  CheckCircle,
  Warning,
  CaretDown,
  PaperPlaneRight,
  ArrowRight,
  CircleNotch,
} from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';

// Type definition aligned with Supabase schema where IDs are BigInt (returned as number or string)
type Account = {
  id: number | string;
  name: string | null;
  balance: number | null;
  currency: string;
  type: string; // This handles the USER-DEFINED enum from DB
};

const initialState: TransferState = {
  error: undefined,
  success: false,
};

export function TransferForm({ accounts }: { accounts: Account[] }) {
  const [amount, setAmount] = useState('');
  // Default to first account ID if available
  const [selectedFrom, setSelectedFrom] = useState<string>(
    String(accounts[0]?.id || ''),
  );

  const [state, formAction] = useFormState(processTransfer, initialState);

  // Find currently selected account object for balance calculation
  const fromAccount = accounts.find((a) => String(a.id) === selectedFrom);

  // Calculate remaining balance preview
  const numericAmount = parseFloat(amount) || 0;
  const currentBalance = fromAccount?.balance ? Number(fromAccount.balance) : 0;
  const remainingBalance = currentBalance - numericAmount;
  const isBalanceNegative = remainingBalance < 0;

  // Reset form on success
  useEffect(() => {
    if (state.success) {
      setAmount('');
      // Optional: Reset other fields if needed
    }
  }, [state.timestamp, state.success]);

  return (
    <form action={formAction} className="space-y-8">
      {/* 1. Account Selection Grid */}
      <div className="grid md:grid-cols-2 gap-6 relative">
        {/* FROM Select */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider ml-1">
            From Account
          </label>
          <div className="relative group">
            <select
              name="fromAccount"
              value={selectedFrom}
              onChange={(e) => setSelectedFrom(e.target.value)}
              className="w-full appearance-none p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none font-medium transition-all cursor-pointer text-foreground"
            >
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name || 'Unnamed Account'} ({acc.currency}{' '}
                  {Number(acc.balance).toLocaleString()})
                </option>
              ))}
            </select>
            <CaretDown
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground"
              size={16}
            />
          </div>
        </div>

        {/* Directional Icon (Desktop Only) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex w-10 h-10 rounded-full bg-white dark:bg-[#1a232e] shadow-sm border border-black/10 dark:border-white/10 items-center justify-center text-muted-foreground">
          <ArrowRight size={16} weight="bold" />
        </div>

        {/* TO Select */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider ml-1">
            To Account
          </label>
          <div className="relative group">
            <select
              name="toAccount"
              className="w-full appearance-none p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none font-medium transition-all cursor-pointer text-foreground"
            >
              {accounts
                .filter((a) => String(a.id) !== selectedFrom)
                .map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name || 'Unnamed Account'} (
                    {String(acc.type).toUpperCase()})
                  </option>
                ))}
            </select>
            <CaretDown
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground"
              size={16}
            />
          </div>
        </div>
      </div>

      {/* 2. Amount Input */}
      <div className="space-y-3 bg-black/[0.02] dark:bg-white/[0.02] p-6 rounded-2xl border border-black/5 dark:border-white/5">
        <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
          Amount to Transfer
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-muted-foreground/50">
            $
          </span>
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0.01"
            className="w-full p-4 pl-10 text-4xl font-bold bg-transparent border-b-2 border-black/10 dark:border-white/10 focus:border-emerald-500 outline-none font-poppins placeholder:text-muted-foreground/20 text-foreground transition-colors"
          />
        </div>
        {fromAccount && (
          <div className="flex justify-between text-xs px-1 pt-2">
            <span className="text-muted-foreground">
              New balance for <strong>{fromAccount.name}</strong>:
            </span>
            <span
              className={`font-mono font-medium transition-colors ${
                isBalanceNegative
                  ? 'text-rose-500'
                  : 'text-emerald-600 dark:text-emerald-400'
              }`}
            >
              $
              {remainingBalance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        )}
      </div>

      {/* 3. Optional Description */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider ml-1">
          Note (Optional)
        </label>
        <input
          type="text"
          name="description"
          placeholder="e.g. Monthly Savings Allocation"
          className="w-full p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none text-sm text-foreground placeholder:text-muted-foreground/50 transition-all"
        />
      </div>

      {/* 4. Feedback Messages */}
      {state?.error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
          <Warning size={20} weight="fill" className="shrink-0 mt-0.5" />
          <p className="font-medium">{state.error}</p>
        </div>
      )}

      {state?.success && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
          <CheckCircle size={20} weight="fill" className="shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Transfer Successful!</p>
            <p className="opacity-90">Funds have been moved securely.</p>
          </div>
        </div>
      )}

      {/* 5. Submit Button */}
      <SubmitButton />
    </form>
  );
}

// Sub-component for pending state
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full h-14 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <CircleNotch size={24} className="animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <PaperPlaneRight size={22} weight="fill" />
          Transfer Funds
        </>
      )}
    </Button>
  );
}
