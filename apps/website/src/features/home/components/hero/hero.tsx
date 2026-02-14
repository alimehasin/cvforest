import { Button, Container, Group, Stack, Text, Title } from '@mantine/core';
import {
  IconBrandGithub,
  IconBriefcase,
  IconCode,
  IconFileDescription,
  IconShieldCheck,
  IconSparkles,
  IconUpload,
  IconUsers,
  IconWorld,
} from '@tabler/icons-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/components/link/link';
import cls from './styles.module.css';

export async function Hero() {
  const t = await getTranslations();

  const glassCards = [
    { key: 'file', icon: IconFileDescription },
    { key: 'shield', icon: IconShieldCheck },
    { key: 'code', icon: IconCode },
    { key: 'users', icon: IconUsers },
    { key: 'world', icon: IconWorld },
    { key: 'sparkles', icon: IconSparkles },
  ];

  return (
    <section className={cls.hero}>
      {/* ── Aurora gradient orbs ── */}
      <div className={`${cls.orb} ${cls.orbPrimary}`} />
      <div className={`${cls.orb} ${cls.orbSecondary}`} />

      {/* ── Floating glass cards ── */}
      {glassCards.map(({ key, icon: Icon }, i) => (
        <div key={key} className={`${cls.glassCard} ${cls[`glass${i + 1}`]}`}>
          <Icon size={24} stroke={1.5} />
        </div>
      ))}

      {/* ── Content ── */}
      <Container size="md" className={cls.content}>
        <Stack align="center" gap="xl" py={100}>
          <Stack align="center" gap="md" maw={760}>
            <Button
              component={Link}
              href="https://github.com/alimehasin/cvforest"
              variant="subtle"
              size="sm"
              color="dark"
              leftSection={<IconBrandGithub size={18} />}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('hero.starOnGitHub')}
            </Button>

            <Title order={1} ta="center" className={cls.title}>
              {t('hero.title')}
            </Title>

            <Text
              size="lg"
              c="dimmed"
              ta="center"
              maw={580}
              className={cls.description}
            >
              {t('hero.description')}
            </Text>
          </Stack>

          <Group gap="md" wrap="wrap" justify="center" className={cls.buttons}>
            <Button
              size="lg"
              href="/upload-cv"
              component={Link}
              leftSection={<IconUpload size={20} />}
              className={cls.ctaPrimary}
            >
              {t('hero.ctaDeveloper')}
            </Button>

            <Button
              size="lg"
              href="/cvs"
              variant="outline"
              component={Link}
              leftSection={<IconBriefcase size={20} />}
              className={cls.ctaSecondary}
            >
              {t('hero.ctaRecruiter')}
            </Button>
          </Group>

          <Group gap="sm" wrap="wrap" justify="center" className={cls.features}>
            <span className={cls.featurePill}>
              <IconShieldCheck size={16} stroke={1.5} />
              {t('hero.feature1')}
            </span>
            <span className={cls.featurePill}>
              <IconFileDescription size={16} stroke={1.5} />
              {t('hero.feature2')}
            </span>
            <span className={cls.featurePill}>
              <IconSparkles size={16} stroke={1.5} />
              {t('hero.feature3')}
            </span>
          </Group>
        </Stack>
      </Container>
    </section>
  );
}
