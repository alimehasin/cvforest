import { Anchor, Button, Container, Divider, Group } from '@mantine/core';
import { IconLogin } from '@tabler/icons-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/components/link/link';
import cls from './styles.module.css';

export async function Header() {
  const t = await getTranslations();

  return (
    <Container size="lg" strategy="grid" className={cls.header}>
      <Group p="sm" justify="space-between">
        <Anchor fz="h2" fw={600} href="/">
          FindCV
        </Anchor>

        <Group>
          <Group gap="xs">
            <Button variant="subtle">{t('header.plans')}</Button>
            <Button variant="subtle">{t('header.courses')}</Button>
          </Group>

          <Divider orientation="vertical" />

          <Button
            href="/join"
            variant="light"
            component={Link}
            leftSection={<IconLogin size={18} />}
          >
            {t('header.joinUs')}
          </Button>
        </Group>
      </Group>
    </Container>
  );
}
