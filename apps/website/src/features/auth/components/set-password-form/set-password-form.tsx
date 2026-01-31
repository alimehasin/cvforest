'use client';

import {
  Button,
  Container,
  PasswordInput,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useSetPasswordForm } from '@/features/auth/hooks/use-set-password-form';
import { useSetPasswordMut } from '@/features/auth/hooks/use-set-password-mut';

export function SetPasswordForm() {
  const t = useTranslations();
  const form = useSetPasswordForm();
  const setPasswordMut = useSetPasswordMut();

  const handleSubmit = form.onSubmit(async ({ password }) => {
    await setPasswordMut.mutateAsync({ password });
  });

  return (
    <Container size="xs" py={60}>
      <form onSubmit={handleSubmit}>
        <Stack>
          <Title>{t('auth.setPassword')}</Title>
          <Text>{t('auth.emailVerified')}</Text>

          <PasswordInput
            required
            label={t('auth.passwordPlaceholder')}
            placeholder={t('auth.passwordPlaceholder')}
            {...form.getInputProps('password')}
          />

          <PasswordInput
            required
            label={t('auth.confirmPassword')}
            placeholder={t('auth.confirmPassword')}
            {...form.getInputProps('confirmPassword')}
          />

          <Button type="submit" loading={setPasswordMut.isPending}>
            {t('auth.setPassword')}
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
