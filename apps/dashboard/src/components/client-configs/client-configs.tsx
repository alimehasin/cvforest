'use client';

import 'dayjs/locale/ar';
import 'dayjs/locale/en';

import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(isBetween);
dayjs.extend(relativeTime);

export function ClientConfigs({ locale }: { locale: string }) {
  dayjs.locale(locale);

  return null;
}
