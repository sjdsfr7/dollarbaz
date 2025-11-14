'use server';

import { headers } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const signup = async (_prevState: unknown, formData: FormData) => {
  const origin = (await headers()).get('origin');

  // 1. Get the token from the form
  // This comes from the <Turnstile> component in your page.tsx
  const turnstileToken = formData.get('cf-turnstile-response') as string;

  if (!turnstileToken) {
    return {
      error: 'CAPTCHA challenge is missing. Please refresh and try again.',
    };
  }

  // 2. Get the rest of the form data
  const firstName = formData.get('first-name') as string;
  const lastName = formData.get('last-name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const supabase = await createClient();

  // 3. Call Supabase auth.signUp and *include the captchaToken*
  // This is the entire fix. We let Supabase verify the token.
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/confirm`,
      data: {
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`,
      },
      // THIS IS THE FIX:
      // Pass the token to Supabase. Supabase will use the
      // Secret Key you saved in its dashboard to verify it.
      captchaToken: turnstileToken,
    },
  });

  if (error) {
    // Supabase will now return the "captcha verification failed"
    // error if it fails, or any other error (like "user already exists").
    return {
      error: error.message,
    };
  }

  // Success!
  return redirect('/auth/sign-up-success');
};
