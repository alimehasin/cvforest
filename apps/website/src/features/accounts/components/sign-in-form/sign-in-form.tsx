'use client';

import {
  Anchor,
  Button,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { IconKey, IconLogin, IconUser } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useSignInForm } from '../../hooks/use-sign-in-form';
import { useSignInMut } from '../../hooks/use-sign-in-mut';

export function SignInForm() {
  const t = useTranslations();
  const form = useSignInForm();
  const signInMut = useSignInMut();

  const handleSubmit = form.onSubmit(({ email, password }) => {
    signInMut.mutate({ email, password });
  });

  return (
    <form onSubmit={handleSubmit}>
      <Paper withBorder shadow="sm" p={{ base: 'md', sm: 'lg' }}>
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

          <Text ta="center" c="dimmed" size="sm">
            {t('signIn.dontHaveAccount')}{' '}
            <Anchor href="/sign-up" component={Link} c="blue" fw={500}>
              {t('signIn.signUp')}
            </Anchor>
          </Text>
        </Stack>
      </Paper>
    </form>
  );
}
