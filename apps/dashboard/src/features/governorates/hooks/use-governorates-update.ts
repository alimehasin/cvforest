import { useMutation } from '@tanstack/react-query';
import { useKy } from '@/hooks/use-ky';
import type { GovernoratesCreateBody } from '../types';

export function useGovernoratesUpdate({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const ky = useKy();

  return useMutation({
    onSuccess,
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: GovernoratesCreateBody;
    }) => {
      return ky.patch(`governorates/${id}`, { json: body });
    },
  });
}
