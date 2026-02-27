import dayjs from 'dayjs';
import parsePhoneNumber from 'libphonenumber-js';
import { env } from '@/env';

export function constructFileUrl(key: string | undefined) {
  if (!key) {
    return undefined;
  }

  return `${env.NEXT_PUBLIC_STORAGE_BASE_URL}/${key}`;
}

export function formatDate(date: string | Date) {
  return dayjs(date).format('YYYY-MM-DD');
}

export function formatDateTime(date: string | Date) {
  return dayjs(date).format('YYYY-MM-DD | hh:mm a');
}

export function formatPhoneNumber(pn: string): string {
  const phoneNumber = parsePhoneNumber(pn, 'IQ');

  if (!phoneNumber || !phoneNumber.isValid()) {
    return pn;
  }

  return phoneNumber.formatInternational();
}
