"use client";

import { api } from "@/trpc/react";
import { ActionIcon, Group, Input } from "@mantine/core";
import { IconSearch, IconEye } from "@tabler/icons-react";
import { DataTable, type DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState } from "react";
import _ from "lodash";
import { useDisclosure } from "@mantine/hooks";
import ViewOrderModal from "./_components/ViewOrderModal";
import type { OrderHistory } from "@/server/api/routers/admin/order.router";
import dayjs from "dayjs";

const PAGE_SIZES = [10, 15, 20];

export default function OrderPage() {
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

  const getAllOrdersApi = api.admin.order.list.useQuery({
    page: activePage,
    limit: pageSize,
    search: "",
  });

  const [sortStatus, setSortStatus] = useState<
    DataTableSortStatus<OrderHistory>
  >({
    columnAccessor: "date",
    direction: "asc",
  });

  const [records, setRecords] = useState<OrderHistory[]>([]);

  useEffect(() => {
    const histories = getAllOrdersApi.data?.histories;

    if (histories === undefined) return;

    const data = _.sortBy(histories, sortStatus.columnAccessor);

    setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
  }, [sortStatus, getAllOrdersApi.data?.histories]);

  const [opened, { open, close }] = useDisclosure(false);

  const [selectedOrder, setSelectedOrder] = useState<OrderHistory | null>(null);

  const selectOrder = (order: OrderHistory) => {
    setSelectedOrder(order);
    open();
  };

  return (
    <>
      {!!selectedOrder && (
        <ViewOrderModal
          opened={opened}
          onClose={close}
          orderHistory={selectedOrder}
        />
      )}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col justify-between gap-3 lg:flex-row">
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
            {
              accessor: "number",
              title: "#",
              render: (_, index) => (activePage - 1) * pageSize! + index + 1,
            },
            {
              accessor: "date",
              title: "วันที่",
              sortable: true,
              render: (record) =>
                dayjs(record.date).format("DD/MM/YYYY hh:mm:ss"),
            },
            {
              accessor: "Customer",
              title: "ลูกค้า",
              sortable: true,
              render(record) {
                if (record.Customer === null) return "ไม่มีข้อมูล";
                return (
                  record.Customer.firstName + " " + record.Customer.lastName
                );
              },
            },
            {
              accessor: "Customer",
              title: "เบอร์โทรศัพท์",
              render: (record) => record.Customer?.phoneNumber ?? "ไม่มีข้อมูล",
            },
            {
              accessor: "actions",
              title: "ดูรายละเอียด",
              render: (record) => (
                <Group>
                  <ActionIcon onClick={() => selectOrder(record)} color="blue">
                    <IconEye size="1.2rem" />
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
          totalRecords={getAllOrdersApi.data?.totalOrder}
          paginationActiveBackgroundColor="grape"
          recordsPerPage={pageSize ?? 10}
          page={activePage}
          onPageChange={(p) => setActivePage(p)}
          recordsPerPageOptions={PAGE_SIZES}
          onRecordsPerPageChange={setPageSize}
          fetching={getAllOrdersApi.isLoading}
          sortStatus={sortStatus}
          onSortStatusChange={setSortStatus}
          pinLastColumn
        />
      </div>
    </>
  );
}
