import { Badge } from "@mantine/core";
import Link from "next/link";

interface Props {
  href?: string;
}

export default function Logo(props: Props) {
  return (
    <Link
      href={props.href ?? "/"}
      className="flex cursor-pointer gap-2 items-center"
    >
      <img className="h-8" src="/logo.webp" alt="" />
      <div className="font-bold">KU Milk | โรงนมเกษตร</div>
      {props.href === "/admin" && <Badge size="xs" color="blue">Admin</Badge>}
    </Link>
  );
}
