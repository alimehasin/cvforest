import { useQuery } from '@tanstack/react-query';
import { useDataTable } from '@/hooks/use-data-table';
import { useKy } from '@/hooks/use-ky';
import type { UserListQuery, UserListResponse } from '../types';

interface UsersListProps {
  filters: Partial<UserListQuery>;
}

export function useUsersList({ filters }: UsersListProps) {
  const ky = useKy();
  const { getTableProps, sorting, pagination } = useDataTable();

  const usersListQuery: UserListQuery = {
    ...pagination,
    ...sorting,
    ...filters,
  };

  const users = useQuery({
    queryKey: ['/users', usersListQuery],
    queryFn: () => {
      return ky
        .get('users', { searchParams: usersListQuery })
        .json<UserListResponse>();
    },
  });

  return { getTableProps, users };
}
