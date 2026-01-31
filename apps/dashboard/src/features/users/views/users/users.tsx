'use client';

import { Avatar, Badge, Group, Stack, Text } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import dayjs from 'dayjs';
import { DataTable } from 'mantine-datatable';
import { useTranslations } from 'next-intl';
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
              width: 200,
            },
            {
              accessor: 'governorate',
              title: t('users.governorate'),
              width: 200,
              render: ({ governorate }) => {
                return governorate ? <Text>{governorate.name}</Text> : null;
              },
            },
            {
              accessor: 'skills',
              title: t('users.skills'),
              width: 300,
              render: ({ userSkills }) => (
                <Group gap={4}>
                  {userSkills.map((userSkill) => (
                    <Badge key={userSkill.id} variant="light" size="sm">
                      {userSkill.skill.name}
                    </Badge>
                  ))}
                </Group>
              ),
            },
            {
              accessor: 'createdAt',
              title: t('users.createdAt'),
              width: 200,
              render: ({ createdAt }) => {
                return dayjs(createdAt as string).format('YYYY-MM-DD');
              },
            },
          ],
        })}
      />
    </Stack>
  );
}
