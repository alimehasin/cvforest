import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Group,
  Paper,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBriefcase,
  IconClock,
  IconMail,
  IconMapPin,
  IconWorld,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/components/link';
import { constructImageUrl } from '@/utils/helpers';
import {
  translateAvailabilityType,
  translateWorkLocationType,
} from '@/utils/translation-maps';
import type { UserListItem } from '../../types';
import cls from './styles.module.css';

export function UserCard({ user }: { user: UserListItem }) {
  const t = useTranslations();

  const skills = user.userSkills.map((us) => us.skill);
  const visibleSkills = skills.slice(0, 3);
  const remainingCount = skills.length - visibleSkills.length;

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
      label: 'Portfolio',
    },
  ].filter((link) => link.url);

  return (
    <Link
      href={`/users/${user.id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Paper withBorder radius="lg" className={cls.card} p={0}>
        {/* Gradient header band */}
        <Box className={cls.header} />

        {/* Avatar overlapping the header */}
        <div className={cls.avatarWrapper}>
          <div className={cls.avatarRing}>
            <Avatar
              size={92}
              radius="50%"
              name={user.name}
              src={constructImageUrl(user.avatar?.key)}
              color="primary"
            />
            {user.availableForHire && (
              <Tooltip label={t('cvs.availableForHire')} withArrow>
                <span className={cls.availableDot} />
              </Tooltip>
            )}
          </div>
        </div>

        {/* Card body */}
        <Stack align="center" gap="xs" className={cls.body}>
          {/* Identity */}
          <Stack align="center" gap={2}>
            <Text fw={700} size="md" ta="center" lineClamp={1}>
              {user.name}
            </Text>

            {user.jobTitle && (
              <Text size="sm" c="dimmed" ta="center" lineClamp={1}>
                {user.jobTitle}
              </Text>
            )}
          </Stack>

          {/* Meta chips */}
          <Group gap={6} justify="center" wrap="wrap">
            {user.governorate && (
              <span className={cls.metaChip}>
                <IconMapPin size={12} />
                {user.governorate.name}
              </span>
            )}

            {user.experienceInYears != null && (
              <span className={cls.metaChip}>
                <IconClock size={12} />
                {t('cvs.yearsExperience', { number: user.experienceInYears })}
              </span>
            )}

            {user.availabilityType && (
              <span className={cls.metaChip}>
                <IconBriefcase size={12} />
                {translateAvailabilityType(t, user.availabilityType)}
              </span>
            )}

            {user.workLocationType && (
              <span className={cls.metaChip}>
                <IconWorld size={12} />
                {translateWorkLocationType(t, user.workLocationType)}
              </span>
            )}
          </Group>

          {/* Skills */}
          {visibleSkills.length > 0 && (
            <Group gap={6} justify="center" wrap="wrap">
              {visibleSkills.map((skill) => (
                <Badge
                  key={skill.id}
                  size="sm"
                  variant="light"
                  radius="xl"
                  className={cls.skillPill}
                >
                  {skill.name}
                </Badge>
              ))}
              {remainingCount > 0 && (
                <Badge size="sm" variant="light" color="gray" radius="xl">
                  +{remainingCount}
                </Badge>
              )}
            </Group>
          )}

          {/* Social links footer */}
          <Group w="100%" className={cls.socialFooter} justify="space-between">
            <Group gap="xs">
              {socialLinks.map((link) => (
                <Tooltip key={link.label} label={link.label} withArrow>
                  <ActionIcon
                    component="a"
                    href={link.url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="subtle"
                    color="gray"
                    size="sm"
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                  >
                    <link.icon size={16} />
                  </ActionIcon>
                </Tooltip>
              ))}
            </Group>

            <Tooltip label={t('users.email')}>
              <ActionIcon
                size="sm"
                color="gray"
                component="a"
                variant="subtle"
                href={`mailto:${user.email}`}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <IconMail />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Stack>
      </Paper>
    </Link>
  );
}
