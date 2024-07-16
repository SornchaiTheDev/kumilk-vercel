import { adminRoute, router } from "@/server/api/trpc";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  quantity: z.number(),
  price: z.number().min(1),
  image: z.string(),
});

export const productRouter = router({
  create: adminRoute.input(productSchema).mutation(async ({ ctx, input }) => {
    try {
      const product = await ctx.db.product.create({
        data: {
          ...input,
        },
      });
      return product;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "PRODUCT_ALREADY_EXIST",
          });
        }
      }
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
  update: adminRoute
    .input(productSchema.and(z.object({ id: z.string() })))
    .mutation(async ({ ctx, input }) => {
      const { id, name, description, quantity, price, image } = input;
      try {
        const product = await ctx.db.product.update({
          where: {
            id,
          },
          data: {
            name,
            description,
            quantity,
            price,
            image,
          },
        });
        return product;
      } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
          if (err.code === "P2002") {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "PRODUCT_ALREADY_EXIST",
            });
          }
        }
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  delete: adminRoute
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      try {
        const product = await ctx.db.product.delete({
          where: {
            id,
          },
        });
        return product;
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  deleteMany: adminRoute
    .input(z.object({ ids: z.string().array() }))
    .mutation(async ({ ctx, input }) => {
      const { ids } = input;
      try {
        const product = await ctx.db.product.deleteMany({
          where: {
            id: {
              in: ids,
            },
          },
        });
        return product;
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  list: adminRoute
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
