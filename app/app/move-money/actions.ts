'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Schema Validation for Security
// We use strings for Account IDs to safely handle BigInts from the form
const TransferSchema = z.object({
  fromAccountId: z.string().min(1, 'Source account is required'),
  toAccountId: z.string().min(1, 'Destination account is required'),
  amount: z.coerce.number().positive('Amount must be positive'),
  description: z.string().optional(),
});

export type TransferState = {
  error?: string;
  success?: boolean;
  timestamp?: number;
};

export async function processTransfer(
  prevState: TransferState,
  formData: FormData,
): Promise<TransferState> {
  const supabase = await createClient();

  // 1. Authentication Check
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized access' };
  }

  // 2. Input Validation
  const rawData = {
    fromAccountId: formData.get('fromAccount'),
    toAccountId: formData.get('toAccount'),
    amount: formData.get('amount'),
    description: formData.get('description'),
  };

  const validated = TransferSchema.safeParse(rawData);

  if (!validated.success) {
    // Return the first validation error message
    return { error: validated.error.errors[0].message };
  }

  const { fromAccountId, toAccountId, amount, description } = validated.data;

  if (fromAccountId === toAccountId) {
    return { error: 'Cannot transfer to the same account' };
  }

  // 3. Execute Secure RPC Transaction
  // Note: Your schema uses BigInt for IDs. We pass them here, and Postgres will cast them.
  // We explicitly pass p_user_id to ensure the user owns the source account (RLS logic).
  const { error: rpcError } = await supabase.rpc('move_money', {
    p_user_id: user.id,
    p_from_account_id: fromAccountId,
    p_to_account_id: toAccountId,
    p_amount: amount,
    p_description: description || 'Internal Transfer',
  });

  if (rpcError) {
    console.error('Transfer Failed:', rpcError);
    // Parse common DB errors for friendlier UI messages
    if (rpcError.message.includes('Insufficient')) {
      return { error: 'Insufficient funds in source account' };
    }
    return {
      error: rpcError.message || 'Transaction failed. Please try again.',
    };
  }

  // 4. Revalidate Data & Return Success
  revalidatePath('/app/overview');
  revalidatePath('/app/move-money');
  revalidatePath('/app/accounts'); // Ensure account list updates if navigated to

  return { success: true, timestamp: Date.now() };
}
