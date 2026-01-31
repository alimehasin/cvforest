import {
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
  IconBriefcase,
  IconBuilding,
  IconCircleCheck,
  IconClock,
  IconCurrencyDollar,
  IconFileText,
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
    <SimpleGrid cols={{ md: 2 }}>
      <Stack gap="md">
        {/* Professional Information Section */}
        {(user.jobTitle ||
          user.experienceInYears ||
          user.expectedSalaryMin ||
          user.expectedSalaryMax ||
          user.availabilityType ||
          user.workLocationType ||
          user.availableForHire !== null) && (
          <Paper withBorder p="md" component={Stack}>
            <Title order={3}>{t('users.professionalInformation')}</Title>

            {user.jobTitle && (
              <InfoItem
                icon={IconBriefcase}
                label={t('users.jobTitle')}
                value={<Text>{user.jobTitle}</Text>}
              />
            )}

            {user.experienceInYears !== null && (
              <InfoItem
                icon={IconTrophy}
                label={t('users.experience')}
                value={
                  <Text>
                    {t('users.years', {
                      number: user.experienceInYears,
                    })}
                  </Text>
                }
              />
            )}

            {(user.expectedSalaryMin || user.expectedSalaryMax) && (
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
            )}

            {user.availabilityType && (
              <InfoItem
                icon={IconClock}
                label={t('users.availabilityType')}
                value={
                  <Text>
                    {translateAvailabilityType(t, user.availabilityType)}
                  </Text>
                }
              />
            )}

            {user.workLocationType && (
              <InfoItem
                icon={IconBuilding}
                label={t('users.workLocationType')}
                value={
                  <Text>
                    {translateWorkLocationType(t, user.workLocationType)}
                  </Text>
                }
              />
            )}

            {user.availableForHire !== null && (
              <InfoItem
                icon={IconCircleCheck}
                label={t('users.availableForHire')}
                value={<BooleanBadge value={user.availableForHire} />}
              />
            )}
          </Paper>
        )}

        {/* Bio Section */}
        {user.bio && (
          <Paper withBorder p="md" component={Stack}>
            <Group>
              <ThemeIcon variant="light">
                <IconFileText size={18} />
              </ThemeIcon>
              <Title order={3}>{t('users.bio')}</Title>
            </Group>
            <Text fz={14}>{user.bio}</Text>
          </Paper>
        )}
      </Stack>

      <Stack gap="md">
        {/* Contact Information Section */}
        <Paper withBorder p="md" component={Stack}>
          <Title order={3}>{t('users.contactInformation')}</Title>

          {user.email && (
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
                      false: t('_.no'),
                    }}
                  />
                </Group>
              }
            />
          )}

          <InfoItem
            icon={IconPhone}
            label={t('users.phone')}
            value={
              <Group gap="xs">
                <PhoneNumber phone={user.phoneNumber ?? ''} />

                {user.phoneNumberVerified !== null && (
                  <BooleanBadge
                    value={user.phoneNumberVerified ?? false}
                    label={{
                      true: t('users.phoneVerified'),
                      false: t('_.no'),
                    }}
                  />
                )}
              </Group>
            }
          />

          {user.gender && (
            <InfoItem
              icon={IconAB}
              label={t('users.gender')}
              value={<Text>{translateGender(t, user.gender)}</Text>}
            />
          )}

          {user.governorate && (
            <InfoItem
              icon={IconMapPin}
              label={t('users.location')}
              value={<Text>{user.governorate.name}</Text>}
            />
          )}
        </Paper>

        {/* Skills Section */}
        {user.userSkills && user.userSkills.length > 0 && (
          <Paper withBorder p="md" component={Stack}>
            <Title order={3}>{t('users.skills')}</Title>
            <Group gap={4}>
              {user.userSkills.map((userSkill) => (
                <Badge key={userSkill.id} variant="light" size="sm">
                  {userSkill.skill.name}
                </Badge>
              ))}
            </Group>
          </Paper>
        )}

        {/* Social Links Section */}
        {(user.githubUrl || user.linkedinUrl || user.portfolioUrl) && (
          <Paper withBorder p="md" component={Stack}>
            <Title order={3}>{t('users.socialLinks')}</Title>
            <Group gap="sm">
              {user.githubUrl && (
                <Button
                  component="a"
                  href={user.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="light"
                  leftSection={<IconBrandGithub size={18} />}
                >
                  {t('users.github')}
                </Button>
              )}

              {user.linkedinUrl && (
                <Button
                  component="a"
                  href={user.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="light"
                  leftSection={<IconBrandLinkedin size={18} />}
                >
                  {t('users.linkedin')}
                </Button>
              )}

              {user.portfolioUrl && (
                <Button
                  component="a"
                  href={user.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="light"
                  leftSection={<IconWorld size={18} />}
                >
                  {t('users.portfolio')}
                </Button>
              )}
            </Group>
          </Paper>
        )}
      </Stack>
    </SimpleGrid>
  );
}
