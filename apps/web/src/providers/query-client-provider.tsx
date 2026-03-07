'use client';

import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

interface QueryClientProviderProps {
  children: React.ReactNode;
}

export function QueryClientProvider({ children }: QueryClientProviderProps) {
  const t = useTranslations();

  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        mutations: {
          onError: async (err) => {
            if (err instanceof HTTPError) {
              const errorBody = await err.response.json();

              if (errorBody.errorCode === 'HttpError') {
                toast.error(t('_.error'), {
                  description: errorBody.message,
                });
              }

              if (errorBody.errorCode === 'LogicValidationError') {
                toast.error(t('_.error'), {
                  description: (
                    <ul className="list-inside list-disc text-sm">
                      {errorBody.errors.map((error: string) => (
                        <li key={error}>{error}</li>
                      ))}
                    </ul>
                  ),
                });
              }

              if (errorBody.errorCode === 'FieldsValidationError') {
                toast.error(t('_.error'), {
                  description: (
                    <ul className="list-inside list-disc text-sm">
                      {errorBody.errors.map(
                        (error: { field: string; message: string }) => (
                          <li key={error.field}>
                            {error.field}: {error.message}
                          </li>
                        ),
                      )}
                    </ul>
                  ),
                });
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
