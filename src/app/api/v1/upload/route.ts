import { auth } from "@/auth";
import { checkAdminAuth } from "@/libs/checkAdminAuth";
import { uploadFile } from "@/libs/uploadFile";

export const POST = async (req: Request) => {
  const session = await auth();
  try {
    const email = session?.user?.email ?? "";
    const status = await checkAdminAuth(email);
    if (status === "NOT_AUTHORIZED") {
      return Response.json({ message: "NOT_AUTHORIZED" }, { status: 403 });
    }
    const formData = await req.formData();
    const dest = await uploadFile(formData);
    return Response.json({
      dest,
    });
  } catch (err) {
		console.log(err)
    return Response.json({ message: "SOMETHING_WENT_WRONG" }, { status: 400 });
  }
};
