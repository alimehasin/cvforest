import { useForm } from '@mantine/form';
import { Gender } from '@repo/backend/prisma/enums';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { phoneNumberZodValidator } from '@/utils/schemas';
import type { RegisterRequestBody } from '../types';

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

export function useJoinForm() {
  const t = useTranslations();

  const schema = z
    .object({
      name: z.string().min(1, { message: t('join.nameRequired') }),
      email: z.email({ message: t('join.emailInvalid') }),
      password: z
        .string()
        .min(8, { message: t('join.passwordInvalid') })
        .max(128, { message: t('join.passwordInvalid') })
        .regex(strongPasswordRegex, { message: t('join.passwordInvalid') }),
      confirmPassword: z
        .string()
        .min(1, { message: t('join.confirmPasswordMismatch') }),
      phoneNumber: z
        .union([z.literal(''), phoneNumberZodValidator])
        .optional()
        .default(''),
      gender: z.enum([Gender.Male, Gender.Female]).optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('join.confirmPasswordMismatch'),
      path: ['confirmPassword'],
    });

  type FormValues = z.infer<typeof schema>;
  type FormValuesToBody = (values: FormValues) => RegisterRequestBody;

  return useForm<FormValues, FormValuesToBody>({
    mode: 'uncontrolled',
    validate: zod4Resolver(schema),
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      gender: undefined,
    },
    transformValues: (values): RegisterRequestBody => {
      const phone = values.phoneNumber?.replaceAll(' ', '')?.trim();
      return {
        name: values.name,
        email: values.email,
        password: values.password,
        ...(phone ? { phoneNumber: phone } : {}),
        ...(values.gender ? { gender: values.gender } : {}),
      };
    },
  });
}
