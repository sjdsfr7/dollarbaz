import Link from 'next/link';

// Define SVG icons as components
const IconTwitter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.25 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);
const IconLinkedIn = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"></path>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);
const IconInstagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);
const IconTelegram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"></path>
  </svg>
);
const IconWhatsApp = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

export default function Footer() {
  const footerLinks = {
    platform: [
      { href: '#features', label: 'Core Banking' },
      { href: '#trading', label: 'Trading' },
      { href: '/protected', label: 'Dashboard' },
      { href: '#faq', label: 'FAQ' },
    ],
    company: [
      { href: '#legacy', label: 'Legacy' }, // Added Legacy link
      { href: '#about', label: 'About Us' },
      { href: '#contact', label: 'Contact' },
    ],
    legal: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
    ],
  };

  // --- ACTUAL SOCIAL MEDIA LINKS ---
  const socialLinks = [
    {
      href: 'https://twitter.com/dollarbaz',
      label: 'Twitter',
      icon: IconTwitter,
    },
    {
      href: 'https://linkedin.com/company/dollarbaz',
      label: 'LinkedIn',
      icon: IconLinkedIn,
    },
    {
      href: 'https://www.instagram.com/dollarbazcom/',
      label: 'Instagram',
      icon: IconInstagram,
    },
    {
      href: 'https://t.me/Dollarbazbot',
      label: 'Telegram',
      icon: IconTelegram,
    },
    { href: 'https://wa.me/1234567890', label: 'WhatsApp', icon: IconWhatsApp },
  ];

  return (
    <footer className="bg-brand-accent-dark text-gray-300 border-t border-white/10">
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <span className="footer-logo text-2xl font-bold">Dollarbaz</span>
            <p className="mt-4 text-sm text-gray-300 max-w-xs">
              Your all-in-one platform for global finance. Secure, fast, and
              reliable core banking and trading.
            </p>
            {/* Newsletter */}
            <form className="mt-6 flex max-w-sm">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="w-full min-w-0 flex-auto rounded-l-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-brand-accent sm:text-sm sm:leading-6"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="font-poppins rounded-r-md bg-brand-accent px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-accent-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Column 2: Platform */}
          <div>
            <h3 className="font-poppins text-sm font-semibold leading-6 text-white">
              Platform
            </h3>
            <ul role="list" className="mt-4 space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="font-poppins text-sm font-semibold leading-6 text-white">
              Company
            </h3>
            <ul role="list" className="mt-4 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="font-poppins text-sm font-semibold leading-6 text-white">
              Legal
            </h3>
            <ul role="list" className="mt-4 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col items-center justify-between sm:flex-row">
          <p className="text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} Dollarbaz. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0 flex space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
              >
                <span className="sr-only">{link.label}</span>
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
