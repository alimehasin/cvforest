'use client';

import {
  Button,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/components/link/link';
import { useUsersList } from '../../hooks/use-users-query';
import { UserCard } from '../user-card';
import cls from './styles.module.css';

export function CvsSection() {
  const t = useTranslations();
  const users = useUsersList({ filters: {} });

  return (
    <section className={cls.section}>
      <Stack gap="xl" py={60}>
        <Stack align="center" gap="xs" className={cls.header}>
          <Title order={2} ta="center" className={cls.title}>
            {t('cvs.title')}
          </Title>
          <Text size="lg" c="dimmed" ta="center" maw={560}>
            {t('cvs.subtitle')}
          </Text>
        </Stack>

        <SimpleGrid
          cols={{ base: 1, xs: 2, md: 3, lg: 4 }}
          spacing="lg"
          className={cls.grid}
        >
          {users.isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <Skeleton
                  key={`skeleton-${i.toString()}`}
                  height={280}
                  radius="lg"
                />
              ))
            : users.data?.data.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
        </SimpleGrid>

        <Stack align="center">
          <Button
            size="md"
            variant="light"
            href="/cvs"
            component={Link}
            rightSection={<IconArrowRight size={18} />}
          >
            {t('cvs.browseAll')}
          </Button>
        </Stack>
      </Stack>
    </section>
  );
}
