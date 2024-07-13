import { db } from "@/server/db";

export const checkAdminAuth = async (
  email: string,
): Promise<"NOT_AUTHORIZED" | "OK"> => {
  const user = await db.adminUser.findFirst({
    where: {
      email,
    },
  });

  if (user === null) {
    return "NOT_AUTHORIZED";
  }
  return "OK";
};
