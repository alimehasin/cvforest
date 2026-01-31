import { Box, Divider, Paper, Stack, Text, Title } from '@mantine/core';

interface FormSectionProps {
  label: string;
  description: string;
  children: React.ReactNode;
}

export function FormSection({
  label,
  description,
  children,
}: FormSectionProps) {
  return (
    <Paper p="sm" withBorder component={Stack}>
      <div>
        <Title size="h3" c="nature.7">
          {label}
        </Title>

        <Text c="gray.6">{description}</Text>
      </div>

      <Divider />

      <Box>{children}</Box>
    </Paper>
  );
}
