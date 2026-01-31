import {
  Avatar,
  Badge,
  Button,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import {
  IconAB,
  IconAt,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBuilding,
  IconCircleCheck,
  IconClock,
  IconCurrencyDollar,
  IconMapPin,
  IconPhone,
  IconTrophy,
  IconWorld,
  type TablerIcon,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { BooleanBadge } from '@/components/boolean-badge';
import { PhoneNumber } from '@/components/phone-number';
import type { User } from '@/features/users/types';
import { constructImageUrl } from '@/utils/helpers';
import {
  translateAvailabilityType,
  translateCurrency,
  translateGender,
  translateWorkLocationType,
} from '@/utils/translation-maps';

interface UsersRowExpansionProps {
  user: User;
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: TablerIcon;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <Group>
      <ThemeIcon variant="light">
        <Icon size={18} />
      </ThemeIcon>

      <div>
        <Text fz={14} c="gray">
          {label}
        </Text>

        {value}
      </div>
    </Group>
  );
}

export function UsersRowExpansion({ user }: UsersRowExpansionProps) {
  const t = useTranslations();

  return (
    <Paper withBorder p="sm">
      <SimpleGrid cols={{ md: 2 }}>
        <Stack gap="md">
          {/* Professional Information Section */}
          <Paper component={Stack} gap={4}>
            {/* Profile Header */}
            <Group wrap="nowrap" mb="md" align="flex-start">
              <Avatar
                size={80}
                radius="md"
                name={user.name}
                src={constructImageUrl(user.avatar?.key)}
              />
              <Stack gap={4}>
                <Title order={2}>{user.name}</Title>
                {user.jobTitle && (
                  <Text c="dimmed" fz={14}>
                    {user.jobTitle}
                  </Text>
                )}
                {user.availableForHire && (
                  <Badge color="green" variant="light" size="sm">
                    {t('users.availableForHire')}
                  </Badge>
                )}
              </Stack>
            </Group>

            <Stack>
              <InfoItem
                icon={IconTrophy}
                label={t('users.experience')}
                value={
                  <Text>
                    {user.experienceInYears ? (
                      t('users.years', {
                        number: user.experienceInYears,
                      })
                    ) : (
                      <Text c="dimmed">-</Text>
                    )}
                  </Text>
                }
              />

              <InfoItem
                icon={IconCurrencyDollar}
                label={t('users.expectedSalary')}
                value={
                  <Text>
                    {user.expectedSalaryMin?.toLocaleString()}{' '}
                    {user.expectedSalaryMin && user.expectedSalaryMax && '-'}{' '}
                    {user.expectedSalaryMax?.toLocaleString()}{' '}
                    {user.expectedSalaryCurrency &&
                      translateCurrency(t, user.expectedSalaryCurrency)}
                  </Text>
                }
              />

              <InfoItem
                icon={IconClock}
                label={t('users.availabilityType')}
                value={
                  <Text>
                    {user.availabilityType
                      ? translateAvailabilityType(t, user.availabilityType)
                      : '-'}
                  </Text>
                }
              />

              <InfoItem
                icon={IconBuilding}
                label={t('users.workLocationType')}
                value={
                  <Text>
                    {user.workLocationType
                      ? translateWorkLocationType(t, user.workLocationType)
                      : '-'}
                  </Text>
                }
              />

              <InfoItem
                icon={IconCircleCheck}
                label={t('users.availableForHire')}
                value={
                  user.availableForHire !== null ? (
                    <BooleanBadge
                      value={user.availableForHire}
                      label={{
                        true: t('users.availableForHire'),
                        false: t('_.no'),
                      }}
                    />
                  ) : (
                    <Text c="dimmed">-</Text>
                  )
                }
              />
            </Stack>
          </Paper>

          {/* Bio Section */}
          <Paper component={Stack} gap={4}>
            <Title c="gray.8" order={4}>
              {t('users.bio')}
            </Title>

            <Text fz={14}>{user.bio}</Text>
          </Paper>
        </Stack>

        <Stack gap="md">
          {/* Contact Information Section */}
          <Paper component={Stack} gap={4}>
            <Title c="gray.8" order={4}>
              {t('users.contactInformation')}
            </Title>

            <Stack>
              <InfoItem
                icon={IconAt}
                label={t('users.email')}
                value={
                  <Group gap="xs">
                    <Text>{user.email}</Text>
                    <BooleanBadge
                      value={user.emailVerified ?? false}
                      label={{
                        true: t('users.emailVerified'),
                        false: t('users.emailNotVerified'),
                      }}
                    />
                  </Group>
                }
              />

              <InfoItem
                icon={IconPhone}
                label={t('users.phone')}
                value={
                  <Group gap="xs">
                    {user.phoneNumber ? (
                      <PhoneNumber phone={user.phoneNumber} />
                    ) : (
                      <Text c="dimmed">-</Text>
                    )}

                    {user.phoneNumber ? (
                      <BooleanBadge
                        value={user.phoneNumberVerified ?? false}
                        label={{
                          true: t('users.phoneVerified'),
                          false: t('users.phoneNotVerified'),
                        }}
                      />
                    ) : null}
                  </Group>
                }
              />

              <InfoItem
                icon={IconAB}
                label={t('users.gender')}
                value={
                  user.gender ? (
                    <Text>{translateGender(t, user.gender)}</Text>
                  ) : (
                    <Text c="dimmed">-</Text>
                  )
                }
              />

              <InfoItem
                icon={IconMapPin}
                label={t('users.location')}
                value={
                  user.governorate ? (
                    <Text>{user.governorate.name}</Text>
                  ) : (
                    <Text c="dimmed">-</Text>
                  )
                }
              />
            </Stack>
          </Paper>

          {/* Skills Section */}
          <Paper component={Stack} gap={4}>
            <Title c="gray.8" order={4}>
              {t('users.skills')}
            </Title>
            <Group gap={4}>
              {user.userSkills.map((userSkill) => (
                <Badge key={userSkill.id} variant="light" size="sm">
                  {userSkill.skill.name}
                </Badge>
              ))}
            </Group>
          </Paper>

          {/* Social Links Section */}
          <Paper component={Stack} gap={4}>
            <Title c="gray.8" order={4}>
              {t('users.socialLinks')}
            </Title>

            <Group gap="sm">
              <Button
                component="a"
                target="_blank"
                variant="light"
                disabled={!user.githubUrl}
                rel="noopener noreferrer"
                href={user.githubUrl ?? ''}
                leftSection={<IconBrandGithub size={18} />}
              >
                {t('users.github')}
              </Button>

              <Button
                component="a"
                target="_blank"
                variant="light"
                rel="noopener noreferrer"
                disabled={!user.linkedinUrl}
                href={user.linkedinUrl ?? ''}
                leftSection={<IconBrandLinkedin size={18} />}
              >
                {t('users.linkedin')}
              </Button>

              <Button
                component="a"
                target="_blank"
                variant="light"
                rel="noopener noreferrer"
                disabled={!user.portfolioUrl}
                href={user.portfolioUrl ?? ''}
                leftSection={<IconWorld size={18} />}
              >
                {t('users.portfolio')}
              </Button>
            </Group>
          </Paper>
        </Stack>
      </SimpleGrid>
    </Paper>
  );
}
