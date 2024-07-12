"use client";
import { ActionIcon, Button, Drawer } from "@mantine/core";
import { IconMenu2, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import UserButton from "../../molecules/userButton/UserButton";

export default function NavbarHeader() {
  const [opened, { open, close }] = useDisclosure(false);
  const pathname = usePathname();
  const menus = [
    {
      name: "หน้าหลัก",
      route: "/",
    },
  ];

  const isCurrent = (route: string) => {
    if (route === pathname) {
      return true;
    }
    return false;
  };

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
        <div className="flex flex-col gap-3">
          {menus.map((menu) => (
            <Link
              key={menu.name}
              href={menu.route}
              className={clsx(
                "hover:text-blue-500 text-xl",
                isCurrent(menu.route) && "font-bold",
              )}
            >
              {menu.name}
            </Link>
          ))}
          <div className="mt-5">
            <UserButton />
          </div>
        </div>
      </Drawer>
      <div className="border-b px-4 py-3">
        <div className="mx-auto flex w-full max-w-6xl justify-between">
          <div className="flex items-center gap-2">
            <img className="h-8" src="/logo.webp" alt="" />
            <div className="font-bold">Shop KU Milk</div>
          </div>
          <div className="hidden items-center gap-6 md:flex">
            {menus.map((menu) => (
              <Link
                key={menu.name}
                href={menu.route}
                className={clsx(
                  "hover:text-blue-500",
                  isCurrent(menu.route) && "font-bold",
                )}
              >
                {menu.name}
              </Link>
            ))}
            <UserButton />
          </div>
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
