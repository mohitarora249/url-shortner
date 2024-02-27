"use client";

import { Session } from "next-auth";
import { Toaster } from "~/components/ui/sonner"
import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
  session: Session | null
}

const Providers = ({ children, session }: Props) => {
  return (
    <SessionProvider session={session}>
      <Toaster />
      {children}
    </SessionProvider>
  );
}

export default Providers;
