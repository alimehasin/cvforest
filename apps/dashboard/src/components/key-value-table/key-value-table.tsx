import { Table } from '@mantine/core';
import cls from './styles.module.css';

interface KeyValueTableProps {
  keyWidth?: string | number;
  data: {
    label: string;
    value: React.ReactNode;
  }[];
}

export function KeyValueTable({ data, keyWidth = '25%' }: KeyValueTableProps) {
  return (
    <div className={cls.tableWrapper}>
      <Table bg="white" withColumnBorders>
        <Table.Tbody>
          {data.map((item) => (
            <Table.Tr key={item.label}>
              <Table.Td style={{ width: keyWidth }}>{item.label}</Table.Td>
              <Table.Td>{item.value}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}
