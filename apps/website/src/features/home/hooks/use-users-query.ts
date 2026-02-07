import { useQuery } from '@tanstack/react-query';
import { useKy } from '@/hooks/use-ky';
import { objectToSearchParams } from '@/utils/helpers';
import type { CvListQuery, CvListResponse } from '../types';

interface UsersListProps {
  filters: Partial<CvListQuery>;
}

export function useUsersList({ filters }: UsersListProps) {
  const ky = useKy();

  const usersListQuery: CvListQuery = {
    ...filters,
    page: 1,
    pageSize: 12,
    sortingColumn: 'createdAt',
    sortingDirection: 'desc',
  };

  const users = useQuery({
    queryKey: ['/cvs', usersListQuery],
    queryFn: () => {
      return ky
        .get('cvs', { searchParams: objectToSearchParams(usersListQuery) })
        .json<CvListResponse>();
    },
  });

  return users;
}
