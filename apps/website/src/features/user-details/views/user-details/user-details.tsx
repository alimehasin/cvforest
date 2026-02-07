'use client';

import { Grid, Stack } from '@mantine/core';
import { GithubActivity } from '@/features/user-details/components/github-activity';
import { UserAbout } from '@/features/user-details/components/user-about';
import { UserHero } from '@/features/user-details/components/user-hero';
import { UserSidebar } from '@/features/user-details/components/user-sidebar';
import { UserSkills } from '@/features/user-details/components/user-skills';
import { useUserDetails } from '@/features/user-details/hooks/use-user-details';
import type { UserDetailResponse } from '@/features/user-details/types';

interface UserDetailsProps {
  id: string;
  initialData: UserDetailResponse;
}

export function UserDetails({ id, initialData }: UserDetailsProps) {
  const { data: user } = useUserDetails({ id, initialData });

  return (
    <Stack gap="xl" py="xl">
      {/* Hero section */}
      <UserHero user={user} />

      {/* Two-column layout: main content + sidebar */}
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack gap="lg">
            <UserAbout user={user} />
            <UserSkills user={user} />
            <GithubActivity user={user} />
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <UserSidebar user={user} />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
