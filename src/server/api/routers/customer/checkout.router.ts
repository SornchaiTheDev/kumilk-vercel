import { publicProcedure } from "@/server/api/trpc";
import type { Prisma } from "@prisma/client";
import { z } from "zod";

type OrderItem = Prisma.OrderItemGetPayload<{
  select: {
    productName: true;
    productPrice: true;
    quantity: true;
  };
}>;

const itemSchema = z.object({
  name: z.string(),
  price: z.number().min(1),
  quantity: z.number().min(1),
});

const checkoutSchema = z.object({
  email: z.string().email(),
  total: z.number().min(1),
  items: z.array(itemSchema).min(1),
});

export const checkoutProcedure = publicProcedure
  .input(checkoutSchema)
  .mutation(async ({ ctx, input }) => {
    const { email, total, items } = input;

    const moddedItems: OrderItem[] = items.map(({ name, price, quantity }) => ({
      productName: name,
      productPrice: price,
      quantity,
    }));

    await ctx.db.orderHistory.create({
      data: {
        isPaid: false,
        date: new Date(),
        total,
        customer: {
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
  });
