import type {
  AvailabilityType,
  Currency,
  Gender,
  WorkLocationType,
} from '@repo/backend/prisma/enums';
import type { TranslationFn } from '@/types';

export function translateGender(t: TranslationFn, gender: Gender) {
  const map: Record<Gender, string> = {
    Male: t('profiles.male'),
    Female: t('profiles.female'),
  };

  return map[gender];
}

export function translateAvailabilityType(
  t: TranslationFn,
  availability: AvailabilityType,
) {
  const map: Record<AvailabilityType, string> = {
    FullTime: t('join.availabilityFullTime'),
    PartTime: t('join.availabilityPartTime'),
    Freelance: t('join.availabilityFreelance'),
  };

  return map[availability];
}

export function translateWorkLocationType(
  t: TranslationFn,
  workLocation: WorkLocationType,
) {
  const map: Record<WorkLocationType, string> = {
    OnSite: t('join.workLocationOnSite'),
    Remote: t('join.workLocationRemote'),
    Hybrid: t('join.workLocationHybrid'),
  };

  return map[workLocation];
}

export function translateCurrency(t: TranslationFn, currency: Currency) {
  const map: Record<Currency, string> = {
    Iqd: t('join.currencyIQD'),
    Usd: t('join.currencyUSD'),
  };

  return map[currency];
}
