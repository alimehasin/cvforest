import { getTranslations } from 'next-intl/server';
import { Input } from '@/components/ui/input';

export default async function Page() {
  const t = await getTranslations();

  return (
    <div>
      <Input placeholder={t('_.save')} />
    </div>
  );
}
