import { Container, Stack, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/header';
import { JoinForm } from '../../components/join-form';

export function Join() {
  const t = useTranslations();

  return (
    <Container size="lg">
      <Header />

      <Stack gap="lg">
        <div>
          <Title order={1}>{t('join.pageTitle')}</Title>
          <Text c="dimmed" size="lg">
            {t('join.pageDescription')}
          </Text>
        </div>

        <JoinForm />
      </Stack>
    </Container>
  );
}
