'use client';

import { Button, PinInput, Stack, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useVerifyEmailOtpForm } from '@/features/auth/hooks/use-verify-email-otp-form';

interface VerifyEmailOtpFormProps {
  email: string;
  onVerify: (otp: string) => Promise<void>;
  isVerifying?: boolean;
  errorMessage?: string;
}

export function VerifyEmailOtpForm({
  email,
  onVerify,
  errorMessage,
  isVerifying = false,
}: VerifyEmailOtpFormProps) {
  const t = useTranslations();
  const form = useVerifyEmailOtpForm();

  const handleSubmit = form.onSubmit(async ({ otp }) => {
    await onVerify(otp);
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <Title>{t('auth.verifyEmail')}</Title>
        <Text>
          {t('auth.verificationCodeSent')} {email}.
        </Text>

        <PinInput
          length={8}
          value={form.values.otp}
          onChange={(value) => form.setFieldValue('otp', value)}
          oneTimeCode
          disabled={isVerifying}
          error={!!form.errors.otp}
        />

        {form.errors.otp && <Text c="red">{form.errors.otp}</Text>}
        {errorMessage && <Text c="red">{errorMessage}</Text>}

        <Button
          type="submit"
          disabled={form.values.otp.length !== 6 || isVerifying}
          loading={isVerifying}
        >
          {t('auth.verifyCode')}
        </Button>
      </Stack>
    </form>
  );
}
