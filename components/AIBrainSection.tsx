'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function AIBrainSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Default to Light gradient logic
  let bgClass = 'bg-ai-gradient-light';
  if (mounted && theme === 'dark') {
    bgClass = 'bg-ai-gradient-dark'; // Uses CSS variable defined in tailwind config
  }

  return (
    <section
      id="ai"
      className={`py-32 relative text-white transition-all duration-700 ${bgClass}`}
    >
      {/* Masked Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="h-full w-full opacity-10"
          style={{
            backgroundImage: 'radial-gradient(#79a471 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            maskImage:
              'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
          }}
        ></div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 relative z-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="animate-in fade-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-sage/30 dark:border-neon-blue/30 text-brand-sage dark:text-neon-blue text-xs font-mono mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-sage dark:bg-neon-blue animate-pulse"></span>
              SYSTEM ONLINE
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              The AI Money Brain <br />
              That Works 24/7.
            </h2>
            <p className="text-gray-300 text-lg mb-10 leading-relaxed">
              Multi-agent architecture that proactively manages your wealth.
              From auto-hedging currency risk to optimizing yield on idle cash.
            </p>

            <div className="space-y-4">
              <AgentCard
                title="Risk Agent"
                desc="Monitoring exposure across 12 assets"
                icon="ph-shield-check"
                color="text-brand-sage dark:text-neon-purple"
              />
              <AgentCard
                title="Income Agent"
                desc="Sweeping excess cash to 4.5% Yield"
                icon="ph-money"
                color="text-brand-teal dark:text-neon-blue"
              />
            </div>
          </div>

          {/* Right: Command Center */}
          <div className="animate-in fade-in slide-in-from-right duration-700 delay-200">
            <div className="bg-[#0b120a] rounded-2xl border border-white/10 p-8 shadow-[0_0_30px_-10px_rgba(39,134,100,0.3)] dark:shadow-[0_0_30px_-10px_rgba(77,227,255,0.2)] dark:border-neon-blue/30 relative overflow-hidden group transition-all hover:scale-[1.01]">
              <div className="flex items-center justify-between mb-8">
                <div className="text-xs text-gray-500 font-mono uppercase tracking-widest flex items-center gap-2">
                  <i className="ph-fill ph-terminal-window"></i> Command Center
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 flex items-center gap-3 border border-brand-teal/30 dark:border-neon-blue/50 mb-8 transition-colors group-hover:bg-white/10">
                <i className="ph-bold ph-caret-right text-brand-teal dark:text-neon-blue"></i>
                <span className="text-gray-200 font-mono text-sm">
                  Move 15% of my USD to EUR if rate drops 1%
                  <span className="inline-block w-2 h-4 bg-brand-teal dark:bg-neon-blue ml-1 align-middle animate-neon-pulse"></span>
                </span>
              </div>

              <div className="space-y-6">
                <div className="text-xs text-gray-600 uppercase tracking-widest font-bold">
                  Recent Actions
                </div>
                <ActionItem
                  time="10:42 AM"
                  text="Moved $1,200 to Travel Vault (EUR)"
                />
                <ActionItem
                  time="09:15 AM"
                  text="Auto-invested $450 into S&P 500"
                  isOpacity
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface AgentCardProps {
  title: string;
  desc: string;
  icon: string;
  color: string;
}

function AgentCard({ title, desc, icon, color }: AgentCardProps) {
  return (
    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
      <div
        className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xl ${color}`}
      >
        <i className={`ph-duotone ${icon}`}></i>
      </div>
      <div>
        <div className="font-bold text-sm text-white">{title}</div>
        <div className="text-xs text-gray-400">{desc}</div>
      </div>
    </div>
  );
}

interface ActionItemProps {
  time: string;
  text: string;
  isOpacity?: boolean;
}

function ActionItem({ time, text, isOpacity }: ActionItemProps) {
  return (
    <div
      className={`flex gap-4 relative ${
        isOpacity ? 'opacity-50 hover:opacity-100 transition-opacity' : ''
      }`}
    >
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-brand-teal dark:bg-neon-blue"></div>
      <div className="pl-6 text-sm">
        <div className="text-gray-500 font-mono text-xs mb-1">{time}</div>
        <div className="text-gray-300">{text}</div>
      </div>
    </div>
  );
}
