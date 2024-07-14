import { db } from "@/server/db";
import prompts from "prompts";

export const deleteProduct = async () => {
  try {
    console.log("Fetching product...");
    const products = await db.product.findMany();

    const { id } = await prompts({
      type: "select",
      name: "id",
      message: "Enter Name",
      choices: products.map(({ name, id }) => ({ title: name, value: id })),
    });

    if (id === undefined) return;

    console.log("Deleting product...");
    await db.product.delete({
      where: {
        id,
      },
    });
    console.log("Delete product successfully");
  } catch (err) {}
};
