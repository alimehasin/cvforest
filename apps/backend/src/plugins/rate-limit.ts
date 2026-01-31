import { rateLimit as elysiaRateLimit, type Options } from 'elysia-rate-limit';

interface GenRateLimitOptions extends Partial<Options> {
  durationInSeconds: number;
  errorMessage?: string;
}

export function genRateLimit({
  max,
  durationInSeconds,
  errorMessage,
  ...rest
}: GenRateLimitOptions) {
  return elysiaRateLimit({
    ...rest,

    max,
    duration: durationInSeconds * 1000,

    errorResponse: new Response(
      JSON.stringify({
        errorCode: 'HttpError',
        message: errorMessage ?? 'Too many requests, try again later.',
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ),

    generator: (req, server) => {
      return (
        req.headers.get('CF-Connecting-IP') ??
        server?.requestIP(req)?.address ??
        ''
      );
    },
  });
}

export const rateLimit = genRateLimit({
  max: 400,
  durationInSeconds: 60,
});
