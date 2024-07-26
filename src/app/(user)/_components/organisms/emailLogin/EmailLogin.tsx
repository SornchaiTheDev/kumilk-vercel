import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

interface Props {
  type: "sign-in" | "sign-up";
}

interface EmailLogin {
  email: string;
}

function EmailLoginComponent({ type }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<EmailLogin>({
    mode: "uncontrolled",
    name: "sign-up-form",
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (value.length > 0 ? null : "กรุณากรอกอีเมลล์"),
    },
  });

  async function handleOnSubmit({ email }: typeof form.values) {
    try {
      setIsLoading(true);
      await signIn("email", {
        email,
      });
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  const buttonText = type === "sign-in" ? "เข้าสู่ระบบ" : "สมัครสมาชิก";

  return (
    <form
      className="space-y-4"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={form.onSubmit(handleOnSubmit)}
    >
      <TextInput
        size="md"
        label="อีเมล"
        flex="1"
        type="email"
        placeholder="john.doe@gmail.com"
        key={form.key("email")}
        {...form.getInputProps("email")}
      />
      <Button
        loading={isLoading}
        disabled={isLoading}
        type="submit"
        fullWidth
        h={40}
      >
        {buttonText}
      </Button>
    </form>
  );
}

export default EmailLoginComponent;
