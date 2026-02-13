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
import type { ProfileResponseBody } from '@/features/profile/types';
import { phoneNumberZodValidator } from '@/utils/schemas';
import type { UserCvsCreateBody, UserDetailResponse } from '../types';

function getInitialValues(
  profile: ProfileResponseBody,
  cv?: UserDetailResponse,
) {
  if (!cv) {
    return {
      name: profile.name ?? '',
      email: profile.email ?? '',
      phoneNumber: profile.phoneNumber ?? '',
      gender: profile.gender ?? 'Male',
      governorateId: profile.governorateId ?? null,
      jobTitle: '',
      experienceInYears: 0,
      expectedSalaryMin: undefined as number | undefined,
      expectedSalaryMax: undefined as number | undefined,
      expectedSalaryCurrency: undefined as Currency | undefined,
      availabilityTypes: [AvailabilityType.FullTime],
      workLocationTypes: [WorkLocationType.Remote],
      bio: '',
      githubUrl: '',
      linkedinUrl: '',
      portfolioUrl: '',
      availableForHire: true,
      skillIds: [] as string[],
    };
  }

  return {
    name: cv.user.name ?? '',
    email: cv.user.email ?? '',
    phoneNumber: cv.user.phoneNumber ?? '',
    gender: cv.user.gender ?? 'Male',
    governorateId: cv.user.governorateId ?? null,
    jobTitle: cv.jobTitle,
    experienceInYears: Number(cv.experienceInYears),
    expectedSalaryMin: undefined as number | undefined,
    expectedSalaryMax: undefined as number | undefined,
    expectedSalaryCurrency: undefined as Currency | undefined,
    availabilityTypes:
      cv.availabilityTypes?.length > 0
        ? cv.availabilityTypes
        : [AvailabilityType.FullTime],
    workLocationTypes:
      cv.workLocationTypes?.length > 0
        ? cv.workLocationTypes
        : [WorkLocationType.Remote],
    bio: cv.bio,
    githubUrl: cv.githubUrl ?? '',
    linkedinUrl: cv.linkedinUrl ?? '',
    portfolioUrl: cv.portfolioUrl ?? '',
    availableForHire: cv.availableForHire,
    skillIds: cv.userSkills.map((us) => us.skillId),
  };
}

export function useUploadCvForm({
  profile,
  cv,
}: {
  profile: ProfileResponseBody;
  cv?: UserDetailResponse;
}) {
  const t = useTranslations();

  const optionalUrl = z
    .union([z.url({ message: t('uploadCv.urlInvalid') }), z.literal('')])
    .transform((s) => (s === '' ? undefined : s));

  const schema = z
    .object({
      // Profile fields
      name: z.string().min(1, { message: t('profiles.nameRequired') }),
      email: z.email({ message: t('profiles.emailRequired') }),
      phoneNumber: phoneNumberZodValidator,
      gender: z.enum(Gender, { message: t('profiles.genderRequired') }),
      governorateId: z.union([z.uuid(), z.literal(''), z.null()]).optional(),

      // CV fields
      jobTitle: z.string().min(1, { error: t('uploadCv.jobTitleRequired') }),
      experienceInYears: z
        .number()
        .min(0, { error: t('uploadCv.experienceMin') }),
      expectedSalaryMin: z
        .number()
        .min(0, { error: t('uploadCv.salaryMinRequired') })
        .optional(),
      expectedSalaryMax: z
        .number()
        .min(0, { error: t('uploadCv.salaryMaxRequired') })
        .optional(),
      expectedSalaryCurrency: z
        .enum(Currency, {
          error: t('uploadCv.currencyRequired'),
        })
        .optional(),
      availabilityTypes: z
        .array(z.enum(AvailabilityType))
        .min(1, { error: t('uploadCv.availabilityRequired') }),
      workLocationTypes: z
        .array(z.enum(WorkLocationType))
        .min(1, { error: t('uploadCv.workLocationRequired') }),
      bio: z.string().min(32, {
        error: t('uploadCv.bioMustBeAtLeast32Characters'),
      }),
      githubUrl: optionalUrl,
      linkedinUrl: optionalUrl,
      portfolioUrl: optionalUrl,
      availableForHire: z.boolean(),
      skillIds: z
        .array(z.uuid())
        .min(3, { error: t('uploadCv.selectAtLeast3Skills') })
        .max(12, { error: t('uploadCv.selectAtMost12Skills') }),
    })
    .refine(
      (data) => {
        const min = data.expectedSalaryMin;
        const max = data.expectedSalaryMax;
        if (min == null || max == null) {
          return true;
        }
        return min <= max;
      },
      {
        message: t('uploadCv.salaryMinMustBeLessThanMax'),
        path: ['expectedSalaryMax'],
      },
    );

  type FormValues = z.infer<typeof schema>;

  const initialValues = getInitialValues(profile, cv);

  return useForm<FormValues, (values: FormValues) => UserCvsCreateBody>({
    mode: 'uncontrolled',
    validate: zod4Resolver(schema),
    initialValues,
    transformValues: (values): UserCvsCreateBody => {
      const githubUrl = values.githubUrl?.trim();
      const linkedinUrl = values.linkedinUrl?.trim();
      const portfolioUrl = values.portfolioUrl?.trim();
      const hasSalary =
        values.expectedSalaryMin != null || values.expectedSalaryMax != null;

      const profilePayload = {
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber.replaceAll(' ', ''),
        gender: values.gender,
        governorateId: values.governorateId || null,
      };

      return {
        profile: profilePayload,
        jobTitle: values.jobTitle,
        experienceInYears: values.experienceInYears,
        expectedSalaryMin: values.expectedSalaryMin,
        expectedSalaryMax: values.expectedSalaryMax,
        expectedSalaryCurrency: hasSalary
          ? values.expectedSalaryCurrency
          : undefined,
        availabilityTypes: values.availabilityTypes,
        workLocationTypes: values.workLocationTypes,
        bio: values.bio,
        githubUrl: githubUrl === '' ? undefined : githubUrl,
        linkedinUrl: linkedinUrl === '' ? undefined : linkedinUrl,
        portfolioUrl: portfolioUrl === '' ? undefined : portfolioUrl,
        availableForHire: values.availableForHire,
        skillIds: values.skillIds,
      };
    },
  });
}
