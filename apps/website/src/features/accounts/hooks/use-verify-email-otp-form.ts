import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

export function useVerifyEmailOtpForm() {
  const t = useTranslations();

  const strongPasswordSchema = z
    .string()
    .min(8, { error: t('auth.passwordMinLength') })
    .max(128, { error: t('auth.passwordMaxLength') })
    .regex(/[a-z]/, { error: t('auth.passwordLowerCase') })
    .regex(/[A-Z]/, { error: t('auth.passwordUpperCase') })
    .regex(/[0-9]/, { error: t('auth.passwordNumber') })
    .regex(/[^a-zA-Z0-9]/, { error: t('auth.passwordSpecial') });

  const schema = z
    .object({
      otp: z.string().length(8, { error: t('auth.invalidCode') }),
      password: strongPasswordSchema,
      confirmPassword: strongPasswordSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('auth.passwordsDoNotMatch'),
      path: ['confirmPassword'],
    });

  return useForm({
    initialValues: {
      otp: '',
      password: '',
      confirmPassword: '',
    },
    validate: zod4Resolver(schema),
  });
}
