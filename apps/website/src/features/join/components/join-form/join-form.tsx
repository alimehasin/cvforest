'use client';

import {
  Anchor,
  Button,
  Checkbox,
  MultiSelect,
  NumberInput,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import {
  AvailabilityType,
  Currency,
  Gender,
  WorkLocationType,
} from '@repo/backend/prisma/enums';
import {
  IconAt,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBriefcase,
  IconCheck,
  IconClock,
  IconCurrencyDollar,
  IconGlobe,
  IconMapPin,
  IconPhone,
  IconUser,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FormSection } from '@/components/form-section';
import { PhoneNumberInput } from '@/components/phone-number-input';
import {
  translateAvailabilityType,
  translateCurrency,
  translateWorkLocationType,
} from '@/utils/translation-maps';
import { useGovernoratesQuery } from '../../hooks/use-governorates-query';
import { useJoinForm } from '../../hooks/use-join-form';
import { useRegisterMut } from '../../hooks/use-register-mut';
import { useSkillsQuery } from '../../hooks/use-skills-query';

export function JoinForm() {
  const form = useJoinForm();
  const t = useTranslations();
  const registerMut = useRegisterMut();
  const skillsQuery = useSkillsQuery();
  const governoratesQuery = useGovernoratesQuery();

  const handleSubmit = form.onSubmit(async (data) => {
    await registerMut.mutateAsync(data);
  });

  const governorateOptions = governoratesQuery.data?.map((gov) => ({
    label: gov.name,
    value: gov.id,
  }));

  const skillOptions = skillsQuery.data?.map((skill) => ({
    label: skill.name,
    value: skill.id,
  }));

  const availabilityOptions = Object.values(AvailabilityType).map((type) => ({
    label: translateAvailabilityType(t, type),
    value: type,
  }));

  const workLocationOptions = Object.values(WorkLocationType).map((type) => ({
    label: translateWorkLocationType(t, type),
    value: type,
  }));

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <SimpleGrid cols={{ base: 1, md: 2 }}>
          <Stack>
            {/* Section 1: Personal Information */}
            <FormSection
              label={t('join.personalInfoSection')}
              description={t('join.personalInfoDescription')}
            >
              <Stack gap="md">
                <TextInput
                  label={t('join.name')}
                  placeholder={t('join.namePlaceholder')}
                  leftSection={<IconUser size={18} />}
                  required
                  key={form.key('name')}
                  {...form.getInputProps('name')}
                />

                <TextInput
                  label={t('join.email')}
                  placeholder={t('join.emailPlaceholder')}
                  leftSection={<IconAt size={18} />}
                  type="email"
                  required
                  key={form.key('email')}
                  {...form.getInputProps('email')}
                />

                <PhoneNumberInput
                  label={t('join.phoneNumber')}
                  placeholder={t('join.phoneNumberPlaceholder')}
                  leftSection={<IconPhone size={18} />}
                  required
                  key={form.key('phoneNumber')}
                  {...form.getInputProps('phoneNumber')}
                />

                <Select
                  label={t('join.gender')}
                  leftSection={<IconUser size={18} />}
                  required
                  data={[
                    { label: t('join.male'), value: Gender.Male },
                    { label: t('join.female'), value: Gender.Female },
                  ]}
                  key={form.key('gender')}
                  {...form.getInputProps('gender')}
                />

                <Select
                  label={t('join.governorate')}
                  placeholder={t('join.governoratePlaceholder')}
                  leftSection={<IconMapPin size={18} />}
                  required
                  searchable
                  data={governorateOptions}
                  disabled={governoratesQuery.isLoading}
                  key={form.key('governorateId')}
                  {...form.getInputProps('governorateId')}
                />
              </Stack>
            </FormSection>

            {/* Section 4: Social & Portfolio Links */}
            <FormSection
              label={t('join.socialLinksSection')}
              description={t('join.socialLinksDescription')}
            >
              <Stack gap="md">
                <TextInput
                  label={t('join.githubUrl')}
                  placeholder={t('join.githubPlaceholder')}
                  leftSection={<IconBrandGithub size={18} />}
                  key={form.key('githubUrl')}
                  {...form.getInputProps('githubUrl')}
                />

                <TextInput
                  label={t('join.linkedinUrl')}
                  placeholder={t('join.linkedinPlaceholder')}
                  leftSection={<IconBrandLinkedin size={18} />}
                  key={form.key('linkedinUrl')}
                  {...form.getInputProps('linkedinUrl')}
                />

                <TextInput
                  label={t('join.portfolioUrl')}
                  placeholder={t('join.portfolioPlaceholder')}
                  leftSection={<IconGlobe size={18} />}
                  key={form.key('portfolioUrl')}
                  {...form.getInputProps('portfolioUrl')}
                />
              </Stack>
            </FormSection>
          </Stack>

          <Stack>
            {/* Section 2: Professional Information */}
            <FormSection
              label={t('join.professionalInfoSection')}
              description={t('join.professionalInfoDescription')}
            >
              <Stack gap="md">
                <TextInput
                  label={t('join.jobTitle')}
                  placeholder={t('join.jobTitlePlaceholder')}
                  leftSection={<IconBriefcase size={18} />}
                  required
                  key={form.key('jobTitle')}
                  {...form.getInputProps('jobTitle')}
                />

                <NumberInput
                  required
                  min={0}
                  max={50}
                  label={t('join.experienceInYears')}
                  placeholder={t('join.experiencePlaceholder')}
                  leftSection={<IconClock size={18} />}
                  key={form.key('experienceInYears')}
                  {...form.getInputProps('experienceInYears')}
                />

                <SimpleGrid cols={{ base: 1, md: 3 }}>
                  <NumberInput
                    min={0}
                    step={100_000}
                    thousandSeparator
                    label={t('join.expectedSalaryMin')}
                    placeholder={t('join.salaryPlaceholder')}
                    leftSection={<IconCurrencyDollar size={18} />}
                    key={form.key('expectedSalaryMin')}
                    {...form.getInputProps('expectedSalaryMin')}
                  />

                  <NumberInput
                    min={0}
                    step={100_000}
                    thousandSeparator
                    label={t('join.expectedSalaryMax')}
                    placeholder={t('join.salaryPlaceholder')}
                    leftSection={<IconCurrencyDollar size={18} />}
                    key={form.key('expectedSalaryMax')}
                    {...form.getInputProps('expectedSalaryMax')}
                  />

                  <Select
                    label={t('join.currency')}
                    data={Object.values(Currency).map((currency) => ({
                      label: translateCurrency(t, currency),
                      value: currency,
                    }))}
                    key={form.key('expectedSalaryCurrency')}
                    {...form.getInputProps('expectedSalaryCurrency')}
                  />
                </SimpleGrid>

                <Select
                  clearable
                  label={t('join.availabilityType')}
                  placeholder={t('join.availabilityPlaceholder')}
                  leftSection={<IconClock size={18} />}
                  data={availabilityOptions}
                  key={form.key('availabilityType')}
                  {...form.getInputProps('availabilityType')}
                />

                <Select
                  label={t('join.workLocationType')}
                  placeholder={t('join.workLocationPlaceholder')}
                  leftSection={<IconMapPin size={18} />}
                  data={workLocationOptions}
                  clearable
                  key={form.key('workLocationType')}
                  {...form.getInputProps('workLocationType')}
                />

                <Checkbox
                  label={t('join.availableForHire')}
                  key={form.key('availableForHire')}
                  {...form.getInputProps('availableForHire', {
                    type: 'checkbox',
                  })}
                />

                <Textarea
                  label={t('join.bio')}
                  placeholder={t('join.bioPlaceholder')}
                  minRows={3}
                  maxRows={8}
                  autosize
                  key={form.key('bio')}
                  {...form.getInputProps('bio')}
                />
              </Stack>
            </FormSection>

            {/* Section 3: Skills Selection */}
            <FormSection
              label={t('join.skillsSection')}
              description={t('join.skillsDescription')}
            >
              <MultiSelect
                clearable
                searchable
                label={t('join.skills')}
                placeholder={t('join.skillsPlaceholder')}
                data={skillOptions}
                disabled={skillsQuery.isLoading}
                key={form.key('skillIds')}
                {...form.getInputProps('skillIds')}
              />
            </FormSection>
          </Stack>
        </SimpleGrid>

        <Stack gap="lg">
          {/* Submit Button */}
          <Button
            type="submit"
            leftSection={<IconCheck size={20} />}
            loading={registerMut.isPending}
          >
            {t('join.submitButton')}
          </Button>

          {/* Link to Login */}
          <Text ta="center" c="dimmed" size="sm">
            {t('join.alreadyHaveAccount')}{' '}
            <Anchor href="/login" component={Link} c="blue" fw={500}>
              {t('join.signIn')}
            </Anchor>
          </Text>
        </Stack>
      </Stack>
    </form>
  );
}
