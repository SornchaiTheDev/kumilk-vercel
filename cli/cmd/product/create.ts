import { db } from "@/server/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prompts from "prompts";

export const createProduct = async () => {
  try {
    const { name } = await prompts({
      type: "text",
      name: "name",
      message: "Enter Name",
      validate: (val: string) => val.length > 0,
    });

    const { price } = await prompts({
      type: "number",
      name: "price",
      message: "Enter Price",
      validate: (val: number) => val > 0,
    });

    const { description } = await prompts({
      type: "text",
      name: "description",
      message: "Enter Description",
      validate: (val: string) => val.length > 0,
    });

    const { quantity } = await prompts({
      type: "number",
      name: "quantity",
      message: "Enter Quantity",
      validate: (val: number) => val > 0,
    });

    const { image } = await prompts({
      type: "text",
      name: "image",
      message: "Enter Image",
      validate: (val: string) => val.length > 0,
    });

    console.log("Creating product...");

    const createdProduct = await db.product.create({
      data: {
        name,
        price,
        description,
        quantity,
        image,
      },
    });
    console.log("Create new product successfully");
    console.log(createdProduct);
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        console.log("User already exist!");
      }
    }
  }
};
