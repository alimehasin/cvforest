'use client';

import { Button, FocusTrap, Paper, Stack } from '@mantine/core';
import { IconShield } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { PhoneNumberInput } from '@/components/phone-number-input';
import { useSendOtpForm } from '@/features/accounts/hooks/use-send-otp-form';
import { useSendOtpMut } from '@/features/accounts/hooks/use-send-otp-mut';

export function SendOtp({ next }: { next: string }) {
  const t = useTranslations();
  const router = useRouter();
  const form = useSendOtpForm();
  const sendOtpMut = useSendOtpMut();

  const handleSendOtp = form.onSubmit(({ phoneNumber }) => {
    sendOtpMut.mutate(
      { phoneNumber },
      {
        onSuccess: () => {
          router.push(
            `/accounts/verify?phoneNumber=${encodeURIComponent(phoneNumber)}&next=${encodeURIComponent(next)}`,
          );
        },
      },
    );
  });

  return (
    <Paper withBorder radius="md" shadow="sm" p={{ base: 'md', sm: 'lg' }}>
      <FocusTrap>
        <form onSubmit={handleSendOtp}>
          <Stack gap="md">
            <PhoneNumberInput
              required
              label={t('login.phoneNumber')}
              {...form.getInputProps('phoneNumber')}
            />

            <Button
              mt="sm"
              fullWidth
              type="submit"
              loading={sendOtpMut.isPending}
              leftSection={<IconShield size={18} />}
            >
              {t('login.sendOtp')}
            </Button>
          </Stack>
        </form>
      </FocusTrap>
    </Paper>
  );
}
