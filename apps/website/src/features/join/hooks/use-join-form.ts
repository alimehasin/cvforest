import { useForm } from '@mantine/form';
import {
  AvailabilityType,
  Currency,
  Gender,
  WorkLocationType,
} from '@repo/backend/prisma/enums';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { phoneNumberZodValidator } from '@/utils/schemas';
import type { RegisterRequestBody } from '../types';

export function useJoinForm() {
  const t = useTranslations();

  const schema = z
    .object({
      // Personal Information - Required
      name: z.string().min(1, { message: t('join.nameRequired') }),
      email: z.email({ message: t('join.emailInvalid') }),
      phoneNumber: phoneNumberZodValidator,
      gender: z.enum([Gender.Male, Gender.Female], {
        message: t('join.genderRequired'),
      }),
      governorateId: z.uuid({ message: t('join.governorateRequired') }),

      // Professional Information - Required
      jobTitle: z.string().min(1, { message: t('join.jobTitleRequired') }),
      experienceInYears: z.number().min(0, {
        message: t('join.experienceRequired'),
      }),

      // Professional Information - Optional
      expectedSalaryMin: z.number().min(0).optional().or(z.literal(0)),
      expectedSalaryMax: z.number().min(0).optional().or(z.literal(0)),
      expectedSalaryCurrency: z.enum(Currency).optional(),
      availabilityType: z.enum(AvailabilityType).optional(),
      workLocationType: z.enum(WorkLocationType).optional(),
      availableForHire: z.boolean().optional(),
      bio: z.string().optional().or(z.literal('')),

      // Skills - Optional
      skillIds: z.array(z.string()).optional(),

      // Social Links - Optional
      githubUrl: z
        .url({ message: t('join.githubUrlInvalid') })
        .optional()
        .or(z.literal('')),
      linkedinUrl: z
        .url({ message: t('join.linkedinUrlInvalid') })
        .optional()
        .or(z.literal('')),
      portfolioUrl: z
        .url({ message: t('join.portfolioUrlInvalid') })
        .optional()
        .or(z.literal('')),
    })
    .refine(
      (data) => {
        // If both salary fields are provided, max should be >= min
        if (
          data.expectedSalaryMin &&
          data.expectedSalaryMax &&
          data.expectedSalaryMin > 0 &&
          data.expectedSalaryMax > 0
        ) {
          return data.expectedSalaryMax >= data.expectedSalaryMin;
        }
        return true;
      },
      {
        message: t('join.salaryValidation'),
        path: ['expectedSalaryMax'],
      },
    );

  type FormValues = z.infer<typeof schema>;
  type FormValuesToBody = (values: FormValues) => RegisterRequestBody;

  return useForm<FormValues, FormValuesToBody>({
    validate: zod4Resolver(schema),
    initialValues: {
      name: '',
      email: '',
      phoneNumber: '',
      gender: Gender.Male,
      governorateId: '',
      jobTitle: '',
      experienceInYears: 0,
      expectedSalaryMin: 0,
      expectedSalaryMax: 0,
      expectedSalaryCurrency: 'Iqd',
      availabilityType: undefined,
      workLocationType: undefined,
      availableForHire: false,
      bio: '',
      skillIds: [],
      githubUrl: '',
      linkedinUrl: '',
      portfolioUrl: '',
    },
    transformValues: (values) => {
      const body: Partial<RegisterRequestBody> = {
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber.replaceAll(' ', ''),
        gender: values.gender,
        governorateId: values.governorateId || undefined,
        jobTitle: values.jobTitle,
        experienceInYears: values.experienceInYears,
        expectedSalaryMin: values.expectedSalaryMin || undefined,
        expectedSalaryMax: values.expectedSalaryMax || undefined,
        expectedSalaryCurrency: values.expectedSalaryCurrency || undefined,
        availabilityType: values.availabilityType || undefined,
        workLocationType: values.workLocationType || undefined,
        availableForHire: values.availableForHire || undefined,
        bio: values.bio || undefined,
        githubUrl: values.githubUrl || undefined,
        linkedinUrl: values.linkedinUrl || undefined,
        portfolioUrl: values.portfolioUrl || undefined,
      };

      return body as RegisterRequestBody;
    },
  });
}
