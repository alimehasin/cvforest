'use client';

import { MultiSelect, NumberInput, Select, SimpleGrid } from '@mantine/core';
import { AvailabilityType, WorkLocationType } from '@repo/backend/prisma/enums';
import {
  IconBriefcase,
  IconBuilding,
  IconMapPin,
  IconTools,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import type { CvListQuery } from '@/features/home/types';
import { useGovernoratesQuery } from '@/features/join/hooks/use-governorates-query';
import { useSkillsQuery } from '@/features/join/hooks/use-skills-query';
import {
  translateAvailabilityType,
  translateWorkLocationType,
} from '@/utils/translation-maps';

interface BrowseFiltersProps {
  filters: Partial<CvListQuery>;
  setFilters: (update: Partial<CvListQuery>) => void;
}

export function BrowseFilters({ filters, setFilters }: BrowseFiltersProps) {
  const t = useTranslations();
  const skillsQuery = useSkillsQuery();
  const governoratesQuery = useGovernoratesQuery();

  const governorateOptions =
    governoratesQuery.data?.map((gov) => ({
      label: gov.name,
      value: gov.id,
    })) ?? [];

  const skillOptions =
    skillsQuery.data?.map((skill) => ({
      label: skill.name,
      value: skill.id,
    })) ?? [];

  const availabilityOptions = Object.values(AvailabilityType).map((value) => ({
    label: translateAvailabilityType(t, value),
    value,
  }));

  const workLocationOptions = Object.values(WorkLocationType).map((value) => ({
    label: translateWorkLocationType(t, value),
    value,
  }));

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
      <Select
        clearable
        searchable
        placeholder={t('browse.governoratePlaceholder')}
        data={governorateOptions}
        value={filters.governorateId}
        leftSection={<IconMapPin size={18} />}
        disabled={governoratesQuery.isLoading}
        onChange={(value) => setFilters({ governorateId: value ?? undefined })}
      />

      <MultiSelect
        clearable
        searchable
        data={skillOptions}
        placeholder={t('browse.skillsPlaceholder')}
        disabled={skillsQuery.isLoading}
        leftSection={<IconTools size={18} />}
        onChange={(value) => setFilters({ skillIds: value })}
        value={
          Array.isArray(filters.skillIds)
            ? filters.skillIds
            : filters.skillIds
              ? [filters.skillIds]
              : undefined
        }
      />

      <Select
        clearable
        placeholder={t('browse.availabilityPlaceholder')}
        leftSection={<IconBriefcase size={18} />}
        data={availabilityOptions}
        value={filters.availabilityType}
        onChange={(value) => {
          setFilters({
            availabilityType: (value ?? undefined) as AvailabilityType,
          });
        }}
      />

      <Select
        clearable
        placeholder={t('browse.workLocationPlaceholder')}
        leftSection={<IconBuilding size={18} />}
        data={workLocationOptions}
        value={filters.workLocationType}
        onChange={(value) => {
          setFilters({
            workLocationType: (value ?? undefined) as WorkLocationType,
          });
        }}
      />

      <NumberInput
        placeholder={t('browse.experienceMin')}
        min={0}
        value={filters.experienceMin ?? ''}
        onChange={(value) =>
          setFilters({
            experienceMin: value === '' ? undefined : Number(value),
          })
        }
      />

      <NumberInput
        placeholder={t('browse.experienceMax')}
        min={0}
        value={filters.experienceMax ?? ''}
        onChange={(value) =>
          setFilters({
            experienceMax: value === '' ? undefined : Number(value),
          })
        }
      />
    </SimpleGrid>
  );
}
