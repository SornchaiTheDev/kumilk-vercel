import type { OrderHistory } from "@/server/api/routers/admin/order.router";
import { api } from "@/trpc/react";
import { cn } from "@/utils/cn";
import { Button, Modal, Table } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Image from "next/image";

interface Props {
  opened: boolean;
  onClose: () => void;
  orderHistory: OrderHistory;
}
function ViewOrderModal({ opened, onClose, orderHistory }: Props) {
  const { items, slipImage, isPaid } = orderHistory;

  const rows = items.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.productName}</Table.Td>
      <Table.Td>{element.quantity}</Table.Td>
      <Table.Td>{element.productPrice}</Table.Td>
    </Table.Tr>
  ));

  const isHasSlipImage = slipImage !== null;

  const acceptPayment = api.admin.order.accept.useMutation();

  const utils = api.useUtils();

  const handleAcceptPayment = async () => {
    try {
      await acceptPayment.mutateAsync({ orderId: orderHistory.id });
      await utils.admin.order.list.invalidate();
      onClose();
      notifications.show({
        title: "ยืนยันการชำระเงินสำเร็จ",
        message: "ออเดอร์นี้ได้รับการยืนยันการชำระเงินแล้ว",
        color: "green",
      });
    } catch (err) {}
  };

  const rejectPayment = api.admin.order.reject.useMutation();
  const handleRejectPayment = async () => {
    try {
      await rejectPayment.mutateAsync({ orderId: orderHistory.id });
      await utils.admin.order.list.invalidate();
      onClose();

      notifications.show({
        title: "ปฎิเสธการชำระเงินสำเร็จ",
        message: "ออเดอร์นี้ได้รับการปฎิเสธการชำระเงินแล้ว",
        color: "red",
      });
    } catch (err) {}
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="ดูรายละเอียดออเดอร์"
      size="lg"
      className="max-h-[600px] overflow-y-auto"
    >
      <h5 className="mb-4">
        สถานะ:{" "}
        <span className={cn(isPaid && "text-green-500")}>
          {isPaid ? "ผ่านการตรวจสอบสลิปแล้ว" : "ยังไม่ผ่านการตรวจสอบสลิป"}
        </span>
      </h5>
      <div className="flex justify-center">
        <div className="relative aspect-[3/4] w-2/3 overflow-hidden rounded-lg bg-gray-100">
          {isHasSlipImage ? (
            <Image src={slipImage} fill alt="slip" />
          ) : (
            <h5 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              ยังไม่อัพโหลดสลิป
            </h5>
          )}
        </div>
        
      </div>
      <div className="mt-4 flex justify-center gap-2">
        <Button color="green" disabled={isPaid} onClick={handleAcceptPayment}>
          ยืนยันการชำระเงิน
        </Button>
        <Button color="red" disabled={isPaid} onClick={handleRejectPayment}>
          ปฎิเสธการชำระเงิน
        </Button>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <h6>ราคารวม</h6>
        <h6 className="font-semibold">
          {orderHistory.total.toLocaleString("th-TH")} บาท
        </h6>
      </div>
      <h6 className="my-4 text-lg font-semibold">สินค้าทั้งหมด</h6>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ชื่อสินค้า</Table.Th>
            <Table.Th>จำนวน</Table.Th>
            <Table.Th>ราคา</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Modal>
  );
}

export default ViewOrderModal;
