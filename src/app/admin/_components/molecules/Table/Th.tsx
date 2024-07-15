import {
    Table,
    ScrollArea,
    UnstyledButton,
    Group,
    Text,
    Center,
    TextInput,
    rem,
    keys,
  } from '@mantine/core';
import { IconChevronUp, IconChevronDown, IconSelector } from '@tabler/icons-react';
interface ThProps {
  children?: React.ReactNode;
  reversed?: boolean;
  sorted?: boolean;
  onSort?(): void;
}

export default function Th({ children, reversed, sorted, onSort }: ThProps) {
  //if no reserse and sorted no icon
    const Icon = sorted
        ? reversed
        ? IconChevronUp
        : IconChevronDown
        : IconSelector;
  return (
    <Table.Th> 
      <UnstyledButton onClick={onSort} >
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center>
            {onSort && <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}
