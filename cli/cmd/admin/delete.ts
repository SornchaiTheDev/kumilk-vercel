import { db } from "@/server/db";
import prompts from "prompts";

export const deleteAdmin = async () => {
  try {
    console.log("Fetching Users...")
    const adminUsers = await db.adminUser.findMany();

    const choices = adminUsers.map((user) => ({
      title: user.email,
      value: user.email,
    }));

    const { email } = await prompts({
      type: "select",
      name: "email",
      message: "Select Menu",
      choices,
    });

    if (email === null) return;

    await db.adminUser.delete({
      where: {
        email,
      },
    });

    console.log(`Delete ${email} successfully!`);
  } catch (err) {}
};
