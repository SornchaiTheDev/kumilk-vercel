"use client";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Image,
  rem,
  Text,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { DataTable } from "mantine-datatable";
import CartItem from "./components/molecules/CartItem";
import { useMediaQuery } from "@mantine/hooks";

export default function CartPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div className="flex flex-col">
      <Text fw={700} size="xl">
        ตะกร้าสินค้า (10)
      </Text>
      <div className="mt-5 flex flex-col gap-5">
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
      </div>
      <Divider className="my-5" />
      <div className="flex flex-col">
        <div className="flex justify-between">
          <Text fw={500} className="text-lg md:text-xl">
            ภาษีมูลค่าเพิ่ม
          </Text>
          <Text fw={500} className="text-lg md:text-xl">
            2,500 บาท
          </Text>
        </div>
        <div className="flex justify-between">
          <Text fw={700} className="text-xl md:text-2xl">
            ราคาสุทธิ
          </Text>
          <Text fw={700} className="text-xl md:text-2xl">
            2,500 บาท
          </Text>
        </div>
        <div className="mt-3 flex justify-end">
          <Button fullWidth size={isMobile ? "lg" :"xl"}>สั่งซื้อสินค้า</Button>
        </div>
      </div>
    </div>
  );
}
