import * as Minio from "minio";
import reduceImageSize from "@/libs/reduceImageSize";
import { env } from "@/env";

export const uploadFile = async (formData: FormData, objectDir = "public/") => {
  const client = new Minio.Client({
    endPoint: env.MINIO_ENDPOINT,
    port: parseInt(env.MINIO_PORT),
    useSSL: Boolean(env.MINIO_SSL),
    accessKey: env.MINIO_ACCESS_KEY,
    secretKey: env.MINIO_SECRET_KEY,
  });

  const bucketName = "ku-milk";

  const files = formData.getAll("file") as File[];

  if (files.length > 1) {
    throw new Error("Allow only 1 File upload per request");
  }

  const file = files[0]!;
  const buffer = Buffer.from(await file.arrayBuffer());
  const resizedBuffer = await reduceImageSize({ buffer });
  const objectName = file.name;
  const objectPath = objectDir + objectName;
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
    objectPath,
    resizedBuffer,
    undefined,
    metaData,
  );

  const protocol = env.MINIO_SSL ? "https://" : "http://";
  return `${protocol}${env.MINIO_ENDPOINT}/${bucketName}/${objectPath}`;
};
