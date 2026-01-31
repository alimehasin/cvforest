import { ScrollArea, Stack, Text } from '@mantine/core';
import {
  IconBuilding,
  IconCode,
  IconHome,
  IconUserCheck,
  IconUsers,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { ShellLink } from './shell-link';

export function Links() {
  const t = useTranslations();

  const links = [
    {
      label: t('sidebar.overviewGroup'),
      links: [
        {
          icon: IconHome,
          label: t('sidebar.home'),
          path: '/',
          activeExact: true,
        },
      ],
    },
    {
      label: t('sidebar.managementGroup'),
      links: [
        {
          icon: IconUserCheck,
          label: t('sidebar.joinRequests'),
          path: '/join-requests',
        },
        {
          icon: IconUsers,
          label: t('sidebar.users'),
          path: '/users',
        },
        {
          icon: IconBuilding,
          label: t('sidebar.governorates'),
          path: '/governorates',
        },
        {
          icon: IconCode,
          label: t('sidebar.skills'),
          path: '/skills',
        },
      ],
    },
  ];

  return (
    <ScrollArea h="100%" scrollbarSize={8}>
      <Stack p="md" gap="md">
        {links.map((link, i) => (
          <div key={i.toString()}>
            {link.label && (
              <Text fz={11} fw={500} c="dimmed" tt="uppercase" mb="xs">
                {link.label}
              </Text>
            )}

            <Stack gap={4}>
              {link.links.map((link) => (
                <ShellLink key={link.path} {...link} />
              ))}
            </Stack>
          </div>
        ))}
      </Stack>
    </ScrollArea>
  );
}
