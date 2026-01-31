'use client';

import {
  Button,
  Center,
  FocusTrap,
  Group,
  Paper,
  PinInput,
  Stack,
  Text,
} from '@mantine/core';
import { IconShield } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useSendOtpMut } from '@/features/accounts/hooks/use-send-otp-mut';
import { useVerifyOtpForm } from '@/features/accounts/hooks/use-verify-otp-form';
import { useVerifyOtpMut } from '@/features/accounts/hooks/use-verify-otp-mut';

interface VerifyOtpProps {
  phoneNumber: string;
  next: string;
}

export function VerifyOtp({ phoneNumber, next }: VerifyOtpProps) {
  const router = useRouter();
  const t = useTranslations();
  const sendOtpMut = useSendOtpMut();
  const form = useVerifyOtpForm(phoneNumber);
  const verifyOtpMut = useVerifyOtpMut({
    onSuccess: () => {
      window.location.href = next;
    },
  });

  const handleVerifyOtp = form.onSubmit(({ phoneNumber, code }) => {
    verifyOtpMut.mutate({ phoneNumber, code });
  });

  const handleResendOtp = () => {
    if (phoneNumber) {
      sendOtpMut.mutate(
        { phoneNumber },
        { onSuccess: () => form.setFieldValue('code', '') },
      );
    }
  };

  const handleGoBack = () => {
    router.push('/accounts/login');
  };

  if (!phoneNumber) {
    return (
      <Paper withBorder radius="md" shadow="sm" p={{ base: 'md', sm: 'lg' }}>
        <Stack gap="md">
          <Text size="sm" c="red" ta="center">
            {t('login.phoneNumberRequired')}
          </Text>
          <Button fullWidth onClick={handleGoBack}>
            {t('login.goBack')}
          </Button>
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper withBorder shadow="sm" p={{ base: 'md', sm: 'lg' }}>
      <FocusTrap>
        <form onSubmit={handleVerifyOtp}>
          <Stack gap="md">
            <Text size="sm" c="dimmed" ta="center">
              {t('login.enterOtp')}
            </Text>

            <Center>
              <PinInput
                size="lg"
                length={6}
                type="number"
                {...form.getInputProps('code')}
                disabled={verifyOtpMut.isPending}
                onComplete={(code) => {
                  verifyOtpMut.mutate({ phoneNumber, code });
                }}
              />
            </Center>

            <Group justify="space-between">
              <Button variant="subtle" size="compact-sm" onClick={handleGoBack}>
                {t('login.goBack')}
              </Button>

              <Button
                variant="subtle"
                size="compact-sm"
                onClick={handleResendOtp}
                loading={sendOtpMut.isPending}
              >
                {t('login.resendOtp')}
              </Button>
            </Group>

            <Button
              mt="sm"
              fullWidth
              type="submit"
              loading={verifyOtpMut.isPending}
              leftSection={<IconShield size={18} />}
            >
              {t('login.verifyOtp')}
            </Button>
          </Stack>
        </form>
      </FocusTrap>
    </Paper>
  );
}
