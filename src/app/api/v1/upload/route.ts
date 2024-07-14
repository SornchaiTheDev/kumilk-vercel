import { env } from "@/env";
import * as Minio from "minio";
import { auth } from "@/auth";
import { checkAdminAuth } from "@/libs/checkAdminAuth";
import reduceImageSize from "@/libs/reduceImageSize";

export const POST = async (req: Request) => {
  const session = await auth();
  try {
    const email = session?.user?.email ?? "";
    const status = await checkAdminAuth(email);
    if (status === "NOT_AUTHORIZED") {
      return Response.json({ message: "NOT_AUTHORIZED" }, { status: 403 });
    }
  } catch (err) {}

  const client = new Minio.Client({
    endPoint: env.MINIO_ENDPOINT,
    port: parseInt(env.MINIO_PORT),
    useSSL: Boolean(env.MINIO_SSL),
    accessKey: env.MINIO_ACCESS_KEY,
    secretKey: env.MINIO_SECRET_KEY,
  });

  const bucketName = "ku-milk";

  try {
    const formData = await req.formData();
    const files = formData.getAll("file") as File[];

    if (files.length > 1) {
      return Response.json(
        { message: "Allow only 1 File upload per request" },
        { status: 400 },
      );
    }

    const file = files[0]!;
    const buffer = Buffer.from(await file.arrayBuffer());
    const resizedBuffer = await reduceImageSize({ buffer });
    const objectName = file.name;
    const fileType = file.type;

    const exists = await client.bucketExists(bucketName);

    if (!exists) {
      await client.makeBucket(bucketName);
    }

    const metaData = {
      "Content-Type": fileType,
    };

    await client.putObject(
      bucketName,
      objectName,
      resizedBuffer,
      undefined,
      metaData,
    );

    const protocol = env.MINIO_SSL ? "https://" : "http://";
    const port = ["80", "443"].includes(env.MINIO_PORT)
      ? ""
      : ":" + env.MINIO_PORT;

    return Response.json({
      dest: `${protocol}${env.MINIO_ENDPOINT}${port}/${bucketName}/${objectName}`,
    });
  } catch (err) {
    return Response.json({ message: "SOMETHING_WENT_WRONG" }, { status: 400 });
  }
};
