import { Button, ButtonGroup, Image, rem, Text } from "@mantine/core";
import { IconShoppingCart, IconShoppingCartPlus } from "@tabler/icons-react";
import BackButton from "../../_components/organisms/backbutton/BackButton";
import ProductImageCarouel from "./_components/organisms/productImageCarouel/ProductImageCarouel";



export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="mt-0 flex flex-col">
      <BackButton className="hidden md:block md:mb-5" />
      <div className="flex flex-col gap-3 md:flex-row md:gap-8">
        <div className="flex-1">
          <ProductImageCarouel />
        </div>
        <div className="flex w-full flex-col gap-5 md:gap-7 py-5">
          <div className="flex flex-col gap-3 md:gap-5">
            <Text fw={700} size={rem(20)}>
              นมสตรอเบอร์รี่ ขนาดบรรจุ 200 มล.
            </Text>
            <Text c={"blue"} fw={700} size={rem(30)}>
              10 บาท
            </Text>
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
        {/* <div className="flex flex-col p-3">
          <div className="flex gap-3">
            <div className="min-w-[5rem]">คลัง</div>
            <div>410</div>
          </div>
        </div> */}
        <div>นมสตรอเบอร์รี่ ขนาดบรรจุ 200 มล.</div>
      </div>
    </div>
  );
}
