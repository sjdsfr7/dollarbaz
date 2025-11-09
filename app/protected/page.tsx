import { createClient } from '@/lib/supabase/server';

export default async function ProtectedPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-3 max-w-xl">
      <h1 className="text-2xl font-semibold">Protected dashboard</h1>

      <p className="text-sm text-muted-foreground">
        This page is only accessible to authenticated users.
      </p>

      <div className="rounded-lg border p-3 text-sm">
        <p className="font-medium">Current user:</p>
        <p className="mt-1">{user?.email ?? 'No user found (not signed in)'}</p>
      </div>
    </div>
  );
}
