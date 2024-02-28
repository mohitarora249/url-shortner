"use client";

import Link from "next/link"
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button";
import GoogleLogin from "~/components/google-login";

const TopNav = () => {
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4 max-w-full mx-4 md:max-w-screen-lg md:mx-auto">
          <MainNav className="mx-6" />
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
          <span className="text-blue-500">Lift</span>
        </div>
      </Link>
    </nav>
  )
}

export default TopNav;
