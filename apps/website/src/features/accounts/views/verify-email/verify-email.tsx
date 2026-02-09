'use client';

import {
  Anchor,
  Box,
  Container,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { IconMail } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface VerifyEmailProps {
  email?: string;
}

export function VerifyEmail({ email }: VerifyEmailProps) {
  const t = useTranslations();

  return (
    <Container size="sm" pt={200}>
      <Stack gap="lg" align="center">
        <Paper withBorder shadow="sm" p={{ base: 'md', sm: 'lg' }} w="100%">
          <Stack align="center" gap="md" ta="center">
            <ThemeIcon size={96} radius="100vw" variant="light" color="primary">
              <IconMail size={64} />
            </ThemeIcon>

            <Box>
              <Title order={1}>{t('auth.verifyEmail')}</Title>
              <Text size="lg" c="dimmed" mt="xs">
                {email ? (
                  <>
                    {t('auth.verificationLinkSent')}{' '}
                    <Text component="span" fw={600} inherit>
                      {email}
                    </Text>
                    .
                  </>
                ) : (
                  t('auth.verificationLinkSent')
                )}
              </Text>
              <Text size="sm" c="dimmed" mt="xs">
                {t('auth.verificationLinkInstructions')}
              </Text>
            </Box>

            <Anchor href="/sign-in" component={Link} size="sm" c="dimmed">
              {t('auth.backToSignIn')}
            </Anchor>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
