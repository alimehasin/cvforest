import { Container } from '@mantine/core';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
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
    <div>
      <Header session={session} />
      <Container size="xl">{children}</Container>
      <Footer />
    </div>
  );
}
