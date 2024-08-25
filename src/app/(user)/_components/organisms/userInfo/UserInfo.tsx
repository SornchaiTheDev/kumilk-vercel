"use client";

import type { TUserInfo } from "@/schemas/userInfo";
import { api } from "@/trpc/react";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useState } from "react";

function UserInfo() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<TUserInfo>({
    mode: "uncontrolled",
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
    validate: {
      firstName: (value) => (value.length > 0 ? null : "กรุณากรอกชื่อจริง"),
      lastName: (value) => (value.length > 0 ? null : "กรุณากรอกนามสกุล"),
      phoneNumber: (value) =>
        /^(0[689]\d{8}|0[23457]\d{7})$/.test(value)
          ? null
          : "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง",
    },
  });

  const router = useRouter();
  const createAccount = api.customer.auth.createAccount.useMutation();

  const handleSubmit = async (formData: TUserInfo) => {
    try {
      setIsLoading(true);
      await createAccount.mutateAsync(formData);
      notifications.show({
        title: "บันทึกข้อมูลสำเร็จ",
        message: "กำลังนำคุณไปยังหน้าสั่งซื้อสินค้า",
        color: "green",
      });
      router.push("/");
    } catch (err) {
      notifications.show({
        title: "เกิดข้อผิดพลาด",
        message: "โปรดลองอีกครั้งในภายหลัง",
        color: "red",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="mt-4 flex w-full flex-col gap-4"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <div className="block gap-4 lg:flex">
        <TextInput
          size="md"
          label="ชื่อ"
          flex="1"
          key={form.key("firstName")}
          {...form.getInputProps("firstName")}
        />
        <TextInput
          size="md"
          label="นามสกุล"
          flex="1"
          className="mt-4 lg:mt-0"
          key={form.key("lastName")}
          {...form.getInputProps("lastName")}
        />
      </div>
      <TextInput
        size="md"
        label="เบอร์โทรศัพท์"
        key={form.key("phoneNumber")}
        {...form.getInputProps("phoneNumber")}
      />
      <Button
        type="submit"
        fullWidth
        h={40}
        loading={isLoading}
        disabled={isLoading}
      >
        บันทึกข้อมูล
      </Button>
    </form>
  );
}

export default UserInfo;
