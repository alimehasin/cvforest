import { useQuery } from '@tanstack/react-query';
import { useDataTable } from '@/hooks/use-data-table';
import { useKy } from '@/hooks/use-ky';
import type { JoinRequestsList, JoinRequestsListQuery } from '../types';

export function useJoinRequestsList({
  initialData,
  filters,
}: {
  initialData: JoinRequestsList;
  filters: Partial<JoinRequestsListQuery>;
}) {
  const ky = useKy();
  const { getTableProps, sorting, pagination } = useDataTable();

  const joinRequestsListQuery: JoinRequestsListQuery = {
    ...pagination,
    ...sorting,
    ...filters,
  };

  const allJoinRequestsListQuery: Partial<JoinRequestsListQuery> = {
    ...sorting,
    ...filters,
  };

  const joinRequests = useQuery({
    initialData,
    queryKey: ['/join-requests', joinRequestsListQuery],
    queryFn: () => {
      return ky
        .get('join-requests', { searchParams: joinRequestsListQuery })
        .json<JoinRequestsList>();
    },
  });

  const allJoinRequests = useQuery({
    queryKey: ['/join-requests', allJoinRequestsListQuery],
    queryFn: () => {
      return ky
        .get('join-requests', { searchParams: allJoinRequestsListQuery })
        .json<JoinRequestsList>();
    },
  });

  return { getTableProps, joinRequests, allJoinRequests };
}
