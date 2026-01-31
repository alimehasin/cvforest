import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useKy } from '@/hooks/use-ky';
import { useNotifications } from '@/hooks/use-notifications';
import type { ProfileUpdateBody } from '../types';

export function useProfileUpdate() {
  const ky = useKy();
  const t = useTranslations();
  const n = useNotifications();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: ProfileUpdateBody) => {
      return ky.patch('accounts/profile', { json: values });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/accounts/profile'] });
      n.success(t('profiles.updated'));
    },
  });
}
