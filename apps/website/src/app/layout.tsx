import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { ClientConfigs } from '@/components/client-configs';
import { MicrosoftClarity } from '@/components/microsoft-clarity';
import { MantineProviders } from '@/providers/mantine-providers';
import { NextIntlProvider } from '@/providers/nex-intl-provider';
import { QueryClientProvider } from '@/providers/query-client-provider';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    robots: 'noindex, nofollow',
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html dir={dir} lang={locale} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>

      <body>
        <NextIntlProvider>
          <QueryClientProvider>
            <MantineProviders locale={locale} initialDirection={dir}>
              {children}

              <ClientConfigs locale={locale} />
              <MicrosoftClarity />
            </MantineProviders>
          </QueryClientProvider>
        </NextIntlProvider>
      </body>
    </html>
  );
}
