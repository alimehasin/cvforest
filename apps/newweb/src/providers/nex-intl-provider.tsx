import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

interface NextIntlProviderProps {
  children: React.ReactNode;
}

export async function NextIntlProvider({ children }: NextIntlProviderProps) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
