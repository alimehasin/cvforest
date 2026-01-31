import { useForm } from '@mantine/form';
import { Gender } from '@repo/backend/prisma/enums';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { phoneNumberZodValidator } from '@/utils/schemas';
import type { ProfileResponseBody, ProfileUpdateBody } from '../types';

export function useProfileForm({ profile }: { profile: ProfileResponseBody }) {
  const t = useTranslations();

  const schema = z.object({
    name: z.string().min(1, { message: t('profiles.nameRequired') }),
    email: z.email({ message: t('profiles.emailRequired') }),
    phoneNumber: phoneNumberZodValidator,
    gender: z.enum(Gender, { message: t('profiles.genderRequired') }),
  });

  type FormValues = z.infer<typeof schema>;
  type FormValuesToBody = (values: FormValues) => ProfileUpdateBody;

  return useForm<FormValues, FormValuesToBody>({
    validate: zod4Resolver(schema),
    initialValues: {
      name: profile.name ?? '',
      email: profile.email ?? '',
      phoneNumber: profile.phoneNumber ?? '',
      gender: profile.gender ?? 'Male',
    },
    transformValues: (values) => {
      return {
        ...values,
        phoneNumber: values.phoneNumber.replaceAll(' ', ''),
      };
    },
  });
}
