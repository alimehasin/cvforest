import { redirect } from 'next/navigation';
import { getKy } from '@/server/actions';
import type { GetResponseBody } from '@/types/server/helpers';

type SessionResponseBody = GetResponseBody<'/user/accounts/session', 'get'>;

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ky = await getKy();
  const session = await ky
    .get('accounts/session')
    .json<SessionResponseBody>()
    .catch(() => {
      return redirect('/accounts/login');
    });

  if (!session || session.user.role !== 'user') {
    return redirect('/accounts/login');
  }

  return children;
}
