'use client';

import {
  Box,
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { IconKey, IconLogin, IconUser } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useSignInForm } from '../../hooks/use-sign-in-form';
import { useSignInMut } from '../../hooks/use-sign-in-mut';

export function SignIn() {
  const t = useTranslations();
  const form = useSignInForm();
  const signInMut = useSignInMut();

  const handleSubmit = form.onSubmit(({ email, password }) => {
    signInMut.mutate({ email, password });
  });

  return (
    <Container size="xs" pt={200}>
      <Stack gap="lg">
        <Box ta="center">
          <Title order={1}>{t('signIn.pageTitle')}</Title>
          <Text c="dimmed" size="lg">
            {t('signIn.pageDescription')}
          </Text>
        </Box>

        <Paper withBorder shadow="sm" p={{ base: 'md', sm: 'lg' }}>
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <TextInput
                required
                autoCapitalize="off"
                label={t('signIn.email')}
                placeholder={t('signup.emailPlaceholder')}
                leftSection={<IconUser size={18} />}
                {...form.getInputProps('email')}
              />

              <PasswordInput
                required
                label={t('signIn.password')}
                placeholder={t('auth.passwordPlaceholder')}
                leftSection={<IconKey size={18} />}
                {...form.getInputProps('password')}
              />

              <Button
                mt="sm"
                fullWidth
                type="submit"
                loading={signInMut.isPending}
                leftSection={<IconLogin size={18} />}
              >
                {t('signIn.signIn')}
              </Button>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </Container>
  );
}
