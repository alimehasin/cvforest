import { Box, Center, Group, SimpleGrid, Stack, Title } from '@mantine/core';
import { getLocale, getTranslations } from 'next-intl/server';
import { LanguageSelector } from '@/features/accounts/components/language-selector';

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const t = await getTranslations();

  return (
    <SimpleGrid cols={{ base: 1, md: 2 }} spacing={0}>
      <Box
        w="100%"
        bg="primary.1"
        visibleFrom="md"
        h={{ base: 'auto', md: '100vh' }}
        mih={{ base: '200px', md: '100vh' }}
      >
        <Center h="100%" p="xl">
          <Title>{t('login.logo')}</Title>
        </Center>
      </Box>

      <Center
        h={{ base: '100vh', md: '100vh' }}
        p={{ base: 'md', sm: 'lg', md: 'xl' }}
      >
        <Stack w="100%" maw={{ base: '100%', sm: 400, md: 500 }} gap="md">
          <Title c="nature.7" order={1} size="h1" ta="center">
            {t('login.loginTitle')}
          </Title>

          {children}

          <Group>
            <LanguageSelector locale={locale} />
          </Group>
        </Stack>
      </Center>
    </SimpleGrid>
  );
}
