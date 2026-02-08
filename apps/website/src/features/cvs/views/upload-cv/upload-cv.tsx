'use client';

import { Stack, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { UploadCvForm } from '../../components/upload-cv-form';

export function UploadCv() {
  const t = useTranslations();

  return (
    <Stack gap="xl" py="xl">
      <Stack gap="xs">
        <Title order={2}>{t('uploadCv.pageTitle')}</Title>
        <Text size="lg" c="dimmed">
          {t('uploadCv.pageDescription')}
        </Text>
      </Stack>

      <UploadCvForm />
    </Stack>
  );
}
