'use client';

import { ActionIcon, Button, Group, Modal, Stack } from '@mantine/core';
import { useDisclosure, useSetState } from '@mantine/hooks';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { DataTable } from 'mantine-datatable';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { DownloadFileButton } from '@/components/download-file-button';
import { SearchInput } from '@/components/search-input';
import { SkillsForm } from '@/features/skills/components/skills-form';
import { useSkillsDelete } from '@/features/skills/hooks/use-skills-delete';
import { useSkillsList } from '@/features/skills/hooks/use-skills-list';
import type { Skill, SkillsList } from '@/features/skills/types';
import { useModals } from '@/hooks/use-modals';
import { useNotifications } from '@/hooks/use-notifications';

interface SkillsProps {
  initialData: SkillsList;
}

export function Skills({ initialData }: SkillsProps) {
  const modals = useModals();
  const t = useTranslations();
  const n = useNotifications();
  const queryClient = useQueryClient();
  const [skill, setSkill] = useState<Skill>();
  const [opened, { open, close }] = useDisclosure(false, {
    onClose: () => setSkill(undefined),
  });

  const [filters, setFilters] = useSetState({
    search: '',
  });

  const deleteMut = useSkillsDelete();
  const { getTableProps, skills, allSkills } = useSkillsList({
    initialData,
    filters,
  });

  return (
    <Stack>
      <Modal opened={opened} onClose={close}>
        <SkillsForm
          skill={skill}
          onSuccess={() => {
            queryClient.invalidateQueries({
              queryKey: ['/skills'],
            });
            n.success(t('skills.savedSuccessfully'));
            close();
          }}
        />
      </Modal>

      <Group justify="space-between">
        <SearchInput
          value={filters.search}
          onChange={(search) => setFilters({ search })}
        />

        <Group gap="xs">
          <Button leftSection={<IconPlus />} onClick={open}>
            {t('skills.add')}
          </Button>

          <DownloadFileButton
            fileName="skills"
            query={allSkills}
            data={allSkills.data?.data.map((skill) => ({
              name: skill.name,
              createdAt: skill.createdAt,
            }))}
          />
        </Group>
      </Group>

      <DataTable
        {...getTableProps({
          query: skills,
          columns: [
            {
              accessor: 'name',
              title: t('skills.name'),
              width: 'auto',
            },
            {
              accessor: 'createdAt',
              title: t('skills.createdAt'),
              width: 400,
              render: ({ createdAt }) => {
                return dayjs(createdAt as string).format('YYYY-MM-DD');
              },
            },
            {
              accessor: 'actions',
              title: '',
              width: 106,
              render: (skill) => {
                return (
                  <Group gap={4} justify="center">
                    <ActionIcon
                      color="gray"
                      variant="subtle"
                      onClick={() => {
                        setSkill(skill);
                        open();
                      }}
                    >
                      <IconPencil size={20} />
                    </ActionIcon>

                    <ActionIcon
                      color="red"
                      variant="subtle"
                      loading={deleteMut.isPending}
                      onClick={() => {
                        modals.confirmDelete({
                          onConfirm: () => deleteMut.mutate(skill.id),
                        });
                      }}
                    >
                      <IconTrash size={20} />
                    </ActionIcon>
                  </Group>
                );
              },
            },
          ],
        })}
      />
    </Stack>
  );
}
