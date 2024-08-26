import { publicProcedure, router } from "@/server/api/trpc";
import type { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

type OrderItem = Prisma.OrderItemGetPayload<{
  select: {
    productName: true;
    productPrice: true;
    quantity: true;
    productId: true;
  };
}>;

export const itemSchema = z.object({
  name: z.string(),
  price: z.number().min(1),
  quantity: z.number().min(1),
  id: z.string(),
});

export const checkoutSchema = z.object({
  customerId: z.string(),
  total: z.number().min(1),
  items: z.array(itemSchema).min(1),
});

export const checkoutProcedure = router({
  createOrder: publicProcedure
    .input(checkoutSchema)
    .mutation(async ({ ctx, input }) => {
      const { customerId, total, items } = input;

      const moddedItems: OrderItem[] = items.map(
        ({ name, price, quantity, id }) => ({
          productName: name,
          productPrice: price,
          productId: id,
          quantity,
        }),
      );

      try {
        const products = await ctx.db.product.findMany({
          where: {
            id: {
              in: items.map((item) => item.id),
            },
          },
        });

        for (const item of items) {
          const product = products.find((p) => p.id === item.id);
          if (product === undefined) throw new Error("Product not found");
          if (product.quantity < item.quantity) {
            throw new Error("Not enough stock");
          }
        }

        for (const { id, quantity } of items) {
          await ctx.db.product.update({
            where: {
              id,
            },
            data: {
              quantity: {
                decrement: quantity,
              },
            },
          });
        }

        const order = await ctx.db.orderHistory.create({
          data: {
            isPaid: false,
            date: new Date(),
            total,
            customerId,
            items: {
              createMany: {
                data: moddedItems,
              },
            },
          },
        });

        return order.id;
      } catch (err) {
        if (err instanceof Error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: err.message,
          });
        }
      }
    }),
  orderDetail: publicProcedure
    .input(z.object({ orderId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { orderId } = input;
      try {
        const item = await ctx.db.orderHistory.findUnique({
          where: {
            id: orderId,
          },
        });
        return item;
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "SOMETHING_WENT_WRONG",
        });
      }
    }),
});
