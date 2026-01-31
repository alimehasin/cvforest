'use client';

import {
  Button,
  Center,
  PasswordInput,
  PinInput,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useVerifyEmailOtpForm } from '@/features/accounts/hooks/use-verify-email-otp-form';
import { useVerifyEmailOtpMut } from '../../hooks/use-verify-email-otp-mut';

interface VerifyEmailOtpFormProps {
  email: string;
}

export function VerifyEmailOtpForm({ email }: VerifyEmailOtpFormProps) {
  const t = useTranslations();
  const form = useVerifyEmailOtpForm();
  const verifyOtpMut = useVerifyEmailOtpMut();

  const handleSubmit = form.onSubmit(async ({ otp, password }) => {
    await verifyOtpMut.mutateAsync({ email, otp, password });
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <Title>{t('auth.verifyEmail')}</Title>

        <Text>
          {t('auth.verificationCodeSent')} {email}.
        </Text>

        <Center>
          <PinInput
            size="lg"
            length={8}
            oneTimeCode
            {...form.getInputProps('otp')}
          />
        </Center>

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

        <Button type="submit" loading={verifyOtpMut.isPending}>
          {t('auth.setPassword')}
        </Button>
      </Stack>
    </form>
  );
}
