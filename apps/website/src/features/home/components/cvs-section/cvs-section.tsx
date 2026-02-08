'use client';

import {
  Button,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/components/link/link';
import { useCvsList } from '@/features/cvs/hooks/use-cvs-list';
import { CvCard } from '../cv-card';
import cls from './styles.module.css';

export function CvsSection() {
  const t = useTranslations();
  const { cvs } = useCvsList();

  return (
    <section className={cls.section}>
      <Stack gap="xl" py={60}>
        <Stack align="center" gap="xs" className={cls.header}>
          <Title order={2} ta="center" className={cls.title}>
            {t('cvs.title')}
          </Title>
          <Text size="lg" c="dimmed" ta="center" maw={560}>
            {t('cvs.subtitle')}
          </Text>
        </Stack>

        <SimpleGrid
          cols={{ base: 1, xs: 2, md: 3, lg: 4 }}
          spacing="lg"
          className={cls.grid}
        >
          {cvs.isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <Skeleton
                  key={`skeleton-${i.toString()}`}
                  height={280}
                  radius="lg"
                />
              ))
            : cvs.data?.data.map((cv) => <CvCard key={cv.id} cv={cv} />)}
        </SimpleGrid>

        <Stack align="center">
          <Button
            size="md"
            variant="light"
            href="/cvs"
            component={Link}
            rightSection={
              <IconArrowRight className="rtl-rotate-180" size={18} />
            }
          >
            {t('cvs.browseAll')}
          </Button>
        </Stack>
      </Stack>
    </section>
  );
}
