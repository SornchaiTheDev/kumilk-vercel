"use client";
import { Button, Drawer } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import MenuRender from "../../molecules/menuRender/MenuRender";
import Logo from "../../molecules/logo/Logo";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function NavbarHeader() {
  const pathname = usePathname();
  const [opened, { open, close }] = useDisclosure(false);

  //event change page to close drawer
  useEffect(() => {
    if (opened) {
      close();
    }
  }, [pathname]);

  return (
    <>
      <Drawer opened={opened} onClose={close} className="" title={<Logo />}>
        <MenuRender type="mobile" />
      </Drawer>
      <div className="sticky top-0 z-30 border-b bg-white px-4 py-3">
        <div className="mx-auto flex w-full max-w-6xl justify-between">
          <Logo />
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
