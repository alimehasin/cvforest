import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import type { VerifyOtpRequestBody } from '../types';

export function useVerifyOtpForm(phoneNumber: string) {
  const t = useTranslations();

  const schema = z.object({
    phoneNumber: z.string(),
    code: z.string().length(6, { message: t('login.codeRequired') }),
  });

  type FormValues = z.infer<typeof schema>;
  type FormValuesToBody = (values: FormValues) => VerifyOtpRequestBody;

  return useForm<FormValues, FormValuesToBody>({
    validate: zod4Resolver(schema),
    initialValues: {
      phoneNumber,
      code: '',
    },
  });
}
