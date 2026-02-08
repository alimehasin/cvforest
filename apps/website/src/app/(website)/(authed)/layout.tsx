import { redirect } from 'next/navigation';
import type { SessionResponseBody } from '@/features/accounts/types';
import { getKy } from '@/server/actions';

interface AuthedLayoutProps {
  children: React.ReactNode;
}

export default async function AuthedLayout({ children }: AuthedLayoutProps) {
  const ky = await getKy();

  const session = await ky
    .get('accounts/session')
    .json<SessionResponseBody>()
    .catch(() => {
      return redirect('/sign-in');
    });

  if (!session) {
    return redirect('/sign-in');
  }

  return <>{children}</>;
}
