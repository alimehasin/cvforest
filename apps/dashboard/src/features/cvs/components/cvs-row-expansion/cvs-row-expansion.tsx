import {
  Avatar,
  Badge,
  Button,
  Divider,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import {
  IconAt,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBuilding,
  IconCheck,
  IconCircleCheck,
  IconClock,
  IconCurrencyDollar,
  IconFileCv,
  IconMapPin,
  IconPhone,
  IconTrophy,
  IconWorld,
  IconX,
  type TablerIcon,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { BooleanBadge } from '@/components/boolean-badge';
import { PhoneNumber } from '@/components/phone-number';
import type { Cv } from '@/features/cvs/types';
import { constructFileUrl } from '@/utils/helpers';
import {
  translateAvailabilityType,
  translateCurrency,
  translateWorkLocationType,
} from '@/utils/translation-maps';
import { useCvApprove } from '../../hooks/use-cv-approve';
import { useCvReject } from '../../hooks/use-cv-reject';
import { CvStatusBadge } from '../cv-status-badge';

interface CvsRowExpansionProps {
  cv: Cv;
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

export function CvsRowExpansion({ cv }: CvsRowExpansionProps) {
  const t = useTranslations();
  const rejectMut = useCvReject();
  const approveMut = useCvApprove();
  const user = cv.user;

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
                src={constructFileUrl(user.avatar?.key)}
              />
              <Stack gap={4}>
                <Title order={2}>{user.name}</Title>
                {cv.jobTitle && (
                  <Text c="dimmed" fz={14}>
                    {cv.jobTitle}
                  </Text>
                )}

                <Group gap="xs">
                  {cv.availableForHire && (
                    <Badge color="green" variant="light" size="sm">
                      {t('cvs.availableForHire')}
                    </Badge>
                  )}

                  <CvStatusBadge status={cv.status} />
                </Group>
              </Stack>
            </Group>

            <Stack>
              <InfoItem
                icon={IconTrophy}
                label={t('cvs.experience')}
                value={
                  <Text>
                    {cv.experienceInYears ? (
                      t('cvs.years', {
                        number: cv.experienceInYears,
                      })
                    ) : (
                      <Text c="dimmed">-</Text>
                    )}
                  </Text>
                }
              />

              <InfoItem
                icon={IconCurrencyDollar}
                label={t('cvs.expectedSalary')}
                value={
                  <Text>
                    {cv.expectedSalaryMin?.toLocaleString()}{' '}
                    {cv.expectedSalaryMin && cv.expectedSalaryMax && '-'}{' '}
                    {cv.expectedSalaryMax?.toLocaleString()}{' '}
                    {cv.expectedSalaryCurrency &&
                      translateCurrency(t, cv.expectedSalaryCurrency)}
                  </Text>
                }
              />

              <InfoItem
                icon={IconClock}
                label={t('cvs.availabilityType')}
                value={
                  <Text>
                    {cv.availabilityTypes?.length
                      ? cv.availabilityTypes
                          .map((a) => translateAvailabilityType(t, a))
                          .join(', ')
                      : '-'}
                  </Text>
                }
              />

              <InfoItem
                icon={IconBuilding}
                label={t('cvs.workLocationType')}
                value={
                  <Text>
                    {cv.workLocationTypes?.length
                      ? cv.workLocationTypes
                          .map((w) => translateWorkLocationType(t, w))
                          .join(', ')
                      : '-'}
                  </Text>
                }
              />

              <InfoItem
                icon={IconCircleCheck}
                label={t('cvs.availableForHire')}
                value={
                  cv.availableForHire !== null ? (
                    <BooleanBadge
                      value={cv.availableForHire}
                      label={{
                        true: t('cvs.availableForHire'),
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
          {cv.bio && (
            <Paper component={Stack} gap={4}>
              <Title c="gray.8" order={4}>
                {t('cvs.bio')}
              </Title>

              <Text fz={14}>{cv.bio}</Text>
            </Paper>
          )}
        </Stack>

        <Stack gap="md">
          {/* Contact Information Section */}
          <Paper component={Stack} gap={4}>
            <Title c="gray.8" order={4}>
              {t('cvs.contactInformation')}
            </Title>

            <Stack>
              <InfoItem
                icon={IconAt}
                label={t('cvs.email')}
                value={
                  <Group gap="xs">
                    <Text>{user.email}</Text>
                    <BooleanBadge
                      value={user.emailVerified ?? false}
                      label={{
                        true: t('cvs.emailVerified'),
                        false: t('cvs.emailNotVerified'),
                      }}
                    />
                  </Group>
                }
              />

              <InfoItem
                icon={IconPhone}
                label={t('cvs.phone')}
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
                          true: t('cvs.phoneVerified'),
                          false: t('cvs.phoneNotVerified'),
                        }}
                      />
                    ) : null}
                  </Group>
                }
              />

              <InfoItem
                icon={IconMapPin}
                label={t('cvs.location')}
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
              {t('cvs.skills')}
            </Title>
            <Group gap={4}>
              {cv.userSkills.map((userSkill) => (
                <Badge key={userSkill.id} variant="light" size="sm">
                  {userSkill.skill.name}
                </Badge>
              ))}
            </Group>
          </Paper>

          {/* Social Links Section */}
          <Paper component={Stack} gap={4}>
            <Title c="gray.8" order={4}>
              {t('cvs.socialLinks')}
            </Title>

            <Group gap="sm">
              <Button
                component="a"
                target="_blank"
                variant="light"
                disabled={!cv.file?.key}
                rel="noopener noreferrer"
                href={constructFileUrl(cv.file?.key)}
                leftSection={<IconFileCv size={18} />}
              >
                {t('cvs.showCv')}
              </Button>

              <Button
                component="a"
                target="_blank"
                variant="light"
                disabled={!cv.githubUrl}
                rel="noopener noreferrer"
                href={cv.githubUrl ?? undefined}
                leftSection={<IconBrandGithub size={18} />}
              >
                {t('cvs.github')}
              </Button>

              <Button
                component="a"
                target="_blank"
                variant="light"
                rel="noopener noreferrer"
                disabled={!cv.linkedinUrl}
                href={cv.linkedinUrl ?? undefined}
                leftSection={<IconBrandLinkedin size={18} />}
              >
                {t('cvs.linkedin')}
              </Button>

              <Button
                component="a"
                target="_blank"
                variant="light"
                rel="noopener noreferrer"
                disabled={!cv.portfolioUrl}
                href={cv.portfolioUrl ?? undefined}
                leftSection={<IconWorld size={18} />}
              >
                {t('cvs.portfolio')}
              </Button>
            </Group>
          </Paper>
        </Stack>
      </SimpleGrid>

      <Divider my="md" />

      <Group gap="xs" mt="xs">
        {cv.status !== 'Approved' && (
          <Button
            color="green"
            variant="light"
            loading={approveMut.isPending}
            leftSection={<IconCheck size={18} />}
            onClick={() => approveMut.mutate(cv.id)}
          >
            {t('cvs.approve')}
          </Button>
        )}

        {cv.status !== 'Rejected' && (
          <Button
            color="red"
            variant="light"
            loading={rejectMut.isPending}
            leftSection={<IconX size={18} />}
            onClick={() => rejectMut.mutate(cv.id)}
          >
            {t('cvs.reject')}
          </Button>
        )}
      </Group>
    </Paper>
  );
}
