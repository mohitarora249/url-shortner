"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "~/lib/utils";
import OrganizationSwitcher from "./organization-switcher";
import UserNav from "./user-nav";

const TopNav = () => {
  const pathname = usePathname();
  return (
    <div className="flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 max-w-full items-center px-4 md:mx-auto md:max-w-screen-lg">
          <Link href="/dashboard" className="mx:2 cursor-pointer md:mx-6">
            <div className="text-lg font-extrabold tracking-wide">
              <span>Link</span>
              <span className="text-blue-500">Lift</span>
            </div>
          </Link>
          {!pathname.includes("dashboard") && <OrganizationSwitcher />}
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
    </div>
  );
};

function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn(
        "hidden items-center space-x-4 md:flex lg:space-x-6",
        className,
      )}
      {...props}
    >
      <Link
        href="/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Dashboard
      </Link>
    </nav>
  );
}

export default TopNav;
