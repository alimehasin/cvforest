'use client';

import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { IconCircleCheck, IconHome } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function VerifyEmailSuccess() {
  const t = useTranslations();

  return (
    <Container size="sm" pt={200}>
      <Stack gap="lg" align="center">
        <Paper withBorder shadow="sm" p={{ base: 'md', sm: 'lg' }} w="100%">
          <Stack align="center" gap="md" ta="center">
            <ThemeIcon size={96} radius="100vw" variant="light" color="green">
              <IconCircleCheck size={64} />
            </ThemeIcon>

            <Box>
              <Title order={1}>{t('auth.emailVerifiedSuccessTitle')}</Title>
              <Text size="lg" c="dimmed" mt="xs">
                {t('auth.emailVerifiedSuccessDescription')}
              </Text>
            </Box>

            <Button
              href="/"
              component={Link}
              leftSection={<IconHome size={20} />}
            >
              {t('notFound.goHome')}
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
