'use client';

import Link from 'next/link';
import { signup } from './actions';
import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { useState, useEffect } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';

// --- SVG Icons ---
const IconEye = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);
const IconEyeOff = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);
const IconGoogle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);
const IconApple = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.01 17.06c-.36 0-.72-.03-1.07-.08-.6-.09-.99-.19-1.33-.31-.48-.18-.81-.39-1.1-.64-.29-.25-.52-.56-.7-.91-.18-.35-.31-.75-.39-1.21-.08-.46-.12-.92-.12-1.38s.04-.92.12-1.38c.08-.46.21-.86.39-1.21.18-.35.41-.66.7-.91.29-.25.62-.46 1.1-.64.34-.12.73-.22 1.33-.31.35-.05.71-.08 1.07-.08.36 0 .72.03 1.07.08.6.09.99.19 1.33.31.48.18.81-.39 1.1.64.29.25.52.56.7.91.18.35.31.75.39-1.21-.08-.46-.12-.92-.12 1.38s-.04.92-.12 1.38c-.08.46-.21.86-.39-1.21-.18-.35-.41-.66-.7.91-.29-.25-.62.46-1.1.64-.34-.12-.73-.22-1.33-.31-.35.05-.71-.08-1.07.08zM12 1C9.64 1 7.73 2.22 6.46 3.98c-1.68 2.34-2.19 5.22-1.78 7.58.31 1.76 1.4 3.3 2.89 4.38 1.17.84 2.5 1.34 3.99 1.34.34 0 .68-.03 1.01-.08.43-.07.82-.16 1.18-.28.4-.13.73-.29 1.02-.49.29-.2.53-.44.72-.73.01.01 0 0 0 0zM10.02 3.19c.3-.39.58-.75.83-1.08.06.04.1.07.15.11.05.04.1.09.15.14.05.05.1.1.14.15l.all-c_popover.md-0-0-1.all-c_popover.md-0-0-1.all-c_popover.md-0-0-1.all-c_popover.md-0-0-111c.04.05.08.1.12.16.04.06.08.12.11.19.03.07.06.14.08.22.02.08.04.16.05.25.01.09.02.18.02.28s0 .19-.02.28c-.01.09-.03.17-.05.25-.02.08-.05.15-.08.22-.03.07-.07.13-.11.19-.04.06-.08.11-.12.16-.04.05-.07.09-.11.11-.04.05-.09.1-.14.15-.05.05-.1.09-.15.14-.05.04-.1.08-.15.11-.25-.33-.53-.69-.83-1.08z" />
  </svg>
);

// Submit button component
function SubmitButton({
  isTurnstileVerified,
}: {
  isTurnstileVerified: boolean;
}) {
  const { pending } = useFormStatus();

  // --- THIS IS THE FIX ---
  // Button is disabled if pending, OR if Turnstile is not verified
  const isDisabled = pending || !isTurnstileVerified;

  return (
    <button
      id="submit-btn"
      type="submit"
      disabled={isDisabled}
      className="font-poppins cta-button group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-full text-white bg-brand-accent hover:bg-brand-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {pending ? 'Creating Account...' : 'Create Account'}
    </button>
  );
}

// Password strength component
function PasswordStrengthIndicator({ password = '' }) {
  const [strength, setStrength] = useState({ score: 0, text: '', color: '' });

  useEffect(() => {
    let score = 0;
    if (password.length === 0) {
      setStrength({ score: 0, text: '', color: '' });
      return;
    }

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++; // Special char

    let text = '';
    let color = '';

    if (score <= 2) {
      text = 'Weak';
      color = 'text-red-500';
    } else if (score <= 4) {
      text = 'Medium';
      color = 'text-amber-500';
    } else {
      text = 'Strong';
      color = 'text-green-500';
    }

    setStrength({ score, text, color });
  }, [password]);

  return (
    <div>
      <div className="strength-bar-container">
        <div
          className={`strength-bar ${
            strength.score >= 1
              ? strength.score <= 2
                ? 'weak'
                : strength.score <= 4
                ? 'medium'
                : 'strong'
              : ''
          }`}
        ></div>
        <div
          className={`strength-bar ${
            strength.score >= 2
              ? strength.score <= 2
                ? 'weak'
                : strength.score <= 4
                ? 'medium'
                : 'strong'
              : ''
          }`}
        ></div>
        <div
          className={`strength-bar ${
            strength.score >= 3
              ? strength.score <= 4
                ? 'medium'
                : 'strong'
              : ''
          }`}
        ></div>
        <div
          className={`strength-bar ${strength.score >= 4 ? 'strong' : ''}`}
        ></div>
      </div>
      <p
        id="password-strength-text"
        className={`text-xs mt-1 ${strength.color}`}
      >
        {strength.text}
      </p>
    </div>
  );
}

