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
import { useSetupPasswordMut } from '@/features/auth/hooks/use-setup-password-mut';

interface SetPasswordFormProps {
  email: string;
}

export function SetPasswordForm({ email }: SetPasswordFormProps) {
  const t = useTranslations();
  const form = useSetPasswordForm();
  const setupPasswordMut = useSetupPasswordMut();

  const handleSubmit = form.onSubmit(async ({ password }) => {
    await setupPasswordMut.mutateAsync({ email, password });
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

          <Button type="submit" loading={setupPasswordMut.isPending}>
            {t('auth.setPassword')}
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
