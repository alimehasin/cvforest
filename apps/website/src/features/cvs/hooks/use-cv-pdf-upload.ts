import { useMutation } from '@tanstack/react-query';
import type { FileUploadResponseBody } from '@/features/profile/types';
import { useKy } from '@/hooks/use-ky';

export function useCvPdfUpload() {
  const ky = useKy();

  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'Pdf');
      formData.append('isPublic', 'true');

      return ky
        .post('files/upload', { body: formData })
        .json<FileUploadResponseBody>();
    },
  });
}
