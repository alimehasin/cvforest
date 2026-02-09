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
import { CvCard } from '@/features/home/components/cv-card';
import { useCvsList } from '../../hooks/use-cvs-list';
import { CvsFilters } from '../cvs-filters';
import cls from './styles.module.css';

interface CvsGridProps {
  compact?: boolean;
  gridClassName?: string;
}

export function CvsGrid({ compact = false, gridClassName }: CvsGridProps = {}) {
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
      {!compact && (
        <>
          <Group>
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder={t('browse.searchPlaceholder')}
            />
          </Group>
          <CvsFilters filters={filters} setFilters={setFilters} />
        </>
      )}

      {cvs.isLoading ? (
        <SimpleGrid
          spacing="lg"
          className={gridClassName ?? cls.grid}
          cols={{ base: 1, xs: 2, md: 3 }}
        >
          {Array.from({ length: compact ? 8 : 12 }).map((_, i) => (
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
          className={gridClassName ?? cls.grid}
          cols={{ base: 1, xs: 2, md: 3 }}
        >
          {cvs.data.data.map((cv) => (
            <CvCard key={cv.id} cv={cv} />
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

      {!compact && totalPages > 1 && (
        <Group justify="center">
          <Pagination total={totalPages} value={page} onChange={setPage} />
        </Group>
      )}
    </Stack>
  );
}
