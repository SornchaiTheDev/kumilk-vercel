import { adminRoute, router } from "@/server/api/trpc";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";
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
  accept: adminRoute
    .input(
      z.object({
        orderId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { orderId } = input;
      try {
        await ctx.db.orderHistory.update({
          where: {
            id: orderId,
          },
          data: {
            isPaid: true,
          },
        });
      } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
          if (err.code === "P2005") {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "ORDER_NOT_FOUND",
            });
          }
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "SOMETHING_WENT_WRONG",
        });
      }
    }),
});
