import { Badge } from '@mantine/core';
import { IconShield, IconUser } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

export function RoleBadge({ role }: { role: string | null }) {
  const t = useTranslations();

  switch (role) {
    case 'admin': {
      return (
        <Badge
          color="primary"
          variant="light"
          leftSection={<IconShield size={16} />}
        >
          {t('roles.admin')}
        </Badge>
      );
    }
    case 'user': {
      return (
        <Badge
          color="blue"
          variant="light"
          leftSection={<IconUser size={16} />}
        >
          {t('roles.user')}
        </Badge>
      );
    }
    default: {
      return (
        <Badge color="gray" variant="light">
          {role}
        </Badge>
      );
    }
  }
}
