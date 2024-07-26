import { publicProcedure, router } from "@/server/api/trpc";
import type { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

type OrderItem = Prisma.OrderItemGetPayload<{
  select: {
    productName: true;
    productPrice: true;
    quantity: true;
  };
}>;

export const itemSchema = z.object({
  name: z.string(),
  price: z.number().min(1),
  quantity: z.number().min(1),
});

export const checkoutSchema = z.object({
  email: z.string().email(),
  total: z.number().min(1),
  items: z.array(itemSchema).min(1),
});

export const checkoutProcedure = router({
  createOrder: publicProcedure
    .input(checkoutSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, total, items } = input;

      const moddedItems: OrderItem[] = items.map(
        ({ name, price, quantity }) => ({
          productName: name,
          productPrice: price,
          quantity,
        }),
      );

      try {
        const order = await ctx.db.orderHistory.create({
          data: {
            isPaid: false,
            date: new Date(),
            total,
            User: {
              connectOrCreate: {
                where: {
                  email,
                },
                create: {
                  email,
                },
              },
            },
            items: {
              createMany: {
                data: moddedItems,
              },
            },
          },
        });
        return order.id;
      } catch (err) {}
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
