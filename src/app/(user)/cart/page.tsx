"use client";
import { Button, Divider, Skeleton, Text } from "@mantine/core";
import CartItem from "./_components/molecules/CartItem";
import { useLocalStorage, useMediaQuery } from "usehooks-ts";
import { type Cart } from "@/types/Cart.type";
import { useEffect } from "react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [cart] = useLocalStorage<Cart[]>("cart", []);
  const router = useRouter();
  const mapPriceApi = api.customer.cart.cartMapPrice.useMutation();

  useEffect(() => {
    mapPriceApi.mutate(cart);
  }, [cart]);

  return (
    <div className="flex flex-col">
      <Text fw={700} size="xl">
        ตะกร้าสินค้า ({cart.length})
      </Text>
      <div className="mt-5 flex flex-col gap-5">
        {cart.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <Divider className="my-5" />
      <div className="flex flex-col">
        <div className="flex justify-between">
          <Text fw={700} className="text-xl md:text-2xl">
            ราคาสุทธิ
          </Text>
          {mapPriceApi.isPending ? (
            <Skeleton className="w-[8rem]" />
          ) : (
            <Text fw={700} className="text-xl md:text-2xl">
              {mapPriceApi.data?.totalPrice.toLocaleString("th-TH")} บาท
            </Text>
          )}
        </div>
        <div className="mt-3 flex justify-end">
          <Button onClick={() => router.push("/checkout/step-2")} disabled={cart.length === 0} fullWidth size={isMobile ? "lg" : "xl"}>
            สั่งซื้อสินค้า
          </Button>
        </div>
      </div>
    </div>
  );
}
