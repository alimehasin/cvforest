'use client';

import { SimpleGrid, Stack } from '@mantine/core';
import { ProfileForm } from '@/features/profile/components/profile-form';
import { ProfileInfo } from '@/features/profile/components/profile-info';
import { ProfileSessions } from '@/features/profile/components/profile-sessions';
import { useProfileGet } from '@/features/profile/hooks/use-profile-get';
import type { ProfileResponseBody } from '@/features/profile/types';

export function Profile({ initialData }: { initialData: ProfileResponseBody }) {
  const profile = useProfileGet({ initialData });

  return (
    <Stack>
      <SimpleGrid cols={2}>
        <ProfileInfo profile={profile.data} />
        <ProfileForm profile={profile.data} />
      </SimpleGrid>

      <ProfileSessions profile={profile.data} />
    </Stack>
  );
}
