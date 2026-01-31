import { redirect } from 'next/navigation';
import { Shell } from '@/components/shell';
import { getKy } from '@/server/actions';
import type { GetResponseBody } from '@/types/server/helpers';

type SessionResponseBody = GetResponseBody<'/admin/accounts/session', 'get'>;

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

  if (!session || session.user.role !== 'admin') {
    return redirect('/accounts/login');
  }

  return <Shell>{children}</Shell>;
}
