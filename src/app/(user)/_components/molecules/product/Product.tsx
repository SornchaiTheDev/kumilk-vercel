"use client";

import { type AppRouter } from "@/server/api/root";
import { Card, Group, Image, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { type TRPCClientErrorLike } from "@trpc/client";
import { type UseTRPCQueryResult } from "@trpc/react-query/shared";
import { type inferRouterOutputs } from "@trpc/server";
import { sanitize } from "isomorphic-dompurify";
import clsx from "clsx";
import { useRouter } from "next/navigation";

type PropsType = UseTRPCQueryResult<
  inferRouterOutputs<AppRouter>["customer"]["product"]["list"],
  TRPCClientErrorLike<AppRouter>
>["data"];
type Product =
  NonNullable<PropsType> extends (infer T)[] | null | undefined ? T : never;

interface Props {
  product: Product;
}

export default function Product(props: Props) {
  const router = useRouter();
  const { hovered, ref } = useHover();

  const htmlToClean = (raw: string) => {
    const clean = sanitize(raw, {
      ALLOWED_TAGS: [],
    });
    return clean.replace(/&nbsp;/g, " ");
  };

  return (
    <Card
      padding="xs"
      ref={ref}
      onClick={() => router.push(`/product/${props.product.id}`)}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      className={clsx(
        "cursor-pointer",
        hovered && "shadow-xl outline outline-2 outline-blue-300",
      )}
    >
      <Card.Section>
        <Image
          src={props.product?.image}
          h={200}
          fallbackSrc="https://placehold.co/600x400?text=Placeholder"
        />
      </Card.Section>

      <Group justify="space-between" mt="xs">
        <Text size="lg" fw={500}>
          {props.product?.name ?? ""}
        </Text>
      </Group>

      <Text size="sm" c="dimmed" className="line-clamp-2">
        {htmlToClean(props.product?.description ?? "")}
      </Text>
      <Text size="xl" className="" fw={500}>
        {props.product?.price.toLocaleString("th-TH")} บาท
      </Text>
    </Card>
  );
}
