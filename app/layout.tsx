import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Dollarbaz - Your 10-second money cockpit for EU/UK teams',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Add className="dark" to <html> to force dark mode
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-ink-900 bg-gradient-radial from-ink-900 to-ink-700`}
      >
        {children}
      </body>
    </html>
  );
}
