"use client";
import { api } from "@/trpc/react";
import { type Cart } from "@/types/Cart.type";
import { sanitize } from "isomorphic-dompurify";
import { Button, ButtonGroup, Image, Skeleton, Text } from "@mantine/core";
import { useLocalStorage } from "usehooks-ts";
import { imageFallback } from "@/utils/imageFallback";
import Link from "next/link";

type Props = Cart;

export default function CartItem(props: Props) {
  const product = api.customer.product.getById.useQuery(props.id);
  const [_, setCart] = useLocalStorage<Cart[]>("cart", []);

  const htmlToClean = (raw: string) => {
    const clean = sanitize(raw, {
      ALLOWED_TAGS: [],
    });
    return clean.replace(/&nbsp;/g, " ");
  };

  const increaseQuantity = () => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === props.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
    });
  };

  const decreaseQuantity = () => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.quantity - 1 === 0) {
          return item;
        }
        if (item.id === props.id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });
    });
  };

  const deleteItem = () => {
    setCart((prev) => {
      return prev.filter((item) => item.id !== props.id);
    });
  };

  const isLoading = product.isLoading;

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        {isLoading ? (
          <Skeleton radius="md" className="h-28 min-w-28 md:h-40 md:min-w-40" />
        ) : (
          <Image
            className="h-28 min-w-28 rounded-2xl object-cover md:h-40 md:min-w-40"
            src={product.data?.image}
            alt="product image"
            fallbackSrc={imageFallback}
          />
        )}
      </div>
      <div className="flex w-full flex-col justify-between py-1">
        <div className="flex flex-col">
          {isLoading ? (
            <Skeleton
              radius="md"
              className="h-[1.3rem] w-[8rem] md:h-[2rem] md:w-[10rem]"
            />
          ) : (
            <Link href={`/product/${props.id}`}>
              <Text
                fw={700}
                className="line-clamp-1 cursor-pointer text-xl hover:text-blue-500 hover:underline md:text-2xl"
              >
                {product.data?.name}
              </Text>
            </Link>
          )}
          {isLoading ? (
            <Skeleton radius="md" className="mt-2 h-[1.3rem] max-w-[20rem]" />
          ) : (
            <Text className="line-clamp-2">
              {htmlToClean(product?.data?.description ?? "")}
            </Text>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {isLoading ? (
            <Skeleton radius="md" className="mt-2 h-[1.8rem] w-[5rem]" />
          ) : (
            <Text fw={700} className="line-clamp-1 text-xl md:text-2xl">
              {product.data?.price.toLocaleString("th-TH")} บาท
            </Text>
          )}
          <div className="flex gap-3">
            <ButtonGroup>
              <Button
                disabled={isLoading}
                onClick={decreaseQuantity}
                size="xs"
                variant="outline"
              >
                -
              </Button>
              <Button
                disabled={isLoading}
                size="xs"
                variant="outline"
                className="text-xl"
              >
                {props.quantity}
              </Button>
              <Button
                disabled={isLoading}
                onClick={increaseQuantity}
                size="xs"
                variant="outline"
              >
                +
              </Button>
            </ButtonGroup>
            <Button
              color="red"
              disabled={isLoading}
              onClick={deleteItem}
              size="xs"
            >
              ลบ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
