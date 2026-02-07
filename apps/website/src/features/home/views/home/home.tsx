import { Stack } from '@mantine/core';
import { CvsSection } from '../../components/cvs-section';
import { Hero } from '../../components/hero';

export function Home() {
  return (
    <Stack>
      <Hero />
      <CvsSection />
    </Stack>
  );
}
