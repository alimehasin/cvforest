import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useKy } from '@/hooks/use-ky';
import { useNotifications } from '@/hooks/use-notifications';

export function useGovernoratesDelete() {
  const ky = useKy();
  const t = useTranslations();
  const n = useNotifications();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      return ky.delete(`governorates/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/governorates'] });
      n.info(t('governorates.deletedSuccessfully'));
    },
  });
}
