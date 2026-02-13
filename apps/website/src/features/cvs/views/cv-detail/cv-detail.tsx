'use client';

import { Grid, Stack } from '@mantine/core';
import { GithubActivity } from '@/features/cvs/components/github-activity';
import { UserAbout } from '@/features/cvs/components/user-about';
import { UserHero } from '@/features/cvs/components/user-hero';
import { UserSidebar } from '@/features/cvs/components/user-sidebar';
import { UserSkills } from '@/features/cvs/components/user-skills';
import { useCvDetail } from '@/features/cvs/hooks/use-cv-detail';
import type { UserDetailResponse } from '@/features/cvs/types';

interface CvDetailProps {
  id: string;
  initialData: UserDetailResponse;
  /** Optional actions rendered inside the hero cover (e.g. edit button for "my CV") */
  heroActions?: React.ReactNode;
}

export function CvDetail({ id, initialData, heroActions }: CvDetailProps) {
  const { data: user } = useCvDetail({ id, initialData });

  return (
    <Stack gap="xl">
      {/* Hero section */}
      <UserHero user={user} actions={heroActions} />

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
