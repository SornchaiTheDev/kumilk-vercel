import { loginSchema } from "@/schemas/login";
import { publicProcedure, router } from "@/server/api/trpc";

export const postRouter = router({
  login: publicProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    return "OK";
  }),
});
