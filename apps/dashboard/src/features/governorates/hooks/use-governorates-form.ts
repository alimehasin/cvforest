import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import type { GovernoratesCreateBody, GovernoratesList } from '../types';

export function useGovernoratesForm({
  governorate,
}: {
  governorate?: GovernoratesList['data'][number];
}) {
  const t = useTranslations();

  const schema = z.object({
    name: z.string().min(1, { message: t('governorates.nameRequired') }),
  });

  type FormValues = z.infer<typeof schema>;
  type FormValuesToBody = (values: FormValues) => GovernoratesCreateBody;

  return useForm<FormValues, FormValuesToBody>({
    validate: zod4Resolver(schema),
    initialValues: {
      name: governorate?.name ?? '',
    },
  });
}
