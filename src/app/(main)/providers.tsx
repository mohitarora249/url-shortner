"use client";

import { Session } from "next-auth";
import { Toaster } from "~/components/ui/sonner"
import { SessionProvider } from "next-auth/react";
import { TooltipProvider } from "~/components/ui/tooltip";

type Props = {
  children: React.ReactNode;
  session: Session | null
}

const Providers = ({ children, session }: Props) => {
  return (
    <SessionProvider session={session}>
      <TooltipProvider>
        <Toaster />
        {children}
      </TooltipProvider>
    </SessionProvider>
  );
}

export default Providers;
