'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function processTransfer(prevState: any, formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const fromAccountId = formData.get('fromAccount') as string;
  const toAccountId = formData.get('toAccount') as string;
  const amount = Number(formData.get('amount'));
  const description =
    (formData.get('description') as string) || 'Internal Transfer';

  if (!fromAccountId || !toAccountId || !amount) {
    return { error: 'Please fill in all fields' };
  }

  if (fromAccountId === toAccountId) {
    return { error: 'Cannot transfer to the same account' };
  }

  // Call the secure RPC function we created
  const { error } = await supabase.rpc('move_money', {
    p_user_id: user.id,
    p_from_account_id: fromAccountId,
    p_to_account_id: toAccountId,
    p_amount: amount,
    p_description: description,
  });

  if (error) {
    console.error('Transfer Error:', error);
    return { error: error.message };
  }

  revalidatePath('/app/overview');
  revalidatePath('/app/move-money');
  return { success: true };
}
