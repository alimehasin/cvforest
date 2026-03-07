import ky from 'ky';
import { useLocale } from 'next-intl';
import { env } from '@/env';

export function useKy() {
  const locale = useLocale();

  return ky.create({
    prefixUrl: env.NEXT_PUBLIC_API_BASE_URL,
    credentials: 'include',
    headers: {
      'Accept-Language': locale,
    },
  });
}
