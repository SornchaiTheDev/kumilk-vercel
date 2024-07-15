import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../../trpc";
import { z } from "zod";

export const productRouter = router({
  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    try {
      const product = await ctx.db.product.findFirst({
        where: {
          id: input,
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
            id: true,
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
  search: publicProcedure
    .input(z.object({ search: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      const { search } = input;
      try {
        const products = await ctx.db.product.findMany({
          where: {
            name: {
              contains: search,
            },
          },
          select: {
            id: true,
            name: true,
            price: true,
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
