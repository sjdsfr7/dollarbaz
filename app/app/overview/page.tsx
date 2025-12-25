import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowUpRight,
  Wallet,
  Bank,
  ChartLineUp,
  Brain,
  ShieldWarning,
  HourglassMedium,
  CheckCircle,
} from '@phosphor-icons/react/dist/ssr';

// --- Data Types (Matches your SQL) ---
type AccountType = 'bank' | 'brokerage' | 'wallet' | 'other'; // Simplified enum mapping
type TransactionDirection = 'inflow' | 'outflow';

export default async function DashboardPage() {
  const supabase = await createClient();

  // 1. Auth Check (Fastest possible check)
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null; // Layout handles redirect

  // 2. Parallel Data Fetching (Maximum Performance)
  // We explicitly select only needed columns to reduce payload size
  const [accountsRes, transactionsRes, profileRes] = await Promise.all([
    supabase
      .from('accounts')
      .select('id, name, type, currency, balance, status')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .order('balance', { ascending: false }),

    supabase
      .from('transactions')
      .select(
        'id, description, amount, currency, direction, kind, executed_at, category',
      )
      .eq('user_id', user.id)
      .order('executed_at', { ascending: false })
      .limit(7),

    supabase
      .from('profiles')
      .select('risk_profile, kyc_status')
      .eq('user_id', user.id)
      .single(),
  ]);

  const accounts = accountsRes.data || [];
  const transactions = transactionsRes.data || [];
  const profile = profileRes.data;

  // 3. Computed Metrics (Business Logic)

  // Net Worth Calculation
  const totalBalance = accounts.reduce(
    (sum, acc) => sum + Number(acc.balance),
    0,
  );

  // Liquid Cash (Bank + Wallets)
  const liquidBalance = accounts
    .filter((a) => ['bank', 'wallet'].includes(a.type as string))
    .reduce((sum, acc) => sum + Number(acc.balance), 0);

  // Formatting helpers
  const fmtCurrency = (val: number, curr = 'USD') =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: curr,
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      {/* A) STATUS STRIP - High Level Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Net Worth Card */}
        <Card className="p-5 border-black/5 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group bg-white dark:bg-[#1a232e]">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
              Net Worth
            </span>
            <Badge
              variant="outline"
              className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-0 flex gap-1 items-center"
            >
              <ArrowUpRight weight="bold" /> 2.4%
            </Badge>
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold font-poppins text-foreground">
              {fmtCurrency(totalBalance)}
            </h2>
            <p className="text-xs text-muted-foreground mt-1 font-medium">
              Liquid: {fmtCurrency(liquidBalance)}
            </p>
          </div>
          {/* Decorative Sparkline (CSS only) */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
        </Card>

        {/* Runway Card */}
        <Card className="p-5 border-black/5 dark:border-white/10 shadow-sm bg-white dark:bg-[#1a232e]">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
              Runway
            </span>
            <HourglassMedium
              size={18}
              className="text-muted-foreground/70"
              weight="duotone"
            />
          </div>
          <h2 className="text-3xl font-bold font-poppins text-foreground">
            6.2 Mo
          </h2>
          <div className="w-full bg-black/5 dark:bg-white/10 h-1.5 rounded-full mt-3 mb-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
              style={{ width: '62%' }}
            ></div>
          </div>
          <p className="text-[10px] text-muted-foreground">
            Burn rate: $4.2k / mo
          </p>
        </Card>

        {/* Risk Score Card */}
        <Card className="p-5 border-black/5 dark:border-white/10 shadow-sm bg-white dark:bg-[#1a232e]">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
              Risk Score
            </span>
            <ShieldWarning
              size={18}
              className="text-amber-500"
              weight="duotone"
            />
          </div>
          <h2 className="text-3xl font-bold font-poppins text-foreground capitalize">
            {profile?.risk_profile?.replace('_', ' ') || 'Moderate'}
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            KYC:{' '}
            <span className="capitalize text-foreground font-medium">
              {profile?.kyc_status?.replace('_', ' ') || 'Pending'}
            </span>
          </p>
        </Card>

        {/* AI Brain Status Card - The "Alive" Component */}
        <Card className="p-5 bg-[#4e594a] dark:bg-black border-black/5 dark:border-white/10 shadow-md text-white relative overflow-hidden group cursor-pointer">
          {/* Background Animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute -top-6 -right-6 text-white/5 group-hover:text-emerald-400/10 transition-colors duration-500 transform rotate-12">
            <Brain size={100} weight="fill" />
          </div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-bold uppercase text-white/70 tracking-wider">
                AI Brain
              </span>
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
              </span>
            </div>
            <div className="space-y-1 mt-4">
              <div className="flex items-center gap-2">
                <CheckCircle
                  weight="fill"
                  className="text-emerald-400"
                  size={14}
                />
                <p className="text-sm font-semibold">3 Rules Active</p>
              </div>
              <p className="text-xs text-white/60 pl-5.5">
                Monitoring FX & Tax Buffer
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* B) MAIN GRID LAYOUT */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT COL: MONEY MAP (Accounts) */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-black/5 dark:border-white/10 overflow-hidden shadow-sm bg-white dark:bg-[#1a232e]">
            <div className="px-5 py-3.5 border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] flex justify-between items-center">
              <h3 className="font-bold text-sm text-foreground">Money Map</h3>
              <button className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
                Manage
              </button>
            </div>
            <div className="divide-y divide-black/5 dark:divide-white/5">
              {accounts.length > 0 ? (
                accounts.map((acc: any) => (
                  <div
                    key={acc.id}
                    className="px-5 py-4 flex items-center justify-between hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      {/* Dynamic Icons based on Account Type */}
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                          acc.type === 'bank'
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                            : acc.type === 'brokerage'
                            ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600'
                        }`}
                      >
                        {acc.type === 'bank' && (
                          <Bank weight="fill" size={20} />
                        )}
                        {acc.type === 'brokerage' && (
                          <ChartLineUp weight="fill" size={20} />
                        )}
                        {acc.type === 'wallet' && (
                          <Wallet weight="fill" size={20} />
                        )}
                        {!['bank', 'brokerage', 'wallet'].includes(
                          acc.type,
                        ) && <Wallet weight="fill" size={20} />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                          {acc.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">
                          {acc.type}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-foreground">
                        {fmtCurrency(Number(acc.balance), acc.currency)}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {acc.currency}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    No accounts connected
                  </p>
                  <button className="text-xs font-semibold text-emerald-600 border border-emerald-600/20 px-3 py-1.5 rounded-full hover:bg-emerald-50">
                    Connect Account
                  </button>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* MIDDLE COL: UNIFIED TIMELINE (Transactions) */}
        <div className="lg:col-span-2">
          <Card className="border-black/5 dark:border-white/10 h-full flex flex-col shadow-sm bg-white dark:bg-[#1a232e]">
            <div className="px-5 py-4 border-b border-black/5 dark:border-white/5 flex justify-between items-center bg-black/[0.01] dark:bg-white/[0.01]">
              <div>
                <h3 className="font-bold text-sm flex items-center gap-2 text-foreground">
                  Unified Timeline
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Real-time ledger of all activity
                </p>
              </div>
              {/* Tiny Filter Pills (Static for now) */}
              <div className="hidden sm:flex gap-1">
                <span className="px-2 py-1 rounded text-[10px] font-semibold bg-black/5 dark:bg-white/10 text-foreground">
                  All
                </span>
                <span className="px-2 py-1 rounded text-[10px] font-medium text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors">
                  AI
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-auto max-h-[500px]">
              <div className="divide-y divide-black/5 dark:divide-white/5">
                {transactions.length > 0 ? (
                  transactions.map((tx: any) => {
                    // Logic for formatting based on direction
                    const isOutflow = tx.direction === 'outflow';
                    const isPositive = !isOutflow;
                    const isAIRule = tx.category === 'AI Action'; // Simple tag detection

                    return (
                      <div
                        key={tx.id}
                        className={`px-5 py-4 flex gap-4 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors group ${
                          isAIRule
                            ? 'bg-emerald-50/50 dark:bg-emerald-900/10'
                            : ''
                        }`}
                      >
                        {/* Time Column */}
                        <div className="flex flex-col items-center pt-1 w-12 shrink-0">
                          <span className="text-[10px] text-muted-foreground font-mono font-medium mb-1">
                            {new Date(tx.executed_at).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          {isAIRule ? (
                            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 shadow-sm">
                              <Brain weight="fill" size={14} />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-muted-foreground group-hover:bg-white group-hover:shadow-sm transition-all">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  isPositive ? 'bg-emerald-500' : 'bg-rose-500'
                                }`}
                              />
                            </div>
                          )}
                        </div>

                        {/* Details Column */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <p className="text-sm font-bold text-foreground truncate pr-4">
                              {tx.description || 'Unknown Transaction'}
                            </p>
                            <span
                              className={`text-sm font-bold whitespace-nowrap ${
                                isPositive
                                  ? 'text-emerald-600 dark:text-emerald-400'
                                  : 'text-foreground'
                              }`}
                            >
                              {isPositive ? '+' : '-'}
                              {fmtCurrency(Number(tx.amount), tx.currency)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                            {isAIRule && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                                AI RULE
                              </span>
                            )}
                            <span className="text-xs text-muted-foreground capitalize bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                              {tx.kind?.replace('_', ' ') || 'General'}
                            </span>
                            {tx.category && !isAIRule && (
                              <span className="text-xs text-muted-foreground border-l border-black/10 dark:border-white/10 pl-2">
                                {tx.category}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-10 text-center flex flex-col items-center justify-center text-muted-foreground">
                    <HourglassMedium size={24} className="mb-2 opacity-20" />
                    <p className="text-sm">No recent activity</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
