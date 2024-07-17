import { addProductSchema } from "@/schemas/addProduct";
import { editProductSchema } from "@/schemas/editProduct";
import { adminRoute, router } from "@/server/api/trpc";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import * as Minio from "minio";
import { env } from "@/env";

export const productRouter = router({
  create: adminRoute
    .input(addProductSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const product = await ctx.db.product.create({
          data: {
            name: input.name,
            description: input.description ?? "",
            quantity: input.quantity,
            price: input.price,
            image: input.image,
            isVisible: input.isVisible,
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
    .input(editProductSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, name, description, quantity, price, image, isVisible } =
        input;
      console.log(input);

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
            isVisible,
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

        if (product !== null) {
          const objectName = product.image.split("ku-milk/")[1] ?? "";

          const client = new Minio.Client({
            endPoint: env.MINIO_ENDPOINT,
            port: parseInt(env.MINIO_PORT),
            useSSL: Boolean(env.MINIO_SSL),
            accessKey: env.MINIO_ACCESS_KEY,
            secretKey: env.MINIO_SECRET_KEY,
          });

          const bucketName = "ku-milk";

          await client.removeObject(bucketName, objectName);
        }

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
        const products = await ctx.db.product.findMany({
          where: {
            id: {
              in: ids,
            },
          },
        });

        for (const product of products) {
          const objectName = product.image.split("ku-milk/")[1] ?? "";
          console.log(objectName);

          const client = new Minio.Client({
            endPoint: env.MINIO_ENDPOINT,
            port: parseInt(env.MINIO_PORT),
            useSSL: Boolean(env.MINIO_SSL),
            accessKey: env.MINIO_ACCESS_KEY,
            secretKey: env.MINIO_SECRET_KEY,
          });

          const bucketName = "ku-milk";

          await client.removeObject(bucketName, objectName);
        }

        await ctx.db.product.deleteMany({
          where: {
            id: {
              in: ids,
            },
          },
        });

        return "success";
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  toggleVisible: adminRoute
    .input(z.object({ ids: z.string().array() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const products = await ctx.db.product.findMany({
          where: {
            id: {
              in: input.ids,
            },
          },
        });

        const updatedProducts = products.map(({ id, isVisible }) => ({
          id,
          isVisible: !isVisible,
        }));

        for (const { id, isVisible } of updatedProducts) {
          await ctx.db.product.update({
            where: {
              id,
            },
            data: {
              isVisible,
            },
          });
        }
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
