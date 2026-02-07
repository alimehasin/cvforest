import { Heatmap } from '@mantine/charts';
import { Box, Group, Paper, Skeleton, Stack, Text, Title } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useGithubContributions } from '../../hooks/use-github-contributions';
import type { UserDetailResponse } from '../../types';
import cls from './styles.module.css';

interface GithubActivityProps {
  user: UserDetailResponse;
}

export function GithubActivity({ user }: GithubActivityProps) {
  const t = useTranslations();
  const { data, isLoading, isError } = useGithubContributions(user.githubUrl);

  if (!user.githubUrl) {
    return null;
  }

  const contributions = data?.contributions;
  const heatmapData = data?.heatmapData;

  const totalContributions =
    contributions?.reduce((sum, day) => sum + day.count, 0) ?? 0;

  const activeDays = contributions?.filter((day) => day.count > 0).length ?? 0;

  const maxInDay = contributions
    ? Math.max(...contributions.map((day) => day.count))
    : 0;

  return (
    <Paper withBorder p="lg" radius="lg">
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Title
            order={4}
            style={{ display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <IconBrandGithub size={20} />
            {t('userDetails.githubActivity')}
          </Title>

          <Text
            component="a"
            href={user.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            size="xs"
            c="dimmed"
            td="underline"
            style={{ cursor: 'pointer' }}
          >
            {t('userDetails.viewOnGithub')}
          </Text>
        </Group>

        {/* Stats row */}
        {!isLoading && !isError && contributions && (
          <Group gap="xl">
            <div className={cls.statItem}>
              <div className={cls.statValue}>
                {totalContributions.toLocaleString()}
              </div>
              <div className={cls.statLabel}>
                {t('userDetails.contributions')}
              </div>
            </div>
            <div className={cls.statItem}>
              <div className={cls.statValue}>{activeDays}</div>
              <div className={cls.statLabel}>{t('userDetails.activeDays')}</div>
            </div>
            <div className={cls.statItem}>
              <div className={cls.statValue}>{maxInDay}</div>
              <div className={cls.statLabel}>{t('userDetails.bestDay')}</div>
            </div>
          </Group>
        )}

        {/* Calendar heatmap */}
        <Box className={cls.calendarWrapper}>
          {isLoading && <Skeleton height={130} radius="md" />}

          {isError && (
            <Text size="sm" c="dimmed" ta="center" py="md">
              {t('userDetails.githubError')}
            </Text>
          )}

          {!isLoading && !isError && heatmapData && (
            <Heatmap
              gap={3}
              withTooltip
              rectSize={12}
              rectRadius={3}
              withMonthLabels
              withWeekdayLabels
              data={heatmapData}
              colors={[
                'var(--mantine-color-primary-1)',
                'var(--mantine-color-primary-3)',
                'var(--mantine-color-primary-5)',
                'var(--mantine-color-primary-8)',
              ]}
              getTooltipLabel={({ date, value }) => {
                return `${dayjs(date).format('DD MMM, YYYY')} – ${!value ? 'No contributions' : `${value} contribution${value > 1 ? 's' : ''}`}`;
              }}
            />
          )}
        </Box>
      </Stack>
    </Paper>
  );
}
