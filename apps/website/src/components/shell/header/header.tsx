'use client';

import { Anchor, Button, Container, Divider, Group } from '@mantine/core';
import { IconLogin, IconUpload } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/components/link/link';
import type { SessionResponseBody } from '@/features/accounts/types';
import { HeaderUserButton } from './header-user-button';
import cls from './styles.module.css';

interface HeaderProps {
  session: SessionResponseBody | null;
}

export function Header({ session }: HeaderProps) {
  const t = useTranslations();

  return (
    <Container size="lg" strategy="grid" className={cls.header}>
      <Group p="sm" justify="space-between">
        <Anchor fz="h2" fw={600} href="/">
          CV Forest
        </Anchor>

        <Group>
          <Group gap="xs">
            <Button variant="subtle">{t('header.plans')}</Button>
            <Button variant="subtle">{t('header.courses')}</Button>
          </Group>

          {session ? (
            <Group gap="xs">
              <Button
                href="/upload-cv"
                variant="filled"
                component={Link}
                leftSection={<IconUpload size={18} />}
              >
                {t('header.uploadCv')}
              </Button>

              <Divider orientation="vertical" />

              <HeaderUserButton session={session} />
            </Group>
          ) : (
            <>
              <Divider orientation="vertical" />

              <Group gap={4}>
                <Button
                  href="/sign-in"
                  variant="subtle"
                  component={Link}
                  leftSection={<IconLogin size={18} />}
                >
                  {t('header.signIn')}
                </Button>

                <Button
                  href="/sign-up"
                  variant="filled"
                  component={Link}
                  leftSection={<IconLogin size={18} />}
                >
                  {t('header.signUp')}
                </Button>
              </Group>
            </>
          )}
        </Group>
      </Group>
    </Container>
  );
}
