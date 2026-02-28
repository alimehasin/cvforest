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

type SearchParamsValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | boolean[];

type SearchParamsObject = Record<string, SearchParamsValue>;

export function objectToSearchParams(obj: SearchParamsObject): URLSearchParams {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        params.append(key, String(item));
      }
    } else if (value !== null && value !== undefined) {
      params.append(key, String(value));
    }
  }

  return params;
}
