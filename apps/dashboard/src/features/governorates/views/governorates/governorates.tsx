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
import { GovernoratesForm } from '@/features/governorates/components/governorates-form';
import { useGovernoratesDelete } from '@/features/governorates/hooks/use-governorates-delete';
import { useGovernoratesList } from '@/features/governorates/hooks/use-governorates-list';
import type {
  Governorate,
  GovernoratesList,
} from '@/features/governorates/types';
import { useModals } from '@/hooks/use-modals';
import { useNotifications } from '@/hooks/use-notifications';

export function Governorates({
  initialData,
}: {
  initialData: GovernoratesList;
}) {
  const modals = useModals();
  const t = useTranslations();
  const n = useNotifications();
  const queryClient = useQueryClient();
  const [governorate, setGovernorate] = useState<Governorate>();
  const [opened, { open, close }] = useDisclosure(false, {
    onClose: () => setGovernorate(undefined),
  });

  const [filters, setFilters] = useSetState({
    search: '',
  });

  const deleteMut = useGovernoratesDelete();
  const { getTableProps, governorates, allGovernorates } = useGovernoratesList({
    initialData,
    filters,
  });

  return (
    <Stack>
      <Modal opened={opened} onClose={close}>
        <GovernoratesForm
          governorate={governorate}
          onSuccess={() => {
            queryClient.invalidateQueries({
              queryKey: ['/governorates'],
            });
            n.success(t('governorates.savedSuccessfully'));
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
            {t('governorates.add')}
          </Button>

          <DownloadFileButton
            fileName="governorates"
            query={allGovernorates}
            data={allGovernorates.data?.data.map((governorate) => ({
              name: governorate.name,
              createdAt: governorate.createdAt,
            }))}
          />
        </Group>
      </Group>

      <DataTable
        {...getTableProps({
          query: governorates,
          columns: [
            {
              accessor: 'name',
              title: t('governorates.name'),
              width: 'auto',
            },
            {
              accessor: 'createdAt',
              title: t('governorates.createdAt'),
              width: 400,
              render: ({ createdAt }) => {
                return dayjs(createdAt as string).format('YYYY-MM-DD');
              },
            },
            {
              accessor: 'actions',
              title: '',
              width: 106,
              render: (governorate) => {
                return (
                  <Group gap={4} justify="center">
                    <ActionIcon
                      color="gray"
                      variant="subtle"
                      onClick={() => {
                        setGovernorate(governorate);
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
                          onConfirm: () => deleteMut.mutate(governorate.id),
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
