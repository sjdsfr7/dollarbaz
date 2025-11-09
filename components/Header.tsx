import Link from 'next/link';
import { createClient } from '@/lib/supabase/server'; // We'll use this
import { LogoutButton } from '@/components/logout-button'; // Your template has this

export default async function Header() {
  // 1. Check user session on the server
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link href="/" className="logo" id="company-name">
            Dollarbaz
          </Link>
          <div className="header-right">
            <nav className="nav">
              <Link href="#features">Features</Link>
              <Link href="#pricing">Pricing</Link>
              <Link href="#security">Security</Link>
              <Link href="#contact">Contact</Link>
            </nav>

            {/* 2. Conditionally show Log In or Log Out */}
            {user ? (
              <LogoutButton /> // Use the template's logout button
            ) : (
              <Link href="/auth/login" className="login-link">
                Log In
              </Link>
            )}

            <Link href="/auth/sign-up" className="cta-button" id="header-cta">
              Get Early Access
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
