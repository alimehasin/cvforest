import type { UserDetailResponse } from '@/features/user-details/types';
import { UserDetails } from '@/features/user-details/views/user-details';
import { getKy } from '@/server/actions';

interface UserPageProps {
  params: Promise<{ id: string }>;
}

export default async function UserPage({ params }: UserPageProps) {
  const ky = await getKy();
  const { id } = await params;

  const user = await ky.get(`cvs/${id}`).json<UserDetailResponse>();

  return <UserDetails id={id} initialData={user} />;
}
