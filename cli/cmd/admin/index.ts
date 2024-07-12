import prompts from "prompts";
import { createAdmin } from "./create";

export const adminMenu = async () => {
  try {
    const { menu } = await prompts({
      type: "select",
      name: "menu",
      message: "Select Menu",
      choices: [{ title: "Create Admin", value: "create" }],
    });

    switch (menu) {
      case "create":
        await createAdmin();
        break;
      default:
        throw new Error("Not implemented");
    }
  } catch (err) {}
};