export default function SignUpPage() {
  const [state, formAction] = useActionState(signup, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  // --- THIS IS THE FIX ---
  // We now track the token, and if it's valid
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isTurnstileVerified, setIsTurnstileVerified] = useState(false);

  useEffect(() => {
    // Check if passwords match whenever they change
    if (confirmPassword.length > 0) {
      setPasswordsMatch(password === confirmPassword);
    } else {
      setPasswordsMatch(true); // Don't show error if confirm is empty
    }
  }, [password, confirmPassword]);

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Auth Form Card */}
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-200/50">
        <div className="text-center">
          <h2 className="font-poppins text-3xl font-bold tracking-tight text-gray-900">
            Create Your Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link
              href="/auth/login"
              className="font-poppins font-medium text-brand-accent hover:text-brand-accent-dark"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        {/* Display Server Errors */}
        {state?.error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="text-sm">{state.error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" action={formAction}>
          <div className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="first-name" className="sr-only">
                  First name
                </label>
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-accent focus:border-brand-accent focus:z-10 sm:text-sm transition-all"
                  placeholder="First name"
                />
              </div>
              <div>
                <label htmlFor="last-name" className="sr-only">
                  Last name
                </label>
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  autoComplete="family-name"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-accent focus:border-brand-accent focus:z-10 sm:text-sm transition-all"
                  placeholder="Last name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-accent focus:border-brand-accent focus:z-10 sm:text-sm transition-all"
                placeholder="Email address"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-accent focus:border-brand-accent focus:z-10 sm:text-sm transition-all"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <IconEyeOff className="h-5 w-5" />
                  ) : (
                    <IconEye className="h-5 w-5" />
                  )}
                </span>
              </div>
              <PasswordStrengthIndicator password={password} />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  className={`appearance-none rounded-lg relative block w-full px-3 py-3 border ${
                    passwordsMatch ? 'border-gray-300' : 'border-red-500'
                  } placeholder-gray-500 text-gray-900 focus:outline-none ${
                    passwordsMatch
                      ? 'focus:ring-brand-accent focus:border-brand-accent'
                      : 'focus:ring-red-500 focus:border-red-500'
                  } focus:z-10 sm:text-sm transition-all`}
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <IconEyeOff className="h-5 w-5" />
                  ) : (
                    <IconEye className="h-5 w-5" />
                  )}
                </span>
              </div>
              {!passwordsMatch && (
                <p className="error-message" style={{ display: 'block' }}>
                  Oops! Passwords do not match.
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="terms-agree"
                name="terms-agree"
                type="checkbox"
                required
                className="h-4 w-4 text-brand-accent focus:ring-brand-accent border-gray-300 rounded"
              />
              <label
                htmlFor="terms-agree"
                className="ml-2 block text-sm text-gray-900"
              >
                I agree to the{' '}
                <a
                  href="#"
                  className="font-medium text-brand-accent hover:text-brand-accent-dark"
                >
                  Terms
                </a>
              </label>
            </div>
          </div>

          {/* --- Turnstile Widget --- */}
          <div className="flex justify-center">
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              onSuccess={(token) => {
                setTurnstileToken(token);
                setIsTurnstileVerified(true); // <-- THIS IS THE FIX
              }}
              onError={() => {
                setTurnstileToken(null);
                setIsTurnstileVerified(false); // <-- THIS IS THE FIX
              }}
              onExpire={() => {
                setTurnstileToken(null);
                setIsTurnstileVerified(false); // <-- THIS IS THE FIX
              }}
            />
          </div>
          <input
            type="hidden"
            name="cf-turnstile-response"
            value={turnstileToken || ''}
          />

          <div>
            {/* Pass the verification status to the button */}
            <SubmitButton isTurnstileVerified={isTurnstileVerified} />
          </div>

          {/* Social Logins */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="font-poppins cta-button inline-flex w-full justify-center items-center gap-2 rounded-lg border border-gray-300 bg-white py-2.5 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-all"
            >
              <IconGoogle className="h-5 w-5" />
              Google
            </button>
            <button
              type="button"
              className="font-poppins cta-button inline-flex w-full justify-center items-center gap-2 rounded-lg border border-gray-300 bg-white py-2.5 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-all"
            >
              <IconApple className="h-5 w-5" />
              Apple
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
