import { useQuery } from '@tanstack/react-query';
import { useKy } from '@/hooks/use-ky';
import type { UserDetailResponse } from '../types';

export function useCvDetail({
  id,
  initialData,
}: {
  id: string;
  initialData: UserDetailResponse;
}) {
  const ky = useKy();

  return useQuery({
    initialData,
    queryKey: ['/cvs', id],
    queryFn: () => {
      return ky.get(`cvs/${id}`).json<UserDetailResponse>();
    },
  });
}
