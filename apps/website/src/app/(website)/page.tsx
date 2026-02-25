import type { SessionResponseBody } from '@/features/accounts/types';
import { Home } from '@/features/home/views/home';
import { getKy } from '@/server/actions';

export default async function HomePage() {
  const ky = await getKy();

  const session = await ky
    .get('accounts/session')
    .json<SessionResponseBody>()
    .catch(() => null);

  return <Home hasCv={!!session?.user.cv} />;
}
