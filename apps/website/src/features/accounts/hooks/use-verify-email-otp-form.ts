import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

export function useVerifyEmailOtpForm() {
  const t = useTranslations();

  const schema = z.object({
    otp: z.string().length(6, { error: t('auth.invalidCode') }),
  });

  return useForm({
    initialValues: {
      otp: '',
    },
    validate: zod4Resolver(schema),
  });
}
