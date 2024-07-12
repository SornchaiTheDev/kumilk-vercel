import { ActionIcon } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";

export default function UserButton() {
  return (
    <ActionIcon radius={"xl"} variant="subtle">
      <IconUser stroke={2} />
    </ActionIcon>
  );
}
