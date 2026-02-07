import { Paper, Stack, Text, Title } from '@mantine/core';
import { IconFileText } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import type { UserDetailResponse } from '../../types';

interface UserAboutProps {
  user: UserDetailResponse;
}

export function UserAbout({ user }: UserAboutProps) {
  const t = useTranslations();

  if (!user.bio) {
    return null;
  }

  return (
    <Paper withBorder p="lg" radius="lg">
      <Stack gap="sm">
        <Title
          order={4}
          style={{ display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <IconFileText size={20} />
          {t('userDetails.about')}
        </Title>

        <Text size="sm" c="dimmed" lh={1.8} style={{ whiteSpace: 'pre-line' }}>
          {user.bio}
        </Text>
      </Stack>
    </Paper>
  );
}
