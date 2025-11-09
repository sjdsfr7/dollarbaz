'use server';

import { createClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const signup = async (formData: FormData) => {
  const origin = (await headers()).get('origin');
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  // Note: Your form has 'password-confirm' but the template action doesn't use it.
  // We can add validation for it later if you like.
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/confirm`,
    },
  });

  if (error) {
    console.error(error);
    return redirect('/auth/sign-up?message=Could not authenticate user');
  }

  // This template requires email confirmation.
  // You can disable this in your Supabase project settings if you want.
  return redirect('/auth/sign-up-success'); // Redirect to a success page
};
