'use server';

import ky from 'ky';
import { cookies, headers } from 'next/headers';
import { env } from '@/env';

export async function setLocale(locale: string) {
  const cookieStore = await cookies();
  cookieStore.set('locale', locale);
}

export async function getKy() {
  const headersList = await headers();

  return ky.create({
    credentials: 'include',
    prefixUrl: env.API_BASE_URL,
    headers: headersList,
  });
}
