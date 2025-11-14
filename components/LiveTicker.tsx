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
const staticData: TickerItem[] = [
  { symbol: 'BTC/USD', price: '68,450.20', change: '+2.3%', dir: 'up' },
  { symbol: 'ETH/USD', price: '3,780.90', change: '+1.8%', dir: 'up' },
  { symbol: 'EUR/USD', price: '1.0850', change: '-0.1%', dir: 'down' },
  { symbol: 'USD/JPY', price: '155.40', change: '+0.4%', dir: 'up' },
  { symbol: 'S&P 500', price: '5,305.10', change: '-0.2%', dir: 'down' },
  { symbol: 'GOLD', price: '2,350.70', change: '+0.5%', dir: 'up' },
];

export default function LiveTicker() {
  const [tickerData, setTickerData] = useState<TickerItem[]>(staticData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setIsLoading(true);
        // 1. Create the Supabase client
        const supabase = createClient();

        // 2. Invoke the Edge Function
        const { data, error } = await supabase.functions.invoke(
          'get-market-data', // This is the function name
        );

        if (error) {
          throw error;
        }

        // 3. Set the new data if it's valid
        if (data && Array.isArray(data) && data.length > 0) {
          setTickerData(data);
        }
      } catch (error) {
        console.error('Error fetching ticker data:', error);
        // If there's an error, we just keep the static data
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  // Duplicate the array for a seamless loop
  const tickerItems = [...tickerData, ...tickerData];

  return (
    <div className="ticker-wrap w-full overflow-hidden bg-white/50 py-4 border-t border-b border-gray-200/50">
      <div
        className={`ticker flex whitespace-nowrap ${
          isLoading
            ? 'animate-pulse'
            : 'animate-[ticker-scroll_30s_linear_infinite]'
        }`}
      >
        {tickerItems.map((item, index) => (
          <div
            key={index}
            className="ticker-item mx-6 inline-block text-sm text-gray-900"
          >
            <strong className="font-poppins">{item.symbol}</strong>
            <span className="ml-2">{item.price}</span>
            <span
              className={`ml-1.5 ${
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
