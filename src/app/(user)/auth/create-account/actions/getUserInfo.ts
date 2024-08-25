import { db } from "@/server/db";

const getUserInfo = async (id: string) => {
  const user = await db.customer.findUnique({
    where: {
      customerId: id,
    },
  });
  return user;
};

export const isAlreadyHaveInfo = async (id: string) => {
  const user = await getUserInfo(id);
  if (user === null) return false;
  if (user.phoneNumber === "") return false;
  if (user.firstName === "") return false;
  if (user.lastName === "") return false;

  return true;
};
