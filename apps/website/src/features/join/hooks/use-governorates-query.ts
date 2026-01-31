import { useQuery } from '@tanstack/react-query';
import { useKy } from '@/hooks/use-ky';
import type { GovernorateListResponseBody } from '../types';

export function useGovernoratesQuery() {
  const ky = useKy();

  return useQuery({
    queryKey: ['/governorates'],
    queryFn: () => {
      return ky.get('governorates').json<GovernorateListResponseBody>();
    },
  });
}
