import { uploadFile } from "@/libs/uploadFile";
import { db } from "@/server/db";

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const orderId = formData.get("orderId");

    if (typeof orderId != "string") {
      throw new Error("BAD_REQUEST");
    }

    const orderHistory = await db.orderHistory.findUnique({
      where: {
        id: orderId,
      },
    });

    if (orderHistory === null) {
      throw new Error("ORDER_NOT_FOUND");
    }

    const dest = await uploadFile(formData, "slip/");

    try {
      await db.orderHistory.update({
        where: {
          id: orderId,
        },
        data: {
          slipImage: dest,
        },
      });
      return Response.json({ message: "SUCCESS" });
    } catch (err) {
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  } catch (err) {
    if (err instanceof Error) {
      return Response.json({ message: err.message }, { status: 400 });
    }
    return Response.json({ message: "SOMETHING_WENT_WRONG" }, { status: 400 });
  }
};
