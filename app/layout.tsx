import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

// --- LOAD YOUR FONTS ---
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['500', '600', '700'], // Weights from your draft
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

// --- METADATA ---
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Dollarbaz - Core Banking & Trading',
  description:
    'Seamless Integration of Core Banking & Trading. Your all-in-one platform for global finance.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable}`}
      // --- FIX: Add suppressHydrationWarning to fix mismatch error ---
      suppressHydrationWarning={true}
    >
      {/* --- Apply your brand background and default font --- */}
      <body className="bg-brand-background font-inter text-gray-800">
        <ThemeProvider
          attribute="class"
          defaultTheme="light" // Force light theme from your draft
          enableSystem={false} // Disable system theme changes
          disableTransitionOnChange
        >
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
