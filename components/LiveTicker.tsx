export default function LiveTicker() {
  const tickerData = [
    { symbol: 'BTC/USD', price: '68,450.20', change: '+2.3%', dir: 'up' },
    { symbol: 'EUR/USD', price: '1.0850', change: '-0.1%', dir: 'down' },
    { symbol: 'S&P 500', price: '5,305.10', change: '-0.2%', dir: 'down' },
    { symbol: 'GOLD', price: '2,350.70', change: '+0.5%', dir: 'up' },
    { symbol: 'USD/JPY', price: '155.40', change: '+0.4%', dir: 'up' },
  ];

  // Smooth infinite loop
  const items = [...tickerData, ...tickerData, ...tickerData, ...tickerData];

  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-brand-cream via-white/60 to-brand-cream dark:from-carbon-grey dark:via-carbon-black/80 dark:to-carbon-grey border-y border-brand-olive-med/5 dark:border-white/5 transition-colors backdrop-blur-sm">
      <div className="flex whitespace-nowrap animate-ticker py-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-2 mx-8 text-sm font-medium text-brand-olive-dark dark:text-titanium"
          >
            <span className="font-bold">{item.symbol}</span>
            <span>{item.price}</span>
            <span
              className={`text-xs ${
                item.dir === 'up'
                  ? 'text-brand-teal dark:text-neon-blue'
                  : 'text-red-500 dark:text-neon-flame'
              }`}
            >
              ({item.change})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
