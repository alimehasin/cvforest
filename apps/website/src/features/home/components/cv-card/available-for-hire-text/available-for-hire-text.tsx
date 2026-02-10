import { Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { translateAvailableForHire } from '@/utils/translation-maps';

interface AvailableForHireTextProps {
  availableForHire: boolean;
}

export function AvailableForHireText({
  availableForHire,
}: AvailableForHireTextProps) {
  const t = useTranslations();

  return (
    <Text c={availableForHire ? undefined : 'gray'}>
      {translateAvailableForHire(t, availableForHire)}
    </Text>
  );
}
