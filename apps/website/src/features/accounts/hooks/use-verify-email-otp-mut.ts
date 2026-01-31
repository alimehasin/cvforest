import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useKy } from '@/hooks/use-ky';
import { useNotifications } from '@/hooks/use-notifications';
import type { VerifyEmailOtpRequestBody } from '../types';

interface VerifyEmailOtpResponseBody {
  success: boolean;
  userId: string;
  email: string;
}

export function useVerifyEmailOtpMut() {
  const ky = useKy();
  const router = useRouter();
  const t = useTranslations();
  const n = useNotifications();

  return useMutation({
    mutationFn: (body: VerifyEmailOtpRequestBody) => {
      return ky
        .post('accounts/verify-email-otp', { json: body })
        .json<VerifyEmailOtpResponseBody>();
    },
    onSuccess: () => {
      n.success(t('auth.passwordSetSuccess'));
      router.push('/');
    },
  });
}
