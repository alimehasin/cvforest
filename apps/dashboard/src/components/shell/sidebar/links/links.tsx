import { ScrollArea, Stack, Text } from '@mantine/core';
import {
  IconBadge,
  IconBuilding,
  IconCategory,
  IconHome,
  IconPackage,
  IconReportMoney,
  IconShoppingCart,
  IconTags,
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
          icon: IconUsers,
          label: t('sidebar.users'),
          path: '/users',
        },
        {
          icon: IconShoppingCart,
          label: t('sidebar.orders'),
          path: '/orders',
        },
        {
          icon: IconBuilding,
          label: t('sidebar.governorates'),
          path: '/governorates',
        },
        {
          icon: IconReportMoney,
          label: t('sidebar.priceReports'),
          path: '/price-reports',
        },
      ],
    },
    {
      label: t('sidebar.catalogGroup'),
      links: [
        {
          icon: IconCategory,
          label: t('sidebar.categories'),
          path: '/categories',
        },
        {
          icon: IconPackage,
          label: t('sidebar.products'),
          path: '/products',
        },
        {
          icon: IconBadge,
          label: t('sidebar.attributes'),
          path: '/attributes',
        },
        {
          icon: IconTags,
          label: t('sidebar.warranties'),
          path: '/warranties',
        },
      ],
    },
    {
      label: t('sidebar.marketingGroup'),
      links: [
        {
          icon: IconBadge,
          label: t('sidebar.banners'),
          path: '/banners',
        },
        {
          icon: IconTags,
          label: t('sidebar.coupons'),
          path: '/coupons',
        },
      ],
    },

    {
      label: 'Testing',
      links: [
        {
          icon: IconCategory,
          label: 'Testing 1',
          path: '/testing-1',
        },
        {
          icon: IconPackage,
          label: 'Testing 2',
          path: '/testing-2',
        },
        {
          icon: IconBadge,
          label: 'Testing 3',
          path: '/testing-3',
        },
        {
          icon: IconTags,
          label: 'Testing 4',
          path: '/testing-4',
        },
        {
          icon: IconTags,
          label: 'Testing 5',
          path: '/testing-5',
        },
        {
          icon: IconTags,
          label: 'Testing 6',
          path: '/testing-6',
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
