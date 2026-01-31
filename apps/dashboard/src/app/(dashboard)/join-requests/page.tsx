import type { JoinRequestsList } from '@/features/join-requests/types';
import { JoinRequests } from '@/features/join-requests/views/join-requests';
import { getKy } from '@/server/actions';

export default async function JoinRequestsPage() {
  const ky = await getKy();

  const initialData = await ky.get('join-requests').json<JoinRequestsList>();

  return <JoinRequests initialData={initialData} />;
}
