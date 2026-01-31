'use client';

import { Button, PinInput, Stack, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useVerifyEmailOtpForm } from '@/features/auth/hooks/use-verify-email-otp-form';
import { useVerifyEmailOtpMut } from '../../hooks/use-verify-email-otp-mut';

interface VerifyEmailOtpFormProps {
  email: string;
}

export function VerifyEmailOtpForm({ email }: VerifyEmailOtpFormProps) {
  const t = useTranslations();
  const form = useVerifyEmailOtpForm();
  const verifyOtpMut = useVerifyEmailOtpMut();

  const handleSubmit = form.onSubmit(async ({ otp }) => {
    await verifyOtpMut.mutateAsync({ email, otp });
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <Title>{t('auth.verifyEmail')}</Title>

        <Text>
          {t('auth.verificationCodeSent')} {email}.
        </Text>

        <PinInput length={8} oneTimeCode {...form.getInputProps('otp')} />

        <Button type="submit" loading={form.submitting}>
          {t('auth.verifyCode')}
        </Button>
      </Stack>
    </form>
  );
}
