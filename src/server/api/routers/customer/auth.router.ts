import { userInfoSchema } from "@/schemas/userInfo";
import { customerRoute, router } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const authRouter = router({
  createAccount: customerRoute
    .input(userInfoSchema)
    .mutation(async ({ ctx, input }) => {
      const { firstName, lastName, phoneNumber } = input;

      const user = ctx.session?.user;

      if (typeof user === "undefined" || user === null) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      if (typeof user.email === "undefined" || user.email === null) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const currentUser = await ctx.db.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (currentUser === null) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "SOMETHING_WENT_WRONG",
        });
      }

      const customerData = await ctx.db.customer.findUnique({
        where: {
          customerId: currentUser.id,
        },
      });

      if (customerData !== null) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "SOMETHING_WENT_WRONG",
        });
      }

      try {
        await ctx.db.customer.create({
          data: {
            firstName,
            lastName,
            phoneNumber,
            customerId: currentUser.id,
          },
        });
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "SOMETHING_WENT_WRONG",
        });
      }
    }),
});
