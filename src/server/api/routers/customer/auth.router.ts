import { customerRoute, publicProcedure, router } from "@/server/api/trpc";
import { z } from "zod";
import { hash, compare } from "bcrypt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";

export const authRouter = router({
  signup: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;

      try {
        const encryptedPassword = await hash(password, 10);

        const user = await ctx.db.customer.create({
          data: {
            email,
            password: encryptedPassword,
          },
        });

        return user;
      } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
          if (err.code === "P2002") {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "USER_ALREADY_EXIST",
            });
          }
        }
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  createAccount: customerRoute
    .input(
      z.object({
        email: z.string().email(),
        firstName: z.string(),
        lastName: z.string(),
        phoneNumber: z.string().min(9).max(10),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { firstName, lastName, phoneNumber, email } = input;

      try {
        await ctx.db.customer.update({
          where: {
            email,
          },
          data: {
            firstName,
            lastName,
            phoneNumber,
          },
        });
        return "success";
      } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
        }
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  signIn: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;
      try {
        const user = await ctx.db.customer.findUnique({
          where: {
            email,
          },
        });

        if (user === null) {
          throw new Error("USER_NOT_FOUND");
        }

        const { password: encryptedPassword } = user;

        if (encryptedPassword === null) {
          throw new Error("USER_NOT_USE_EMAIL_METHOD");
        }

        return compare(password, encryptedPassword);
      } catch (err) {
        if (err instanceof Error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: err.message,
          });
        }
      }
    }),
});
