'use client';

import { Button, Stack, Text, Title } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/components/link/link';
import { CvsGrid } from '@/features/cvs/components/cvs-grid';
import cls from './styles.module.css';

export function CvsSection() {
  const t = useTranslations();

  return (
    <section className={cls.section}>
      <Stack gap="xl">
        <Stack align="center" gap="xs" className={cls.header}>
          <Title order={2} ta="center" className={cls.title}>
            {t('cvs.title')}
          </Title>
          <Text size="lg" c="dimmed" ta="center" maw={560}>
            {t('cvs.subtitle')}
          </Text>
        </Stack>

        <CvsGrid compact gridClassName={cls.grid} />

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
