'use server';

import { headers } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const signup = async (_prevState: unknown, formData: FormData) => {
  const origin = (await headers()).get('origin');
  void _prevState;

  // --- 1. Get Turnstile token and secret key ---
  const turnstileToken = formData.get('cf-turnstile-response') as string;
  const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!turnstileToken) {
    return {
      error: 'CAPTCHA challenge failed. Please try again.',
    };
  }

  try {
    // --- 2. Verify the Turnstile token with Cloudflare ---
    const verifyUrl =
      'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    const res = await fetch(verifyUrl, {
      method: 'POST',
      body: `secret=${encodeURIComponent(
        turnstileSecretKey!,
      )}&response=${encodeURIComponent(turnstileToken)}`,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });

    const data = await res.json();
    if (!data.success) {
      console.error('Turnstile verification failed:', data);
      return {
        error: 'CAPTCHA verification failed. Please try again.',
      };
    }

    // --- 3. If Turnstile is valid, proceed with Supabase sign-up ---
    const firstName = formData.get('first-name') as string;
    const lastName = formData.get('last-name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const supabase = await createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/confirm`,
        data: {
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`, // Also save full_name
        },
      },
    });

    if (error) {
      return {
        error: `Could not authenticate user: ${error.message}`,
      };
    }

    return redirect('/auth/sign-up-success');
  } catch (err: unknown) {
    console.error('Sign-up action error:', err);
    return {
      error: 'An unexpected error occurred. Please try again.',
    };
  }
};
