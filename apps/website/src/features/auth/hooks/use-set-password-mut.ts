import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useKy } from '@/hooks/use-ky';
import { useNotifications } from '@/hooks/use-notifications';

interface SetPasswordRequestBody {
  email: string;
  password: string;
}

interface SetPasswordResponseBody {
  success: boolean;
}

export function useSetPasswordMut() {
  const ky = useKy();
  const router = useRouter();
  const t = useTranslations();
  const n = useNotifications();

  return useMutation({
    mutationFn: ({ email, password }: SetPasswordRequestBody) => {
      const body = { email, password };

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
