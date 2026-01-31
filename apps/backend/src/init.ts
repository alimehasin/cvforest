import { Elysia } from 'elysia';
import type { TranslationFn } from '@/types';

export const init = new Elysia({ name: 'init' })

  // Macros
  .macro({
    successStatus: (statusCode: number) => ({
      afterHandle({ set }) {
        set.status = statusCode;
      },
    }),
  })

  // Derives
  .derive({ as: 'scoped' }, ({ headers }) => {
    const lang = headers['accept-language']?.split(',')[0] || 'en';

    const t: TranslationFn = ({ en, ar }: { en: string; ar: string }) => {
      return lang === 'ar' ? ar : en;
    };

    return { t };
  });
