'use client';

import { Button, Stack, TextInput } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useSkillsCreate } from '@/features/skills/hooks/use-skills-create';
import { useSkillsForm } from '@/features/skills/hooks/use-skills-form';
import { useSkillsUpdate } from '@/features/skills/hooks/use-skills-update';
import type { SkillsList } from '@/features/skills/types';

interface SkillsFormProps {
  skill?: SkillsList['data'][number];
  onSuccess: () => void;
}

export function SkillsForm({ skill, onSuccess }: SkillsFormProps) {
  const t = useTranslations();

  const form = useSkillsForm({ skill });
  const createMut = useSkillsCreate({ onSuccess });
  const updateMut = useSkillsUpdate({ onSuccess });

  const handleSubmit = form.onSubmit(async (values) => {
    skill
      ? await updateMut.mutateAsync({ id: skill.id, body: values })
      : await createMut.mutateAsync(values);
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput label={t('skills.name')} {...form.getInputProps('name')} />

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
