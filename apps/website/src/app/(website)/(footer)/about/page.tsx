import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getPageContent } from '@/features/footer/utils/helpers';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t('meta.aboutTitle'),
    description: t('meta.aboutDescription'),
  };
}

export default async function AboutPage() {
  const content = await getPageContent('about');

  return <div>{content}</div>;
}
