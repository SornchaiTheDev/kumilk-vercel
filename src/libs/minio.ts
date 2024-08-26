import { env } from "@/env";
import * as Minio from "minio";

export const client = new Minio.Client({
  endPoint: env.MINIO_ENDPOINT,
  port: parseInt(env.MINIO_PORT),
  useSSL: Boolean(env.MINIO_SSL),
  accessKey: env.MINIO_ACCESS_KEY,
  secretKey: env.MINIO_SECRET_KEY,
});

export const bucketName = "ku-milk";
