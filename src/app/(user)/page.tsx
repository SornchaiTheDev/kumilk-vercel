import { Carousel } from "@mantine/carousel";
import { Autocomplete, Text, TextInput } from "@mantine/core";
import Product from "./components/molecules/product/Product";
import ImageCarousel from "./components/organisms/imageCarousel/ImageCarousel";

export default function Home() {
  return (
    <div className="mt-5 flex flex-col gap-5">
      <ImageCarousel />
      <div className="mt-10 flex flex-col">
        <div className="flex w-full flex-col sm:flex-row sm:items-center sm:justify-between">
          <Text fw={700} size="xl">
            สินค้า
          </Text>
          <Autocomplete
            placeholder="ค้นหาสินค้า"
            data={["React", "Angular", "Vue", "Svelte"]}
          />
        </div>
        <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {...new Array(9).fill(0).map((_, index) => <Product key={index} />)}
        </div>
      </div>
    </div>
  );
}
