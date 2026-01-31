import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useKy } from '@/hooks/use-ky';
import { useNotifications } from '@/hooks/use-notifications';
import type { SignInRequestBody } from '../types';

export function useSignInMut() {
  const ky = useKy();
  const router = useRouter();
  const n = useNotifications();

  return useMutation({
    onSuccess: () => router.push('/'),
    onError: (error: Error) => n.error(error.message),

    mutationFn: async ({ email, password }: SignInRequestBody) => {
      const result = await ky
        .post('accounts/sign-in', { json: { email, password } })
        .json<SignInRequestBody>();

      return result;
    },
  });
}
