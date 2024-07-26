"use client";

import { Group, Paper, Text } from "@mantine/core";
import { GoogleButton } from "./components/GoogleButton";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Paper p="xl" className="w-full max-w-md" withBorder>
        <Text size="lg" fw={500}>
          ยินดีต้อนรับสู่ KU Milk
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton
            onClick={() =>
              signIn("google", {
                callbackUrl: "/admin/auth/sign-in",
              })
            }
            fullWidth
            type="submit"
          >
            Google
          </GoogleButton>
        </Group>
      </Paper>
    </div>
  );
}
