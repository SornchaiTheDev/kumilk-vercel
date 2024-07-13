"use client";

import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import clsx from "clsx";

export default function Product() {
  const { hovered, ref } = useHover();
  return (
    <Card
      padding="xs"
      ref={ref}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      className={clsx(
        "cursor-pointer",
        hovered && "shadow-xl outline outline-2 outline-blue-300",
      )}
    >
      <Card.Section>
        <Image
          src={
            "https://scontent.fbkk22-2.fna.fbcdn.net/v/t39.30808-6/449438961_967719798480716_8359141525197656130_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHmv2coW3q4udf0JiJ11PjjwQGtY14OaYjBAa1jXg5piJ9csufZsOSG4dJ26TCrkUn1yLpLiFIurd6cwadxCgVi&_nc_ohc=SkrqjeCG56oQ7kNvgH9VQyP&_nc_zt=23&_nc_ht=scontent.fbkk22-2.fna&oh=00_AYB1BdUCJ7yc196jcSVihoZBF57F_LDN6NOLb6NViiy1xA&oe=6696B4DB"
          }
          h={200}
          fallbackSrc="https://placehold.co/600x400?text=Placeholder"
        />
      </Card.Section>

      <Group justify="space-between" mt="xs">
        <Text size="lg" fw={500}>
          นมรสส้ม
        </Text>
        {/* <Badge color="blue">On Sale</Badge> */}
      </Group>

      <Text size="sm" c="dimmed" className="line-clamp-2">
        With Fjord Tours you can explore more of the magical fjord landscapes
        with tours and activities on and around the fjords of Norway
      </Text>
      <Text size="xl" className="" fw={500}>
        100 บาท
      </Text>
    </Card>
  );
}
