import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import '@/styles/globals.css';
import { getTranslations } from 'next-intl/server';
import { NextIntlProvider } from '@/providers/nex-intl-provider';

const rubik = Rubik({ subsets: ['latin'], variable: '--font-sans' });

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t('meta.title'),
    description: t('meta.description'),
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
    <html lang="en" className={rubik.variable}>
      <body>
        <NextIntlProvider>{children}</NextIntlProvider>
      </body>
    </html>
  );
}
