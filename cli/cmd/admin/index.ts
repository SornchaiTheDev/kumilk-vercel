import prompts from "prompts";
import { createAdmin } from "./create";
import { deleteAdmin } from "./delete";

export const adminMenu = async () => {
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
        await createAdmin();
        break;
      case "delete":
        await deleteAdmin();
        break;
      default:
        throw new Error("Not implemented");
    }
  } catch (err) {}
};
