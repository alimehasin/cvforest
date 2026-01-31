import { useQuery } from '@tanstack/react-query';
import { useKy } from '@/hooks/use-ky';
import type { ProfileResponseBody } from '../types';

export function useProfileGet({
  initialData,
}: {
  initialData: ProfileResponseBody;
}) {
  const ky = useKy();

  return useQuery({
    initialData,
    queryKey: ['/accounts/profile'],
    queryFn: () => {
      return ky.get('accounts/profile').json<ProfileResponseBody>();
    },
  });
}
