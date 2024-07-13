"use client";

import { api } from "@/trpc/react";

function CreateProduct() {
  const create = api.admin.product.create.useMutation();

  const addProduct = async () => {
    try {
      const product = await create.mutateAsync({
        name: "Test",
        description: "lorem ipsum",
        image:
          "https://etzq49yfnmd.exactdn.com/wp-content/uploads/2022/03/cicero_gradient.png?strip=all&lossy=1&ssl=1",
        price: 69,
        quantity: 56,
      });
      console.log(product);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      className="block rounded-lg bg-blue-400 px-4 py-2"
      onClick={addProduct}
    >
      CreateProduct
    </button>
  );
}

export default CreateProduct;
