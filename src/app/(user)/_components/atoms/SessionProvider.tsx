"use client";

import type { Session } from "next-auth";
import { SessionProvider as AuthSessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
  session: Session | null;
}

function SessionProvider({ children, session }: Props) {
  return <AuthSessionProvider {...{ session }}>{children}</AuthSessionProvider>;
}

export default SessionProvider;
