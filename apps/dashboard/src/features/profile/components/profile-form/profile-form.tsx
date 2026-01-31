'use client';

import { Button, Paper, Select, Stack, TextInput, Title } from '@mantine/core';
import {
  IconAB,
  IconAt,
  IconCheck,
  IconPhone,
  IconUser,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { PhoneNumberInput } from '@/components/phone-number-input';
import { useProfileForm } from '@/features/profile/hooks/use-profile-form';
import { useProfileUpdate } from '@/features/profile/hooks/use-profile-update';
import type { ProfileResponseBody } from '@/features/profile/types';

export function ProfileForm({ profile }: { profile: ProfileResponseBody }) {
  const t = useTranslations();
  const form = useProfileForm({ profile });
  const updateProfileMut = useProfileUpdate();

  const handleSubmit = form.onSubmit((data) => {
    updateProfileMut.mutate(data);
  });

  return (
    <div>
      <Paper withBorder p="md">
        <form onSubmit={handleSubmit}>
          <Stack>
            <Title order={3}>{t('profiles.updateProfile')}</Title>

            <TextInput
              label={t('profiles.name')}
              leftSection={<IconUser size={18} />}
              {...form.getInputProps('name')}
            />

            <TextInput
              label={t('profiles.email')}
              leftSection={<IconAt size={18} />}
              {...form.getInputProps('email')}
            />

            <PhoneNumberInput
              label={t('profiles.phone')}
              placeholder="+964 770 333 4444"
              leftSection={<IconPhone size={18} />}
              {...form.getInputProps('phoneNumber')}
            />

            <Select
              label={t('profiles.gender')}
              allowDeselect={false}
              leftSection={<IconAB size={18} />}
              {...form.getInputProps('gender')}
              data={[
                { label: t('profiles.male'), value: 'Male' },
                { label: t('profiles.female'), value: 'Female' },
              ]}
            />

            <Button
              type="submit"
              leftSection={<IconCheck />}
              loading={updateProfileMut.isPending}
            >
              {t('_.save')}
            </Button>
          </Stack>
        </form>
      </Paper>
    </div>
  );
}
