'use client';

import { Button, Stack, TextInput } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useGovernoratesCreate } from '@/features/governorates/hooks/use-governorates-create';
import { useGovernoratesForm } from '@/features/governorates/hooks/use-governorates-form';
import { useGovernoratesUpdate } from '@/features/governorates/hooks/use-governorates-update';
import type { GovernoratesList } from '@/features/governorates/types';

export function GovernoratesForm({
  governorate,
  onSuccess,
}: {
  governorate?: GovernoratesList['data'][number];
  onSuccess: () => void;
}) {
  const t = useTranslations();

  const form = useGovernoratesForm({ governorate });
  const createMut = useGovernoratesCreate({ onSuccess });
  const updateMut = useGovernoratesUpdate({ onSuccess });

  const handleSubmit = form.onSubmit(async (values) => {
    governorate
      ? await updateMut.mutateAsync({ id: governorate.id, body: values })
      : await createMut.mutateAsync(values);
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput
          label={t('governorates.name')}
          {...form.getInputProps('name')}
        />

        <Button
          type="submit"
          loading={form.submitting}
          leftSection={<IconCheck />}
        >
          {t('_.save')}
        </Button>
      </Stack>
    </form>
  );
}
