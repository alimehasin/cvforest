import type { GovernoratesList } from '@/features/governorates/types';
import { Governorates } from '@/features/governorates/views/governorates';
import { getKy } from '@/server/actions';

export default async function GovernoratesPage() {
  const ky = await getKy();

  const initialData = await ky.get('governorates').json<GovernoratesList>();

  return <Governorates initialData={initialData} />;
}
