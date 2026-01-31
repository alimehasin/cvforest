import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { setLocale } from '@/server/actions';

export function useSetLocale() {
  const router = useRouter();

  return useMutation({
    mutationFn: setLocale,
    onSuccess: router.refresh,
  });
}
