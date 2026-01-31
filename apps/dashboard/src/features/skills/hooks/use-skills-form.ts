import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import type { SkillsCreateBody, SkillsList } from '../types';

interface SkillsFormProps {
  skill?: SkillsList['data'][number];
}

export function useSkillsForm({ skill }: SkillsFormProps) {
  const t = useTranslations();

  const schema = z.object({
    name: z.string().min(1, { message: t('skills.nameRequired') }),
  });

  type FormValues = z.infer<typeof schema>;
  type FormValuesToBody = (values: FormValues) => SkillsCreateBody;

  return useForm<FormValues, FormValuesToBody>({
    validate: zod4Resolver(schema),
    initialValues: {
      name: skill?.name ?? '',
    },
  });
}
