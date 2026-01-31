import { FileType } from '@db/gen/prisma/client';
import { FilePlain } from '@db/gen/prismabox/File';
import { t } from 'elysia';

export const AdminFilesModel = {
  AdminFilesCreateBody: t.Object({
    file: t.File(),
    type: t.Enum(FileType),
    isPublic: t.Union([t.Literal('true'), t.Literal('false')]),
  }),

  AdminFilesCreateResponse: FilePlain,

  AdminFilesDeleteResponse: t.Any(),
};
