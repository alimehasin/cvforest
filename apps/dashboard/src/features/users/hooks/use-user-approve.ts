import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useKy } from '@/hooks/use-ky';
import { useNotifications } from '@/hooks/use-notifications';
import type { UserApproveResponse } from '../types';

export function useUserApprove() {
  const ky = useKy();
  const t = useTranslations();
  const n = useNotifications();

  return useMutation({
    mutationFn: async (id: string) => {
      return ky.patch(`users/${id}/approve`).json<UserApproveResponse>();
    },
    onSuccess: () => {
      n.success(t('users.approvedSuccessfully'));
    },
  });
}
