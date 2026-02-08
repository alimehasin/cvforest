'use client';

import {
  Button,
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
  IconBrandGithub,
  IconBrandLinkedin,
  IconBriefcase,
  IconCheck,
  IconCurrencyDollar,
  IconLink,
  IconTools,
  IconUser,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { FormSection } from '@/components/form-section';
import { useCvCreate } from '@/features/cvs/hooks/use-cv-create';
import { useSkillsQuery } from '@/features/cvs/hooks/use-skills-query';
import { useUploadCvForm } from '@/features/cvs/hooks/use-upload-cv-form';
import {
  translateAvailabilityType,
  translateCurrency,
  translateWorkLocationType,
} from '@/utils/translation-maps';

export function UploadCvForm() {
  const t = useTranslations();
  const form = useUploadCvForm();
  const createMut = useCvCreate();
  const skillsQuery = useSkillsQuery();

  const skillOptions =
    skillsQuery.data?.map((skill) => ({
      label: skill.name,
      value: skill.id,
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
    await createMut.mutateAsync(data);
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="xl">
        <FormSection
          label={t('uploadCv.sectionProfessional')}
          description={t('uploadCv.sectionProfessionalDescription')}
        >
          <SimpleGrid cols={2} style={{ alignItems: 'end' }}>
            <TextInput
              key={form.key('jobTitle')}
              label={t('uploadCv.jobTitle')}
              placeholder={t('uploadCv.jobTitlePlaceholder')}
              leftSection={<IconBriefcase size={18} />}
              {...form.getInputProps('jobTitle')}
            />

            <NumberInput
              key={form.key('experienceInYears')}
              min={0}
              label={t('uploadCv.experienceInYears')}
              leftSection={<IconUser size={18} />}
              {...form.getInputProps('experienceInYears')}
            />

            <Select
              key={form.key('availabilityType')}
              label={t('uploadCv.availabilityType')}
              data={availabilityOptions}
              leftSection={<IconBriefcase size={18} />}
              {...form.getInputProps('availabilityType')}
            />

            <Select
              key={form.key('workLocationType')}
              label={t('uploadCv.workLocationType')}
              data={workLocationOptions}
              {...form.getInputProps('workLocationType')}
            />

            <MultiSelect
              key={form.key('skillIds')}
              clearable
              searchable
              label={t('uploadCv.skills')}
              placeholder={t('browse.skillsPlaceholder')}
              data={skillOptions}
              disabled={skillsQuery.isLoading}
              leftSection={<IconTools size={18} />}
              {...form.getInputProps('skillIds')}
            />

            <Select
              key={form.key('availableForHire')}
              label={t('uploadCv.availableForHire')}
              data={availableForHireOptions}
              value={form.values.availableForHire ? 'true' : 'false'}
              onChange={(value) =>
                form.setFieldValue('availableForHire', value === 'true')
              }
              error={form.errors.availableForHire}
            />
          </SimpleGrid>
        </FormSection>

        <FormSection
          label={t('uploadCv.sectionSalary')}
          description={t('uploadCv.sectionSalaryDescription')}
        >
          <SimpleGrid cols={3}>
            <NumberInput
              key={form.key('expectedSalaryMin')}
              min={0}
              step={50_000}
              thousandSeparator
              label={t('uploadCv.expectedSalaryMin')}
              leftSection={<IconCurrencyDollar size={18} />}
              {...form.getInputProps('expectedSalaryMin')}
            />

            <NumberInput
              key={form.key('expectedSalaryMax')}
              min={0}
              step={50_000}
              thousandSeparator
              label={t('uploadCv.expectedSalaryMax')}
              leftSection={<IconCurrencyDollar size={18} />}
              {...form.getInputProps('expectedSalaryMax')}
            />

            <Select
              key={form.key('expectedSalaryCurrency')}
              label={t('uploadCv.expectedSalaryCurrency')}
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
              key={form.key('bio')}
              label={t('uploadCv.bio')}
              placeholder={t('uploadCv.bioPlaceholder')}
              minRows={4}
              {...form.getInputProps('bio')}
            />

            <SimpleGrid cols={3}>
              <TextInput
                key={form.key('githubUrl')}
                label={t('uploadCv.githubUrl')}
                placeholder="https://github.com/username"
                leftSection={<IconBrandGithub size={18} />}
                {...form.getInputProps('githubUrl')}
              />

              <TextInput
                key={form.key('linkedinUrl')}
                label={t('uploadCv.linkedinUrl')}
                placeholder="https://linkedin.com/in/username"
                leftSection={<IconBrandLinkedin size={18} />}
                {...form.getInputProps('linkedinUrl')}
              />

              <TextInput
                key={form.key('portfolioUrl')}
                label={t('uploadCv.portfolioUrl')}
                placeholder="https://example.com"
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
          {t('uploadCv.submit')}
        </Button>
      </Stack>
    </form>
  );
}
