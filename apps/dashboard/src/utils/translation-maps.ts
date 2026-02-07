import type {
  AvailabilityType,
  Currency,
  CvStatus,
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
  availabilityType: AvailabilityType,
) {
  const map: Record<AvailabilityType, string> = {
    FullTime: t('users.availabilityTypeFullTime'),
    PartTime: t('users.availabilityTypePartTime'),
    Freelance: t('users.availabilityTypeFreelance'),
  };

  return map[availabilityType];
}

export function translateWorkLocationType(
  t: TranslationFn,
  workLocationType: WorkLocationType,
) {
  const map: Record<WorkLocationType, string> = {
    OnSite: t('users.workLocationTypeOnSite'),
    Remote: t('users.workLocationTypeRemote'),
    Hybrid: t('users.workLocationTypeHybrid'),
  };

  return map[workLocationType];
}

export function translateCurrency(t: TranslationFn, currency: Currency) {
  const map: Record<Currency, string> = {
    Iqd: t('users.currencyIqd'),
    Usd: t('users.currencyUsd'),
  };

  return map[currency];
}

export function translateCvStatus(t: TranslationFn, status: CvStatus) {
  const map: Record<CvStatus, string> = {
    Pending: t('users.statusPending'),
    Approved: t('users.statusApproved'),
    Rejected: t('users.statusRejected'),
  };

  return map[status];
}
