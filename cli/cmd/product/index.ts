import prompts from "prompts";
import { createProduct } from "./create";
import { deleteProduct } from "./delete";

export const productMenu = async () => {
  try {
    const { menu } = await prompts({
      type: "select",
      name: "menu",
      message: "Select Menu",
      choices: [
        { title: "Create", value: "create" },
        { title: "Delete", value: "delete" },
      ],
    });

    switch (menu) {
      case "create":
        await createProduct();
        break;
      case "delete":
        await deleteProduct();
        break;
      default:
        throw new Error("Not implemented");
    }
  } catch (err) {}
};
