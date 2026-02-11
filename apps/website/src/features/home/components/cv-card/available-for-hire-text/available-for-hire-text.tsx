import { Text, type TextProps } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { translateAvailableForHire } from '@/utils/translation-maps';

interface AvailableForHireTextProps {
  availableForHire: boolean;
}

export function AvailableForHireText({
  availableForHire,
}: AvailableForHireTextProps) {
  const t = useTranslations();

  const configs: TextProps = {
    c: availableForHire ? undefined : 'gray',
    fw: availableForHire ? 500 : 400,
  };

  return (
    <Text {...configs}>{translateAvailableForHire(t, availableForHire)}</Text>
  );
}
