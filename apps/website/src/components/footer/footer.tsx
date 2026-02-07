import {
  ActionIcon,
  Anchor,
  Container,
  Divider,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from '@mantine/core';
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
} from '@tabler/icons-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/components/link/link';
import cls from './styles.module.css';

const socialLinks = [
  { icon: IconBrandX, href: 'https://x.com', label: 'X' },
  { icon: IconBrandLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  {
    icon: IconBrandInstagram,
    href: 'https://instagram.com',
    label: 'Instagram',
  },
  { icon: IconBrandGithub, href: 'https://github.com', label: 'GitHub' },
];

export async function Footer() {
  const t = await getTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cls.footer}>
      <Container size="lg">
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl">
          <Stack gap="sm">
            <Anchor fz="h3" fw={600} href="/" className={cls.brand}>
              CV Forest
            </Anchor>
            <Text size="sm" c="dimmed" className={cls.brief}>
              {t('footer.brief')}
            </Text>
          </Stack>

          <Stack gap="sm">
            <Text fw={600} size="sm" className={cls.sectionTitle}>
              {t('footer.quickLinks')}
            </Text>
            <Anchor component={Link} href="/" size="sm" className={cls.link}>
              {t('footer.home')}
            </Anchor>
            <Anchor
              component={Link}
              href="/plans"
              size="sm"
              className={cls.link}
            >
              {t('footer.plans')}
            </Anchor>
            <Anchor
              component={Link}
              href="/courses"
              size="sm"
              className={cls.link}
            >
              {t('footer.courses')}
            </Anchor>
          </Stack>

          <Stack gap="sm">
            <Text fw={600} size="sm" className={cls.sectionTitle}>
              {t('footer.company')}
            </Text>
            <Anchor
              component={Link}
              href="/about"
              size="sm"
              className={cls.link}
            >
              {t('footer.aboutUs')}
            </Anchor>
            <Anchor
              component={Link}
              href="/contact"
              size="sm"
              className={cls.link}
            >
              {t('footer.contactUs')}
            </Anchor>
            <Anchor
              component={Link}
              href="/privacy"
              size="sm"
              className={cls.link}
            >
              {t('footer.privacyPolicy')}
            </Anchor>
            <Anchor
              component={Link}
              href="/terms"
              size="sm"
              className={cls.link}
            >
              {t('footer.termsOfService')}
            </Anchor>
          </Stack>

          <Stack gap="sm">
            <Text fw={600} size="sm" className={cls.sectionTitle}>
              {t('footer.followUs')}
            </Text>
            <Group gap="xs">
              {socialLinks.map((social) => (
                <ActionIcon
                  key={social.label}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="subtle"
                  size="lg"
                  aria-label={social.label}
                  className={cls.socialIcon}
                >
                  <social.icon size={20} />
                </ActionIcon>
              ))}
            </Group>
          </Stack>
        </SimpleGrid>

        <Divider my="md" />

        <Text size="xs" c="dimmed" ta="center" pb="md">
          {t('footer.copyright', { year: currentYear })}
        </Text>
      </Container>
    </footer>
  );
}
