'use client';

import {
  Box,
  Button,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { IconCircleCheck, IconHome, IconLogin } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function VerifyEmailSuccess() {
  const t = useTranslations();

  return (
    <Container size="xs" pt={200}>
      <Stack gap="lg" align="center">
        <Paper withBorder shadow="sm" p={{ base: 'md', sm: 'lg' }} w="100%">
          <Stack align="center" gap="md" ta="center">
            <ThemeIcon size={64} radius="xl" variant="light" color="green">
              <IconCircleCheck size={36} />
            </ThemeIcon>

            <Box>
              <Title order={1}>{t('auth.emailVerifiedSuccessTitle')}</Title>
              <Text size="lg" c="dimmed" mt="xs">
                {t('auth.emailVerifiedSuccessDescription')}
              </Text>
            </Box>

            <Group gap="md" mt="sm">
              <Button
                component={Link}
                href="/sign-in"
                variant="filled"
                leftSection={<IconLogin size={18} />}
              >
                {t('signIn.signIn')}
              </Button>
              <Button
                component={Link}
                href="/"
                variant="outline"
                leftSection={<IconHome size={18} />}
              >
                {t('notFound.goHome')}
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
