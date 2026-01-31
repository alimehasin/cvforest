import { useQuery } from '@tanstack/react-query';
import { useDataTable } from '@/hooks/use-data-table';
import { useKy } from '@/hooks/use-ky';
import type { SkillsList, SkillsListQuery } from '../types';

interface SkillsListProps {
  initialData: SkillsList;
  filters: Partial<SkillsListQuery>;
}

export function useSkillsList({ initialData, filters }: SkillsListProps) {
  const ky = useKy();
  const { getTableProps, sorting, pagination } = useDataTable();

  const skillsListQuery: SkillsListQuery = {
    ...pagination,
    ...sorting,
    ...filters,
  };

  const allSkillsListQuery: Partial<SkillsListQuery> = {
    ...sorting,
    ...filters,
  };

  const skills = useQuery({
    initialData,
    queryKey: ['/skills', skillsListQuery],
    queryFn: () => {
      return ky
        .get('skills', { searchParams: skillsListQuery })
        .json<SkillsList>();
    },
  });

  const allSkills = useQuery({
    queryKey: ['/skills', allSkillsListQuery],
    queryFn: () => {
      return ky
        .get('skills', { searchParams: allSkillsListQuery })
        .json<SkillsList>();
    },
  });

  return { getTableProps, skills, allSkills };
}
