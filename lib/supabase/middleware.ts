import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = request.nextUrl;

  // --- 1. Define Public Paths ---
  // Public paths list removed; access control handled by protected route checks.
  // --- 2. Define Protected Paths ---
  const isProtectedRoute = pathname.startsWith('/protected');

  // --- 3. Redirect Logic ---

  // RULE A: User is NOT logged in
  if (!session) {
    // If user is not logged in and tries to access a protected route
    if (isProtectedRoute) {
      // Redirect to login
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    // Otherwise, allow access (to public pages like homepage, login, etc.)
    return supabaseResponse;
  }

  // RULE B: User IS logged in
  if (session) {
    // If user is logged in and tries to access login/signup pages,
    // redirect them to their dashboard.
    if (
      pathname.startsWith('/auth/login') ||
      pathname.startsWith('/auth/sign-up')
    ) {
      return NextResponse.redirect(new URL('/protected', request.url));
    }
    // Otherwise, allow access to all other pages (including public and protected)
    return supabaseResponse;
  }

  return supabaseResponse;
}
