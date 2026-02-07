'use client';

import { Button, Container, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface VerifyEmailSuccessProps {
  error?: string;
}

export function VerifyEmailSuccess({ error }: VerifyEmailSuccessProps) {
  const t = useTranslations();

  return (
    <Container size="xs" py={60}>
      <Stack>
        <Title>{t('auth.verifyEmail')}</Title>
        {error ? (
          <Text c="red">{t('auth.invalidCode')}</Text>
        ) : (
          <Text>{t('auth.emailVerifiedSuccess')}</Text>
        )}
        <Button component={Link} href="/login" variant="light">
          {t('login.login')}
        </Button>
      </Stack>
    </Container>
  );
}
