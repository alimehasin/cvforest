import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Geist_Mono, Inter } from 'next/font/google';
import { getTranslations } from 'next-intl/server';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const fontMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' });

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    robots: 'noindex, nofollow',
    icons: {
      icon: '/logo-512.png',
      apple: '/logo-512.png',
    },
  };
}

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        'antialiased',
        fontMono.variable,
        'font-sans',
        inter.variable,
      )}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
