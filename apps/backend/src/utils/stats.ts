import dayjs from 'dayjs';

type Entry = Date;
type Datasets = Record<string, Entry[]>;
type MonthData = Record<string, number>;
type GroupDatesByMonthResult = MonthData & { month: string };

interface GroupDatesByMonthParams {
  datasets: Datasets;
  count?: number;
  reverse?: boolean;
}

export function groupDatesByMonth({
  datasets,
  count = 10,
  reverse = true,
}: GroupDatesByMonthParams): GroupDatesByMonthResult[] {
  const months = Array.from({ length: count }, (_, i) =>
    dayjs().subtract(i, 'month').format('YYYY-MM'),
  );

  const data: Record<string, MonthData> = {};
  for (const month of months) {
    data[month] = {};
    for (const key of Object.keys(datasets)) {
      data[month][key] = 0;
    }
  }

  // Populate counts
  for (const [label, entries] of Object.entries(datasets)) {
    for (const dateTime of entries) {
      const month = dayjs(dateTime).format('YYYY-MM');
      const monthData = data[month];
      if (monthData) {
        monthData[label] = (monthData[label] || 0) + 1;
      }
    }
  }

  const result = months.map((month) => {
    const monthData = data[month];
    return { month, ...monthData } as GroupDatesByMonthResult;
  });

  return reverse ? result.reverse() : result;
}
