import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import axios from "axios";
import { env } from "@/env";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const res = await axios.post<{ status: string }>(
          `${env.AUTH_URL}/api/v1/auth/check`,
          {
            email: profile?.email,
          },
        );
        return res.data.status === "OK";
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
});
