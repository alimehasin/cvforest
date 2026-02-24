'use client';

import { Anchor, Box, Container, Group, Title } from '@mantine/core';
import Image from 'next/image';
import { Link } from '@/components/link';
import type { SessionResponseBody } from '@/features/accounts/types';
import { DesktopNav } from './desktop-nav';
import { MobileNav } from './mobile-nav';
import cls from './styles.module.css';

interface HeaderProps {
  session: SessionResponseBody | null;
}

export function Header({ session }: HeaderProps) {
  return (
    <Container size="lg" strategy="grid" className={cls.header}>
      <Group p="sm" justify="space-between" wrap="nowrap">
        <Anchor
          underline="never"
          href="/"
          component={Link}
          className={cls.logo}
          aria-label="CV Forest"
        >
          <Image
            src="/logo-512.png"
            alt="CV Forest"
            width={160}
            height={40}
            className={cls.logoImage}
            priority
          />

          <Title order={3}>CV Forest</Title>
        </Anchor>

        <Box visibleFrom="sm">
          <DesktopNav session={session} />
        </Box>

        <Box hiddenFrom="sm">
          <MobileNav session={session} />
        </Box>
      </Group>
    </Container>
  );
}
