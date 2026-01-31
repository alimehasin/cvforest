import { Group, Paper, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import {
  IconAB,
  IconAt,
  IconCalendar,
  IconPhone,
  type TablerIcon,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { PhoneNumber } from '@/components/phone-number';
import { ProfileAvatar } from '@/features/profile/components/profile-avatar';
import type { ProfileResponseBody } from '@/features/profile/types';
import { formatDate } from '@/utils/helpers';
import { translateGender } from '@/utils/translation-maps';

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: TablerIcon;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <Group>
      <ThemeIcon variant="light">
        <Icon size={18} />
      </ThemeIcon>

      <div>
        <Text fz={14} c="gray">
          {label}
        </Text>

        {value}
      </div>
    </Group>
  );
}

export function ProfileInfo({ profile }: { profile: ProfileResponseBody }) {
  const t = useTranslations();

  return (
    <Stack>
      <Paper withBorder p="md">
        <Group wrap="nowrap">
          <ProfileAvatar profile={profile} />

          <Stack gap={0}>
            <Title order={3}>{profile.name}</Title>

            <Text fz={14} c="gray.7">
              {profile.email}
            </Text>
            <Text fz={14} c="gray.7">
              {t('profiles.memberSince')}{' '}
              <Text dir="ltr" span fz={14}>
                {formatDate(profile.createdAt as string)}
              </Text>
            </Text>
          </Stack>
        </Group>
      </Paper>

      <Paper withBorder p="md" component={Stack}>
        <Title order={3}>{t('profiles.profileInfo')}</Title>

        <InfoItem
          icon={IconPhone}
          label={t('profiles.phone')}
          value={<PhoneNumber phone={profile.phoneNumber ?? ''} />}
        />

        <InfoItem
          icon={IconAt}
          label={t('profiles.email')}
          value={<Text>{profile.email}</Text>}
        />

        <InfoItem
          icon={IconAB}
          label={t('profiles.gender')}
          value={
            profile.gender ? (
              <Text>{translateGender(t, profile.gender)}</Text>
            ) : null
          }
        />

        <InfoItem
          icon={IconCalendar}
          label={t('profiles.memberSince')}
          value={<Text>{formatDate(profile.createdAt as string)}</Text>}
        />
      </Paper>
    </Stack>
  );
}
