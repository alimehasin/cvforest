'use client';

import {
  Group,
  Pagination,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from '@mantine/core';
import { IconMoodEmpty } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { SearchInput } from '@/components/search-input';
import { UserCard } from '@/features/home/components/user-card';
import { useBrowseUsers } from '../../hooks/use-browse-users';
import cls from './styles.module.css';

export function BrowseGrid() {
  const t = useTranslations();
  const { users, search, setSearch, page, setPage, totalPages } =
    useBrowseUsers();

  return (
    <Stack gap="xl">
      <Group>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder={t('browse.searchPlaceholder')}
        />
      </Group>

      {users.isLoading ? (
        <SimpleGrid
          cols={{ base: 1, xs: 2, md: 3, lg: 4 }}
          spacing="lg"
          className={cls.grid}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton
              key={`skeleton-${i.toString()}`}
              height={280}
              radius="lg"
            />
          ))}
        </SimpleGrid>
      ) : users.data?.data.length ? (
        <SimpleGrid
          cols={{ base: 1, xs: 2, md: 3, lg: 4 }}
          spacing="lg"
          className={cls.grid}
        >
          {users.data.data.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </SimpleGrid>
      ) : (
        <Stack align="center" gap="xs" py={60}>
          <IconMoodEmpty
            size={48}
            stroke={1.5}
            color="var(--mantine-color-dimmed)"
          />
          <Text c="dimmed" size="lg">
            {t('browse.noResults')}
          </Text>
        </Stack>
      )}

      {totalPages > 1 && (
        <Group justify="center">
          <Pagination total={totalPages} value={page} onChange={setPage} />
        </Group>
      )}
    </Stack>
  );
}
