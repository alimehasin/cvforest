'use client';

import { Container } from '@mantine/core';
import { VerifyEmailOtpForm } from '@/features/accounts/components/verify-email-otp-form';

interface VerifyEmailProps {
  email: string;
}

export function VerifyEmail({ email }: VerifyEmailProps) {
  return (
    <Container size="xs" py={60}>
      <VerifyEmailOtpForm email={email} />
    </Container>
  );
}
