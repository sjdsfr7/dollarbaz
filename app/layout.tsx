import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
 
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Dollarbaz | The Unified Financial OS',
  description: 'Banking, Trading, and AI Finance in one OS.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Load Phosphor Icons for the specific duotone look */}
        <script src="https://unpkg.com/@phosphor-icons/web" async></script>
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-brand-cream text-brand-olive-dark dark:bg-carbon-grey dark:text-titanium selection:bg-brand-sage dark:selection:bg-neon-blue dark:selection:text-carbon-black transition-colors duration-500`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
