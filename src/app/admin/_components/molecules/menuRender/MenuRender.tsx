import Link from "next/link";
import { usePathname } from "next/navigation";
import UserButton from "../userButton/UserButton";
import { Button, Indicator } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";

interface Props {
  type: "desktop" | "mobile";
}

export default function MenuRender(props: Props) {
  const pathname = usePathname();

  interface Menu {
    name: string;
    route: string;
    icon?: JSX.Element;
    indicatorValue?: string;
  }

  const menus: Menu[] = [
    {
      name: "รายการสั่งซื้อ",
      route: "/admin/orders",
    },
    {
      name: "รายการสินค้า",
      route: "/admin/products",
    },
  ];

  const isCurrent = (route: string) => {
    if (route === pathname) {
      return true;
    }
    return false;
  };

  if (props.type === "desktop") {
    return (
      <div className="hidden items-center gap-1 md:flex">
        {menus.map((menu) => (
          <Link key={menu.name} href={menu.route}>
            {menu.indicatorValue ? (
              <Indicator
                inline
                offset={5}
                label={menu.indicatorValue}
                size={16}
              >
                <Button variant={isCurrent(menu.route) ? "light" : "subtle"}>
                  {menu.icon} {menu.name}
                </Button>
              </Indicator>
            ) : (
              <Button variant={isCurrent(menu.route) ? "light" : "subtle"}>
                {menu.icon} {menu.name}
              </Button>
            )}
          </Link>
        ))}
        <UserButton menuPosition="bottom-end" variant="subtle" />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center gap-3">
        {menus.map((menu) => (
          <Link key={menu.name} href={menu.route} className="w-full">
            {menu.indicatorValue ? (
              <Indicator
                inline
                className="w-full"
                offset={5}
                label={menu.indicatorValue}
                size={16}
              >
                <Button
                  fullWidth
                  variant={isCurrent(menu.route) ? "light" : "subtle"}
                >
                  {menu.icon} {menu.name}
                </Button>
              </Indicator>
            ) : (
              <Button
                fullWidth
                variant={isCurrent(menu.route) ? "light" : "subtle"}
              >
                {menu.icon} {menu.name}
              </Button>
            )}
          </Link>
        ))}
      </div>
    );
  }
}
