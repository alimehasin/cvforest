import { AreaChart } from '@mantine/charts';
import { Paper, SimpleGrid, Stack, Title } from '@mantine/core';
import { IconEye, IconFileCv, IconUsers } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { MetricCard } from '@/components/metric-card';
import type { HomeResponse } from '@/features/home/types';
import { DEFAULT_AREA_CHART_PROPS } from '@/utils/constants';

interface HomeProps {
  home: HomeResponse;
}

export function Home({ home }: HomeProps) {
  const t = useTranslations();

  return (
    <Stack>
      <SimpleGrid cols={{ md: 3 }}>
        <MetricCard
          color="blue"
          icon={<IconUsers size={18} />}
          title={t('home.totalUsers')}
          value={home.metrics.totalUsers}
        />

        <MetricCard
          color="green"
          icon={<IconFileCv size={18} />}
          title={t('home.totalCvs')}
          value={home.metrics.totalCvs}
        />

        <MetricCard
          color="red"
          icon={<IconEye size={18} />}
          title={t('home.totalViews')}
          value={home.metrics.totalViews}
        />
      </SimpleGrid>

      <Paper withBorder p="sm" component={Stack}>
        <Title order={2}>{t('home.cvsChart')}</Title>

        <AreaChart
          {...DEFAULT_AREA_CHART_PROPS}
          dataKey="month"
          series={[{ name: 'count', color: 'blue', label: 'count' }]}
          data={home.charts.cvs}
        />
      </Paper>
    </Stack>
  );
}
