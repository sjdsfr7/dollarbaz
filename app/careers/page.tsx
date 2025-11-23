'use client';

import { Button } from '@/components/ui/button';

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-brand-offwhite dark:bg-carbon-black pt-32 pb-20 transition-colors">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-brand-olive-dark dark:text-white mb-6">
            Help build the Financial OS.
          </h1>
          <p className="text-xl text-brand-olive-med dark:text-gray-400">
            We’re a small, sharp team building big infrastructure. Remote-first,
            async-friendly.
          </p>
        </div>

        <div className="bg-white dark:bg-[#12181f] rounded-3xl p-8 md:p-12 border border-brand-olive-med/10 dark:border-white/5">
          <h2 className="text-2xl font-bold mb-8 text-brand-olive-dark dark:text-white">
            Open Roles
          </h2>

          <div className="space-y-4">
            <JobRow
              title="Senior Frontend Engineer"
              team="Product"
              type="Remote"
            />
            <JobRow title="AI / ML Engineer" team="Data" type="Remote" />
            <JobRow title="Founding Designer" team="Design" type="Remote" />
            <JobRow
              title="Compliance Lead"
              team="Legal"
              type="London / Remote"
            />
          </div>

          <div className="mt-12 pt-8 border-t border-brand-olive-med/10 dark:border-white/5 text-center">
            <p className="text-brand-olive-med dark:text-gray-400 mb-4">
              Don&apos;t see a fit? We&apos;re always looking for talent.
            </p>
            <Button variant="outline" className="rounded-full">
              Email us your portfolio
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

interface JobRowProps {
  title: string;
  team: string;
  type: string;
}

function JobRow({ title, team, type }: JobRowProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-brand-offwhite dark:hover:bg-white/5 transition-colors cursor-pointer group">
      <div>
        <h3 className="font-bold text-lg text-brand-olive-dark dark:text-white group-hover:text-brand-teal dark:group-hover:text-neon-blue transition-colors">
          {title}
        </h3>
        <div className="flex gap-2 text-sm text-brand-olive-med dark:text-gray-500 mt-1">
          <span>{team}</span> • <span>{type}</span>
        </div>
      </div>
      <i className="ph-bold ph-arrow-right text-brand-olive-med dark:text-gray-600 group-hover:translate-x-1 transition-transform"></i>
    </div>
  );
}
