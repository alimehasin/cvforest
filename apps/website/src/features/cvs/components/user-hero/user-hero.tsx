import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Group,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconWorld,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { constructFileUrl } from '@/utils/helpers';
import type { UserDetailResponse } from '../../types';
import cls from './styles.module.css';

interface UserHeroProps {
  user: UserDetailResponse;
  /** Optional actions rendered inside the cover (e.g. edit button) */
  actions?: React.ReactNode;
}

export function UserHero({ user, actions }: UserHeroProps) {
  const t = useTranslations();

  const socialLinks = [
    {
      url: user.githubUrl,
      icon: IconBrandGithub,
      label: 'GitHub',
    },
    {
      url: user.linkedinUrl,
      icon: IconBrandLinkedin,
      label: 'LinkedIn',
    },
    {
      url: user.portfolioUrl,
      icon: IconWorld,
      label: t('userDetails.portfolio'),
    },
  ].filter((link) => link.url);

  return (
    <Box>
      {/* Gradient banner */}
      <Box
        className={
          user.status === 'Pending'
            ? `${cls.banner} ${cls.bannerPending}`
            : cls.banner
        }
      >
        {actions && <div className={cls.coverActions}>{actions}</div>}
      </Box>

      <Group justify="space-between">
        {/* Avatar + info */}
        <Group gap="md" px="md" className={cls.heroContent}>
          <div className={cls.avatarWrapper}>
            <div className={cls.avatarRing}>
              <Avatar
                size={112}
                radius="50%"
                name={user.user.name}
                src={constructFileUrl(user.user.avatar?.key)}
                color="primary"
              />
            </div>
          </div>

          <Stack gap={4} mt="md">
            <Group gap="sm" align="center">
              <Title order={2}>{user.user.name}</Title>
              {user.availableForHire && (
                <Badge size="sm" radius="xl" className={cls.availableBadge}>
                  {t('cvs.availableForHire')}
                </Badge>
              )}
            </Group>

            {user.jobTitle && (
              <Text size="lg" c="dimmed">
                {user.jobTitle}
              </Text>
            )}
          </Stack>
        </Group>

        {/* Social links */}
        {(socialLinks.length > 0 || user.user.email) && (
          <Group gap="xs">
            {socialLinks.map((link) => (
              <Tooltip key={link.label} label={link.label} withArrow>
                <ActionIcon
                  component="a"
                  href={link.url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="light"
                  size="lg"
                  radius="xl"
                  className={cls.socialButton}
                >
                  <link.icon size={18} />
                </ActionIcon>
              </Tooltip>
            ))}

            <Tooltip label={t('users.email')} withArrow>
              <ActionIcon
                component="a"
                href={`mailto:${user.user.email}`}
                variant="light"
                size="lg"
                radius="xl"
                className={cls.socialButton}
              >
                <IconMail size={18} />
              </ActionIcon>
            </Tooltip>
          </Group>
        )}
      </Group>
    </Box>
  );
}
