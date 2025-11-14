import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Allow any origin
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
};

// Define the shape of the data we'll return
type TickerItem = {
  symbol: string;
  price: string;
  change: string;
  dir: 'up' | 'down';
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 1. Get the API Key from Supabase Secrets
    const financialApiKey = Deno.env.get('FINANCIAL_API_KEY');
    if (!financialApiKey) {
      throw new Error('FINANCIAL_API_KEY not set in Supabase Secrets');
    }

    // 2. Create a Supabase client to use the cache
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const cacheKey = 'market_data_cache';
    const fiveMinutesInSeconds = 5 * 60;

    // 3. Try to get data from cache first
    const { data: cachedData, error: cacheError } = await supabaseClient
      .from('cache')
      .select('data, created_at')
      .eq('key', cacheKey)
      .single();

    if (cachedData && !cacheError) {
      const createdAt = new Date(cachedData.created_at).getTime();
      const now = new Date().getTime();
      // Check if cache is fresh (less than 5 minutes old)
      if (now - createdAt < fiveMinutesInSeconds * 1000) {
        return new Response(JSON.stringify(cachedData.data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // 4. If cache is stale or non-existent, fetch new data
    const apiUrl = `https://financialmodelingprep.com/api/v3/quote/BTCUSD,ETHUSD,EURUSD,USDJPY,^GSPC,GCUSD?apikey=${financialApiKey}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch from FMP API: ${response.statusText}`);
    }
    const apiData = await response.json();

    // 5. Format the data to match our TickerItem type
    const formattedData: TickerItem[] = apiData.map((item: any) => ({
      symbol:
        item.symbol === '^GSPC'
          ? 'S&P 500'
          : item.symbol === 'GCUSD'
          ? 'GOLD'
          : item.symbol.replace('USD', '/USD'),
      price: item.price.toFixed(2),
      change: `${item.changesPercentage.toFixed(2)}%`,
      dir: item.changesPercentage >= 0 ? 'up' : 'down',
    }));

    // 6. Save the new data to the cache in Supabase
    // We use .upsert() to create or update the cache entry
    await supabaseClient
      .from('cache')
      .upsert({ key: cacheKey, data: formattedData });

    // 7. Return the new data
    return new Response(JSON.stringify(formattedData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});

/*
NOTE: For the Supabase cache to work, you MUST create a table named "cache".
Run this SQL in your Supabase SQL Editor:

CREATE TABLE public.cache (
  key TEXT PRIMARY KEY,
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.cache ENABLE ROW LEVEL SECURITY;

-- Allow public read-only access to the cache
CREATE POLICY "Allow public read-only access"
ON public.cache
FOR SELECT
USING (true);

-- Allow server-side (anon key) to write to the cache
CREATE POLICY "Allow anon write access"
ON public.cache
FOR INSERT
WITH CHECK (true);

-- Allow server-side (anon key) to update the cache
CREATE POLICY "Allow anon update access"
ON public.cache
FOR UPDATE
USING (true);
*/
