import type { UserDetailResponse } from '@/features/cvs/types';
import { CvDetail } from '@/features/cvs/views/cv-detail';
import { getKy } from '@/server/actions';

interface CvPageProps {
  params: Promise<{ id: string }>;
}

export default async function CvPage({ params }: CvPageProps) {
  const ky = await getKy();
  const { id } = await params;

  const user = await ky.get(`cvs/${id}`).json<UserDetailResponse>();

  return <CvDetail id={id} initialData={user} />;
}
