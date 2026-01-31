'use client';

import { Button, Menu } from '@mantine/core';
import { IconLanguage } from '@tabler/icons-react';
import { useSetLocale } from '@/hooks/use-set-locale';

export function LanguageSelector({ locale }: { locale: string }) {
  const setLocaleMut = useSetLocale();

  return (
    <Menu>
      <Menu.Target>
        <Button
          color="gray"
          variant="subtle"
          size="compact-sm"
          leftSection={<IconLanguage size={18} />}
        >
          {locale === 'ar' ? 'العربية' : 'English'}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item onClick={() => setLocaleMut.mutate('ar')}>العربية</Menu.Item>
        <Menu.Item onClick={() => setLocaleMut.mutate('en')}>English</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
