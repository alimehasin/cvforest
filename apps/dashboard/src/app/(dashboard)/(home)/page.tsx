import type { HomeResponse } from '@/features/home/types';
import { Home } from '@/features/home/views/home';
import { getKy } from '@/server/actions';

export default async function HomePage() {
  const ky = await getKy();
  const home = await ky.get('home').json<HomeResponse>();

  return <Home home={home} />;
}
