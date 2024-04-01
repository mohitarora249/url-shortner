"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "~/components/ui/button";

const HeroSection = () => {
  const router = useRouter();
  return (
    <div className="mt-12 flex min-h-full flex-col text-center md:mx-auto md:max-w-screen-sm">
      <motion.h1
        initial={{ x: "-100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, type: "spring" }}
        className="text-[3rem] font-bold"
      >
        Create Short Links Effortlessly
      </motion.h1>
      <div className="mt-12 flex justify-center space-x-8">
        <motion.button
          initial={{ x: "-100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className={buttonVariants({ variant: "outline" })}
          onClick={() => router.push("#features", { scroll: true })}
        >
          Explore Features
        </motion.button>
        <motion.button
          initial={{ x: "100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className={buttonVariants()}
        >
          Get Started
        </motion.button>
      </div>
    </div>
  );
};

export default HeroSection;
