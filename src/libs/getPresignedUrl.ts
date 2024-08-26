import { bucketName, client } from "@/libs/minio";

export const getPresignedUrl = async (
  path: string,
  objectName: string,
): Promise<string> => {
  const expires = 24 * 60 * 60; // 1 day;
  try {
    const url = await client.presignedGetObject(
      bucketName,
      path + objectName,
      expires,
    );
    return url;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to get presigned URL");
  }
};
