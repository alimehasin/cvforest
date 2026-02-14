'use client';

import { Avatar, Center, Stack } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import { DataTable } from 'mantine-datatable';
import { useTranslations } from 'next-intl';
import { SearchInput } from '@/components/search-input';
import { useCvsList } from '@/features/cvs/hooks/use-cvs-list';
import type { CvsList } from '@/features/cvs/types';
import { constructImageUrl } from '@/utils/helpers';
import { CvStatusBadge } from '../../components/cv-status-badge';
import { CvsRowExpansion } from '../../components/cvs-row-expansion';

interface CvsProps {
  initialData: CvsList;
}

export function Cvs({ initialData }: CvsProps) {
  const t = useTranslations();

  const [filters, setFilters] = useSetState({
    search: '',
  });

  const { getTableProps, cvs } = useCvsList({
    initialData,
    filters,
  });

  return (
    <Stack>
      <SearchInput
        value={filters.search}
        onChange={(search) => setFilters({ search })}
      />

      <DataTable
        rowExpansion={{
          content: ({ record }) => <CvsRowExpansion cv={record} />,
        }}
        {...getTableProps({
          query: cvs,
          columns: [
            {
              accessor: 'user.avatar',
              title: '',
              width: 56,
              render: ({ user }) => (
                <Center>
                  <Avatar
                    radius="var(--mantine-radius-md)"
                    src={constructImageUrl(user.avatar?.key)}
                  />
                </Center>
              ),
            },
            {
              accessor: 'user.name',
              title: t('cvs.name'),
              width: 'auto',
            },
            {
              accessor: 'jobTitle',
              title: t('cvs.jobTitle'),
              width: 200,
            },
            {
              accessor: 'views',
              title: t('cvs.views'),
              width: 200,
              render: ({ views }) => Number(views).toLocaleString(),
            },
            {
              accessor: 'status',
              title: t('cvs.status'),
              width: 200,
              render: ({ status }) => <CvStatusBadge status={status} />,
            },
            {
              accessor: 'experienceInYears',
              title: t('cvs.experience'),
              width: 200,
              render: ({ experienceInYears }) =>
                experienceInYears
                  ? t('cvs.years', { number: experienceInYears })
                  : '-',
            },
          ],
        })}
      />
    </Stack>
  );
}
