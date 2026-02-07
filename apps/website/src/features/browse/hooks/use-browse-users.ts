import { useDebouncedValue } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import type { UserListQuery, UserListResponse } from '@/features/home/types';
import { useKy } from '@/hooks/use-ky';
import { BROWSE_PAGE_SIZE } from '@/utils/constants';

export function useBrowseUsers() {
  const ky = useKy();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebouncedValue(search, 300);

  const query: UserListQuery = {
    page,
    pageSize: BROWSE_PAGE_SIZE,
    sortingColumn: 'createdAt',
    sortingDirection: 'desc',
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
  };

  const users = useQuery({
    queryKey: ['/users', query],
    queryFn: () => {
      return ky.get('users', { searchParams: query }).json<UserListResponse>();
    },
  });

  const totalPages = Math.ceil((users.data?.total ?? 0) / BROWSE_PAGE_SIZE);

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  return {
    users,
    search,
    setSearch: handleSearch,
    page,
    setPage,
    totalPages,
  };
}
