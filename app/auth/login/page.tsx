import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoginForm from '@/components/login-form';
import Link from 'next/link';
import { login } from './actions';

export default function LoginPage() {
  return (
    // This uses flex to create a full-height page
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* This uses flex to center the content vertically and horizontally */}
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        {/* This is the styled card. The .auth-card class from globals.css is used */}
        <div className="auth-card">
          <h2 className="text-3xl font-bold text-center text-fog-50 mb-8">
            Welcome back
          </h2>
          <LoginForm action={login} />
        </div>

        {/* This is the link below the card, now centered */}
        <p className="text-steel-400 mt-6">
          Don&#39;t have an account?{' '}
          <Link
            href="/auth/sign-up"
            className="text-copper-300 font-medium hover:text-fog-50 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </main>

      <Footer />
    </div>
  );
}
