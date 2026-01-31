import type { Gender } from '@repo/backend/prisma/enums';
import type { TranslationFn } from '@/types';

export function translateGender(t: TranslationFn, gender: Gender) {
  const map: Record<Gender, string> = {
    Male: t('profiles.male'),
    Female: t('profiles.female'),
  };

  return map[gender];
}
