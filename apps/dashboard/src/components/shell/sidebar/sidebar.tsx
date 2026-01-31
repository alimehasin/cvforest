import { Divider, Stack } from '@mantine/core';
import { Links } from './links';
import { UserButton } from './user-button';

export function Sidebar() {
  return (
    <Stack gap={0} h="100%">
      <Links />
      <Divider color="gray.2" />
      <UserButton />
    </Stack>
  );
}
