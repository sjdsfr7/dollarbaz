import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/card';
import { TransferForm } from './transfer-form';
import {
  ArrowsLeftRight,
  Info,
  ShieldCheck,
  TrendUp,
} from '@phosphor-icons/react/dist/ssr';

export const metadata = {
  title: 'Move Money | Dollarbaz OS',
  description: 'Secure internal transfers and payments.',
};

export default async function MoveMoneyPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Fetch accounts securely
  // We only need specific fields. 'type' is a USER-DEFINED enum in your schema.
  const { data: accounts } = await supabase
    .from('accounts')
    .select('id, name, type, balance, currency')
    .eq('user_id', user.id)
    .order('name');

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm border border-emerald-500/10">
          <ArrowsLeftRight size={24} weight="bold" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-poppins text-foreground">
            Move Money
          </h1>
          <p className="text-sm text-muted-foreground">
            Securely transfer funds between your accounts.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* LEFT & MIDDLE: The Interactive Form */}
        <div className="lg:col-span-2">
          <Card className="border-black/5 dark:border-white/10 shadow-sm overflow-hidden bg-white dark:bg-[#1a232e]">
            <div className="p-6 border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
              <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                Transaction Details
              </h2>
            </div>
            <div className="p-6 md:p-8">
              {/* Pass accounts to the client component */}
              <TransferForm accounts={accounts || []} />
            </div>
          </Card>
        </div>

        {/* RIGHT: Context & Helpers */}
        <div className="space-y-6">
          {/* AI Insight Card */}
          <Card className="p-5 bg-[#4e594a] dark:bg-[#0a0e12] border-black/5 dark:border-white/10 text-white shadow-md relative overflow-hidden group">
            {/* Decorative BG Icon */}
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <Info size={80} weight="fill" />
            </div>
            <div className="relative z-10 flex items-start gap-3">
              <Info
                size={24}
                className="text-emerald-400 mt-1 shrink-0"
                weight="duotone"
              />
              <div>
                <h3 className="font-bold text-sm mb-1 text-white">
                  AI Optimization
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Based on your cashflow patterns, keeping{' '}
                  <strong>$2,500</strong> in your main checking covers all
                  predicted bills for the next 14 days.
                </p>
              </div>
            </div>
          </Card>

          {/* Security Status */}
          <Card className="p-5 border-black/5 dark:border-white/10 shadow-sm bg-white dark:bg-[#1a232e]">
            <h3 className="font-bold text-sm text-foreground mb-4 flex items-center gap-2">
              <ShieldCheck
                size={18}
                className="text-emerald-600"
                weight="duotone"
              />
              Security & Limits
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Daily Limit</span>
                  <span className="font-medium text-foreground">
                    $50,000.00
                  </span>
                </div>
                <div className="w-full bg-black/5 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: '12%' }}
                  ></div>
                </div>
                <p className="text-[10px] text-muted-foreground text-right mt-1">
                  $6,200 used today
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-black/5 dark:bg-white/5 p-2 rounded-lg">
                <ShieldCheck size={14} />
                <span>Encrypted End-to-End</span>
              </div>
            </div>
          </Card>

          {/* Live Rates (Static Placeholder) */}
          <Card className="p-5 border-black/5 dark:border-white/10 shadow-sm bg-white/50 dark:bg-white/5 backdrop-blur-sm">
            <h3 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
              <TrendUp size={16} className="text-blue-500" weight="bold" /> Live
              Rates
            </h3>
            <div className="flex justify-between items-center p-3 bg-white dark:bg-black/20 rounded-lg border border-black/5 dark:border-white/5">
              <div className="flex items-center gap-2 font-medium">
                <span className="text-lg">🇺🇸</span>
                <ArrowsLeftRight size={14} className="text-muted-foreground" />
                <span className="text-lg">🇪🇺</span>
              </div>
              <span className="text-sm font-mono font-bold text-foreground">
                1.082 USD/EUR
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
