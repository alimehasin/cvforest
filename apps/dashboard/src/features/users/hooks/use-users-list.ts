import { useQuery } from '@tanstack/react-query';
import { useDataTable } from '@/hooks/use-data-table';
import { useKy } from '@/hooks/use-ky';
import type { UsersList, UsersListQuery } from '../types';

export function useUsersList({
  initialData,
  filters,
}: {
  initialData: UsersList;
  filters: Partial<UsersListQuery>;
}) {
  const ky = useKy();
  const { getTableProps, sorting, pagination } = useDataTable();

  const usersListQuery: UsersListQuery = {
    ...pagination,
    ...sorting,
    ...filters,
  };

  const allUsersListQuery: Partial<UsersListQuery> = {
    ...sorting,
    ...filters,
  };

  const users = useQuery({
    initialData,
    queryKey: ['/users', usersListQuery],
    queryFn: () => {
      return ky
        .get('users', { searchParams: usersListQuery })
        .json<UsersList>();
    },
  });

  const allUsers = useQuery({
    queryKey: ['/users', allUsersListQuery],
    queryFn: () => {
      return ky
        .get('users', { searchParams: allUsersListQuery })
        .json<UsersList>();
    },
  });

  return { getTableProps, users, allUsers };
}
