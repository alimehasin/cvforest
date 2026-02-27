import {
  Card,
  type CardProps,
  Group,
  type MantineColor,
  Text,
  ThemeIcon,
} from '@mantine/core';
import type { ReactNode } from 'react';

interface MetricCardProps extends CardProps {
  title: string;
  value: number | string;
  description?: string;
  icon?: ReactNode;
  color: MantineColor;
}

export function MetricCard({
  title,
  value,
  description,
  icon,
  color,
  ...props
}: MetricCardProps) {
  return (
    <Card withBorder p="sm" shadow="xs" {...props}>
      <Group justify="space-between">
        <Text size="xs" c="gray" fw={700}>
          {title}
        </Text>

        {icon && (
          <ThemeIcon size="sm" color={color} variant="transparent">
            {icon}
          </ThemeIcon>
        )}
      </Group>

      <Text fz={32} fw={700}>
        {value.toLocaleString()}
      </Text>

      {description && (
        <Text size="sm" c="gray" mt={4}>
          {description}
        </Text>
      )}
    </Card>
  );
}
