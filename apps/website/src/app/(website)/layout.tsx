import { Container } from '@mantine/core';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

interface WebsiteLayoutProps {
  children: React.ReactNode;
}

export default async function WebsiteLayout({ children }: WebsiteLayoutProps) {
  return (
    <Container size="xl">
      <Header />
      {children}
      <Footer />
    </Container>
  );
}
