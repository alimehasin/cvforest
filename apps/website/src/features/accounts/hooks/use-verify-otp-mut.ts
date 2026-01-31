import { useMutation } from '@tanstack/react-query';
import { useKy } from '@/hooks/use-ky';
import type { VerifyOtpRequestBody, VerifyOtpResponseBody } from '../types';

export function useVerifyOtpMut({ onSuccess }: { onSuccess: () => void }) {
  const ky = useKy();

  return useMutation({
    onSuccess,
    mutationFn: async ({ phoneNumber, code }: VerifyOtpRequestBody) => {
      const result = await ky
        .post('accounts/verify-otp', { json: { phoneNumber, code } })
        .json<VerifyOtpResponseBody>();

      return result;
    },
  });
}
