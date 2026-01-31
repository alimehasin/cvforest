import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useKy } from '@/hooks/use-ky';
import { useNotifications } from '@/hooks/use-notifications';
import type { SetPasswordRequestBody } from '../types';

interface SetPasswordResponseBody {
  success: boolean;
}

export function useSetPasswordMut() {
  const ky = useKy();
  const router = useRouter();
  const t = useTranslations();
  const n = useNotifications();

  return useMutation({
    mutationFn: (body: SetPasswordRequestBody) => {
      return ky
        .post('accounts/set-password', { json: body })
        .json<SetPasswordResponseBody>();
    },
    onSuccess: () => {
      n.success(t('auth.passwordSetSuccess'));
      router.push('/');
    },
  });
}
