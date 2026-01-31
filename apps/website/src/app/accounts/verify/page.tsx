import { VerifyOtp } from '@/features/accounts/views/verify-otp';

export default async function VerifyOtpPage({
  searchParams,
}: {
  searchParams: Promise<{ phoneNumber: string; next?: string }>;
}) {
  const { phoneNumber, next } = await searchParams;

  return <VerifyOtp phoneNumber={phoneNumber} next={next || '/'} />;
}
