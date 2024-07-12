import prompts from "prompts";
import { adminMenu } from "./cmd/admin";

const main = async () => {
  try {
    const { menu } = await prompts({
      type: "select",
      name: "menu",
      message: "Select Menu",
      choices: [{ title: "Admin", value: "admin" }],
    });

    switch (menu) {
      case "admin":
        await adminMenu();
    }
  } catch (err) {}
};

main()
  .then()
  .catch((err) => console.error(err));
