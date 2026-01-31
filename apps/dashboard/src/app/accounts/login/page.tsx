import { getLocale } from 'next-intl/server';
import { Login } from '@/features/accounts/views/login';

export default async function LoginPage() {
  const locale = await getLocale();

  return <Login locale={locale} />;
}
