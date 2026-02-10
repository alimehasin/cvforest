import type {
  AvailabilityType,
  Currency,
  Gender,
  WorkLocationType,
} from '@repo/backend/prisma/enums';
import type { TranslationFn } from '@/types';

export function translateGender(t: TranslationFn, gender: Gender) {
  const map: Record<Gender, string> = {
    Male: t('gender.male'),
    Female: t('gender.female'),
  };

  return map[gender];
}

export function translateAvailabilityType(
  t: TranslationFn,
  availability: AvailabilityType,
) {
  const map: Record<AvailabilityType, string> = {
    FullTime: t('availability.fullTime'),
    PartTime: t('availability.partTime'),
    Freelance: t('availability.freelance'),
  };

  return map[availability];
}

export function translateWorkLocationType(
  t: TranslationFn,
  workLocation: WorkLocationType,
) {
  const map: Record<WorkLocationType, string> = {
    OnSite: t('workLocation.onSite'),
    Remote: t('workLocation.remote'),
    Hybrid: t('workLocation.hybrid'),
  };

  return map[workLocation];
}

export function translateCurrency(t: TranslationFn, currency: Currency) {
  const map: Record<Currency, string> = {
    Iqd: t('currency.iqd'),
    Usd: t('currency.usd'),
  };

  return map[currency];
}

export function translateAvailableForHire(
  t: TranslationFn,
  availableForHire: boolean,
) {
  return availableForHire
    ? t('uploadCv.availableForHireYes')
    : t('uploadCv.availableForHireNo');
}
