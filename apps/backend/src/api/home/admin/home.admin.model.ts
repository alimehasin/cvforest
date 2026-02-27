import { t } from 'elysia';

export const AdminHomeModel = {
  AdminHomeResponse: t.Object({
    metrics: t.Object({
      totalUsers: t.Number(),
      totalCvs: t.Number(),
      totalViews: t.Number(),
    }),
    charts: t.Object({
      cvs: t.Array(
        t.Object({
          month: t.String(),
          count: t.Number(),
        }),
      ),
    }),
  }),
};
