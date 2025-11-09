import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SignUpForm from '@/components/sign-up-form';
import Link from 'next/link';
import { signup } from './actions';

export default function SignUpPage() {
  return (
    // This uses flex to create a full-height page
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* This uses flex to center the content vertically and horizontally */}
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        {/* This is the styled card. The .auth-card class from globals.css is used */}
        <div className="auth-card">
          <h2 className="text-3xl font-bold text-center text-fog-50 mb-8">
            Get Early Access
          </h2>
          <SignUpForm action={signup} />
        </div>

        {/* This is the link below the card, now centered */}
        <p className="text-steel-400 mt-6">
          Already have an account?{' '}
          <Link
            href="/auth/login"
            className="text-copper-300 font-medium hover:text-fog-50 transition-colors"
          >
            Log in
          </Link>
        </p>
      </main>

      <Footer />
    </div>
  );
}
