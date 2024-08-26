import prompts from "prompts";
import { db } from "@/server/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const createAdmin = async () => {
  try {
    const { email } = await prompts({
      type: "text",
      name: "email",
      message: "Enter Email",
    });

    console.log("Creating user...");

    const createdUser = await db.adminUser.create({
      data: {
        email,
      },
    });
    console.log("Email : ", createdUser.email);
    console.log("Create new admin successfully");
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        console.log("User already exist!");
      }
    }
  }
};
