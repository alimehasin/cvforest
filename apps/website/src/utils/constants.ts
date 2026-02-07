import type { AreaChartProps } from '@mantine/charts';

export const SHELL_SIDEBAR_WIDTH = 280;

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 15, 20, 25, 50];

export const BROWSE_PAGE_SIZE = 24;
export const DEFAULT_AREA_CHART_PROPS = {
  h: 260,
  gridAxis: 'xy',
  dataKey: 'month',
  strokeWidth: 4,
  withYAxis: false,
  fillOpacity: 0.8,
  curveType: 'monotone',
  dotProps: { r: 6, strokeWidth: 2, stroke: '#fff' },
  activeDotProps: { r: 6, strokeWidth: 2, fill: '#fff' },
} as const satisfies Partial<AreaChartProps>;
