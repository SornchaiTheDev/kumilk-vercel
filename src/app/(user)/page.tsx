import { Text } from "@mantine/core";
import Product from "./_components/molecules/product/Product";
import { api } from "@/trpc/server";
import SearchBar from "./_components/molecules/searchBar/SearchBar";
export default async function Home(props: { searchParams : { q: string } }) {
  const product_list = await api.customer.product.list({
    search: props.searchParams.q,
  });
  
  return (
    <div className="flex flex-col gap-5">
      <div className="mt-3 flex flex-col md:mt-5">
        <div className="flex w-full flex-col sm:flex-row sm:items-center sm:justify-between">
          <Text fw={700} size="xl">
            สินค้า
          </Text>
        </div>
       <SearchBar />
        <div className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5">
          {product_list.map((product, index) => <Product product={product} key={index} />)}
        </div>
      </div>
    </div>
  );
}
