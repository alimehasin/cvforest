'use client';

import { Avatar, Badge, Group, Stack, Text } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import dayjs from 'dayjs';
import { DataTable } from 'mantine-datatable';
import { useTranslations } from 'next-intl';
import { SearchInput } from '@/components/search-input';
import { useJoinRequestsList } from '@/features/join-requests/hooks/use-join-requests-list';
import type { JoinRequestsList } from '@/features/join-requests/types';
import { constructImageUrl } from '@/utils/helpers';

interface JoinRequestsProps {
  initialData: JoinRequestsList;
}

export function JoinRequests({ initialData }: JoinRequestsProps) {
  const t = useTranslations();

  const [filters, setFilters] = useSetState({
    search: '',
  });

  const { getTableProps, joinRequests } = useJoinRequestsList({
    initialData,
    filters,
  });

  return (
    <Stack>
      <Group justify="space-between">
        <SearchInput
          value={filters.search}
          onChange={(search) => setFilters({ search })}
        />
      </Group>

      <DataTable
        {...getTableProps({
          query: joinRequests,
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
              title: t('joinRequests.name'),
              width: 'auto',
            },
            {
              accessor: 'email',
              title: t('joinRequests.email'),
              width: 200,
            },
            {
              accessor: 'governorate',
              title: t('joinRequests.governorate'),
              width: 200,
              render: ({ governorate }) => {
                return governorate ? <Text>{governorate.name}</Text> : null;
              },
            },
            {
              accessor: 'skills',
              title: t('joinRequests.skills'),
              width: 300,
              render: ({ userSkills }) => {
                if (!userSkills || userSkills.length === 0) {
                  return null;
                }
                return (
                  <Group gap={4}>
                    {userSkills.map((userSkill) => (
                      <Badge key={userSkill.id} variant="light" size="sm">
                        {userSkill.skill.name}
                      </Badge>
                    ))}
                  </Group>
                );
              },
            },
            {
              accessor: 'createdAt',
              title: t('joinRequests.createdAt'),
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
