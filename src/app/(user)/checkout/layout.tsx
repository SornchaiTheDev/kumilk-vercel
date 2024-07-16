"use client";
import React, { useEffect, useState } from "react";
import { Stepper } from "@mantine/core";
import { useLocalStorage, useMediaQuery } from "usehooks-ts";
import { usePathname, useRouter } from "next/navigation";
import { Cart } from "@/types/Cart.type";
import useCheckout from "./store/useCheckout";

interface Props {
  children: React.ReactNode;
}

export default function Layout(props: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { orderId } = useCheckout();
  const [active, setActive] = useState(0);
  const states = ["กรอกข้อมูลการสั่งซื้อ", "สั่งซื้อ", "จ่ายเงิน", "สำเร็จ"];
  const [cart] = useLocalStorage<Cart[]>("cart", []);

  useEffect(() => {
    if (pathname === "/checkout/step-2") {
      setActive(1);
    }
    if (pathname === "/checkout/step-3") {
      setActive(3);
    }
    if (pathname === "/checkout/step-4") {
      setActive(4);
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/checkout/step-4") {
        return
    }
    if (!orderId) {
      if (cart.length === 0) {
        router.push("/");
      }
    }
  }, [cart, router]);

  return (
    <div className="flex flex-col gap-5">
      <Stepper className="mt-5" active={active}>
        {states.map((state, index) => (
          <Stepper.Step key={index} label={!isMobile && state} />
        ))}
      </Stepper>
      {props.children}
    </div>
  );
}
