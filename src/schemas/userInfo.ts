import { z } from "zod";

export const userInfoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string().min(9).max(10),
});

export type TUserInfo = z.infer<typeof userInfoSchema>;
