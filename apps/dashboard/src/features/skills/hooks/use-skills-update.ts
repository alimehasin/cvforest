import { useMutation } from '@tanstack/react-query';
import { useKy } from '@/hooks/use-ky';
import type { SkillsCreateBody } from '../types';

interface SkillsUpdateProps {
  onSuccess: () => void;
}

export function useSkillsUpdate({ onSuccess }: SkillsUpdateProps) {
  const ky = useKy();

  return useMutation({
    onSuccess,
    mutationFn: ({ id, body }: { id: string; body: SkillsCreateBody }) => {
      return ky.patch(`skills/${id}`, { json: body });
    },
  });
}
