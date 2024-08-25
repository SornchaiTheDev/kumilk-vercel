/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";
import {
  Button,
  NumberFormatter,
  rem,
  Skeleton,
  Table,
  Text,
} from "@mantine/core";
import useCheckout from "../store/useCheckout";
import { useLocalStorage } from "usehooks-ts";
import { type Cart } from "@/types/Cart.type";
import { api } from "@/trpc/react";
import { useEffect } from "react";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Page() {
  const router = useRouter();
  const mapPriceApi = api.customer.cart.cartMapPrice.useMutation();
  const checkoutApi = api.customer.checkout.createOrder.useMutation();
  const [cart, setCart] = useLocalStorage<Cart[]>("cart", []);
  const { setOrderId, orderId } = useCheckout();
  const { data: session } = useSession();

  useEffect(() => {
    mapPriceApi.mutate(cart);
  }, [cart]);

  useEffect(() => {
    if (orderId) {
      void router.push("/checkout/step-3");
    }
  }, [orderId]);

  const handleCheckout = () => {
    if (!session?.user.id) return router.push("/auth/sign-in");
    if (!mapPriceApi.data) return;
    if (!mapPriceApi.data?.totalPrice) return;
    if (!mapPriceApi.data.items) return;
    if (mapPriceApi.data.items.length === 0) return;

    modals.openConfirmModal({
      title: "ยืนยันการสั่งซื้อ",
      centered: true,
      children: (
        <Text size="sm">
          คุณต้องการสั่งซื้อสินค้าใช่หรือไม่? หากต้องการสั่งซื้อสินค้า
          กรุณาตรวจสอบรายการสินค้าให้ถูกต้อง
        </Text>
      ),
      labels: { confirm: "ยืนยัน", cancel: "ยกเลิก" },
      onConfirm: () => {
        const id = notifications.show({
          loading: true,
          title: "กำลังดําเนินการ...",
          message: "กรุณารอสักครู่ ระบบกำลังดําเนินการ",
          autoClose: false,
          withCloseButton: false,
        });

        checkoutApi.mutate(
          {
            customerId: session.user.id,
            total: mapPriceApi.data?.totalPrice,
            items: mapPriceApi.data.items,
          },
          {
            onSuccess: (data) => {
              if (!data) return;
              setOrderId(data);
              setCart([]);
              modals.closeAll();
              checkoutApi.reset();
              notifications.update({
                id,
                color: "teal",
                title: "สั่งซื้อสินค้าสําเร็จ",
                message: "ไปสู่ขั้นตอนถัดไป",
                icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
                loading: false,
                autoClose: 2000,
              });
            },
            onError: () => {
              modals.closeAll();
              checkoutApi.reset();
              notifications.update({
                id,
                color: "red",
                title: "สั่งซื้อสินค้าไม่สําเร็จ",
                message: "กรุณาลองใหม่อีกครั้ง",
                icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
                loading: false,
                autoClose: 2000,
              });
            },
          },
        );
      },
    });
  };

  const isLoading = mapPriceApi.isSuccess ? false : true;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="flex flex-col">
            {isLoading ? (
              <Skeleton className="h-[2rem] w-[10rem]" />
            ) : (
              <div className="flex text-xl font-semibold">
                สรุปรายการสั่งซื้อ
              </div>
            )}
          </div>
          {/* <div className="flex flex-col items-start md:items-end"> */}
          {/*   {isLoading ? ( */}
          {/*     <Skeleton className="mt-3 h-[2rem] w-[13rem] md:mt-0" /> */}
          {/*   ) : ( */}
          {/*     <div className="flex gap-1"> */}
          {/*       <div>อีเมลลูกค้า</div> */}
          {/*       <div>:</div> */}
          {/*       <div>{email}</div> */}
          {/*     </div> */}
          {/*   )} */}
          {/* </div> */}
        </div>
        {isLoading ? (
          <Skeleton className="mt-3 h-[30rem] w-full" />
        ) : (
          <Table withColumnBorders withTableBorder className="mt-3">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>สินค้า</Table.Th>
                <Table.Th className="whitespace-nowrap text-end">
                  ราคาต่อชิ้น
                </Table.Th>
                <Table.Th className="whitespace-nowrap text-end">
                  จำนวน
                </Table.Th>
                <Table.Th className="whitespace-nowrap text-end">
                  ราคารวม
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {mapPriceApi.data?.items.map((item, index) => (
                <Table.Tr key={index}>
                  <Table.Td className="w-full">{item.name}</Table.Td>
                  <Table.Td align="right">
                    <NumberFormatter value={item.price} thousandSeparator />
                  </Table.Td>
                  <Table.Td align="right">
                    <NumberFormatter value={item.quantity} thousandSeparator />
                  </Table.Td>
                  <Table.Td align="right">
                    <NumberFormatter
                      value={item.totalPrice}
                      thousandSeparator
                    />
                  </Table.Td>
                </Table.Tr>
              ))}
              <Table.Tr>
                <Table.Td colSpan={4} className="w-full">
                  <div className="flex justify-between font-bold">
                    <div>ราคารวม</div>
                    <div>
                      <NumberFormatter
                        value={mapPriceApi.data?.totalPrice}
                        thousandSeparator
                        suffix=" บาท"
                      />
                    </div>
                  </div>
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        )}
      </div>
      <Button
        className="mt-3"
        onClick={handleCheckout}
        loading={checkoutApi.isPending}
      >
        สั่งซื้อ
      </Button>
    </div>
  );
}
