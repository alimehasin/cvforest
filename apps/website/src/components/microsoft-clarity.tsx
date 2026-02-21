'use client';

import clarity from '@microsoft/clarity';
import { useEffect } from 'react';
import { env } from '@/env';

export function MicrosoftClarity() {
  useEffect(() => {
    const projectId = env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
    if (projectId) {
      clarity.init(projectId);
    }
  }, []);

  return null;
}
