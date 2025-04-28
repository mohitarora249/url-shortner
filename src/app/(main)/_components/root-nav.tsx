"use client";

import Link from "next/link"
import { cn } from "~/lib/utils"
import GoogleLogin from "~/components/google-login";
import { useSession } from "next-auth/react";

const RootNav = () => {
  const session = useSession();
  
  if (session.data?.user.id) return null;

  return (
    <div className="flex flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4 max-w-full mx-4 md:max-w-screen-lg md:mx-auto">
          <MainNav className="mx-0 md:mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <GoogleLogin showLogo={false} text="Login" />
          </div>
        </div>
      </div>
    </div>
  )
}

function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link href="/" className="cursor-pointer">
        <div className="text-lg font-extrabold tracking-wide">
        <span>Link</span>
        <span className="text-brand-purple">Lift</span>
        </div>
      </Link>
    </nav>
  )
}

export default RootNav;
