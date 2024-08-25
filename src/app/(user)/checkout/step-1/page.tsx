"use client";
import React, { useEffect } from "react";
import useCheckout from "../store/useCheckout";
import { Alert, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconInfoCircle } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  // const { email, setEmail } = useCheckout();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  // useEffect(() => {
  //   if (email) {
  //     router.push("/checkout/step-2");
  //   }
  // }, [email]);

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        // setEmail(values.email);
        router.push("/checkout/step-2");
      })}
      className="flex flex-col gap-3"
    >
      <Alert
        variant="light"
        color="yellow"
        title="ข้อมูลการสั่งซื้อ"
        icon={<IconInfoCircle />}
      >
        กรุณกรอก email ให้ถูกต้องเพื่อรับข้อมูลการสั่งซื้อ
      </Alert>
      <TextInput
        withAsterisk
        label="Email"
        placeholder="your@email.com"
        key={form.key("email")}
        {...form.getInputProps("email")}
        size="lg"
      />
      <Button size="lg" type="submit">
        บันทึก
      </Button>
    </form>
  );
}
