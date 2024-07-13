"use client";

import {
  Checkbox,
  ScrollArea,
  Table,
  Button,
  ActionIcon,
  Group,
  Pagination,
  Select,
  Input,
  Switch,
  rem,
  createTheme,
  MantineProvider,
} from "@mantine/core";
import { useEffect, useState } from "react";
import Th from "../_components/molecules/Table/Th";
import {
  IconCheck,
  IconPencil,
  IconSearch,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
interface RowData {
  name: string;
  email: string;
  company: string;
}

export default function ProductsPage() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [activePage, setPage] = useState(1);

  useEffect(() => {
    console.log(activePage);
  }, [activePage]);

  const elements = [
    {
      id: 1,
      image: "https://picsum.photos/200",
      name: "Hydrogen",
      price: 1,
      status: 1,
    },
    {
      id: 2,
      image: "https://picsum.photos/200",
      name: "Helium",
      price: 1,
      status: 1,
    },
    {
      id: 3,
      image: "https://picsum.photos/200",
      name: "Lithium",
      price: 1,
      status: 1,
    },
    {
      id: 4,
      image: "https://picsum.photos/200",
      name: "Beryllium",
      price: 1,
      status: 1,
    },
    {
      id: 5,
      image: "https://picsum.photos/200",
      name: "Boron",
      price: 1,
      status: 0,
    },
    {
      id: 6,
      image: "https://picsum.photos/200",
      name: "Carbon",
      price: 1,
      status: 0,
    },
    {
      id: 7,
      image: "https://picsum.photos/200",
      name: "Nitrogen",
      price: 1,
      status: 1,
    },
    {
      id: 8,
      image: "https://picsum.photos/200",
      name: "Oxygen",
      price: 1,
      status: 0,
    },
    // {
    //   id: 9,
    //   image: "https://picsum.photos/200",
    //   name: "Fluorine",
    //   price: 1,
    //   status: 1,
    // },
    // {
    //   id: 10,
    //   image: "https://picsum.photos/200",
    //   name: "Neon",
    //   price: 1,
    //   status: 1,
    // },
  ];
  const [sortedData, setSortedData] = useState(elements);

  const theme = createTheme({
    cursorType: "pointer",
  });
  const rows = elements.map((element) => (
    <Table.Tr
      key={element.name}
      bg={
        selectedRows.includes(element.id)
          ? "var(--mantine-color-blue-light)"
          : undefined
      }
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          // className="cursor-pointer"
          checked={selectedRows.includes(element.id)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, element.id]
                : selectedRows.filter((id) => id !== element.id),
            )
          }
        />
      </Table.Td>
      <Table.Td>
        <img
          src={element.image}
          alt={element.name}
          width={70}
          className="rounded-md"
        />
      </Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.price}</Table.Td>
      <Table.Td>
        <MantineProvider theme={theme}>
          <Switch
            style={
              //cursor: pointer
              { cursorType: "pointer" }
            }
            checked={!!element.status}
            onChange={(event) => {
              console.log(event.target.checked, element.id);
              //get id and status
            }}
            color="teal"
            size="sm"
            // label="Switch with thumb icon"
            thumbIcon={
              !!element.status ? (
                <IconCheck
                  style={{ width: rem(12), height: rem(12) }}
                  color={"red"}
                  stroke={3}
                />
              ) : (
                <IconX
                  style={{ width: rem(12), height: rem(12) }}
                  color={"red"}
                  stroke={3}
                />
              )
            }
          />
        </MantineProvider>
      </Table.Td>
      <Table.Td className="">
        <Group justify="center">
          <ActionIcon variant="filled" aria-label="Edit">
            <IconPencil size={19} stroke={1.5} />
          </ActionIcon>
          <ActionIcon color="red" aria-label="Delete">
            <IconTrash size={19} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    // setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <div className="inline-flex gap-2">
            <Button color="green" variant="light" className="">
              เพิ่มสินค้า
            </Button>
            {selectedRows.length > 0 && (
              <Button color="red" variant="filled">
                ลบ
              </Button>
            )}
            {/* <Button color="blue" variant="light">
              เครื่องมือ
            </Button> */}
          </div>
          <div className="inline-flex gap-2">
            <Select
              placeholder="Select items per page"
              allowDeselect={false}
              defaultValue={"10"}
              type="number"
              data={["10", "20", "50", "100"]}
              size="sm"
              maw={80}
              comboboxProps={{ width: 80 }}
              // searchable
            />
            <Input
              placeholder="Search.."
              size="sm"
              leftSection={<IconSearch size={16} />}
            />
          </div>
        </div>
        <ScrollArea>
          <Table verticalSpacing="xs" miw={700} layout="fixed">
            <Table.Thead>
              <Table.Tr>
                <Th />
                <Th>รูปสินค้า</Th>
                <Th
                  sorted={sortBy === "name"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("name")}
                >
                  ชื่อสินค้า
                </Th>
                <Th
                  sorted={sortBy === "company"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("company")}
                >
                  ราคา/บาท
                </Th>
                <Th>สถานะ</Th>
                <Th>เครื่องมือ</Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </ScrollArea>
        <Pagination.Root total={10} value={activePage} onChange={setPage}>
          <Group gap={5} justify="center">
            <Pagination.First />
            <Pagination.Previous />
            <Pagination.Items />
            <Pagination.Next />
            <Pagination.Last />
          </Group>
        </Pagination.Root>
      </div>
    </>
  );
}
