import { Container } from '@mantine/core';
import { Footer } from '@/components/footer';
import { Shell } from '@/components/shell';
import type { SessionResponseBody } from '@/features/accounts/types';
import { getKy } from '@/server/actions';

interface WebsiteLayoutProps {
  children: React.ReactNode;
}

export default async function WebsiteLayout({ children }: WebsiteLayoutProps) {
  const ky = await getKy();

  let session: SessionResponseBody | null;

  try {
    session = await ky.get('accounts/session').json<SessionResponseBody>();
  } catch {
    session = null;
  }

  return (
    <Shell session={session}>
      <Container size="lg">{children}</Container>
      <Footer />
    </Shell>
  );
}
