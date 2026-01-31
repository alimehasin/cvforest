'use client';

import { Avatar, Stack, Text } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import { DataTable } from 'mantine-datatable';
import { useTranslations } from 'next-intl';
import { PhoneNumber } from '@/components/phone-number';
import { SearchInput } from '@/components/search-input';
import { useUsersList } from '@/features/users/hooks/use-users-list';
import type { UsersList } from '@/features/users/types';
import { constructImageUrl } from '@/utils/helpers';
import { UsersRowExpansion } from '../../components/users-row-expansion';

interface UsersProps {
  initialData: UsersList;
}

export function Users({ initialData }: UsersProps) {
  const t = useTranslations();

  const [filters, setFilters] = useSetState({
    search: '',
  });

  const { getTableProps, users } = useUsersList({
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
          content: ({ record }) => <UsersRowExpansion user={record} />,
        }}
        {...getTableProps({
          query: users,
          columns: [
            {
              accessor: 'avatar',
              title: '',
              width: 64,
              render: ({ avatar }) => {
                return (
                  <Avatar
                    radius="var(--mantine-radius-md)"
                    src={constructImageUrl(avatar?.key)}
                  />
                );
              },
            },
            {
              accessor: 'name',
              title: t('users.name'),
              width: 'auto',
            },
            {
              accessor: 'email',
              title: t('users.email'),
              width: 220,
            },
            {
              accessor: 'phoneNumber',
              title: t('users.phoneNumber'),
              width: 200,
              render: ({ phoneNumber }) =>
                phoneNumber ? <PhoneNumber phone={phoneNumber} /> : '-',
            },
            {
              accessor: 'governorate',
              title: t('users.governorate'),
              width: 120,
              render: ({ governorate }) => {
                return governorate ? <Text>{governorate.name}</Text> : null;
              },
            },
            {
              accessor: 'jobTitle',
              title: t('users.jobTitle'),
              width: 200,
            },
          ],
        })}
      />
    </Stack>
  );
}
