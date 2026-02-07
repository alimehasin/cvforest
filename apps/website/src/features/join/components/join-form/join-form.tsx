'use client';

import {
  Anchor,
  Button,
  PasswordInput,
  Select,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { Gender } from '@repo/backend/prisma/enums';
import {
  IconAt,
  IconCheck,
  IconLock,
  IconPhone,
  IconUser,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FormSection } from '@/components/form-section';
import { PhoneNumberInput } from '@/components/phone-number-input';
import { useJoinForm } from '../../hooks/use-join-form';
import { useRegisterMut } from '../../hooks/use-register-mut';

export function JoinForm() {
  const form = useJoinForm();
  const t = useTranslations();
  const registerMut = useRegisterMut();

  const handleSubmit = form.onSubmit(async (data) => {
    await registerMut.mutateAsync(data);
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
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

            <PasswordInput
              label={t('join.password')}
              placeholder={t('join.passwordPlaceholder')}
              leftSection={<IconLock size={18} />}
              required
              key={form.key('password')}
              {...form.getInputProps('password')}
            />

            <PasswordInput
              label={t('join.confirmPassword')}
              placeholder={t('join.confirmPasswordPlaceholder')}
              leftSection={<IconLock size={18} />}
              required
              key={form.key('confirmPassword')}
              {...form.getInputProps('confirmPassword')}
            />

            <PhoneNumberInput
              label={t('join.phoneNumber')}
              placeholder={t('join.phoneNumberPlaceholder')}
              leftSection={<IconPhone size={18} />}
              key={form.key('phoneNumber')}
              {...form.getInputProps('phoneNumber')}
            />

            <Select
              label={t('join.gender')}
              leftSection={<IconUser size={18} />}
              clearable
              placeholder={t('join.gender')}
              data={[
                { label: t('join.male'), value: Gender.Male },
                { label: t('join.female'), value: Gender.Female },
              ]}
              key={form.key('gender')}
              {...form.getInputProps('gender')}
            />
          </Stack>
        </FormSection>

        <Stack gap="lg">
          <Button
            type="submit"
            leftSection={<IconCheck size={20} />}
            loading={registerMut.isPending}
          >
            {t('join.submitButton')}
          </Button>

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
