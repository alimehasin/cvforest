'use client';

import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { useState } from 'react';

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        mutations: {
          onError: async (err) => {
            if (err instanceof HTTPError) {
              const errorBody = await err.response.json();

              if (errorBody.errorCode === 'HttpError') {
                // TODO: Show error via sonner toast
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
