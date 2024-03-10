"use client";

import { Session } from "next-auth";
import { Toaster } from "~/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { TooltipProvider } from "~/components/ui/tooltip";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

type Props = {
  children: React.ReactNode;
  session: Session | null;
};

const Providers = ({ children, session }: Props) => {
  return (
    <SessionProvider session={session}>
      <TooltipProvider>
        <Toaster />
        {children}
        <ProgressBar height="4px" options={{ showSpinner: false }} />
      </TooltipProvider>
    </SessionProvider>
  );
};

export default Providers;
