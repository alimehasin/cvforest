import { useSetState } from '@mantine/hooks';
import type { UseQueryResult } from '@tanstack/react-query';
import type {
  DataTableColumn,
  DataTableProps,
  DataTableSortStatus,
} from 'mantine-datatable';
import { useTranslations } from 'next-intl';
import type { Pagination, Sorting } from '@/types';
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from '@/utils/constants';

interface GetTablePropsParams<T extends Record<string, unknown>> {
  query: UseQueryResult<{ total: number; data: T[] }, unknown>;
  columns: DataTableColumn<T>[];
  isPagination?: boolean;
  isSorting?: boolean;
}

interface UseDataTableParams {
  pagination?: Pagination;
  sorting?: Sorting;
  pageSize?: number;
}

export function useDataTable({
  pagination: defaultPagination,
  sorting: defaultSorting,
  pageSize: defaultPageSize,
}: UseDataTableParams = {}) {
  const t = useTranslations();
  const pageSize = defaultPageSize ?? DEFAULT_PAGE_SIZE;

  const [pagination, setPagination] = useSetState<Pagination>(
    defaultPagination ?? { page: 1, pageSize },
  );

  const [sorting, setSorting] = useSetState<Sorting>(
    defaultSorting ?? { sortingColumn: 'createdAt', sortingDirection: 'desc' },
  );

  const [dtSorting, setDtSorting] = useSetState<DataTableSortStatus>({
    columnAccessor: defaultSorting?.sortingColumn ?? 'createdAt',
    direction: defaultSorting?.sortingDirection ?? 'desc',
    sortKey: defaultSorting?.sortingColumn ?? 'createdAt',
  });

  function handleSetDtSorting(newSorting: DataTableSortStatus) {
    setDtSorting(newSorting);
    setSorting({
      sortingColumn: newSorting.sortKey || newSorting.columnAccessor,
      sortingDirection: newSorting.direction,
    });
  }

  function getTableProps<T extends Record<string, unknown>>({
    query,
    columns,
    isPagination = true,
    isSorting = true,
  }: GetTablePropsParams<T>) {
    let props: DataTableProps<T> = {
      noRecordsText: t('dataTable.noRecords'),

      borderRadius: 'lg',
      withRowBorders: true,
      withTableBorder: true,
      withColumnBorders: true,
      fetching: query?.isLoading,
      minHeight: query?.data?.data?.length ? undefined : 250,
      records: query.data?.data ?? [],
      columns,
    };

    if (isPagination) {
      props = {
        ...props,
        totalRecords: query?.data?.total ?? 0,
        recordsPerPageOptions: PAGE_SIZE_OPTIONS,
        page: pagination.page,
        onPageChange: (page) => setPagination({ page }),
        recordsPerPage: pagination.pageSize,
        onRecordsPerPageChange: (pageSize) => setPagination({ pageSize }),
        recordsPerPageLabel: t('dataTable.recordsPerPageLabel'),
      };
    }

    if (isSorting) {
      props = {
        ...props,
        sortStatus: dtSorting,
        onSortStatusChange: handleSetDtSorting as (
          s: DataTableSortStatus<T>,
        ) => void,
      };
    }

    return props;
  }

  return { pagination, sorting, getTableProps };
}
