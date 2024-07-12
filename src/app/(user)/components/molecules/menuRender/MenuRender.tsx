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
      name: "หน้าหลัก",
      route: "/",
    },
    {
      name: "เกี่ยวกับเรา",
      route: "/info",
    },
    {
      name: "",
      icon: <IconShoppingCart size={20} />,
      route: "/cart",
      indicatorValue: "10",
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
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-3 items-center ">
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
