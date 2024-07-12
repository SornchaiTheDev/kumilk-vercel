"use client";
import { Button, Drawer } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import MenuRender from "../../molecules/menuRender/MenuRender";

export default function NavbarHeader() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title={
          <div className="flex items-center gap-2">
            <img className="h-8" src="/logo.webp" alt="" />
            <div className="font-bold">Shop KU Milk</div>
          </div>
        }
      >
        <MenuRender type="mobile" />
      </Drawer>
      <div className="border-b px-4 py-3">
        <div className="mx-auto flex w-full max-w-6xl justify-between">
          <div className="flex items-center gap-2">
            <img className="h-8" src="/logo.webp" alt="" />
            <div className="font-bold">Shop KU Milk</div>
          </div>
          <MenuRender type="desktop" />
          <div className="md:hidden">
            <Button onClick={open} variant="subtle">
              <IconMenu2 />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
