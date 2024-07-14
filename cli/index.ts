import prompts from "prompts";
import { adminMenu } from "./cmd/admin";
import { productMenu } from "./cmd/product";

const main = async () => {
  try {
    const { menu } = await prompts({
      type: "select",
      name: "menu",
      message: "Select Menu",
      choices: [
        { title: "Admin", value: "admin" },
        { title: "Product", value: "product" },
      ],
    });

    switch (menu) {
      case "admin":
        await adminMenu();
      case "product":
        await productMenu();
        break;
      default:
        throw new Error("Not Implemented");
    }
  } catch (err) {}
};

main()
  .then()
  .catch((err) => console.error(err));
