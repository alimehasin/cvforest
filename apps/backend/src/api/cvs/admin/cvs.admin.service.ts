import { prisma } from '@db/client';
import type { Prisma } from '@db/gen/prisma/client';
import type { TranslationFn } from '@/types';
import { HttpError } from '@/utils/error';
import { parsePaginationProps, parseSortingProps } from '@/utils/helpers';
import type { AdminCvsModel } from './cvs.admin.model';

export const adminCvsService = {
  async list(query: typeof AdminCvsModel.AdminCvsListQuery.static) {
    const where: Prisma.CvWhereInput = {
      ...(query.status && {
        status: query.status,
      }),
      ...(query.search && {
        OR: [
          { jobTitle: { contains: query.search, mode: 'insensitive' } },
          {
            user: {
              OR: [
                { name: { contains: query.search, mode: 'insensitive' } },
                { email: { contains: query.search, mode: 'insensitive' } },
              ],
            },
          },
        ],
      }),
    };

    const total = await prisma.cv.count({ where });

    const data = await prisma.cv.findMany({
      ...parsePaginationProps(query),
      ...parseSortingProps(query),
      where,
      include: {
        file: true,
        userSkills: { include: { skill: true } },
        user: { include: { avatar: true, governorate: true } },
      },
    });

    return { total, data };
  },

  async getById(
    id: string,
    t: TranslationFn,
  ): Promise<typeof AdminCvsModel.AdminCvsGetResponse.static> {
    const cv = await prisma.cv.findUnique({
      where: { id },
      include: {
        file: true,
        userSkills: { include: { skill: true } },
        user: { include: { avatar: true, governorate: true } },
      },
    });

    if (!cv) {
      throw new HttpError({
        statusCode: 404,
        message: t({
          en: 'CV not found',
          ar: 'السيرة الذاتية غير موجودة',
        }),
      });
    }

    return cv;
  },

  async approve(
    id: string,
    t: TranslationFn,
  ): Promise<typeof AdminCvsModel.AdminCvsApproveResponse.static> {
    const cv = await prisma.cv.findUnique({
      where: { id },
    });

    if (!cv) {
      throw new HttpError({
        statusCode: 404,
        message: t({
          en: 'CV not found',
          ar: 'السيرة الذاتية غير موجودة',
        }),
      });
    }

    await prisma.cv.update({
      where: { id },
      data: {
        status: 'Approved',
      },
    });

    return {
      message: t({
        en: 'CV approved successfully',
        ar: 'تم الموافقة على السيرة الذاتية بنجاح',
      }),
    };
  },

  async reject(
    id: string,
    t: TranslationFn,
  ): Promise<typeof AdminCvsModel.AdminCvsRejectResponse.static> {
    const cv = await prisma.cv.findUnique({
      where: { id },
    });

    if (!cv) {
      throw new HttpError({
        statusCode: 404,
        message: t({
          en: 'CV not found',
          ar: 'السيرة الذاتية غير موجودة',
        }),
      });
    }

    await prisma.cv.update({
      where: { id },
      data: {
        status: 'Rejected',
      },
    });

    return {
      message: t({
        en: 'CV rejected successfully',
        ar: 'تم رفض السيرة الذاتية بنجاح',
      }),
    };
  },
};
