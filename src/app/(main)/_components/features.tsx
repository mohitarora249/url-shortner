"use client";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";

const Features = () => {
  return (
    <AnimatePresence>
      <motion.div
        id="features"
        className="flex min-h-full w-full flex-col items-center justify-center space-y-4 pt-10"
      >
        <motion.h1
          initial={{ x: "-100vh", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-[3rem] font-bold"
        >
          Unleash the Power of Our Features
        </motion.h1>
        <motion.h2
          initial={{ x: "-100vh", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-[1rem]"
        >
          Discover How Our Tools Can Transform Your Workflow and Boost
          Productivity
        </motion.h2>
        <motion.div
          initial={{ x: "100vh", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex w-full items-center justify-center"
        >
          <Card className="grid w-3/5 grid-cols-3 divide-x">
            <div className="divide-y">
              <div className="h-20 cursor-pointer p-4">Create Short Links</div>
              <div className="h-20 cursor-pointer p-4">Expirable Links</div>
              <div className="h-20 cursor-pointer p-4">Realtime Aanlytics</div>
            </div>
            <div className="col-span-2">
              <CardHeader>
                <CardTitle>Short Links</CardTitle>
              </CardHeader>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Features;
