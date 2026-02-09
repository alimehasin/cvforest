import { Center, Title } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

export default async function CoursesPage() {
  const t = await getTranslations();

  return (
    <Center py={164}>
      <Title fz={96}>{t('courses.comingSoon')}</Title>
    </Center>
  );
}
