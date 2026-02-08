'use client';

import { Button, Container, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function VerifyEmailFailed() {
  const t = useTranslations();

  return (
    <Container size="xs" py={60}>
      <Stack>
        <Stack>
          <Title>{t('auth.emailVerificationFailedTitle')}</Title>

          <Text>{t('auth.emailVerificationFailedDescription')}</Text>
        </Stack>

        <Button component={Link} href="/sign-in" variant="light">
          {t('signIn.signIn')}
        </Button>
      </Stack>
    </Container>
  );
}
