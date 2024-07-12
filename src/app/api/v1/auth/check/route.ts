import { db } from "@/server/db";

export const POST = async (req: Request) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { email } = await req.json();

  if (email === undefined || typeof email !== "string") {
    return Response.json({ status: "INVALID_REQUEST" }, { status: 400 });
  }

  const user = await db.adminUser.findFirst({
    where: {
      email,
    },
  });

  if (user === null) {
    return Response.json({ status: "NOT_AUTHORIZE" }, { status: 403 });
  }

  return Response.json({ status: "OK" });
};
