import { adminRoute, router } from "@/server/api/trpc";
import { z } from "zod";
export const orderRouter = router({
  list: adminRoute
    .input(
      z.object({
        page: z.number().default(1),
        limit: z.number().default(10),
        search: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page, limit, search } = input;
      const [histories, count] = await ctx.db.$transaction([
        ctx.db.orderHistory.findMany({
          where: {
            OR: [
              {
                customer: {
                  email: search,
                },
              },
            ],
          },
          take: limit,
          skip: page * limit,
          orderBy: {
            date: "desc",
          },
          include: {
            items: true,
          },
        }),
        ctx.db.orderHistory.count({
          where: {
            OR: [
              {
                customer: {
                  email: search,
                },
              },
            ],
          },
          orderBy: {
            date: "desc",
          },
        }),
      ]);
      return { histories, pageCount: Math.ceil(count / limit) };
    }),
});
