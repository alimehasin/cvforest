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
        {error ? (
          <Stack>
            <Title>{t('auth.emailVerificationFailedTitle')}</Title>

            <Text c="red">{t('auth.emailVerificationFailedDescription')}</Text>
          </Stack>
        ) : (
          <Stack>
            <Title>{t('auth.emailVerifiedSuccessTitle')}</Title>

            <Text>{t('auth.emailVerifiedSuccessDescription')}</Text>
          </Stack>
        )}

        <Button component={Link} href="/sign-in" variant="light">
          {t('signIn.signIn')}
        </Button>
      </Stack>
    </Container>
  );
}
