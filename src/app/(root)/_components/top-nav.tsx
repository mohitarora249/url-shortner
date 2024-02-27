"use client";

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";
import { cn } from "~/lib/utils"
import OrganizationSwitcher from "./organization-switcher"
import UserNav from "./user-nav"

const TopNav = () => {
  const pathname = usePathname();
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4 max-w-full mx-4 md:max-w-screen-lg md:mx-auto">
          {!pathname.includes("dashboard") && <OrganizationSwitcher />}
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
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
      <Link
        href="/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Dashboard
      </Link>
    </nav>
  )
}

export default TopNav;
