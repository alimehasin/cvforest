'use client';

import { AppShell, AppShellHeader } from '@mantine/core';
import type { SessionResponseBody } from '@/features/accounts/types';
import { Header } from './header';

interface ShellProps {
  session: SessionResponseBody | null;
  children: React.ReactNode;
}

export function Shell({ session, children }: ShellProps) {
  return (
    <AppShell padding="xl" header={{ height: 60 }}>
      <AppShellHeader>
        <Header session={session} />
      </AppShellHeader>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
