"use client";

import { type addProductType } from "@/schemas/addProduct";
import { type editProductType, type ProductType } from "@/schemas/editProduct";
import { api } from "@/trpc/react";
import {
  ActionIcon,
  Button,
  createTheme,
  Group,
  Input,
  MantineProvider,
  Select,
  Switch,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconPencil, IconSearch, IconTrash } from "@tabler/icons-react";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState } from "react";
import CreateEditProductModal from "../_components/organisms/Modal/CreateEditProductModal";
import _ from "lodash";
interface RowData {
  name: string;
  email: string;
  company: string;
}
const PAGE_SIZES = [10, 15, 20];
export default function ProductsPage() {
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [opened, { close, open }] = useDisclosure(false);
  const [modalKey, setModalKey] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [productData, setProductData] = useState<editProductType | null>(null);
  const adminCreateProductApi = api.admin.product.create.useMutation();
  const adminEditProductApi = api.admin.product.update.useMutation();
  const adminDeleteProductApi = api.admin.product.delete.useMutation();
  const adminDeleteManyProductApi = api.admin.product.deleteMany.useMutation();
  const adminToggleVisibleProductApi =
    api.admin.product.toggleVisible.useMutation();
  const getAllProductApi = api.admin.product.list.useQuery({
    page: activePage,
    limit: pageSize,
    search: "",
  });
  const [selectedRows, setSelectedRows] = useState<editProductType[]>([]);

  const [sortStatus, setSortStatus] = useState<
    DataTableSortStatus<editProductType>
  >({
    columnAccessor: "name",
    direction: "asc",
  });
  const [records, setRecords] = useState<editProductType[]>(
    _.sortBy(getAllProductApi.data?.products, "name"),
  );

  useEffect(() => {
    const data = _.sortBy(
      getAllProductApi.data?.products,
      sortStatus.columnAccessor,
    ) as editProductType[];
    setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
  }, [sortStatus, getAllProductApi.data?.products]);

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
      void getAllProductApi.refetch();
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
          await adminDeleteProductApi.mutateAsync({
            id,
          });
          notifications.show({
            title: "ลบรายการสินค้าสำเร็จ",
            message: "สินค้าถูกลบออกจากระบบแล้ว",
            color: "green",
          });
          void getAllProductApi.refetch();
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
          void handleConfirm();
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
          await adminDeleteManyProductApi.mutateAsync({
            ids: selectedRows.map((element) => element.id),
          });
          notifications.show({
            title: "ลบรายการสินค้าสำเร็จ",
            message: "สินค้าถูกลบออกจากระบบแล้ว",
            color: "green",
          });
          void getAllProductApi.refetch();
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
          void handleConfirm();
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

  const onToggleVisible = (id: string) => {
    try {
      const handleConfirm = async () => {
        try {
          await adminToggleVisibleProductApi.mutateAsync({ ids: [id] });
          notifications.show({
            title: "เปลี่ยนสถานะสินค้าสำเร็จ",
            message: "สถานะสินค้าถูกเปลี่ยนแปลงแล้ว",
            color: "green",
          });
          void getAllProductApi.refetch();
          return;
        } catch (err) {
          notifications.show({
            title: "เกิดข้อผิดพลาด",
            message: "ไม่สามารถเปลี่ยนสถานะสินค้าได้",
            color: "red",
          });
        }
      };

      modals.openConfirmModal({
        title: "ยืนยันการเปลี่ยนสถานะสินค้า",
        children: (
          <Text size="sm">คุณแน่ใจหรือไม่ที่จะเปลี่ยนสถานะสินค้านี้</Text>
        ),
        labels: { confirm: "ยืนยัน", cancel: "ยกเลิก" },
        onConfirm: (): void => {
          void handleConfirm();
        },
      });
    } catch (err) {
      notifications.show({
        title: "เกิดข้อผิดพลาด",
        message: "ไม่สามารถเปลี่ยนสถานะสินค้าได้",
        color: "red",
      });
      console.log(err);
    }
  };

  const onToggleManyVisible = () => {
    try {
      const handleConfirm = async () => {
        try {
          await adminToggleVisibleProductApi.mutateAsync({
            ids: selectedRows.map((element) => element.id),
          });
          notifications.show({
            title: "เปลี่ยนสถานะสินค้าสำเร็จ",
            message: "สถานะสินค้าถูกเปลี่ยนแปลงแล้ว",
            color: "green",
          });
          void getAllProductApi.refetch();
          return;
        } catch (err) {
          notifications.show({
            title: "เกิดข้อผิดพลาด",
            message: "ไม่สามารถเปลี่ยนสถานะสินค้าได้",
            color: "red",
          });
        }
      };

      modals.openConfirmModal({
        title: "ยืนยันการเปลี่ยนสถานะสินค้า",
        children: (
          <Text size="sm">คุณแน่ใจหรือไม่ที่จะเปลี่ยนสถานะสินค้านี้</Text>
        ),
        labels: { confirm: "ยืนยัน", cancel: "ยกเลิก" },
        onConfirm: (): void => {
          void handleConfirm();
        },
      });
    } catch (err) {
      notifications.show({
        title: "เกิดข้อผิดพลาด",
        message: "ไม่สามารถเปลี่ยนสถานะสินค้าได้",
        color: "red",
      });
      console.log(err);
    }
  };

  const openEditModal = (product: editProductType) => {
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
        loading={
          adminCreateProductApi.isPending || adminEditProductApi.isPending
        }
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
            {selectedRows.length > 0 ? (
              <>
                <Button
                  color="blue"
                  variant="filled"
                  onClick={onToggleManyVisible}
                >
                  เปลี่ยนสถานะ
                </Button>
                <Button
                  color="red"
                  variant="filled"
                  onClick={onDeleteManyProduct}
                >
                  ลบ
                </Button>
              </>
            ) : null}

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
            <Input
              placeholder="Search.."
              size="sm"
              leftSection={<IconSearch size={16} />}
            />
          </div>
        </div>
        <DataTable
          columns={[
            { accessor: 'number', title: '#', render: (_, index) => ((activePage - 1) * pageSize! + index + 1) },
            {
              accessor: "image",
              title: "รูปสินค้า",
              render: (record) => (
                <img
                  src={record.image}
                  alt={record.name}
                  width={70}
                  className="rounded-md"
                />
              ),
            },
            {
              accessor: "name",
              title: "ชื่อสินค้า",
              sortable: true,
            },
            {
              accessor: "price",
              title: "ราคา/บาท",
              sortable: true,
            },
            {
              accessor: "quantity",
              title: "คงเหลือ",
              sortable: true,
            },
            {
              accessor: "isVisible",
              title: "แสดงสินค้า",
              render: (record) => (
                <MantineProvider theme={theme}>
                  <Switch
                    checked={record.isVisible}
                    onChange={() => onToggleVisible(record.id)}
                  />
                </MantineProvider>
              ),
            },
            {
              accessor: "actions",
              title: "เครื่องมือ",
              render: (record) => (
                <Group justify="center">
                  <ActionIcon
                    color="blue"
                    onClick={() => openEditModal(record)}
                  >
                    <IconPencil size="1.2rem" />
                  </ActionIcon>
                  <ActionIcon
                    color="red"
                    onClick={() => onDeleteProduct(record.id)}
                  >
                    <IconTrash size="1.2rem" />
                  </ActionIcon>
                </Group>
              ),
            },
          ]}
          verticalSpacing="md"
          
          miw={700}
          minHeight={250}
          verticalAlign="center"
          noRecordsText="ไม่พบข้อมูล"
          records={records}
          totalRecords={getAllProductApi.data?.totalProduct}
          paginationActiveBackgroundColor="grape"
          recordsPerPage={pageSize ?? 10}
          page={activePage}
          onPageChange={(p) => setActivePage(p)}
          recordsPerPageOptions={PAGE_SIZES}
          onRecordsPerPageChange={setPageSize}
          selectedRecords={selectedRows}
          onSelectedRecordsChange={setSelectedRows}
          fetching={getAllProductApi.isLoading}
          sortStatus={sortStatus}
          onSortStatusChange={setSortStatus}
          pinLastColumn
        />
      </div>
    </>
  );
}
