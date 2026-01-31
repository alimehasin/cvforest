import { useMutation } from '@tanstack/react-query';
import { useKy } from '@/hooks/use-ky';
import type { SkillsCreateBody } from '../types';

interface SkillsCreateProps {
  onSuccess: () => void;
}

export function useSkillsCreate({ onSuccess }: SkillsCreateProps) {
  const ky = useKy();

  return useMutation({
    onSuccess,
    mutationFn: (body: SkillsCreateBody) => {
      return ky.post('skills', { json: body });
    },
  });
}
