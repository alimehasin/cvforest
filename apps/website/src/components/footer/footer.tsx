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
import dayjs from 'dayjs';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/components/link/link';
import cls from './styles.module.css';

export async function Footer() {
  const t = await getTranslations();
  const currentYear = dayjs().year();

  const socialLinks = [
    {
      icon: IconBrandGithub,
      href: 'https://github.com/alimehasin/cvforest',
      label: 'GitHub',
    },
    {
      icon: IconBrandLinkedin,
      href: 'https://www.linkedin.com/showcase/cvforest',
      label: 'LinkedIn',
    },
    {
      icon: IconBrandX,
      href: 'https://x.com/cvforest_social',
      label: 'X',
    },
    {
      icon: IconBrandInstagram,
      href: 'https://www.instagram.com/cvforest_social',
      label: 'Instagram',
    },
  ];

  const quickLinks = [
    { href: '/', label: t('footer.home') },
    { href: '/courses', label: t('footer.courses') },
  ];

  const companyLinks = [
    { href: '/about', label: t('footer.aboutUs') },
    { href: '/privacy', label: t('footer.privacyPolicy') },
    { href: '/terms', label: t('footer.termsOfService') },
  ];

  return (
    <footer className={cls.footer}>
      <Container size="lg">
        <div className={cls.content}>
          <Stack gap="sm">
            <Anchor fz="h3" fw={600} href="/" className={cls.brand}>
              CV Forest
            </Anchor>
            <Text size="sm" c="dimmed" className={cls.brief}>
              {t('footer.brief')}
            </Text>
          </Stack>

          <SimpleGrid cols={{ base: 2, md: 3 }} spacing="xl">
            <Stack gap="sm">
              <Text fw={600} size="sm" className={cls.sectionTitle}>
                {t('footer.quickLinks')}
              </Text>

              <Stack gap="xs">
                {quickLinks.map((link) => (
                  <Anchor
                    key={link.href}
                    component={Link}
                    href={link.href}
                    size="sm"
                    className={cls.link}
                  >
                    {link.label}
                  </Anchor>
                ))}
              </Stack>
            </Stack>

            <Stack gap="sm">
              <Text fw={600} size="sm" className={cls.sectionTitle}>
                {t('footer.company')}
              </Text>

              <Stack gap="xs">
                {companyLinks.map((link) => (
                  <Anchor
                    key={link.href}
                    component={Link}
                    href={link.href}
                    size="sm"
                    className={cls.link}
                  >
                    {link.label}
                  </Anchor>
                ))}
              </Stack>
            </Stack>

            <Stack gap="sm">
              <Text fw={600} size="sm" className={cls.sectionTitle}>
                {t('footer.followUs')}
              </Text>
              <Group gap={4}>
                {socialLinks.map((social) => (
                  <ActionIcon
                    component="a"
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="subtle"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </ActionIcon>
                ))}
              </Group>
            </Stack>
          </SimpleGrid>
        </div>

        <Divider my="md" />

        <Text size="xs" c="dimmed" ta="center" pb="md">
          {t('footer.copyright', { year: currentYear })}
        </Text>
      </Container>
    </footer>
  );
}
