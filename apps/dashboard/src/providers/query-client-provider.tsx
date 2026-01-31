'use client';

import { List, ListItem } from '@mantine/core';
import { createFormActions } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useNotifications } from '@/hooks/use-notifications';

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations();
  const n = useNotifications();

  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        mutations: {
          onError: async (err) => {
            if (err instanceof HTTPError) {
              const errorBody = await err.response.json();

              if (errorBody.errorCode === 'HttpError') {
                n.error(errorBody.message);
              }

              if (errorBody.errorCode === 'LogicValidationError') {
                showNotification({
                  color: 'red',
                  title: t('_.error'),
                  message: (
                    <List>
                      {errorBody.errors.map((error: string) => (
                        <ListItem key={error}>{error}</ListItem>
                      ))}
                    </List>
                  ),
                });
              }

              if (errorBody.errorCode === 'FieldsValidationError') {
                const formActions = createFormActions('main-form');
                errorBody.errors.forEach(
                  (error: { field: string; message: string }) => {
                    formActions.setFieldError(error.field, error.message);
                  },
                );
              }
            }
          },
        },
      },
    });
  });

  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
}
