import { useQuery } from '@tanstack/react-query';
import { useDataTable } from '@/hooks/use-data-table';
import { useKy } from '@/hooks/use-ky';
import type { GovernoratesList, GovernoratesListQuery } from '../types';

export function useGovernoratesList({
  initialData,
  filters,
}: {
  initialData: GovernoratesList;
  filters: Partial<GovernoratesListQuery>;
}) {
  const ky = useKy();
  const { getTableProps, sorting, pagination } = useDataTable();

  const governoratesListQuery: GovernoratesListQuery = {
    ...pagination,
    ...sorting,
    ...filters,
  };

  const allGovernoratesListQuery: Partial<GovernoratesListQuery> = {
    ...sorting,
    ...filters,
  };

  const governorates = useQuery({
    initialData,
    queryKey: ['/governorates', governoratesListQuery],
    queryFn: () => {
      return ky
        .get('governorates', { searchParams: governoratesListQuery })
        .json<GovernoratesList>();
    },
  });

  const allGovernorates = useQuery({
    queryKey: ['/governorates', allGovernoratesListQuery],
    queryFn: () => {
      return ky
        .get('governorates', { searchParams: allGovernoratesListQuery })
        .json<GovernoratesList>();
    },
  });

  return { getTableProps, governorates, allGovernorates };
}
