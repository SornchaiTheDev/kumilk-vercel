"use client";
import { api } from "@/trpc/react";
import { Button, FileInput, NumberFormatter, Skeleton } from "@mantine/core";
import axios from "axios";
import React, { type FormEvent, useState } from "react";
import useCheckout from "../store/useCheckout";

export default function Page() {
  const { orderId, reset } = useCheckout();

  const orderDetailApi = api.customer.checkout.orderDetail.useQuery({
    orderId: orderId ?? "",
  });
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (orderId === null) return;
    const formData = new FormData();
    if (file === undefined) return;
    formData.append("file", file);
    formData.append("orderId", orderId);

    try {
      const res = await axios.post<{ dest: string }>(
        "/api/v1/upload/slip",
        formData,
      );
      reset()
    } catch (err) {
      console.log(err);
    }
  };

  const isLoading = orderDetailApi.isLoading;

  return (
    <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-3">
      <div className="flex flex-col items-center gap-5 rounded-lg border p-3">
        {isLoading ? (
          <Skeleton className="h-[2.5rem] w-[10rem]" />
        ) : (
          <div className="text-3xl">
            <NumberFormatter
              value={orderDetailApi.data?.total}
              thousandSeparator
              suffix=" บาท"
            />
          </div>
        )}
        <img
          className="w-[10rem]"
          src="https://www.paocloud.co.th/wp-content/uploads/2021/01/Screen-Shot-2564-01-26-at-18.56.53.png"
          alt=""
        />
      </div>
      <div className="mt-5 flex w-full flex-col items-center">
        <FileInput
          required
          onChange={(file) => setFile(file!)}
          size="lg"
          withAsterisk
          className="w-full"
          label="อัพโหลดหลักฐานการชําระเงิน"
          placeholder="เลือกไฟล์"
          accept=".jpg,.png,.jpeg"
        />
      </div>
      <Button type="submit" disabled={orderDetailApi.isLoading} size="lg">
        ยืนยัน
      </Button>
    </form>
  );
}
