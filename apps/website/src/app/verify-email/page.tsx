import { VerifyEmail } from '@/features/accounts/views/verify-email';

interface VerifyEmailPageProps {
  searchParams: Promise<{ email?: string }>;
}

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const { email } = await searchParams;

  return <VerifyEmail email={email ?? undefined} />;
}
