import { Box, Container, Stack, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { SignInForm } from '../../components/sign-in-form';

export function SignIn() {
  const t = useTranslations();

  return (
    <Container size="xs" pt={200}>
      <Stack gap="lg">
        <Box ta="center">
          <Title order={1}>{t('signIn.pageTitle')}</Title>
          <Text c="dimmed" size="lg">
            {t('signIn.pageDescription')}
          </Text>
        </Box>

        <SignInForm />
      </Stack>
    </Container>
  );
}
