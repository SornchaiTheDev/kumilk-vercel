import Link from "next/link";
import { usePathname } from "next/navigation";
import UserButton from "../userButton/UserButton";
import { Button } from "@mantine/core";

interface Props {
  type: "desktop" | "mobile";
}

export default function MenuRender(props: Props) {
  const pathname = usePathname();
  const menus = [
    {
      name: "หน้าหลัก",
      route: "/",
    },
    {
      name: "เกี่ยวกับเรา",
      route: "/info",
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
          <Link
            key={menu.name}
            href={menu.route}
          >
            <Button variant={isCurrent(menu.route) ? "light" : "subtle"}>{menu.name}</Button>
          </Link>
        ))}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-3">
        {menus.map((menu) => (
          <Link
            key={menu.name}
            href={menu.route}
          >
            <Button variant={isCurrent(menu.route) ? "light" : "subtle"} fullWidth>{menu.name}</Button>
          </Link>
        ))}
      </div>
    );
  }
}
