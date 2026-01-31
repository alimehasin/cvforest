import type { SkillsList } from '@/features/skills/types';
import { Skills } from '@/features/skills/views/skills';
import { getKy } from '@/server/actions';

export default async function SkillsPage() {
  const ky = await getKy();

  const initialData = await ky.get('skills').json<SkillsList>();

  return <Skills initialData={initialData} />;
}
