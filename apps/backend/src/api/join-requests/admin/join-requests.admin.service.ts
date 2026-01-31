import { prisma } from '@db/client';
import type { Prisma } from '@db/gen/prisma/client';
import type { TranslationFn } from '@/types';
import { HttpError } from '@/utils/error';
import { parsePaginationProps, parseSortingProps } from '@/utils/helpers';
import type { AdminJoinRequestsModel } from './join-requests.admin.model';

export const adminJoinRequestsService = {
  async list(
    query: typeof AdminJoinRequestsModel.AdminJoinRequestsListQuery.static,
  ) {
    const where: Prisma.UserWhereInput = {
      status: 'Pending',
      ...(query.search && {
        OR: [
          { name: { contains: query.search, mode: 'insensitive' } },
          { email: { contains: query.search, mode: 'insensitive' } },
        ],
      }),
    };

    const total = await prisma.user.count({ where });

    const data = await prisma.user.findMany({
      ...parsePaginationProps(query),
      ...parseSortingProps(query),
      where,
      include: {
        avatar: true,
        governorate: true,
        userSkills: {
          include: {
            skill: true,
          },
        },
      },
    });

    return { total, data };
  },

  async getById(
    id: string,
    t: TranslationFn,
  ): Promise<
    typeof AdminJoinRequestsModel.AdminJoinRequestsGetResponse.static
  > {
    const joinRequest = await prisma.user.findUnique({
      where: { id },
      include: {
        avatar: true,
        governorate: true,
        userSkills: {
          include: {
            skill: true,
          },
        },
      },
    });

    if (!joinRequest) {
      throw new HttpError({
        statusCode: 404,
        message: t({
          en: 'Join request not found',
          ar: 'طلب الانضمام غير موجود',
        }),
      });
    }

    if (joinRequest.status !== 'Pending') {
      throw new HttpError({
        statusCode: 404,
        message: t({
          en: 'Join request not found',
          ar: 'طلب الانضمام غير موجود',
        }),
      });
    }

    return joinRequest;
  },

  async approve(id: string, t: TranslationFn) {
    const joinRequest = await prisma.user.findUnique({
      where: { id },
    });

    if (!joinRequest) {
      throw new HttpError({
        statusCode: 404,
        message: t({
          en: 'Join request not found',
          ar: 'طلب الانضمام غير موجود',
        }),
      });
    }

    if (joinRequest.status !== 'Pending') {
      throw new HttpError({
        statusCode: 400,
        message: t({
          en: 'Join request already approved',
          ar: 'تم الموافقة على طلب الانضمام بالفعل',
        }),
      });
    }

    await prisma.user.update({
      where: { id },
      data: { status: 'Approved' },
    });

    return {
      message: t({
        en: 'Join request approved successfully',
        ar: 'تمت الموافقة على طلب الانضمام بنجاح',
      }),
    };
  },
};
