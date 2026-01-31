import { Container } from '@mantine/core';
import { Header } from '@/components/header';

interface WebsiteLayoutProps {
  children: React.ReactNode;
}

export default async function WebsiteLayout({ children }: WebsiteLayoutProps) {
  return (
    <Container size="xl">
      <Header />
      {children}
    </Container>
  );
}
