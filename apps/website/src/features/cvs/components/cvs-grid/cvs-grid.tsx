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
import { useCvsList } from '../../hooks/use-cvs-list';
import { CvsFilters } from '../cvs-filters';
import cls from './styles.module.css';

export function CvsGrid() {
  const t = useTranslations();
  const {
    cvs,
    search,
    setSearch,
    page,
    setPage,
    totalPages,
    filters,
    setFilters,
  } = useCvsList();

  return (
    <Stack gap="xl">
      <Group>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder={t('browse.searchPlaceholder')}
        />
      </Group>

      <CvsFilters filters={filters} setFilters={setFilters} />

      {cvs.isLoading ? (
        <SimpleGrid
          spacing="lg"
          className={cls.grid}
          cols={{ base: 1, xs: 2, md: 3, lg: 4 }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton
              height={280}
              radius="lg"
              key={`skeleton-${i.toString()}`}
            />
          ))}
        </SimpleGrid>
      ) : cvs.data?.data.length ? (
        <SimpleGrid
          spacing="lg"
          className={cls.grid}
          cols={{ base: 1, xs: 2, md: 3, lg: 4 }}
        >
          {cvs.data.data.map((user) => (
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
