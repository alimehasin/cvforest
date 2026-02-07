import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useKy } from '@/hooks/use-ky';

export function useSignOut() {
  const ky = useKy();
  const router = useRouter();

  return useMutation({
    mutationFn: () => {
      return ky.post('accounts/sign-out').json();
    },
    onSuccess: () => {
      router.push('/');
      router.refresh();
    },
  });
}
