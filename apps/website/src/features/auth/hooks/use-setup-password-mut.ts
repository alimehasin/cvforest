import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useKy } from '@/hooks/use-ky';
import { useNotifications } from '@/hooks/use-notifications';

interface SetupPasswordRequestBody {
  email: string;
  password: string;
}

interface SetupPasswordResponseBody {
  success: boolean;
}

export function useSetupPasswordMut() {
  const ky = useKy();
  const router = useRouter();
  const t = useTranslations();
  const n = useNotifications();

  return useMutation({
    mutationFn: ({ email, password }: SetupPasswordRequestBody) => {
      const body = { email, password };

      return ky
        .post('accounts/setup-password', { json: body })
        .json<SetupPasswordResponseBody>();
    },
    onSuccess: () => {
      n.success(t('auth.passwordSetSuccess'));
      router.push('/');
    },
  });
}
