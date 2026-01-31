import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useKy } from '@/hooks/use-ky';
import { useNotifications } from '@/hooks/use-notifications';

interface VerifyEmailOtpRequestBody {
  email: string;
  otp: string;
}

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
    mutationFn: ({ email, otp }: VerifyEmailOtpRequestBody) => {
      const body = { email, otp };

      return ky
        .post('accounts/verify-email-otp', { json: body })
        .json<VerifyEmailOtpResponseBody>();
    },
    onSuccess: () => {
      n.success(t('auth.emailVerified'));
      router.push('/set-password');
    },
  });
}
