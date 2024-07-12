import { Carousel } from "@mantine/carousel";
import { Autocomplete, Button, Text, TextInput } from "@mantine/core";
import Product from "./components/molecules/product/Product";
import ImageCarousel from "./components/organisms/imageCarousel/ImageCarousel";
import { IconSearch,IconFilter } from "@tabler/icons-react";;
export default function Home() {
  return (
    <div className="flex flex-col gap-5">
      {/* <ImageCarousel /> */}
      <div className="flex flex-col">
        <div className="flex w-full flex-col sm:flex-row sm:items-center sm:justify-between">
          <Text fw={700} size="xl">
            สินค้า
          </Text>
        </div>
        <div className="mt-2 flex gap-3">
          <TextInput
            placeholder="ค้นหาสินค้า"
            size="lg"
            className="w-full"
            leftSection={<IconSearch size={20} className="text-zinc-300" />}
          />
          <div><Button size="lg"><IconFilter size={20} /></Button></div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5">
          {...new Array(9).fill(0).map((_, index) => <Product key={index} />)}
        </div>
      </div>
    </div>
  );
}
