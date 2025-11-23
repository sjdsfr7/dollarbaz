export default function ProblemSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-brand-cream via-brand-offwhite to-brand-offwhite dark:from-carbon-grey dark:to-carbon-black relative transition-colors duration-500">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <div className="relative">
            <div className="absolute inset-0 bg-brand-teal/5 dark:bg-neon-blue/5 rounded-full blur-3xl transform -translate-y-4"></div>
            <div className="relative grid grid-cols-2 gap-4">
              {[
                {
                  icon: 'ph-bank',
                  color: 'text-brand-sage dark:text-neon-flame',
                  rotate: 'rotate-2',
                },
                {
                  icon: 'ph-currency-btc',
                  color: 'text-brand-olive-med dark:text-neon-blue',
                  rotate: '-rotate-2',
                },
                {
                  icon: 'ph-credit-card',
                  color: 'text-brand-teal dark:text-neon-purple',
                  rotate: '-rotate-3',
                },
                {
                  icon: 'ph-chart-line-up',
                  color: 'text-brand-olive-dark dark:text-titanium',
                  rotate: 'rotate-1',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`bg-white dark:bg-[#1a212b] p-6 rounded-2xl shadow-sm border border-brand-olive-med/10 dark:border-white/5 flex flex-col items-center justify-center h-32 transition-colors ${
                    item.rotate
                  } ${i > 1 ? 'mt-0' : 'mt-8'}`}
                >
                  <i
                    className={`ph-duotone ${item.icon} text-4xl mb-2 ${item.color}`}
                  ></i>
                  <div className="h-2 w-12 bg-gray-100 dark:bg-white/10 rounded-full"></div>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white/90 dark:bg-carbon-black/90 backdrop-blur-sm border border-red-200 dark:border-neon-flame px-6 py-2 rounded-full font-bold text-red-500 dark:text-neon-flame dark:shadow-[0_0_20px_rgba(255,94,58,0.3)] transform rotate-12 transition-all">
                FRAGMENTED
              </div>
            </div>
          </div>

          {/* Copy */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-olive-dark dark:text-white mb-6">
              Money is Fragmented.
              <br />
              <span className="text-brand-olive-med/60 dark:text-gray-500">
                It Shouldn’t Be.
              </span>
            </h2>
            <ul className="space-y-4">
              {[
                'Your money lives in 7–12 apps.',
                "Banks don't talk to trading accounts.",
                "Wealth isn't coordinated.",
                'Your AI advisor is nonexistent.',
              ].map((text, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-lg text-brand-olive-med dark:text-gray-400"
                >
                  <i className="ph-fill ph-x-circle text-red-500 dark:text-neon-flame text-xl"></i>{' '}
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
