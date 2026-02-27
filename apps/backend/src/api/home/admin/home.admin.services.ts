import { prisma } from '@db/client';
import { groupDatesByMonth } from '@/utils/stats';

export const adminHomeService = {
  async getHome() {
    const [totalUsers, totalCvs, totalViews, cvsData] = await Promise.all([
      prisma.user.count(),
      prisma.cv.count(),
      prisma.cv.count(),
      prisma.cv.findMany({ select: { createdAt: true } }),
    ]);

    const cvs = groupDatesByMonth({
      datasets: { count: cvsData.map((cv) => cv.createdAt) },
    }) as unknown as { month: string; count: number }[];

    return {
      metrics: {
        totalUsers,
        totalCvs,
        totalViews,
      },
      charts: {
        cvs,
      },
    };
  },
};
