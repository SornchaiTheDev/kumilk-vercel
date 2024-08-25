import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";

import { env } from "@/env";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";
import Email from "next-auth/providers/email";
import { sendVerificationRequest } from "./utils/sendVerificationRequest";
import type { Adapter } from "next-auth/adapters";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id: string;
  }
}

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  pages: {
    verifyRequest: "/auth/verify-email",
  },
  providers: [
    Google({
      clientId: env.NEXTAUTH_GOOGLE_ID,
      clientSecret: env.NEXTAUTH_GOOGLE_SECRET ?? "THIS-IS-NOT-SECRET",
    }),
    Email({
      server: {
        host: env.SMTP_HOST,
        port: Number(env.SMTP_PORT),
        auth: {
          user: env.SMTP_AUTH_USERNAME,
          pass: env.SMTP_AUTH_PASSWORD,
        },
      },
      from: "no-reply@ku-milk.com",
      sendVerificationRequest,
    }),
  ],
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl + "/auth/create-account";
    },

    async session({ session, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user.id = user.id;

      return session;
    },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
