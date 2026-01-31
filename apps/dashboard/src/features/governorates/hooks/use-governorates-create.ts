import { useMutation } from '@tanstack/react-query';
import { useKy } from '@/hooks/use-ky';
import type { GovernoratesCreateBody } from '../types';

export function useGovernoratesCreate({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const ky = useKy();

  return useMutation({
    onSuccess,
    mutationFn: (body: GovernoratesCreateBody) => {
      return ky.post('governorates', { json: body });
    },
  });
}
