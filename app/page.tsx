import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LandingPageClient from '@/components/LandingPageClient'; // We will create this next
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: todos } = await supabase.from('todos').select();

  return (
    <>
      <Header />
      <LandingPageClient />
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>{todo.title ?? JSON.stringify(todo)}</li>
        ))}
      </ul>
      <Footer />
    </>
  );
}
