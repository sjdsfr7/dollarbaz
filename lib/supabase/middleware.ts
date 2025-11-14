import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
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
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // --- Redirect logic from template ---
  // if user is not signed in and not trying to access auth pages, redirect to login
  if (!user && !pathname.startsWith('/auth')) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  // if user is signed in and on auth pages, redirect to dashboard
  if (user && pathname.startsWith('/auth')) {
    const url = request.nextUrl.clone();
    url.pathname = '/protected'; // or your dashboard path
    return NextResponse.redirect(url);
  }

  // if user is signed in and on root, redirect to dashboard
  if (user && pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/protected'; // or your dashboard path
    return NextResponse.redirect(url);
  }

  // --- THIS WAS THE BUG ---
  // The original template *only* protected the root route.
  // We need to allow non-logged-in users to *see* the homepage.

  // --- OUR NEW LOGIC ---
  // If the user is not logged in, and is on the homepage, let them stay.
  if (!user && pathname === '/') {
    return response;
  }

  // If the user is not logged in, but is on a protected page, redirect
  if (!user && pathname.startsWith('/protected')) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  return response;
}
