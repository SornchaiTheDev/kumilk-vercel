import {
  Button,
  type ButtonVariant,
  type FloatingPosition,
  Menu,
  rem,
} from "@mantine/core";
import {
  IconLogout,
  IconUser,
} from "@tabler/icons-react";

interface Props {
  variant?: ButtonVariant;
  menuPosition?: FloatingPosition;
}

export default function UserButton(props: Props) {
  return (
    <Menu
      trigger="click-hover"
      position={props.menuPosition}
      shadow="md"
      width={200}
    >
      <Menu.Target>
        <Button variant={props.variant}>
          <IconUser stroke={2} />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          color="red"
          leftSection={
            <IconLogout style={{ width: rem(14), height: rem(14) }} />
          }
        >
          ออกจากระบบ
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
