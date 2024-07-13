"use client";
import { Button } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import clsx from "clsx";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
  href?: string;
}

export default function BackButton(props: Props) {
  const router = useRouter();

  return (
    <div className={clsx("flex justify-between", props.className)}>
      <Button
        onClick={() => props.href ? router.push(props.href) : router.back()}
        leftSection={<IconChevronLeft />}
        variant="transparent"
      >
        ย้อนกลับ
      </Button>
    </div>
  );
}
