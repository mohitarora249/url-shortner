'use client'

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Link2, Clock, BarChart2, Lock, Zap, Globe } from 'lucide-react';
import RootNav from "./_components/root-nav";
import GoogleLogin from "~/components/google-login";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <RootNav />
      <main className="flex-1">
        <Hero />
        <Features />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

const Hero = () => (
  <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center space-y-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            Shorten, Share, Succeed
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
            Create powerful, customizable short links in seconds. Boost your online presence with LinkLift.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-sm space-y-2"
        >
          <form className="flex space-x-2">
            <Input
              className="max-w-lg flex-1"
              placeholder="Enter your long URL"
              type="url"
            />
            <Button type="submit">Shorten</Button>
          </form>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            No sign up required. Shorten your first link for free!
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

const Features = () => (
  <section className="w-full py-12 md:py-24 lg:py-32" id="features">
    <div className="container px-4 md:px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl"
      >
        Powerful Features
      </motion.h2>
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
        {[
          { icon: Link2, title: "Custom Short Links", description: "Create memorable, branded short links that reflect your identity." },
          { icon: Clock, title: "Expirable Links", description: "Set expiration dates for your links to control access over time." },
          { icon: BarChart2, title: "Advanced Analytics", description: "Track clicks, geographic data, and more with our detailed analytics." },
          { icon: Lock, title: "Secure Links", description: "Protect your links with passwords or require email verification." },
          { icon: Zap, title: "Fast Redirection", description: "Experience lightning-fast redirects for a seamless user experience." },
          { icon: Globe, title: "API Access", description: "Integrate our URL shortener into your own applications with our robust API." },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center space-y-3 text-center"
          >
            <feature.icon className="h-10 w-10 text-primary" />
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
    <div className="container px-4 md:px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl"
      >
        What Our Users Say
      </motion.h2>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {[
          { name: "Alex Johnson", role: "Marketing Manager", quote: "LinkLift has revolutionized our marketing campaigns. The analytics are incredibly insightful!" },
          { name: "Sarah Lee", role: "Content Creator", quote: "I love how easy it is to create custom short links. It's made my content sharing so much more professional." },
          { name: "Mike Brown", role: "E-commerce Owner", quote: "The API integration was a game-changer for our online store. Highly recommended!" },
        ].map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center space-y-4 text-center"
          >
            <div className="h-20 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div>
              <h3 className="text-xl font-bold">{testimonial.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
            </div>
            <p className="text-gray-600 dark:text-gray-300">"{testimonial.quote}"</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const CallToAction = () => (
  <section className="w-full py-12 md:py-24 lg:py-32" id="contact">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Ready to Get Started?
          </h2>
          <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Join thousands of satisfied users who have streamlined their link sharing with LinkLift.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-sm space-y-2"
        >
          <GoogleLogin />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Start with our free plan. No credit card required.
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="w-full py-6 bg-gray-100 dark:bg-gray-800">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-center md:text-left">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2023 LinkLift. All rights reserved.
          </p>
        </div>
        <nav className="flex gap-4">
          <Link href="#" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            Terms
          </Link>
          <Link href="#" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            Privacy
          </Link>
          <Link href="#" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            Contact
          </Link>
        </nav>
      </div>
    </div>
  </footer>
);

export default LandingPage;
