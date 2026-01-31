import { Header } from '@/components/header';

interface WebsiteLayoutProps {
  children: React.ReactNode;
}

export default async function WebsiteLayout({ children }: WebsiteLayoutProps) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
