import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LandingPageClient from '@/components/LandingPageClient';
import { createClient } from '@/lib/supabase/server'; // Make sure this function is correctly defined
import { cookies } from 'next/headers';

// Define the shape of the 'todo' object
interface Todo {
  id: string;
  title: string;
}

export default async function Home() {
  // Await createClient to get the actual SupabaseClient
  const supabase = await createClient(); // Await the client here

  // Fetching todos from Supabase
  const { data: todos, error } = await supabase.from('todos').select();

  if (error) {
    console.error('Error fetching todos:', error);
  }

  return (
    <>
      <Header />
      <LandingPageClient />
      <ul>
        {todos?.map((todo: Todo) => (
          <li key={todo.id}>{todo.title ?? JSON.stringify(todo)}</li>
        ))}
      </ul>
      <Footer />
    </>
  );
}
