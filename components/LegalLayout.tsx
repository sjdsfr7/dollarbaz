import { ReactNode } from 'react';

type LegalLayoutProps = {
  title: string;
  lastUpdated: string | Date;
  children: ReactNode;
};

export default function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <main className="min-h-screen bg-brand-offwhite dark:bg-carbon-black pt-32 pb-20 transition-colors">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="mb-12 border-b border-brand-olive-med/10 dark:border-white/10 pb-8">
          <h1 className="text-4xl font-bold text-brand-olive-dark dark:text-white mb-4">
            {title}
          </h1>
          <p className="text-brand-olive-med dark:text-gray-500">
            Last updated: {lastUpdated instanceof Date ? lastUpdated.toLocaleDateString() : lastUpdated}
          </p>
        </div>
        <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:text-brand-olive-dark dark:prose-headings:text-white text-brand-olive-med dark:text-gray-400">
          {children}
        </div>
      </div>
    </main>
  );
}
