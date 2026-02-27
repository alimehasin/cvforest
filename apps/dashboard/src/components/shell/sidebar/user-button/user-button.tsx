'use client';

import {
  Avatar,
  Menu,
  MenuDivider,
  MenuDropdown,
  MenuItem,
  MenuTarget,
  Skeleton,
  Text,
  UnstyledButton,
  useMantineColorScheme,
} from '@mantine/core';
import {
  IconChevronUp,
  IconHelp,
  IconLanguage,
  IconLogout,
  IconMoon,
  IconSettings,
  IconSun,
  IconSunMoon,
  IconUser,
} from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useKy } from '@/hooks/use-ky';
import { useSetLocale } from '@/hooks/use-set-locale';
import { constructFileUrl } from '@/utils/helpers';
import cls from './styles.module.css';
import type { ProfileResponseBody } from './types';

export function UserButton() {
  const ky = useKy();
  const router = useRouter();
  const t = useTranslations();
  const setLocaleMut = useSetLocale();
  const { setColorScheme } = useMantineColorScheme();

  const profile = useQuery({
    queryKey: ['/accounts/profile'],
    queryFn: () => {
      return ky.get('accounts/profile').json<ProfileResponseBody>();
    },
  });

  const logoutMut = useMutation({
    mutationFn: () => ky.post('accounts/sign-out').json(),
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <div className={cls.root}>
      <Menu width="target">
        <MenuTarget>
          <UnstyledButton className={cls.button} disabled={profile.isLoading}>
            {profile.isLoading ? (
              <Skeleton h={38} w={38} />
            ) : (
              <Avatar
                name={profile.data?.name ?? undefined}
                src={constructFileUrl(profile.data?.avatar?.key)}
              />
            )}

            <div>
              {profile.isLoading ? (
                <>
                  <Skeleton height={14} w="60%" />
                  <Skeleton height={11} mt={4} />
                </>
              ) : (
                <>
                  <Text fz={14}>{profile.data?.name}</Text>
                  <Text fz={11}>{profile.data?.email}</Text>
                </>
              )}
            </div>

            <IconChevronUp
              size={20}
              color={
                profile.isLoading
                  ? 'var(--mantine-color-nature-4)'
                  : 'var(--mantine-color-nature-7)'
              }
            />
          </UnstyledButton>
        </MenuTarget>

        <MenuDropdown>
          <MenuItem
            component={Link}
            href="/profile"
            leftSection={<IconUser size={16} />}
          >
            {t('sidebar.myAccount')}
          </MenuItem>

          <MenuDivider />

          <Menu.Sub>
            <Menu.Sub.Target>
              <Menu.Sub.Item leftSection={<IconLanguage size={16} />}>
                {t('sidebar.language')}
              </Menu.Sub.Item>
            </Menu.Sub.Target>

            <Menu.Sub.Dropdown>
              <Menu.Item
                leftSection={
                  <Text fz={12} c="gray.7">
                    اب
                  </Text>
                }
                onClick={() => setLocaleMut.mutate('ar')}
              >
                العربية
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <Text fz={12} c="gray.7">
                    En
                  </Text>
                }
                onClick={() => setLocaleMut.mutate('en')}
              >
                English
              </Menu.Item>
            </Menu.Sub.Dropdown>
          </Menu.Sub>

          <Menu.Sub>
            <Menu.Sub.Target>
              <Menu.Sub.Item leftSection={<IconSunMoon size={16} />}>
                {t('sidebar.colorScheme')}
              </Menu.Sub.Item>
            </Menu.Sub.Target>

            <Menu.Sub.Dropdown>
              <Menu.Item
                leftSection={<IconSun size={16} />}
                onClick={() => setColorScheme('light')}
              >
                {t('sidebar.light')}
              </Menu.Item>
              <Menu.Item
                leftSection={<IconMoon size={16} />}
                onClick={() => setColorScheme('dark')}
              >
                {t('sidebar.dark')}
              </Menu.Item>
            </Menu.Sub.Dropdown>
          </Menu.Sub>

          <MenuItem leftSection={<IconSettings size={16} />}>
            {t('sidebar.settings')}
          </MenuItem>

          <MenuItem leftSection={<IconHelp size={16} />}>
            {t('sidebar.support')}
          </MenuItem>

          <MenuDivider />

          <MenuItem
            color="red"
            onClick={() => logoutMut.mutate()}
            leftSection={<IconLogout size={16} />}
          >
            {t('sidebar.logout')}
          </MenuItem>
        </MenuDropdown>
      </Menu>
    </div>
  );
}
