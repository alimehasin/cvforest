import { VerifyEmailSuccess } from '@/features/accounts/views/verify-email-success';

interface VerifyEmailSuccessPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function VerifyEmailSuccessPage({
  searchParams,
}: VerifyEmailSuccessPageProps) {
  const { error } = await searchParams;

  return <VerifyEmailSuccess error={error} />;
}
