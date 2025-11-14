'use server';

import { headers } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const signup = async (_prevState: unknown, formData: FormData) => {
  const origin = (await headers()).get('origin');

  // Get all form data
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
      // Add first_name and last_name to the user's metadata
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    // Return a state object with the error message
    return {
      error: `Could not authenticate user: ${error.message}`,
    };
  }

  // On success, redirect to the new success page
  return redirect('/auth/sign-up-success');
};
