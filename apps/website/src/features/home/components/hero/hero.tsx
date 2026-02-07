import { Button, Container, Group, Stack, Text, Title } from '@mantine/core';
import { IconBriefcase, IconUpload } from '@tabler/icons-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/components/link/link';
import cls from './styles.module.css';

export async function Hero() {
  const t = await getTranslations();

  return (
    <section className={cls.hero}>
      <Container size="lg" strategy="grid">
        <Stack align="center" gap="xl" py={80}>
          <Stack align="center" gap="md" maw={720}>
            <Text
              className={cls.badge}
              size="sm"
              fw={500}
              tt="uppercase"
              c="dimmed"
            >
              {t('hero.subtitle')}
            </Text>

            <Title order={1} ta="center" className={cls.title}>
              {t('hero.title')}
            </Title>

            <Text
              size="lg"
              c="dimmed"
              ta="center"
              maw={560}
              className={cls.description}
            >
              {t('hero.description')}
            </Text>
          </Stack>

          <Group gap="md" wrap="wrap" justify="center" className={cls.buttons}>
            <Button
              size="lg"
              href="/join"
              component={Link}
              leftSection={<IconUpload size={20} />}
            >
              {t('hero.ctaDeveloper')}
            </Button>

            <Button
              size="lg"
              href="/browse"
              variant="light"
              component={Link}
              leftSection={<IconBriefcase size={20} />}
            >
              {t('hero.ctaRecruiter')}
            </Button>
          </Group>
        </Stack>
      </Container>
    </section>
  );
}
