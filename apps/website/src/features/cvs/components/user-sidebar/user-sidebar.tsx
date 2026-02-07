import { Paper, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import {
  IconAt,
  IconBriefcase,
  IconCalendar,
  IconClock,
  IconCoin,
  IconMapPin,
  IconPhone,
  IconWorld,
  type TablerIcon,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { PhoneNumber } from '@/components/phone-number';
import { formatDate } from '@/utils/helpers';
import {
  translateAvailabilityType,
  translateCurrency,
  translateWorkLocationType,
} from '@/utils/translation-maps';
import type { UserDetailResponse } from '../../types';
import cls from './styles.module.css';

interface UserSidebarProps {
  user: UserDetailResponse;
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: TablerIcon;
  label: string;
  value: React.ReactNode;
}) {
  if (!value) {
    return null;
  }

  return (
    <div className={cls.infoRow}>
      <ThemeIcon variant="light" size="md" radius="md">
        <Icon size={16} />
      </ThemeIcon>
      <div>
        <Text fz={11} c="dimmed" tt="uppercase" fw={600} lh={1}>
          {label}
        </Text>
        <Text fz="sm" mt={2}>
          {value}
        </Text>
      </div>
    </div>
  );
}

export function UserSidebar({ user }: UserSidebarProps) {
  const t = useTranslations();

  const salaryRange =
    user.expectedSalaryMin != null && user.expectedSalaryMax != null
      ? `${Number(user.expectedSalaryMin).toLocaleString()} - ${Number(user.expectedSalaryMax).toLocaleString()}`
      : user.expectedSalaryMin != null
        ? `${Number(user.expectedSalaryMin).toLocaleString()}+`
        : null;

  const salaryDisplay =
    salaryRange && user.expectedSalaryCurrency
      ? `${salaryRange} ${translateCurrency(t, user.expectedSalaryCurrency)}`
      : salaryRange;

  return (
    <Stack gap="md">
      {/* Contact card */}
      <Paper withBorder p="lg" radius="lg" className={cls.sidebarCard}>
        <Stack gap="xs">
          <Title order={5}>{t('userDetails.contactInfo')}</Title>

          <InfoRow
            icon={IconAt}
            label={t('profiles.email')}
            value={
              <Text
                component="a"
                href={`mailto:${user.user.email}`}
                c="primary"
                fz="sm"
                td="none"
                style={{ cursor: 'pointer' }}
              >
                {user.user.email}
              </Text>
            }
          />

          {user.user.phoneNumber && (
            <InfoRow
              icon={IconPhone}
              label={t('profiles.phone')}
              value={<PhoneNumber phone={user.user.phoneNumber} />}
            />
          )}

          <InfoRow
            icon={IconCalendar}
            label={t('profiles.memberSince')}
            value={formatDate(user.createdAt as string)}
          />
        </Stack>
      </Paper>

      {/* Professional details card */}
      <Paper withBorder p="lg" radius="lg" className={cls.sidebarCard}>
        <Stack gap="xs">
          <Title order={5}>{t('userDetails.professionalDetails')}</Title>

          {user.user.governorate && (
            <InfoRow
              icon={IconMapPin}
              label={t('join.governorate')}
              value={user.user.governorate.name}
            />
          )}

          {user.experienceInYears != null && (
            <InfoRow
              icon={IconClock}
              label={t('join.experienceInYears')}
              value={t('cvs.yearsExperience', {
                number: user.experienceInYears,
              })}
            />
          )}

          {user.availabilityType && (
            <InfoRow
              icon={IconBriefcase}
              label={t('join.availabilityType')}
              value={translateAvailabilityType(t, user.availabilityType)}
            />
          )}

          {user.workLocationType && (
            <InfoRow
              icon={IconWorld}
              label={t('join.workLocationType')}
              value={translateWorkLocationType(t, user.workLocationType)}
            />
          )}

          {salaryDisplay && (
            <InfoRow
              icon={IconCoin}
              label={t('userDetails.expectedSalary')}
              value={
                <Text fz="sm" fw={600} c="primary">
                  {salaryDisplay}
                </Text>
              }
            />
          )}
        </Stack>
      </Paper>
    </Stack>
  );
}
