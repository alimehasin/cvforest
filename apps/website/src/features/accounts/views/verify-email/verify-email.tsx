'use client';

import { Container, Stack, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';

interface VerifyEmailProps {
  email?: string;
}

export function VerifyEmail({ email }: VerifyEmailProps) {
  const t = useTranslations();

  return (
    <Container size="xs" py={60}>
      <Stack>
        <Title>{t('auth.verifyEmail')}</Title>
        <Text>
          {email
            ? `${t('auth.verificationLinkSent')} ${email}.`
            : t('auth.verificationLinkSent')}
        </Text>
        <Text size="sm" c="dimmed">
          {t('auth.verificationLinkInstructions')}
        </Text>
      </Stack>
    </Container>
  );
}
