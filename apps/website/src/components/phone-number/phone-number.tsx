import { Text, type TextProps } from '@mantine/core';
import { formatPhoneNumber } from '@/utils/helpers';
import cls from './styles.module.css';

export interface PhoneNumberProps extends TextProps {
  phone: string;
}

export function PhoneNumber({ phone, ...props }: PhoneNumberProps) {
  return (
    <Text component="span" className={cls.root} {...props}>
      {formatPhoneNumber(phone)}
    </Text>
  );
}
