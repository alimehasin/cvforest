import type { HTTPHeaders } from 'elysia';
import type { ElysiaCookie } from 'elysia/cookies';
import type { StatusMap } from 'elysia/utils';

type Set = {
  headers: HTTPHeaders;
  status?: number | keyof StatusMap;
  redirect?: string;
  cookie?: Record<string, ElysiaCookie>;
};

export function setBetterAuthHeaders(set: Set, headers: Headers) {
  for (const [key, value] of headers.entries()) {
    set.headers[key] = value;
  }
}
