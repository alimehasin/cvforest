import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { formatPhoneNumber } from '@/utils/helpers';
import { phoneNumberZodValidator } from '@/utils/schemas';
import type { SendOtpRequestBody } from '../types';

export function useSendOtpForm() {
  const schema = z.object({
    phoneNumber: phoneNumberZodValidator,
  });

  type FormValues = z.infer<typeof schema>;
  type FormValuesToBody = (values: FormValues) => SendOtpRequestBody;

  return useForm<FormValues, FormValuesToBody>({
    validate: zod4Resolver(schema),
    initialValues: {
      phoneNumber: '',
    },
    transformValues: (values) => {
      return {
        phoneNumber: formatPhoneNumber(values.phoneNumber).replaceAll(' ', ''),
      };
    },
  });
}
