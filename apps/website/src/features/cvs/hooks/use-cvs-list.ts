import { useDebouncedValue } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import type { CvListQuery, CvListResponse } from '@/features/home/types';
import { useKy } from '@/hooks/use-ky';
import { BROWSE_PAGE_SIZE } from '@/utils/constants';
import { objectToSearchParams } from '@/utils/helpers';

const initialFilters: Partial<CvListQuery> = {
  governorateId: undefined,
  skillIds: [],
  availabilityType: undefined,
  workLocationType: undefined,
  experienceMin: undefined,
  experienceMax: undefined,
};

export function useCvsList() {
  const ky = useKy();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebouncedValue(search, 300);
  const [filters, setFiltersState] =
    useState<Partial<CvListQuery>>(initialFilters);

  const query: CvListQuery = {
    page,
    pageSize: BROWSE_PAGE_SIZE,
    sortingColumn: 'createdAt',
    sortingDirection: 'desc',
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
    ...(filters.governorateId ? { governorateId: filters.governorateId } : {}),
    ...(filters.skillIds && filters.skillIds.length > 0
      ? { skillIds: filters.skillIds }
      : {}),
    ...(filters.availabilityType
      ? { availabilityType: filters.availabilityType }
      : {}),
    ...(filters.workLocationType
      ? { workLocationType: filters.workLocationType }
      : {}),
    ...(filters.experienceMin !== undefined
      ? { experienceMin: filters.experienceMin }
      : {}),
    ...(filters.experienceMax !== undefined
      ? { experienceMax: filters.experienceMax }
      : {}),
  };

  const cvs = useQuery({
    queryKey: ['/cvs', query],
    queryFn: () => {
      return ky
        .get('cvs', { searchParams: objectToSearchParams(query) })
        .json<CvListResponse>();
    },
  });

  const totalPages = Math.ceil((cvs.data?.total ?? 0) / BROWSE_PAGE_SIZE);

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  function setFilters(update: Partial<CvListQuery>) {
    setFiltersState((prev) => ({ ...prev, ...update }));
    setPage(1);
  }

  return {
    cvs,
    search,
    setSearch: handleSearch,
    page,
    setPage,
    totalPages,
    filters,
    setFilters,
  };
}
