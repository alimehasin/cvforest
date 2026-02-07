import { Avatar, Badge, Group, Paper, Stack, Text } from '@mantine/core';
import { IconBriefcase, IconMapPin } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { constructImageUrl } from '@/utils/helpers';
import type { UserListItem } from '../../types';
import cls from './styles.module.css';

export function UserCard({ user }: { user: UserListItem }) {
  const t = useTranslations();

  const skills = user.userSkills.map((us) => us.skill);
  const visibleSkills = skills.slice(0, 3);
  const remainingCount = skills.length - visibleSkills.length;

  return (
    <Paper withBorder p="lg" radius="lg" className={cls.card}>
      <Stack align="center" gap="sm">
        <Avatar
          size={164}
          radius="xl"
          name={user.name}
          src={constructImageUrl(user.avatar?.key)}
          color="primary"
        />

        <Stack align="center" gap={4}>
          <Text fw={600} size="md" ta="center" lineClamp={1}>
            {user.name}
          </Text>

          {user.jobTitle && (
            <Group gap={4} wrap="nowrap">
              <IconBriefcase size={14} color="var(--mantine-color-dimmed)" />
              <Text size="sm" c="dimmed" lineClamp={1}>
                {user.jobTitle}
              </Text>
            </Group>
          )}

          {user.governorate && (
            <Group gap={4} wrap="nowrap">
              <IconMapPin size={14} color="var(--mantine-color-dimmed)" />
              <Text size="xs" c="dimmed">
                {user.governorate.name}
              </Text>
            </Group>
          )}
        </Stack>

        {user.experienceInYears != null && (
          <Text size="xs" c="dimmed">
            {t('cvs.yearsExperience', { number: user.experienceInYears })}
          </Text>
        )}

        {visibleSkills.length > 0 && (
          <Group gap={6} justify="center" wrap="wrap">
            {visibleSkills.map((skill) => (
              <Badge
                key={skill.id}
                size="sm"
                variant="light"
                color="primary"
                radius="sm"
              >
                {skill.name}
              </Badge>
            ))}
            {remainingCount > 0 && (
              <Badge size="sm" variant="light" color="gray" radius="sm">
                +{remainingCount}
              </Badge>
            )}
          </Group>
        )}
      </Stack>
    </Paper>
  );
}
