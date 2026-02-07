'use client';

import { Stack, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { CvsGrid } from '../../components/cvs-grid';

export function CvsList() {
  const t = useTranslations();

  return (
    <Stack gap="xl" py={40}>
      <Stack gap="xs">
        <Title order={2}>{t('browse.title')}</Title>
        <Text size="lg" c="dimmed">
          {t('browse.subtitle')}
        </Text>
      </Stack>

      <CvsGrid />
    </Stack>
  );
}
