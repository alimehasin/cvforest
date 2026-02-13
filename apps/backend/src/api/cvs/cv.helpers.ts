import { prisma } from '@db/client';
import type { Server } from 'bun';
import { redis } from '@/utils/clients/redis/client';
import { VIEW_TTL_SECONDS } from './cvs.constants';

export function generateFingerprint(ip: string, userAgent: string): string {
  const data = `${ip}:${userAgent}`;
  const hash = new Bun.CryptoHasher('sha256');
  hash.update(data);

  return hash.digest('hex');
}

export async function cvExists(id: string): Promise<boolean> {
  const cv = await prisma.cv.findUnique({ where: { id } });

  return !!cv;
}

export function getFingerprint(
  request: Request,
  server: Server<unknown> | null,
): string {
  // Extract the IP address from the request headers
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    server?.requestIP(request)?.address ||
    'unknown';

  // Extract the User-Agent from the request headers
  const userAgent = request.headers.get('user-agent') || 'unknown';

  return generateFingerprint(ip, userAgent);
}

export async function trackCvView(
  cvId: string,
  request: Request,
  server: Server<unknown> | null,
): Promise<void> {
  const exists = await cvExists(cvId);
  if (!exists) {
    return;
  }

  const fingerprint = getFingerprint(request, server);
  const redisKey = `cv:view:${cvId}:${fingerprint}`;

  const existingView = await redis.get(redisKey);
  if (existingView) {
    return;
  }

  await redis.set(redisKey, '1');
  await redis.expire(redisKey, VIEW_TTL_SECONDS);

  await prisma.cv.update({
    where: { id: cvId },
    data: { views: { increment: 1 } },
  });
}
