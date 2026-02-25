import { Container, Stack } from '@mantine/core';
import { CvsSection } from '@/features/home/components/cvs-section';
import { Hero } from '@/features/home/components/hero/hero';

interface HomeProps {
  hasCv: boolean;
}

export function Home({ hasCv }: HomeProps) {
  return (
    <Stack>
      <Hero hasCv={hasCv} />
      <Container size="lg">
        <CvsSection />
      </Container>
    </Stack>
  );
}
