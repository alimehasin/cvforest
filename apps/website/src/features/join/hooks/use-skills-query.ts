import { useQuery } from '@tanstack/react-query';
import { useKy } from '@/hooks/use-ky';
import type { SkillListResponseBody } from '../types';

export function useSkillsQuery() {
  const ky = useKy();

  return useQuery({
    queryKey: ['/skills'],
    queryFn: () => {
      return ky.get('skills').json<SkillListResponseBody>();
    },
  });
}
