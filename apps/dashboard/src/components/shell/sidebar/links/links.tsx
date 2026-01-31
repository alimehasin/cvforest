import { ScrollArea, Stack, Text } from '@mantine/core';
import { IconHome, IconUsers } from '@tabler/icons-react';
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
          icon: IconUsers,
          label: t('sidebar.users'),
          path: '/users',
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
