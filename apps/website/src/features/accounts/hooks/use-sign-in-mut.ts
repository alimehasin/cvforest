import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type {
  VerifyOtpRequestBody,
  VerifyOtpResponseBody,
} from '@/features/accounts/types';
import { useKy } from '@/hooks/use-ky';
import { useNotifications } from '@/hooks/use-notifications';

export function useSignInMut() {
  const ky = useKy();
  const router = useRouter();
  const n = useNotifications();

  return useMutation({
    onSuccess: () => router.push('/'),
    onError: (error: Error) => n.error(error.message),

    mutationFn: async ({ phoneNumber, code }: VerifyOtpRequestBody) => {
      const result = await ky
        .post('accounts/verify-otp', { json: { phoneNumber, code } })
        .json<VerifyOtpResponseBody>();

      return result;
    },
  });
}
