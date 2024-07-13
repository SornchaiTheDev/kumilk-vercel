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
  list: publicProcedure
    .input(z.object({ search: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const { search } = input;
      try {
        const products = await ctx.db.product.findMany({
          where: {
            name: {
              contains: search,
            },
          },
          select: {
            name: true,
            image: true,
            price: true,
            description: true,
          },
        });
        return products;
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "SOMETHING_WENT_WRONG",
        });
      }
    }),
});
