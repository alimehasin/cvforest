import { Container, Stack, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { SignUpForm } from '../../components/sign-up-form';

export function SignUp() {
  const t = useTranslations();

  return (
    <Container size="xs" component={Stack} mt="md">
      <div>
        <Title order={1}>{t('signup.pageTitle')}</Title>
        <Text c="dimmed" size="lg">
          {t('signup.pageDescription')}
        </Text>
      </div>

      <SignUpForm />
    </Container>
  );
}
