import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../../trpc";
import { z } from "zod";

export const productRouter = router({
  getByName: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    try {
      const product = await ctx.db.product.findFirst({
        where: {
          name: input,
        },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          quantity: true,
          image: true,
        },
      });

      if (product === null) {
        throw new Error("PRODUCT_NOT_FOUND");
      }

      return product;
    } catch (err) {
      if (err instanceof Error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: err.message,
        });
      }
    }
  }),
});
