import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useKy } from '@/hooks/use-ky';
import { useNotifications } from '@/hooks/use-notifications';
import type {
  RevokeOtherSessionsResponseBody,
  RevokeSessionResponseBody,
} from '../types';

export function useRevoke() {
  const ky = useKy();
  const t = useTranslations();
  const n = useNotifications();
  const queryClient = useQueryClient();

  const revokeMut = useMutation({
    mutationFn: (token: string) =>
      ky
        .post('accounts/revoke-session', { json: { token } })
        .json<RevokeSessionResponseBody>(),
  });

  const revokeAllMut = useMutation({
    mutationFn: () => {
      return ky
        .post('accounts/revoke-other-sessions')
        .json<RevokeOtherSessionsResponseBody>();
    },
    onSuccess: () => {
      n.success(t('sessions.revokeAllSuccess'));
      queryClient.invalidateQueries({ queryKey: ['/accounts/profile'] });
    },
  });

  return { revokeMut, revokeAllMut };
}
