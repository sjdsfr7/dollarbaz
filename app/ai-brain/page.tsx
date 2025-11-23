'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AIBrainPage() {
  return (
    <main className="min-h-screen bg-[#0a0e12] text-white selection:bg-neon-blue selection:text-black">
      {/* Hero */}
      <section className="pt-32 pb-24 relative overflow-hidden">
        {/* Neon Grid */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#4de3ff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage:
              'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          }}
        ></div>

        <div className="container mx-auto max-w-5xl px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-neon-blue/30 text-neon-blue text-xs font-mono mb-8 animate-pulse">
            AI_AGENT_SYSTEM_ONLINE
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight">
            The AI{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-electric-purple to-neon-flame">
              Money Brain.
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A multi-agent system coordinating your income, spending, investment,
            FX and risk 24/7. It never sleeps, so your money never sits idle.
          </p>
        </div>
      </section>

      {/* Section 1: Capabilities */}
      <section className="py-24 border-y border-white/5 bg-[#12181f]">
        <div className="container mx-auto max-w-6xl px-4 grid md:grid-cols-3 gap-12 text-center">
          <CapabilityBlock
            title="Understands Context"
            desc="It knows your full financial graph: cash, debt, upcoming bills, and risk tolerance."
            icon="ph-graph"
          />
          <CapabilityBlock
            title="Runs Strategies"
            desc="Executes complex automations like profit sweeping and FX hedging automatically."
            icon="ph-lightning"
          />
          <CapabilityBlock
            title="Explains Decisions"
            desc="Every action comes with a plain-English explanation. No black boxes."
            icon="ph-chat-centered-text"
          />
        </div>
      </section>

      {/* Section 2: The Agents */}
      <section className="py-32 container mx-auto max-w-6xl px-4">
        <h2 className="text-4xl font-bold text-center mb-16">
          Meet Your Agents
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <AgentCard
            title="Income Agent"
            role="Detects inflows, sorts taxes, routes to savings."
            icon="ph-money"
            color="text-neon-blue"
          />
          <AgentCard
            title="Spend Agent"
            role="Monitors burn rate, flags anomalies, forecasts runway."
            icon="ph-credit-card"
            color="text-neon-flame"
          />
          <AgentCard
            title="FX Agent"
            role="Watches rates, converts currencies at optimal times."
            icon="ph-currency-circle-dollar"
            color="text-electric-purple"
          />
          <AgentCard
            title="Investing Agent"
            role="Rebalances portfolio, executes DCA strategies."
            icon="ph-trend-up"
            color="text-green-400"
          />
          <AgentCard
            title="Risk Agent"
            role="Alerts on exposure, liquidity crunches, or volatility."
            icon="ph-shield-warning"
            color="text-yellow-400"
          />
          <AgentCard
            title="Business Agent"
            role="Manages payroll, invoices, and tax provisioning."
            icon="ph-briefcase"
            color="text-white"
          />
        </div>
      </section>

      {/* Section 3: Command Bar Demo */}
      <section className="py-32 bg-gradient-to-b from-[#12181f] to-[#0a0e12] relative">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Just tell it what to do.</h2>

          <div className="bg-[#0a0e12] border border-white/10 rounded-2xl p-8 shadow-2xl text-left relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue to-neon-flame"></div>

            {/* Input */}
            <div className="flex items-center gap-4 text-xl font-mono text-gray-400 mb-8">
              <span className="text-neon-blue">❯</span>
              <span className="text-white">
                Optimize my money for living in Thailand 3 months.
              </span>
              <span className="w-3 h-6 bg-neon-blue animate-pulse"></span>
            </div>

            {/* Plan Response */}
            <div className="space-y-4 pl-8 border-l border-white/10">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <i className="ph-fill ph-check-circle text-green-500"></i>
                <span>Analyzing last 12 months of spending...</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <i className="ph-fill ph-check-circle text-green-500"></i>
                <span>
                  Allocating <strong>$4,500 USD</strong> to THB Vault (Rate:
                  35.2)
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <i className="ph-fill ph-check-circle text-green-500"></i>
                <span>
                  Setting daily spend limit to <strong>3,000 THB</strong>
                </span>
              </div>
              <div className="p-4 bg-white/5 rounded-lg border border-white/10 mt-4">
                <p className="text-sm text-gray-400">
                  <strong>Plan Ready:</strong> Shall I execute this strategy?
                </p>
                <div className="flex gap-3 mt-3">
                  <Button
                    size="sm"
                    className="bg-neon-blue text-black hover:bg-white"
                  >
                    Execute
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/20 hover:bg-white/10"
                  >
                    Adjust
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center">
        <h2 className="text-3xl font-bold mb-8">
          It’s time to automate your wealth.
        </h2>
        <div className="flex justify-center gap-4">
          <Link href="/os">
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              Back to OS
            </Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button className="bg-neon-blue text-black hover:bg-white px-8 rounded-full">
              Join AI Early Access
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

interface CapabilityBlockProps {
  title: string;
  desc: string;
  icon: string;
}

function CapabilityBlock({ title, desc, icon }: CapabilityBlockProps) {
  return (
    <div className="p-6">
      <div className="w-16 h-16 mx-auto bg-white/5 rounded-2xl flex items-center justify-center text-3xl text-neon-blue mb-6">
        <i className={`ph-duotone ${icon}`}></i>
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}

interface AgentCardProps {
  title: string;
  role: string;
  icon: string;
  color: string;
}

function AgentCard({ title, role, icon, color }: AgentCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-[#1a232e] border border-white/5 hover:border-neon-blue/50 transition-colors group">
      <div
        className={`w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-2xl mb-4 ${color}`}
      >
        <i className={`ph-fill ${icon}`}></i>
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{role}</p>
    </div>
  );
}
