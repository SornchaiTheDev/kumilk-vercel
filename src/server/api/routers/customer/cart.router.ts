import _ from "lodash";
import { publicProcedure, router } from "../../trpc";
import { z } from "zod";

export const cartRouter = router({
  cartMapPrice: publicProcedure
    .input(
      z.array(
        z.object({
          id: z.string(),
          quantity: z.number(),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      const products = await ctx.db.product.findMany({
        where: {
          id: {
            in: input.map((item) => item.id),
          },
        },
        select: {
          id: true,
          name: true,
          price: true,
        },
      });
      return {
        items: products.map((item) => {
          const newItem = input.find((i) => i.id === item.id);
          return {
            ...item,
            quantity: newItem?.quantity ?? 0,
            totalPrice: item.price * (newItem?.quantity ?? 1),
          };
        }),
        totalPrice: _.sumBy(products, (item) => {
          const newItem = input.find((i) => i.id === item.id);
          return item.price * (newItem?.quantity ?? 1);
        }),
      };
    }),
});
