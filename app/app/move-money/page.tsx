import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/card';
import { TransferForm } from './transfer-form'; // We will create this next
import {
  ArrowsLeftRight,
  Info,
  ShieldCheck,
  TrendUp,
} from '@phosphor-icons/react/dist/ssr';

export default async function MoveMoneyPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Fetch accounts for the selector
  const { data: accounts } = await supabase
    .from('accounts')
    .select('id, name, type, balance, currency, icon_type')
    .eq('user_id', user.id)
    .order('name');

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
          <ArrowsLeftRight size={22} weight="bold" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-poppins text-foreground">
            Move Money
          </h1>
          <p className="text-sm text-muted-foreground">
            Internal transfers, wires, and payments.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* LEFT & MIDDLE: The Transfer Interface */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 border-black/5 dark:border-white/10 shadow-sm">
            {/* Client Component for Interactivity */}
            <TransferForm accounts={accounts || []} />
          </Card>
        </div>

        {/* RIGHT: AI Context & Summary */}
        <div className="space-y-6">
          {/* AI Insight Card */}
          <Card className="p-5 bg-gradient-to-br from-[#4e594a] to-[#3a4436] dark:from-[#1a232e] dark:to-black text-white border-0 shadow-md">
            <div className="flex items-start gap-3">
              <Info size={24} className="text-emerald-400 mt-1" />
              <div>
                <h3 className="font-bold text-sm mb-1">AI Optimization</h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Moving funds from <strong>Chase Main</strong> to{' '}
                  <strong>Savings</strong>? Doing this on Fridays usually
                  captures weekend interest accrual.
                </p>
              </div>
            </div>
          </Card>

          {/* Limits & Security */}
          <Card className="p-5 border-black/5 dark:border-white/10 shadow-sm">
            <h3 className="font-bold text-sm text-foreground mb-4 flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-600" /> Security &
              Limits
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Daily Limit</span>
                <span className="font-medium text-foreground">$50,000.00</span>
              </div>
              <div className="w-full bg-black/5 dark:bg-white/10 h-1.5 rounded-full">
                <div
                  className="bg-emerald-500 h-1.5 rounded-full"
                  style={{ width: '12%' }}
                ></div>
              </div>
              <p className="text-[10px] text-muted-foreground text-right">
                $6,200 used today
              </p>
            </div>
          </Card>

          {/* FX Rate Preview (Static for V1) */}
          <Card className="p-5 border-black/5 dark:border-white/10 shadow-sm opacity-75">
            <h3 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
              <TrendUp size={16} className="text-blue-500" /> Live Rates
            </h3>
            <div className="flex justify-between items-center p-2 bg-black/5 dark:bg-white/5 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-lg">🇺🇸</span>
                <ArrowsLeftRight size={14} className="text-muted-foreground" />
                <span className="text-lg">🇪🇺</span>
              </div>
              <span className="text-sm font-mono font-bold">1.082 USD/EUR</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
