import { NextRequest, NextResponse } from 'next/server'; // Correct import
import { updateSession } from '@/lib/supabase/middleware'; // Ensure correct import path

export async function middleware(request: NextRequest) {
  try {
    // Calling the updateSession to refresh or validate the session
    const response = await updateSession(request);
    console.log('Session updated: ', response);

    // Proceed with further logic after session is updated
    return response;
  } catch (error) {
    console.error('Middleware session error: ', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)'],
};
