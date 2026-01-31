import { prisma } from '@db/client';
import { env } from '@/env';
import type { TranslationFn } from '@/types';
import {
  deleteObjects,
  uploadImage,
  uploadVideo,
} from '@/utils/clients/s3/helpers';
import { HttpError } from '@/utils/error';
import type { UserFilesModel } from './files.user.model';

export const userFilesService = {
  async upload(
    t: TranslationFn,
    userId: string,
    body: typeof UserFilesModel.UserFilesCreateBody.static,
  ) {
    const isPublic = body.isPublic === 'true';

    if (body.type === 'Image') {
      const { key, size } = await uploadImage({
        isPublic,
        file: body.file,
        bucketName: env.STORAGE_BUCKET_NAME,
      });

      return prisma.file.create({
        data: { key, size, isPublic, type: body.type, userId },
      });
    }

    if (body.type === 'Video') {
      const { key, size } = await uploadVideo({
        file: body.file,
        bucketName: env.STORAGE_BUCKET_NAME,
        isPublic,
      });

      return prisma.file.create({
        data: { key, size, isPublic, type: body.type, userId },
      });
    }

    throw new HttpError({
      statusCode: 400,
      message: t({
        en: 'Invalid file type',
        ar: 'نوع الملف غير صالح',
      }),
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
