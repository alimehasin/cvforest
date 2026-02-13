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
  IconUserCheck,
  IconWorld,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/components/link';
import { constructImageUrl } from '@/utils/helpers';
import {
  translateAvailabilityType,
  translateWorkLocationType,
} from '@/utils/translation-maps';
import type { CvListItem } from '../../types';
import { AvailableForHireText } from './available-for-hire-text';
import { InfoItem } from './info-item';

export function CvCard({ cv }: { cv: CvListItem }) {
  const t = useTranslations();

  const skills = cv.userSkills.map((us) => us.skill);
  const visibleSkills = skills.slice(0, 4);
  const remainingCount = skills.length - visibleSkills.length;

  const socialLinks = [
    {
      url: cv.githubUrl,
      icon: IconBrandGithub,
      label: 'GitHub',
    },
    {
      url: cv.linkedinUrl,
      icon: IconBrandLinkedin,
      label: 'LinkedIn',
    },
    {
      url: cv.portfolioUrl,
      icon: IconWorld,
      label: 'Portfolio',
    },
  ].filter((link) => link.url);

  return (
    <Paper
      p="sm"
      withBorder
      radius="lg"
      component={Link}
      href={`/cvs/${cv.id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Stack align="flex-start" gap="md">
        <Group align="flex-start" gap="md" wrap="nowrap">
          <div>
            <div>
              <Avatar
                size={68}
                radius="50%"
                color="primary"
                name={cv.user.name}
                src={constructImageUrl(cv.user.avatar?.key)}
              />
            </div>
          </div>

          <Stack align="flex-start" gap={2}>
            <Text fw={700} size="lg" lineClamp={1}>
              {cv.user.name}
            </Text>
            {cv.jobTitle && (
              <Text size="sm" c="dimmed" lineClamp={1}>
                {cv.jobTitle}
              </Text>
            )}
          </Stack>
        </Group>

        {/* Meta chips */}
        <Stack gap={6}>
          <InfoItem
            icon={IconMapPin}
            value={cv.user.governorate?.name ?? '-'}
          />

          <InfoItem
            icon={IconClock}
            value={t('cvs.yearsExperience', { number: cv.experienceInYears })}
          />

          <InfoItem
            icon={IconBriefcase}
            value={
              cv.availabilityTypes?.length
                ? cv.availabilityTypes
                    .map((a) => translateAvailabilityType(t, a))
                    .join(', ')
                : '-'
            }
          />

          <InfoItem
            icon={IconWorld}
            value={
              cv.workLocationTypes?.length
                ? cv.workLocationTypes
                    .map((w) => translateWorkLocationType(t, w))
                    .join(', ')
                : '-'
            }
          />

          <InfoItem
            icon={IconUserCheck}
            value={
              <AvailableForHireText availableForHire={cv.availableForHire} />
            }
          />
        </Stack>

        {/* Skills */}
        <Box h={48}>
          {visibleSkills.length > 0 && (
            <Group gap={6} justify="flex-start" wrap="wrap">
              {visibleSkills.map((skill) => (
                <Badge key={skill.id} size="sm" variant="light" radius="xl">
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
        </Box>

        {/* Social links footer */}
        <Group w="100%" justify="space-between">
          <Group gap="xs">
            {socialLinks.map((link) => (
              <Tooltip key={link.label} label={link.label} withArrow>
                <ActionIcon
                  size="sm"
                  role="link"
                  tabIndex={0}
                  color="gray"
                  variant="subtle"
                  component="span"
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(
                      link.url as string,
                      '_blank',
                      'noopener,noreferrer',
                    );
                  }}
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(
                        link.url as string,
                        '_blank',
                        'noopener,noreferrer',
                      );
                    }
                  }}
                >
                  <link.icon size={16} />
                </ActionIcon>
              </Tooltip>
            ))}
          </Group>

          <Tooltip label={t('users.email')}>
            <ActionIcon
              size="sm"
              role="link"
              tabIndex={0}
              color="gray"
              component="span"
              variant="subtle"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = `mailto:${cv.user.email}`;
              }}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  window.location.href = `mailto:${cv.user.email}`;
                }
              }}
            >
              <IconMail size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Stack>
    </Paper>
  );
}
