import { useQuery } from '@tanstack/react-query';
import { useKy } from '@/hooks/use-ky';
import { objectToSearchParams } from '@/utils/helpers';
import type { UserListQuery, UserListResponse } from '../types';

interface UsersListProps {
  filters: Partial<UserListQuery>;
}

export function useUsersList({ filters }: UsersListProps) {
  const ky = useKy();

  const usersListQuery: UserListQuery = {
    ...filters,
    page: 1,
    pageSize: 12,
    sortingColumn: 'createdAt',
    sortingDirection: 'desc',
  };

  const users = useQuery({
    queryKey: ['/users', usersListQuery],
    queryFn: () => {
      return ky
        .get('users', { searchParams: objectToSearchParams(usersListQuery) })
        .json<UserListResponse>();
    },
  });

  return users;
}
