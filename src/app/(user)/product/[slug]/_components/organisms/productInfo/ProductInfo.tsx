"use client";
import { api } from "@/trpc/react";
import ProductImageCarouel from "../productImageCarouel/ProductImageCarouel";
import { Button, ButtonGroup, rem, Skeleton, Text } from "@mantine/core";
import { IconShoppingCartPlus } from "@tabler/icons-react";

interface Props {
  id: string;
}

function ProductInfo({ id }: Props) {
  const product = api.customer.product.getByName.useQuery(id);
  const isLoading = product.isLoading;

  return (
    <>
      <div className="flex flex-col gap-3 md:flex-row md:gap-8">
        <div className="flex-1">
          {isLoading ? (
            <Skeleton width={400} height={400} />
          ) : (
            <ProductImageCarouel images={[product.data?.image ?? ""]} />
          )}
        </div>
        <div className="flex w-full flex-col gap-5 py-5 md:gap-7">
          <div className="flex flex-col gap-3 md:gap-5">
            {isLoading ? (
              <Skeleton width={200} height={40} />
            ) : (
              <Text fw={700} size={rem(20)}>
                {product.data?.name}
              </Text>
            )}

            {isLoading ? (
              <Skeleton width={100} height={40} />
            ) : (
              <Text c={"blue"} fw={700} size={rem(30)}>
                {product.data?.price} บาท
              </Text>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div>จำนวน</div>
            <ButtonGroup>
              <Button variant="outline">-</Button>
              <Button variant="outline">1</Button>
              <Button variant="outline">+</Button>
            </ButtonGroup>
          </div>
          <div className="flex gap-2">
            <Button leftSection={<IconShoppingCartPlus />} size="lg">
              เพิ่มไปยังรถเข็น
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-3">
        <Text fw={700} size={rem(20)}>
          รายละเอียดสินค้า
        </Text>
        {isLoading ? (
          <>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton height={10} key={i} />
            ))}
          </>
        ) : (
          <div
            className="prose mt-5"
            dangerouslySetInnerHTML={{ __html: product.data?.description ?? "" }}
          />
        )}
      </div>
    </>
  );
}

export default ProductInfo;
