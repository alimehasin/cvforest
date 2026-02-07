import { useQuery } from '@tanstack/react-query';
import { useKy } from '@/hooks/use-ky';
import type { UserDetailResponse } from '../types';

export function useUserDetails({
  id,
  initialData,
}: {
  id: string;
  initialData: UserDetailResponse;
}) {
  const ky = useKy();

  return useQuery({
    initialData,
    queryKey: ['/users', id],
    queryFn: () => {
      return ky.get(`users/${id}`).json<UserDetailResponse>();
    },
  });
}
