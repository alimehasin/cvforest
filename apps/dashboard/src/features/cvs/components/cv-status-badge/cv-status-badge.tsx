import { Badge, type MantineColor } from '@mantine/core';
import type { CvStatus } from '@repo/backend/prisma/enums';
import { useTranslations } from 'next-intl';
import { translateCvStatus } from '@/utils/translation-maps';

export function CvStatusBadge({ status }: { status: CvStatus }) {
  const t = useTranslations();

  const colors: Record<CvStatus, MantineColor> = {
    Pending: 'gray',
    Approved: 'green',
    Rejected: 'red',
  };

  return (
    <Badge color={colors[status]} variant="light" size="sm">
      {translateCvStatus(t, status)}
    </Badge>
  );
}
