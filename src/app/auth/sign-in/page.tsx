import { Group, Paper, Text } from "@mantine/core";
import { GoogleButton } from "./components/GoogleButton";
import { signIn } from "@/auth";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Paper
        p="xl"
        className="w-full max-w-md"
        withBorder
      >
        <Text size="lg" fw={500}>
          ยินดีต้อนรับสู่ KU Milk
        </Text>

        <Group grow mb="md" mt="md">
          <form
            action={async () => {
              "use server";
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call
              await signIn("google");
            }}
          >
            <GoogleButton fullWidth type="submit">
              Google
            </GoogleButton>
          </form>
        </Group>
      </Paper>
    </div>
  );
}
