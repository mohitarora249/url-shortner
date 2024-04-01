"use client";

import Link from "next/link";
import { cn } from "~/lib/utils";
import GoogleLogin from "~/components/google-login";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

const RootNav = () => {
  const session = useSession();

  if (session.data?.user.id) return null;

  return (
    <div className="flex flex-col">
      <div className="border-b">
        <div className="mx-2 flex h-16 max-w-full items-center px-0 md:mx-auto md:max-w-screen-lg md:px-4">
          <MainNav className="mx-0 md:mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <motion.div
              initial={{ x: "100vw" }}
              animate={{ x: 0 }}
              transition={{ duration: 1, type: "spring" }}
              whileHover={{
                rotateX: 360,
                scaleX: 1.3,
                scaleY: 1.3,
              }}
            >
              <GoogleLogin showLogo={false} text="Login" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link href="/" className="cursor-pointer">
        <motion.div
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{ duration: 1, type: "spring" }}
          whileHover={{
            rotateX: 360,
            scaleX: 1.3,
            scaleY: 1.3,
          }}
          className="text-xl font-extrabold tracking-wide"
        >
          <span>Link</span>
          <span className="text-blue-500">Lift</span>
        </motion.div>
      </Link>
    </nav>
  );
}

export default RootNav;
