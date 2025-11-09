import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

// Create Supabase client
export const createClient = (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        ); // Removed 'options' since it's not being used
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(
          ({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options), // You can keep 'options' here if necessary
        );
      },
    },
  });

  return { supabase, supabaseResponse };
};

// The updateSession function that could be used to update or refresh the session
export const updateSession = async (request: NextRequest) => {
  const { supabase } = createClient(request);

  // Attempt to get the current session from cookies
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    console.error('Session error: ', error);
    throw new Error('Session not found or expired');
  }

  // Here you could update the session or refresh it if needed
  // For example, refreshing the session data
  const { data, error: updateError } = await supabase.auth.refreshSession();

  if (updateError) {
    console.error('Session refresh failed: ', updateError);
    throw new Error('Failed to refresh session');
  }

  return data;
};
