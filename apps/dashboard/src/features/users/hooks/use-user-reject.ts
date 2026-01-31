import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useKy } from '@/hooks/use-ky';
import { useNotifications } from '@/hooks/use-notifications';
import type { UserRejectResponse } from '../types';

export function useUserReject() {
  const ky = useKy();
  const t = useTranslations();
  const n = useNotifications();

  return useMutation({
    mutationFn: async (id: string) => {
      return ky.patch(`users/${id}/reject`).json<UserRejectResponse>();
    },
    onSuccess: () => {
      n.success(t('users.rejectedSuccessfully'));
    },
  });
}
