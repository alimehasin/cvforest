import { useForm } from '@mantine/form';
import {
  AvailabilityType,
  Currency,
  WorkLocationType,
} from '@repo/backend/prisma/enums';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import type { UserCvsCreateBody } from '../types';

export function useUploadCvForm() {
  const t = useTranslations();

  const schema = z.object({
    jobTitle: z.string().min(1, { error: t('uploadCv.jobTitleRequired') }),
    experienceInYears: z
      .number()
      .min(0, { error: t('uploadCv.experienceMin') }),
    expectedSalaryMin: z
      .number()
      .min(0, { error: t('uploadCv.salaryMinRequired') }),
    expectedSalaryMax: z
      .number()
      .min(0, { error: t('uploadCv.salaryMaxRequired') }),
    expectedSalaryCurrency: z.enum([Currency.Iqd, Currency.Usd], {
      error: t('uploadCv.currencyRequired'),
    }),
    availabilityType: z.enum(AvailabilityType, {
      error: t('uploadCv.availabilityRequired'),
    }),
    workLocationType: z.enum(WorkLocationType, {
      error: t('uploadCv.workLocationRequired'),
    }),
    bio: z.string().min(64, { error: t('uploadCv.bioRequired') }),
    githubUrl: z.url({ error: t('uploadCv.urlInvalid') }),
    linkedinUrl: z.url({ error: t('uploadCv.urlInvalid') }),
    portfolioUrl: z.url({ error: t('uploadCv.urlInvalid') }),
    availableForHire: z.boolean(),
    skillIds: z
      .array(z.uuid())
      .min(3, { error: t('uploadCv.skillsRequired') })
      .max(12, { error: t('uploadCv.skillsRequired') }),
  });

  type FormValues = z.infer<typeof schema>;

  return useForm<FormValues, (values: FormValues) => UserCvsCreateBody>({
    mode: 'uncontrolled',
    validate: zod4Resolver(schema),
    initialValues: {
      jobTitle: '',
      experienceInYears: 0,
      expectedSalaryMin: 0,
      expectedSalaryMax: 0,
      expectedSalaryCurrency: Currency.Usd,
      availabilityType: AvailabilityType.FullTime,
      workLocationType: WorkLocationType.Remote,
      bio: '',
      githubUrl: '',
      linkedinUrl: '',
      portfolioUrl: '',
      availableForHire: true,
      skillIds: [],
    },
    transformValues: (values): UserCvsCreateBody => ({
      ...values,
      githubUrl: values.githubUrl.trim(),
      linkedinUrl: values.linkedinUrl.trim(),
      portfolioUrl: values.portfolioUrl.trim(),
    }),
  });
}
