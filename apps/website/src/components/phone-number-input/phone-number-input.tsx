import { InputBase, type InputBaseProps } from '@mantine/core';
import { useUncontrolled } from '@mantine/hooks';
import { IMaskInput } from 'react-imask';

type PhoneNumberBaseInputProps = InputBaseProps &
  React.ComponentPropsWithoutRef<'input'>;

type PhoneNumberInputProps = PhoneNumberBaseInputProps & {
  // Mask
  mask?: string;

  // State
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

export function PhoneNumberInput({
  value,
  defaultValue,
  onChange,
  mask = '+964 000 000 0000',
  ...others
}: PhoneNumberInputProps) {
  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue,
    finalValue: '',
    onChange,
  });

  return (
    <InputBase
      dir="ltr"
      {...others}
      value={_value}
      onChange={(event) => handleChange(event.currentTarget.value)}
      mask={mask}
      inputMode="numeric"
      component={IMaskInput}
    />
  );
}
