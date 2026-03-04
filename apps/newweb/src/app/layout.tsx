import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { getLocale, getTranslations } from 'next-intl/server';
import { I18nProvider } from '@/providers/i18n-provider';
import { QueryClientProvider } from '@/providers/query-client-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

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

export default async function RootLayout({ children }: RootLayoutProps) {
  const locale = await getLocale();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html
      dir={dir}
      lang={locale}
      className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
    >
      <body>
        <I18nProvider dir={dir}>
          <QueryClientProvider>{children}</QueryClientProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
