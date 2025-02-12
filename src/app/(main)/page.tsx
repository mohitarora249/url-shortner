"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Link2, Clock, BarChart2, Lock, Zap, Globe, ArrowDown } from "lucide-react"
import RootNav from "./_components/root-nav"
import GoogleLogin from "~/components/google-login"
import { motion, useAnimation, useScroll, useTransform } from "framer-motion"
import CreateFreeShorternURLForm from "./_components/create-free-shortern-url-form"
import ListMyPublicURLs from "./_components/list-my-public-urls"
import { useInView } from "react-intersection-observer"

const LandingPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white dark:bg-gray-900 overflow-hidden">
      <RootNav />
      <main className="flex-1">
        <Hero />
        <Features />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}

const Hero = () => {
  const controls = useAnimation()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, -100])

  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } })
  }, [controls])

  return (
    <section className="w-full py-20 md:py-32 lg:py-48 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900 dark:to-gray-900" />
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-blue-200 dark:bg-blue-700 opacity-20"
              style={{
                width: `${Math.random() * 40 + 10}px`,
                height: `${Math.random() * 40 + 10}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 5}s infinite ease-in-out`,
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-8 text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={controls} className="space-y-4">
            <motion.h1
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Shorten, Share, Succeed
            </motion.h1>
            <motion.p
              className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-300 text-lg md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Create powerful, customizable short links in seconds. Boost your online presence with LinkLift.
            </motion.p>
          </motion.div>
          <motion.div
            className="w-full max-w-md space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <CreateFreeShorternURLForm />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <ListMyPublicURLs />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        style={{ y }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <ArrowDown className="w-8 h-8 text-blue-500 animate-bounce" />
      </motion.div>
    </section>
  )
}

const Features = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section className="w-full py-20 md:py-32 bg-gray-50 dark:bg-gray-800" id="features">
      <div className="container px-4 md:px-6">
        <motion.h2
          className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Powerful Features
        </motion.h2>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[
            {
              icon: Link2,
              title: "Custom Short Links",
              description: "Create memorable, branded short links that reflect your identity.",
            },
            {
              icon: Clock,
              title: "Expirable Links",
              description: "Set expiration dates for your links to control access over time.",
            },
            {
              icon: BarChart2,
              title: "Advanced Analytics",
              description: "Track clicks, geographic data, and more with our detailed analytics.",
            },
            {
              icon: Lock,
              title: "Secure Links",
              description: "Protect your links with passwords or require email verification.",
            },
            {
              icon: Zap,
              title: "Fast Redirection",
              description: "Experience lightning-fast redirects for a seamless user experience.",
            },
            {
              icon: Globe,
              title: "API Access",
              description: "Integrate our URL shortener into your own applications with our robust API.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center space-y-4 text-center group"
            >
              <motion.div
                className="rounded-full bg-blue-100 dark:bg-blue-900 p-3 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const CallToAction = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } })
    }
  }, [controls, inView])

  return (
    <section className="w-full py-20 md:py-32" id="contact">
      <div className="container px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          className="flex flex-col items-center justify-center space-y-8 text-center"
        >
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
              Ready to Get Started?
            </h2>
            <p className="max-w-[600px] text-gray-600 dark:text-gray-300 text-lg">
              Join thousands of satisfied users who have streamlined their link sharing with LinkLift.
            </p>
          </div>
          <motion.div
            className="w-full max-w-sm space-y-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <GoogleLogin />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Start with our free plan. No credit card required.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const Footer = () => (
  <footer className="w-full py-8 bg-gray-100 dark:bg-gray-800">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="text-sm text-gray-600 dark:text-gray-300">© 2025 LinkLift. All rights reserved.</p>
        </div>
        <nav className="flex gap-6">
          {["Terms", "Privacy", "Contact"].map((item, index) => (
            <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#"
                className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>
    </div>
  </footer>
)

export default LandingPage

