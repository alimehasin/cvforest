'use client';

import {
  Anchor,
  Button,
  Paper,
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
import { PhoneNumberInput } from '@/components/phone-number-input';
import { useSignUpForm } from '@/features/accounts/hooks/use-sign-up-form';
import { useSignUpMut } from '@/features/accounts/hooks/use-sign-up-mut';

export function SignUpForm() {
  const form = useSignUpForm();
  const t = useTranslations();
  const signUpMut = useSignUpMut();

  const handleSubmit = form.onSubmit(async (data) => {
    await signUpMut.mutateAsync(data);
  });

  return (
    <form onSubmit={handleSubmit}>
      <Paper withBorder p="sm" component={Stack} gap="md">
        <Stack gap="md">
          <TextInput
            required
            label={t('signup.name')}
            description={t('signup.nameDescription')}
            leftSection={<IconUser size={18} />}
            key={form.key('name')}
            {...form.getInputProps('name')}
          />

          <TextInput
            required
            type="email"
            label={t('signup.email')}
            description={t('signup.emailDescription')}
            leftSection={<IconAt size={18} />}
            key={form.key('email')}
            {...form.getInputProps('email')}
          />

          <PhoneNumberInput
            label={t('signup.phoneNumber')}
            description={t('signup.phoneNumberDescription')}
            leftSection={<IconPhone size={18} />}
            key={form.key('phoneNumber')}
            {...form.getInputProps('phoneNumber')}
          />

          <PasswordInput
            required
            label={t('signup.password')}
            description={t('signup.passwordDescription')}
            leftSection={<IconLock size={18} />}
            key={form.key('password')}
            {...form.getInputProps('password')}
          />

          <PasswordInput
            required
            label={t('signup.confirmPassword')}
            description={t('signup.confirmPasswordDescription')}
            leftSection={<IconLock size={18} />}
            key={form.key('confirmPassword')}
            {...form.getInputProps('confirmPassword')}
          />

          <Select
            clearable
            label={t('signup.gender')}
            description={t('signup.genderDescription')}
            leftSection={<IconUser size={18} />}
            data={[
              { label: t('gender.male'), value: Gender.Male },
              { label: t('gender.female'), value: Gender.Female },
            ]}
            key={form.key('gender')}
            {...form.getInputProps('gender')}
          />
        </Stack>

        <Stack gap="lg">
          <Button
            type="submit"
            leftSection={<IconCheck size={20} />}
            loading={signUpMut.isPending}
          >
            {t('signup.submitButton')}
          </Button>

          <Text ta="center" c="dimmed" size="sm">
            {t('signup.alreadyHaveAccount')}{' '}
            <Anchor href="/sign-in" component={Link} c="blue" fw={500}>
              {t('signup.signIn')}
            </Anchor>
          </Text>
        </Stack>
      </Paper>
    </form>
  );
}
