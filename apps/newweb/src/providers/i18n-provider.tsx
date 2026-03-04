import { DirectionProvider } from '@/components/ui/direction';
import { NextIntlProvider } from './nex-intl-provider';

interface I18nProviderProps {
  children: React.ReactNode;
  dir: 'ltr' | 'rtl';
}

export function I18nProvider({ children, dir }: I18nProviderProps) {
  return (
    <DirectionProvider direction={dir}>
      <NextIntlProvider>{children}</NextIntlProvider>
    </DirectionProvider>
  );
}
