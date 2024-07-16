/* eslint-disable @typescript-eslint/no-floating-promises */
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
  Modal,
  Text,
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
import { useDisclosure } from "@mantine/hooks";
import CreateProduct from "../_components/organisms/createProduct/CreateProduct";
import CreateEditProductModal from "../_components/organisms/Modal/CreateEditProductModal";
import { api } from "@/trpc/react";
import { addProductType } from "@/schemas/addProduct";
import { notifications } from "@mantine/notifications";
import { editProductType, ProductType } from "@/schemas/editProduct";
import { modals } from "@mantine/modals";

interface RowData {
  name: string;
  email: string;
  company: string;
}

export default function ProductsPage() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [activePage, setPage] = useState(1);
  const [opened, { close, open }] = useDisclosure(false);
  const [modalKey, setModalKey] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [productData, setProductData] = useState<editProductType | null>(null);
  const adminCreateProductApi = api.admin.product.create.useMutation();
  const adminEditProductApi = api.admin.product.update.useMutation();
  const adminDeleteProductApi = api.admin.product.delete.useMutation();
  const adminDeleteManyProductApi = api.admin.product.deleteMany.useMutation();
  const getAllProductApi = api.admin.product.list.useQuery({
    search: "",
  });

  const handleProductSubmit = async (data: ProductType) => {
    try {
      if (editMode) {
        await adminEditProductApi.mutateAsync(data as editProductType);
        notifications.show({
          title: "แก้ไขรายการสินค้าสำเร็จ",
          message: "สินค้าถูกแก้ไขในระบบแล้ว",
          color: "green",
        });
      } else {
        await adminCreateProductApi.mutateAsync(data as addProductType);
        notifications.show({
          title: "สร้างรายการสินค้าสำเร็จ",
          message: "สินค้าถูกเพิ่มเข้าสู่ระบบแล้ว",
          color: "green",
        });
      }
      close();
      getAllProductApi.refetch();
      setModalKey((prev) => prev + 1);
    } catch (err) {
      notifications.show({
        title: "เกิดข้อผิดพลาด",
        message: "ไม่สามารถบันทึกข้อมูลสินค้าได้",
        color: "red",
      });
      console.log(err);
    }
  };

  const onDeleteProduct = (id: string) => {
    try {
      const handleConfirm = async () => {
        try {
          await adminDeleteProductApi.mutateAsync({ id });
          notifications.show({
            title: "ลบรายการสินค้าสำเร็จ",
            message: "สินค้าถูกลบออกจากระบบแล้ว",
            color: "green",
          });
          getAllProductApi.refetch();
          return;
        } catch (err) {
          notifications.show({
            title: "เกิดข้อผิดพลาด",
            message: "ไม่สามารถลบข้อมูลสินค้าได้",
            color: "red",
          });
        }
      };

      modals.openConfirmModal({
        title: "ยืนยันการลบรายการสินค้า",
        children: (
          <Text size="sm">คุณแน่ใจหรือไม่ที่จะลบรายการสินค้านี้ออกจากระบบ</Text>
        ),
        labels: { confirm: "ยืนยัน", cancel: "ยกเลิก" },
        onConfirm: (): void => {
          handleConfirm();
        },
      });
    } catch (err) {
      notifications.show({
        title: "เกิดข้อผิดพลาด",
        message: "ไม่สามารถลบข้อมูลสินค้าได้",
        color: "red",
      });
      console.log(err);
    }
  };

  const onDeleteManyProduct = () => {
    try {
      const handleConfirm = async () => {
        try {
          await adminDeleteManyProductApi.mutateAsync({ ids: selectedRows });
          notifications.show({
            title: "ลบรายการสินค้าสำเร็จ",
            message: "สินค้าถูกลบออกจากระบบแล้ว",
            color: "green",
          });
          getAllProductApi.refetch();
          setSelectedRows([]);
          return;
        } catch (err) {
          notifications.show({
            title: "เกิดข้อผิดพลาด",
            message: "ไม่สามารถลบข้อมูลสินค้าได้",
            color: "red",
          });
        }
      };

      modals.openConfirmModal({
        title: "ยืนยันการลบรายการสินค้า",
        children: (
          <Text size="sm">คุณแน่ใจหรือไม่ที่จะลบรายการสินค้านี้ออกจากระบบ</Text>
        ),
        labels: { confirm: "ยืนยัน", cancel: "ยกเลิก" },
        onConfirm: (): void => {
          handleConfirm();
        },
      });
    } catch (err) {
      notifications.show({
        title: "เกิดข้อผิดพลาด",
        message: "ไม่สามารถลบข้อมูลสินค้าได้",
        color: "red",
      });
      console.log(err);
    }
  }
  const openEditModal = (product: editProductType) => {
    console.log(product);

    setProductData(product);
    setEditMode(true);
    open();
  };

  const openCreateModal = () => {
    setEditMode(false);
    setProductData(null);
    open();
  };

  const theme = createTheme({
    cursorType: "pointer",
  });
  const rows = getAllProductApi.data?.map((element) => (
    <Table.Tr
      key={element.id}
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
          {/* <Switch
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
          /> */}
        </MantineProvider>
      </Table.Td>
      <Table.Td className="">
        <Group justify="center">
          <ActionIcon
            variant="filled"
            aria-label="Edit"
            onClick={() => {
              openEditModal({
                ...element,
                status: false,
              });
            }}
          >
            {" "}
            {/*onClick={() =>{} }} */}
            <IconPencil size={19} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            color="red"
            aria-label="Delete"
            onClick={() => {
              onDeleteProduct(element.id);
            }}
          >
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
      <CreateEditProductModal
        key={modalKey}
        opened={opened}
        open={open}
        close={close}
        onSubmit={handleProductSubmit}
        mode={editMode ? "edit" : "create"}
        productData={editMode ? productData : undefined}
      />
      <div className="flex flex-col gap-3">
        <div className="flex flex-col justify-between gap-3 lg:flex-row">
          <div className="inline-flex gap-2">
            <Button
              color="green"
              variant="light"
              className=""
              onClick={() => {
                openCreateModal();
              }}
            >
              เพิ่มสินค้า
            </Button>
            {selectedRows.length > 0 && (
              <Button color="red" variant="filled" onClick={onDeleteManyProduct}>
                ลบ
              </Button>
            )}
            <div className="ml-auto lg:hidden">
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
            </div>

            {/* <Button color="blue" variant="light">
              เครื่องมือ
            </Button> */}
          </div>
          <Input
            placeholder="Search.."
            size="sm"
            leftSection={<IconSearch size={16} />}
            className="lg:hidden"
          />
          <div className="hidden gap-2 lg:inline-flex">
            <Select
              placeholder="Select items per page"
              allowDeselect={false}
              defaultValue={"10"}
              type="number"
              data={["10", "20", "50", "100"]}
              size="sm"
              maw={80}
              comboboxProps={{ width: 80 }}
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
