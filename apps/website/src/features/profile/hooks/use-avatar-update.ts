import { useMutation } from '@tanstack/react-query';
import { useKy } from '@/hooks/use-ky';
import type { FileUploadResponseBody } from '../types';
import { useProfileUpdate } from './use-profile-update';

export function useAvatarUpdate() {
  const ky = useKy();
  const updateProfileMut = useProfileUpdate();

  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'Image');
      formData.append('isPublic', 'true');

      return ky
        .post('files/upload', { body: formData })
        .json<FileUploadResponseBody>();
    },

    onSuccess: (data) => {
      updateProfileMut.mutate({ avatarId: data.id });
    },
  });
}
