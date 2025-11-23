'use client';

import { useEffect, useState } from 'react';
// Import the client-side Supabase client creator
import { createClient } from '@/lib/supabase/client';

// Define the shape of our data (must match the Edge Function)
type TickerItem = {
  symbol: string;
  price: string;
  change: string;
  dir: 'up' | 'down';
};

// Initial data from the draft, used for loading/fallback
// This ensures the ticker is NEVER empty
const staticData: TickerItem[] = [
  { symbol: 'BTC/USD', price: '68,450.20', change: '+2.3%', dir: 'up' },
  { symbol: 'ETH/USD', price: '3,780.90', change: '+1.8%', dir: 'up' },
  { symbol: 'EUR/USD', price: '1.0850', change: '-0.1%', dir: 'down' },
  { symbol: 'USD/JPY', price: '155.40', change: '+0.4%', dir: 'up' },
  { symbol: 'S&P 500', price: '5,305.10', change: '-0.2%', dir: 'down' },
  { symbol: 'GOLD', price: '2,350.70', change: '+0.5%', dir: 'up' },
  { symbol: 'GBP/USD', price: '1.2730', change: '+0.1%', dir: 'up' },
  { symbol: 'AAPL', price: '189.80', change: '-0.5%', dir: 'down' },
];

export default function LiveTicker() {
  // Start with static data so the component is never "stuck" empty
  const [tickerData, setTickerData] = useState<TickerItem[]>(staticData);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const supabase = createClient();

        // Invoke the Edge Function
        const { data, error } = await supabase.functions.invoke(
          'get-market-data',
        );

        if (error) {
          throw error;
        }

        // Only update if we actually got valid array data
        if (data && Array.isArray(data) && data.length > 0) {
          setTickerData(data);
        }
      } catch (error) {
        // Use a warning so we know it failed, but don't break the UI
        // The static data will persist
        console.warn(
          'Live Ticker: Using static data due to fetch error.',
          error,
        );
      }
    };

    // Fetch immediately on load
    fetchMarketData();

    // Optional: Refresh data every 60 seconds to keep it "live"
    const interval = setInterval(fetchMarketData, 60000);
    return () => clearInterval(interval);
  }, []);

  // Duplicate the array for a seamless infinite scroll loop
  // Tripling it ensures there's enough content to scroll smoothly on wide screens
  const tickerItems = [...tickerData, ...tickerData, ...tickerData];

  return (
    <div className="ticker-wrap w-full overflow-hidden bg-white/50 py-3 border-y border-gray-200/50">
      <div className="ticker flex whitespace-nowrap animate-[ticker-scroll_40s_linear_infinite] hover:[animation-play-state:paused]">
        {tickerItems.map((item, index) => (
          <div
            key={`${item.symbol}-${index}`}
            className="ticker-item mx-8 inline-flex items-center text-sm"
          >
            <strong className="font-poppins font-semibold text-gray-900 mr-2">
              {item.symbol}
            </strong>
            <span className="text-gray-700 mr-2">{item.price}</span>
            <span
              className={`font-medium ${
                item.dir === 'up' ? 'text-green-600' : 'text-red-600'
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
