'use client';

import {
  Anchor,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { IconAlertCircle, IconLogin } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function VerifyEmailFailed() {
  const t = useTranslations();

  return (
    <Container size="xs" pt={200}>
      <Stack gap="lg" align="center">
        <Paper withBorder shadow="sm" p={{ base: 'md', sm: 'lg' }} w="100%">
          <Stack align="center" gap="md" ta="center">
            <ThemeIcon size={64} radius="xl" variant="light" color="red">
              <IconAlertCircle size={36} />
            </ThemeIcon>

            <Box>
              <Title order={1}>{t('auth.emailVerificationFailedTitle')}</Title>
              <Text size="lg" c="dimmed" mt="xs">
                {t('auth.emailVerificationFailedDescription')}
              </Text>
            </Box>

            <Stack gap="sm" w="100%">
              <Button
                component={Link}
                href="/sign-in"
                variant="filled"
                fullWidth
                leftSection={<IconLogin size={18} />}
              >
                {t('signIn.signIn')}
              </Button>
              <Text ta="center" c="dimmed" size="sm">
                {t('signIn.dontHaveAccount')}{' '}
                <Anchor href="/sign-up" component={Link} c="blue" fw={500}>
                  {t('signIn.signUp')}
                </Anchor>
              </Text>
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
