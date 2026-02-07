import { Badge, Group, Paper, Stack, Title } from '@mantine/core';
import { IconSparkles } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import type { UserDetailResponse } from '../../types';

interface UserSkillsProps {
  user: UserDetailResponse;
}

export function UserSkills({ user }: UserSkillsProps) {
  const t = useTranslations();

  const skills = user.userSkills.map((us) => us.skill);

  if (skills.length === 0) {
    return null;
  }

  return (
    <Paper withBorder p="lg" radius="lg">
      <Stack gap="sm">
        <Title
          order={4}
          style={{ display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <IconSparkles size={20} />
          {t('userDetails.skills')}
        </Title>

        <Group gap={8} wrap="wrap">
          {skills.map((skill) => (
            <Badge
              key={skill.id}
              size="lg"
              variant="light"
              radius="xl"
              style={{
                background:
                  'linear-gradient(135deg, var(--mantine-color-primary-0), var(--mantine-color-primary-1))',
                border: '1px solid var(--mantine-color-primary-2)',
                color: 'var(--mantine-color-primary-8)',
                fontWeight: 500,
              }}
            >
              {skill.name}
            </Badge>
          ))}
        </Group>
      </Stack>
    </Paper>
  );
}
