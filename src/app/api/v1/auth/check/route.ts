import { checkAdminAuth } from "@/libs/checkAdminAuth";

export const POST = async (req: Request) => {
  const { email } = await req.json();

  if (email === undefined || typeof email !== "string") {
    return Response.json({ status: "INVALID_REQUEST" }, { status: 400 });
  }

  const status = await checkAdminAuth(email);
 
  const isOk = status === "OK";

  return Response.json({ status }, { status: isOk ? 200 : 403 });
};
