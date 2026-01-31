import { SendOtp } from '@/features/accounts/views/send-otp';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return <SendOtp next={next || '/'} />;
}
