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
  IconBrandLinkedin,
  IconBrandX,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/components/link/link';
import { FooterLanguageSwitcher } from './footer-language-switcher';
import cls from './styles.module.css';

export async function Footer() {
  const t = await getTranslations();
  const currentYear = dayjs().year();

  const socialLinks = [
    { icon: IconBrandX, href: 'https://x.com', label: 'X' },
    {
      icon: IconBrandGithub,
      href: 'https://github.com/alimehasin/cvforest.com',
      label: 'GitHub',
    },
    {
      icon: IconBrandLinkedin,
      href: 'https://www.linkedin.com/showcase/cvforest',
      label: 'LinkedIn',
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

          <SimpleGrid cols={{ base: 2, md: 4 }} spacing="xl">
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

            <Stack gap="sm">
              <Text fw={600} size="sm" className={cls.sectionTitle}>
                {t('footer.language')}
              </Text>
              <FooterLanguageSwitcher />
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
