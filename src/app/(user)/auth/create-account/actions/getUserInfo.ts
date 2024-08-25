import { db } from "@/server/db";

const getUserInfo = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const isAlreadyHaveInfo = async (email: string) => {
  const user = await getUserInfo(email);
  if (user === null) return false;
  if (user.phoneNumber === "") return false;
  if (user.firstName === "") return false;
  if (user.lastName === "") return false;

  return true;
};
