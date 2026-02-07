'use client';

import { Button, Group, SimpleGrid, Stack } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { ProfileForm } from '@/features/profile/components/profile-form';
import { ProfileInfo } from '@/features/profile/components/profile-info';
import { ProfileSessions } from '@/features/profile/components/profile-sessions';
import { useProfileGet } from '@/features/profile/hooks/use-profile-get';
import { useSignOut } from '@/features/profile/hooks/use-sign-out';
import type { ProfileResponseBody } from '@/features/profile/types';

export function Profile({ initialData }: { initialData: ProfileResponseBody }) {
  const t = useTranslations();
  const profile = useProfileGet({ initialData });
  const signOutMut = useSignOut();

  return (
    <Stack>
      <SimpleGrid cols={2}>
        <ProfileInfo profile={profile.data} />
        <ProfileForm profile={profile.data} />
      </SimpleGrid>

      <ProfileSessions profile={profile.data} />

      <Group justify="flex-end">
        <Button
          color="red"
          variant="light"
          loading={signOutMut.isPending}
          disabled={signOutMut.isPending}
          onClick={() => signOutMut.mutate()}
          leftSection={<IconLogout size={16} />}
        >
          {t('header.signOut')}
        </Button>
      </Group>
    </Stack>
  );
}
