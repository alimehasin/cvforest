import { Paper, Title } from '@mantine/core';
import type { JoinRequest } from '@/features/join-requests/types';

interface JoinRequestsRowExpansionInfoItemProps {
  joinRequest: JoinRequest;
}

export function JoinRequestsRowExpansion({
  joinRequest,
}: JoinRequestsRowExpansionInfoItemProps) {
  return (
    <Paper withBorder p="sm">
      <Title order={3}>{joinRequest.name}</Title>
    </Paper>
  );
}
