"use server";
import { auth } from "@/auth";
import { env } from "@/env";
import { checkAdminAuth } from "@/libs/checkAdminAuth";
import reduceImageSize from "@/libs/reduceImageSize";
import * as Minio from "minio";

export const uploadFile = async (
  formData: FormData,
): Promise<[string | null, string | null]> => {
  const session = await auth();
  try {
    const email = session?.user?.email ?? "";
    const status = await checkAdminAuth(email);
    if (status === "NOT_AUTHORIZED") {
      return [null, "NOT_AUTHORIZED"];
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
    const files = formData.getAll("file") as File[];

    if (files.length > 1) {
      return [null, "Allow only 1 File upload per request"];
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

    return [
      `${protocol}${env.MINIO_ENDPOINT}${port}/${bucketName}/${objectName}`,
      null,
    ];
  } catch (err) {
    return [null, "SOMETHING_WENT_WRONG"];
  }
};
