import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useKy } from '@/hooks/use-ky';
import { useNotifications } from '@/hooks/use-notifications';
import type { UserCvsCreateBody, UserCvsCreateResponseBody } from '../types';

export function useCvCreate() {
  const ky = useKy();
  const router = useRouter();
  const t = useTranslations();
  const n = useNotifications();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UserCvsCreateBody) => {
      return ky.post('cvs', { json: body }).json<UserCvsCreateResponseBody>();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/cvs'] });
      n.success(t('uploadCv.successMessage'));
      router.push('/profile');
      router.refresh();
    },
  });
}
