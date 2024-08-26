"use server";
import { checkAdminAuth } from "@/libs/checkAdminAuth";
import { uploadFile as _uploadFile } from "@/libs/uploadFile";
import { getServerAuthSession } from "@/server/auth";

export const uploadFile = async (
  formData: FormData,
): Promise<[string | null, string | null]> => {
  const session = await getServerAuthSession();
  try {
    const email = session?.user?.email ?? "";
    const status = await checkAdminAuth(email);
    if (status === "NOT_AUTHORIZED") {
      return [null, "NOT_AUTHORIZED"];
    }

    const { dest } = await _uploadFile(formData);
    return [dest, null];
  } catch (err) {
    return [null, "SOMETHING_WENT_WRONG"];
  }
};
