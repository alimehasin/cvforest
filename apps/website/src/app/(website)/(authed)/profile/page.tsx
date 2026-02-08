import type { ProfileResponseBody } from '@/features/profile/types';
import { Profile } from '@/features/profile/views/profile';
import { getKy } from '@/server/actions';

export default async function ProfilePage() {
  const ky = await getKy();

  const profile = await ky.get('accounts/profile').json<ProfileResponseBody>();

  return <Profile initialData={profile} />;
}
