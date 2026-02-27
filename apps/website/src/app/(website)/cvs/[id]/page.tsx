import type { Metadata } from 'next';
import type { UserDetailResponse } from '@/features/cvs/types';
import { CvDetail } from '@/features/cvs/views/cv-detail';
import { getKy } from '@/server/actions';
import { constructFileUrl } from '@/utils/helpers';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const ky = await getKy();
  const { id } = await params;
  const cv = await ky.get(`cvs/${id}`).json<UserDetailResponse>();

  const image = constructFileUrl(cv.user.avatar?.key);

  return {
    title: cv.user.name,
    description: cv.bio,
    keywords: cv.userSkills.map(({ skill }) => skill.name),

    openGraph: {
      type: 'website',
      title: cv.user.name,
      description: cv.bio,
      images: image ? [{ url: image }] : undefined,
    },

    twitter: {
      card: 'summary_large_image',
      title: cv.user.name,
      description: cv.bio,
      images: image ? [image] : undefined,
    },
  };
}

interface CvPageProps {
  params: Promise<{ id: string }>;
}

export default async function CvPage({ params }: CvPageProps) {
  const ky = await getKy();
  const { id } = await params;

  const user = await ky.get(`cvs/${id}`).json<UserDetailResponse>();

  return <CvDetail id={id} initialData={user} />;
}
