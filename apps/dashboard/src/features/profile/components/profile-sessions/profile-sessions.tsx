'use client';

import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DataTable } from 'mantine-datatable';
import { useTranslations } from 'next-intl';
import { UAParser } from 'ua-parser-js';
import type {
  ProfileResponseBody,
  RevokeOtherSessionsResponseBody,
  RevokeSessionResponseBody,
  SessionResponseBody,
} from '@/features/profile/types';
import { useKy } from '@/hooks/use-ky';
import { useNotifications } from '@/hooks/use-notifications';
import { formatDateTime } from '@/utils/helpers';

export function ProfileSessions({ profile }: { profile: ProfileResponseBody }) {
  const ky = useKy();
  const t = useTranslations();
  const n = useNotifications();
  const queryClient = useQueryClient();

  const session = useQuery({
    queryKey: ['/accounts/session'],
    queryFn: () => {
      return ky.get('accounts/session').json<SessionResponseBody>();
    },
  });

  const revoke = useMutation({
    mutationFn: (token: string) => {
      return ky
        .post('accounts/revoke-session', { json: { token } })
        .json<RevokeSessionResponseBody>();
    },
    onSuccess: () => {
      n.success(t('sessions.revokeSuccess'));
      queryClient.invalidateQueries({ queryKey: ['/accounts/profile'] });
    },
  });

  const revokeAll = useMutation({
    mutationFn: () => {
      return ky
        .post('accounts/revoke-other-sessions')
        .json<RevokeOtherSessionsResponseBody>();
    },
    onSuccess: () => {
      n.success(t('sessions.revokeAllSuccess'));
      queryClient.invalidateQueries({ queryKey: ['/accounts/profile'] });
    },
  });

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={3}>{t('sessions.activeSessions')}</Title>

        <Button
          color="red"
          variant="subtle"
          onClick={() => revokeAll.mutate()}
          leftSection={<IconTrash size={18} />}
        >
          {t('sessions.revokeAll')}
        </Button>
      </Group>

      <DataTable
        withRowBorders
        withTableBorder
        withColumnBorders
        borderRadius="lg"
        records={profile.sessions}
        columns={[
          {
            accessor: 'userAgent',
            title: t('sessions.userAgent'),
            render: ({ userAgent, token }) => {
              const isCurrent = token === session.data?.session.token;

              const ua = new UAParser(userAgent as string);

              return (
                <Group>
                  <Text>
                    {ua.getOS().name} + {ua.getBrowser().name ?? 'Unknown'}
                  </Text>

                  {isCurrent && (
                    <Badge variant="light">
                      {t('sessions.currentSession')}
                    </Badge>
                  )}
                </Group>
              );
            },
          },
          {
            accessor: 'ipAddress',
            title: t('sessions.ipAddress'),
            width: 200,
          },
          {
            accessor: 'createdAt',
            title: t('sessions.createdAt'),
            width: 220,
            render: ({ createdAt }) => {
              return formatDateTime(createdAt as string);
            },
          },
          {
            accessor: 'expiresAt',
            title: t('sessions.expiresAt'),
            width: 220,
            render: ({ expiresAt }) => {
              return formatDateTime(expiresAt as string);
            },
          },
          {
            accessor: 'actions',
            title: '',
            width: 72,
            render: ({ token }) => {
              const isCurrent = token === session.data?.session.token;

              return (
                <Group justify="center" align="center">
                  <Tooltip
                    withArrow
                    label={
                      isCurrent
                        ? t('sessions.currentSessionCannotBeRevoked')
                        : t('sessions.revoke')
                    }
                  >
                    <ActionIcon
                      color="red"
                      variant="subtle"
                      disabled={isCurrent}
                      onClick={() => revoke.mutate(token)}
                    >
                      <IconTrash size={18} />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              );
            },
          },
        ]}
      />
    </Stack>
  );
}
