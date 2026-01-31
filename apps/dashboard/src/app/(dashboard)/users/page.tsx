import type { UsersList } from '@/features/users/types';
import { Users } from '@/features/users/views/users';
import { getKy } from '@/server/actions';

export default async function UsersPage() {
  const ky = await getKy();

  const initialData = await ky.get('users').json<UsersList>();

  return <Users initialData={initialData} />;
}
