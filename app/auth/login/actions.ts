'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const login = async (prevState: any, formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Return a state object with the error message
    return {
      error: 'Could not authenticate user. Please check your credentials.',
    };
  }

  // On success, redirect to the protected dashboard
  return redirect('/protected');
};
