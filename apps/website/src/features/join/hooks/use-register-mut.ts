import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useKy } from '@/hooks/use-ky';
import { useNotifications } from '@/hooks/use-notifications';
import type { RegisterRequestBody, RegisterResponseBody } from '../types';

export function useRegisterMut() {
  const ky = useKy();
  const t = useTranslations();
  const n = useNotifications();
  const router = useRouter();

  return useMutation({
    mutationFn: (values: RegisterRequestBody) => {
      return ky
        .post('accounts/register', { json: values })
        .json<RegisterResponseBody>();
    },

    onSuccess: () => {
      n.success(t('join.registrationSuccess'));
      router.push('/');
    },
  });
}
