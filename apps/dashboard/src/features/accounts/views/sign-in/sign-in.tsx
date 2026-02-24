'use client';

import {
  Box,
  Button,
  Center,
  FocusTrap,
  Group,
  Menu,
  Paper,
  PasswordInput,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import {
  IconKey,
  IconLanguage,
  IconLogin,
  IconUser,
} from '@tabler/icons-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useSignInForm } from '@/features/accounts/hooks/use-sign-in-form';
import { useSignInMut } from '@/features/accounts/hooks/use-sign-in-mut';
import { useSetLocale } from '@/hooks/use-set-locale';

export function SignIn({ locale }: { locale: string }) {
  const t = useTranslations();
  const form = useSignInForm();
  const signInMut = useSignInMut();
  const setLocaleMut = useSetLocale();

  const handleSubmit = form.onSubmit(({ email, password }) => {
    signInMut.mutate({ email, password });
  });

  return (
    <SimpleGrid cols={{ base: 1, md: 2 }} spacing={0}>
      <Box
        w="100%"
        visibleFrom="md"
        h={{ base: 'auto', md: '100vh' }}
        mih={{ base: '200px', md: '100vh' }}
        bg="var(--mantine-primary-color-1)"
      >
        <Center h="100%" p="xl">
          <Image
            src="/logo-1024.png"
            alt="CV Forest"
            width={320}
            height={320}
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: '100vw',
            }}
          />
        </Center>
      </Box>

      <Center
        h={{ base: '100vh', md: '100vh' }}
        p={{ base: 'md', sm: 'lg', md: 'xl' }}
      >
        <Stack w="100%" maw={{ base: '100%', sm: 400, md: 500 }} gap="md">
          <Title c="nature.7" order={1} size="h1" ta="center">
            {t('signIn.signInTitle')}
          </Title>

          <Paper withBorder shadow="sm" p={{ base: 'md', sm: 'lg' }}>
            <FocusTrap>
              <form onSubmit={handleSubmit}>
                <Stack gap="md">
                  <TextInput
                    required
                    autoCapitalize="off"
                    label={t('signIn.email')}
                    leftSection={<IconUser size={18} />}
                    {...form.getInputProps('email')}
                  />

                  <PasswordInput
                    required
                    label={t('signIn.password')}
                    leftSection={<IconKey size={18} />}
                    {...form.getInputProps('password')}
                  />

                  <Button
                    mt="sm"
                    fullWidth
                    type="submit"
                    loading={signInMut.isPending}
                    leftSection={<IconLogin size={18} />}
                  >
                    {t('signIn.signIn')}
                  </Button>
                </Stack>
              </form>
            </FocusTrap>
          </Paper>

          {/* Language selector */}
          <Group>
            <Menu>
              <Menu.Target>
                <Button
                  color="gray"
                  variant="subtle"
                  size="compact-sm"
                  leftSection={<IconLanguage size={18} />}
                >
                  {locale === 'ar' ? 'العربية' : 'English'}
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item onClick={() => setLocaleMut.mutate('ar')}>
                  العربية
                </Menu.Item>
                <Menu.Item onClick={() => setLocaleMut.mutate('en')}>
                  English
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Stack>
      </Center>
    </SimpleGrid>
  );
}
