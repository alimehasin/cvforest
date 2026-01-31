import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useKy } from '@/hooks/use-ky';
import { useNotifications } from '@/hooks/use-notifications';
import type { SendOtpRequestBody, SendOtpResponseBody } from '../types';

export function useSendOtpMut() {
  const ky = useKy();
  const t = useTranslations();
  const n = useNotifications();

  return useMutation({
    onSuccess: () => n.success(t('login.otpSentSuccessfully')),
    mutationFn: async ({ phoneNumber }: SendOtpRequestBody) => {
      const result = await ky
        .post('accounts/send-otp', { json: { phoneNumber } })
        .json<SendOtpResponseBody>();

      return result;
    },
  });
}
