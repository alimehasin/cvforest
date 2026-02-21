'use client';

import {
  Avatar,
  Button,
  Group,
  MultiSelect,
  NumberInput,
  Select,
  SimpleGrid,
  Stack,
  Textarea,
  TextInput,
} from '@mantine/core';
import {
  AvailabilityType,
  Currency,
  WorkLocationType,
} from '@repo/backend/prisma/enums';
import {
  IconAB,
  IconAt,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBriefcase,
  IconCheck,
  IconCurrencyDollar,
  IconLink,
  IconMapPin,
  IconPhone,
  IconTools,
  IconUser,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { FormSection } from '@/components/form-section';
import { PhoneNumberInput } from '@/components/phone-number-input';
import { useCvCreate } from '@/features/cvs/hooks/use-cv-create';
import { useCvUpdate } from '@/features/cvs/hooks/use-cv-update';
import { useGovernoratesQuery } from '@/features/cvs/hooks/use-governorates-query';
import { useSkillsQuery } from '@/features/cvs/hooks/use-skills-query';
import { useUploadCvForm } from '@/features/cvs/hooks/use-upload-cv-form';
import type { UserDetailResponse } from '@/features/cvs/types';
import type { ProfileResponseBody } from '@/features/profile/types';
import { constructImageUrl } from '@/utils/helpers';
import {
  translateAvailabilityType,
  translateCurrency,
  translateWorkLocationType,
} from '@/utils/translation-maps';

interface UploadCvFormProps {
  profile: ProfileResponseBody;
  cv?: UserDetailResponse;
  onUpdateSuccess?: () => void;
  onCreateSuccess?: () => void;
}

export function UploadCvForm({
  profile,
  cv,
  onUpdateSuccess,
  onCreateSuccess,
}: UploadCvFormProps) {
  const t = useTranslations();
  const skillsQuery = useSkillsQuery();
  const form = useUploadCvForm({ profile, cv });
  const governoratesQuery = useGovernoratesQuery();

  const createMut = useCvCreate({ onSuccess: onCreateSuccess });
  const updateMut = useCvUpdate({ onSuccess: onUpdateSuccess });

  const skillOptions =
    skillsQuery.data?.map((skill) => ({
      label: skill.name,
      value: skill.id,
    })) ?? [];

  const governorateOptions =
    governoratesQuery.data?.map((gov) => ({
      label: gov.name,
      value: gov.id,
    })) ?? [];

  const availabilityOptions = Object.values(AvailabilityType).map((value) => ({
    label: translateAvailabilityType(t, value),
    value,
  }));

  const workLocationOptions = Object.values(WorkLocationType).map((value) => ({
    label: translateWorkLocationType(t, value),
    value,
  }));

  const currencyOptions = Object.values(Currency).map((value) => ({
    label: translateCurrency(t, value),
    value,
  }));

  const availableForHireOptions = [
    { label: t('uploadCv.availableForHireYes'), value: 'true' },
    { label: t('uploadCv.availableForHireNo'), value: 'false' },
  ];

  const handleSubmit = form.onSubmit(async (data) => {
    if (!cv) {
      await createMut.mutateAsync(data);
    } else {
      await updateMut.mutateAsync({
        ...data,
        githubUrl: data.githubUrl ?? null,
        linkedinUrl: data.linkedinUrl ?? null,
        portfolioUrl: data.portfolioUrl ?? null,
      });
    }
  });

  const genderOptions = [
    { label: t('profiles.male'), value: 'Male' },
    { label: t('profiles.female'), value: 'Female' },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="xl">
        <FormSection
          label={t('uploadCv.sectionProfile')}
          description={t('uploadCv.sectionProfileDescription')}
        >
          <Group gap="xl">
            <Avatar
              size={128}
              radius="100vw"
              name={profile.name}
              src={constructImageUrl(profile.avatar?.key)}
            />

            <SimpleGrid cols={{ md: 2 }} style={{ flexGrow: 1 }}>
              <TextInput
                required
                key={form.key('name')}
                label={t('profiles.name')}
                leftSection={<IconUser size={18} />}
                {...form.getInputProps('name')}
              />
              <TextInput
                disabled
                key={form.key('email')}
                label={t('profiles.email')}
                leftSection={<IconAt size={18} />}
                {...form.getInputProps('email')}
              />
              <PhoneNumberInput
                disabled
                label={t('profiles.phone')}
                key={form.key('phoneNumber')}
                placeholder="+964 770 333 4444"
                leftSection={<IconPhone size={18} />}
                {...form.getInputProps('phoneNumber')}
              />
              <Select
                required
                allowDeselect={false}
                key={form.key('gender')}
                label={t('profiles.gender')}
                data={genderOptions}
                leftSection={<IconAB size={18} />}
                {...form.getInputProps('gender')}
              />
              <Select
                key={form.key('governorateId')}
                label={t('users.governorate')}
                allowDeselect
                searchable
                placeholder={t('browse.governoratePlaceholder')}
                data={governorateOptions}
                disabled={governoratesQuery.isLoading}
                leftSection={<IconMapPin size={18} />}
                {...form.getInputProps('governorateId')}
              />
            </SimpleGrid>
          </Group>
        </FormSection>

        <FormSection
          label={t('uploadCv.sectionProfessional')}
          description={t('uploadCv.sectionProfessionalDescription')}
        >
          <Stack>
            <SimpleGrid cols={{ md: 2 }} style={{ alignItems: 'end' }}>
              <TextInput
                required
                key={form.key('jobTitle')}
                label={t('uploadCv.jobTitle')}
                description={t('uploadCv.jobTitlePlaceholder')}
                leftSection={<IconBriefcase size={18} />}
                {...form.getInputProps('jobTitle')}
              />

              <NumberInput
                required
                min={0}
                key={form.key('experienceInYears')}
                label={t('uploadCv.experienceInYears')}
                leftSection={<IconUser size={18} />}
                {...form.getInputProps('experienceInYears')}
              />
            </SimpleGrid>

            <MultiSelect
              required
              clearable
              searchable
              label={t('uploadCv.skills')}
              description={t('uploadCv.skillsDescription')}
              key={form.key('skillIds')}
              data={skillOptions}
              disabled={skillsQuery.isLoading}
              leftSection={<IconTools size={18} />}
              {...form.getInputProps('skillIds')}
            />
          </Stack>
        </FormSection>

        <FormSection
          label={t('uploadCv.sectionAvailabilityAndSalary')}
          description={t('uploadCv.sectionAvailabilityAndSalaryDescription')}
        >
          <SimpleGrid cols={{ md: 3 }}>
            <MultiSelect
              required
              key={form.key('availabilityTypes')}
              label={t('uploadCv.availabilityType')}
              data={availabilityOptions}
              leftSection={<IconBriefcase size={18} />}
              {...form.getInputProps('availabilityTypes')}
            />

            <MultiSelect
              required
              key={form.key('workLocationTypes')}
              label={t('uploadCv.workLocationType')}
              data={workLocationOptions}
              {...form.getInputProps('workLocationTypes')}
            />

            <Select
              required
              key={form.key('availableForHire')}
              label={t('uploadCv.availableForHire')}
              data={availableForHireOptions}
              value={form.values.availableForHire ? 'true' : 'false'}
              onChange={(value) =>
                form.setFieldValue('availableForHire', value === 'true')
              }
              error={form.errors.availableForHire}
            />

            <NumberInput
              key={form.key('expectedSalaryMin')}
              min={0}
              step={50_000}
              thousandSeparator
              label={`${t('uploadCv.expectedSalaryMin')} (${t('uploadCv.optional')})`}
              leftSection={<IconCurrencyDollar size={18} />}
              {...form.getInputProps('expectedSalaryMin')}
            />

            <NumberInput
              min={0}
              step={50_000}
              thousandSeparator
              key={form.key('expectedSalaryMax')}
              label={`${t('uploadCv.expectedSalaryMax')} (${t('uploadCv.optional')})`}
              leftSection={<IconCurrencyDollar size={18} />}
              {...form.getInputProps('expectedSalaryMax')}
            />

            <Select
              key={form.key('expectedSalaryCurrency')}
              label={`${t('uploadCv.expectedSalaryCurrency')} (${t('uploadCv.optional')})`}
              data={currencyOptions}
              leftSection={<IconCurrencyDollar size={18} />}
              {...form.getInputProps('expectedSalaryCurrency')}
            />
          </SimpleGrid>
        </FormSection>

        <FormSection
          label={t('uploadCv.sectionAboutLinks')}
          description={t('uploadCv.sectionAboutLinksDescription')}
        >
          <Stack gap="md">
            <Textarea
              required
              minRows={4}
              key={form.key('bio')}
              label={t('uploadCv.bio')}
              description={t('uploadCv.bioPlaceholder')}
              {...form.getInputProps('bio')}
            />

            <SimpleGrid cols={{ md: 3 }}>
              <TextInput
                key={form.key('githubUrl')}
                label={`${t('uploadCv.githubUrl')} (${t('uploadCv.optional')})`}
                leftSection={<IconBrandGithub size={18} />}
                {...form.getInputProps('githubUrl')}
              />

              <TextInput
                key={form.key('linkedinUrl')}
                label={`${t('uploadCv.linkedinUrl')} (${t('uploadCv.optional')})`}
                leftSection={<IconBrandLinkedin size={18} />}
                {...form.getInputProps('linkedinUrl')}
              />

              <TextInput
                key={form.key('portfolioUrl')}
                label={`${t('uploadCv.portfolioUrl')} (${t('uploadCv.optional')})`}
                leftSection={<IconLink size={18} />}
                {...form.getInputProps('portfolioUrl')}
              />
            </SimpleGrid>
          </Stack>
        </FormSection>

        <Button
          type="submit"
          loading={form.submitting}
          leftSection={<IconCheck />}
        >
          {cv ? t('cvMine.saveChanges') : t('uploadCv.submit')}
        </Button>
      </Stack>
    </form>
  );
}
