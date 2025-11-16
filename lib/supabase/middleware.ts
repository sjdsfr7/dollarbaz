import { createServerClient, type CookieOptions } from '@supabase/ssr';
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
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          supabaseResponse.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          supabaseResponse.cookies.set({ name, value: '', ...options });
        },
      },
    },
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = request.nextUrl;

  // --- 1. Define Public Paths ---
  // These paths are accessible to everyone, logged in or not.
  const publicPaths = [
    '/', // Homepage
    '/auth/login',
    '/auth/sign-up',
    '/auth/forgot-password',
    '/auth/update-password',
    '/auth/sign-up-success',
    '/auth/confirm',
  ];

  // Check if the current path is a public one
  // We use .startsWith() for /auth/confirm which might have query params
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // --- 2. Define Protected Paths ---
  const isProtectedRoute = pathname.startsWith('/protected');

  // --- 3. Redirect Logic ---

  // RULE A: User is NOT logged in
  if (!session) {
    // If user is not logged in and tries to access a protected route or a non-public page
    if (isProtectedRoute || !isPublicPath) {
      // Redirect to login
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    // Allow access to public pages like homepage, login, etc.
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
