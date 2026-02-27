import { prisma } from '@db/client';
import { FileType } from '@db/gen/prisma/enums';
import { env } from '@/env';
import type { TranslationFn } from '@/types';
import { deleteObjects } from '@/utils/clients/s3/helpers';
import {
  uploadImage,
  uploadOther,
  uploadPdf,
  uploadVideo,
} from '@/utils/clients/s3/uploaders';
import { HttpError } from '@/utils/error';
import type { UserFilesModel } from './files.user.model';

export const userFilesService = {
  async upload(
    t: TranslationFn,
    userId: string,
    body: typeof UserFilesModel.UserFilesCreateBody.static,
  ) {
    const isPublic = body.isPublic === 'true';
    const bucketName = env.STORAGE_BUCKET_NAME;

    const uploaders = {
      Pdf: () => uploadPdf({ file: body.file, bucketName, isPublic }),
      Image: () => uploadImage({ isPublic, file: body.file, bucketName }),
      Video: () => uploadVideo({ file: body.file, bucketName, isPublic }),
      Other: () => uploadOther({ file: body.file, bucketName, isPublic }),
    } as const;

    if (!(body.type in FileType)) {
      throw new HttpError({
        statusCode: 400,
        message: t({
          en: 'Invalid file type',
          ar: 'نوع الملف غير صالح',
        }),
      });
    }

    const { key, size } = await uploaders[body.type]();

    return prisma.file.create({
      data: { key, size, isPublic, type: body.type, userId },
    });
  },

  async delete(t: TranslationFn, fileId: string, userId: string) {
    const file = await prisma.file.findUnique({
      where: { id: fileId, userId },
    });

    if (!file) {
      throw new HttpError({
        statusCode: 404,
        message: t({
          en: 'File not found',
          ar: 'الملف غير موجود',
        }),
      });
    }

    await deleteObjects(env.STORAGE_BUCKET_NAME, [file.key]);
    await prisma.file.delete({ where: { id: fileId } });
  },
};
