"use client";

import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export default function Product() {
  const router = useRouter();
  const { hovered, ref } = useHover();
  return (
    <Card
      padding="xs"
      ref={ref}
      onClick={() => router.push(`/product/123123`)}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      className={clsx(
        "cursor-pointer",
        hovered && "shadow-xl outline outline-2 outline-blue-300",
      )}
    >
      <Card.Section>
        <Image
          src={
            "https://img.wongnai.com/p/1920x0/2019/09/08/a5d570a0fa374e3b8780e01fec127793.jpg"
          }
          h={200}
          fallbackSrc="https://placehold.co/600x400?text=Placeholder"
        />
      </Card.Section>

      <Group justify="space-between" mt="xs">
        <Text size="lg" fw={500}>
          นมสตรอเบอร์รี่
        </Text>
        {/* <Badge color="blue">On Sale</Badge> */}
      </Group>

      <Text size="sm" c="dimmed" className="line-clamp-2">
        นมสตรอเบอร์รี่ ขนาดบรรจุ 200 มล.
      </Text>
      <Text size="xl" className="" fw={500}>
        10 บาท
      </Text>
    </Card>
  );
}
