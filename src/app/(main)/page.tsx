"use client";

import { useEffect, useState } from "react";
import { Link2, Clock, BarChart2, Lock, Zap, Globe, ArrowRight, ShieldCheck } from "lucide-react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Badge } from "~/components/ui/badge";
import { signIn, useSession } from "next-auth/react";
import CreateFreeShorternURLForm from "./_components/create-free-shortern-url-form";
import ListMyPublicURLs from "./_components/list-my-public-urls";
import { useRouter } from "next/navigation";

const Index = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <Stats />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/80 backdrop-blur-md shadow-md dark:bg-gray-900/80"
          : "bg-transparent"
        }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-purple to-brand-brightBlue"></div>
          <span className="text-xl font-bold">
            <span>Link</span>
            <span className="text-brand-purple">Lift</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          {["Features", "Pricing", "FAQ", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-foreground/80 hover:text-brand-purple transition-colors link-hover"
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          {session ? <Button
            className="button-gradient"
            onClick={() => router.push("/dashboard")}
          >
            Dashboard
          </Button> : <>
            <Button
              variant="ghost"
              className="hidden md:flex hover:text-brand-purple hover:bg-brand-softPurple/30"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            >
              Log In
            </Button>
            <Button
              className="button-gradient"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            >
              Sign Up Free
            </Button>
          </>}
        </div>
      </div>
    </motion.header>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute inset-0 hero-gradient -z-10"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-brand-brightBlue/10 rounded-full blur-3xl"></div>

      {/* Animated blobs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-brand-purple/5 rounded-full animate-blob-move"></div>
      <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-brand-brightBlue/5 rounded-full animate-blob-move" style={{ animationDelay: "4s" }}></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <Badge variant="outline" className="mb-4 px-3 py-1 border-brand-purple text-brand-purple bg-brand-softPurple/30">
              Trusted by 15,000+ users worldwide
            </Badge>

            <h1 className="mb-6 text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
              Create <span className="text-gradient">powerful links</span> that convert
            </h1>

            <p className="mb-8 text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
              Turn long, complex URLs into short, memorable links. Boost your brand
              with our advanced link shortener packed with analytics and customization.
            </p>

            <div className="max-w-md mx-auto relative">
              <CreateFreeShorternURLForm />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-12 w-full max-w-4xl"
          >
            <div className="p-6 rounded-2xl bg-white/50 backdrop-blur-sm dark:bg-gray-800/50 shadow-lg">
              <h3 className="text-sm font-medium text-center mb-4 text-foreground/70">
                Your Recent Links
              </h3>
              <div className="space-y-3">
                <ListMyPublicURLs />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center"
        >
          <span className="text-xs text-foreground/50 mb-2">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-foreground/20 flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 rounded-full bg-brand-purple"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Features = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const features = [
    {
      icon: Link2,
      title: "Custom Short Links",
      description: "Create branded links that reflect your identity and increase recognition.",
    },
    {
      icon: ShieldCheck,
      title: "Link Privacy",
      description: "Password-protect links or make them expire after specific time periods.",
    },
    {
      icon: BarChart2,
      title: "Advanced Analytics",
      description: "Track clicks, geographic data, and devices for data-driven decisions.",
    },
    {
      icon: Globe,
      title: "Global CDN",
      description: "Lightning-fast redirects worldwide with our distributed network.",
    },
    {
      icon: Zap,
      title: "API Integration",
      description: "Seamlessly integrate with your apps using our robust developer API.",
    },
    {
      icon: Clock,
      title: "Scheduled Links",
      description: "Schedule when your links become active for timed campaigns.",
    },
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background to-secondary/50 -z-10"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1 border-brand-purple text-brand-purple">
            Features
          </Badge>
          <h2 className="text-4xl font-bold mb-6">Everything you need in a link shortener</h2>
          <p className="text-lg text-foreground/70">
            Powerful tools designed to optimize your links and maximize your online presence.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full card-hover border-none">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full bg-brand-softPurple/50 dark:bg-accent p-3 w-fit">
                    <feature.icon className="h-6 w-6 text-brand-purple" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-foreground/70">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const stats = [
    { number: "15M+", label: "Links Created" },
    { number: "500M+", label: "Clicks Generated" },
    { number: "99.9%", label: "Uptime" },
    { number: "150+", label: "Countries Served" },
  ];

  return (
    <section className="py-16 bg-secondary" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <span className="text-4xl md:text-5xl font-bold text-gradient mb-2">{stat.number}</span>
              <span className="text-sm text-foreground/60">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "Marketing Director",
      company: "TechGrowth",
      testimonial: "LinkLift transformed our marketing campaigns. The analytics provided insights that helped us increase click-through rates by 40%.",
    },
    {
      name: "Michael Chen",
      position: "Content Creator",
      company: "DigitalWave",
      testimonial: "As a content creator, having branded short links has significantly improved my brand recognition and click engagement.",
    },
    {
      name: "Elena Rodriguez",
      position: "E-commerce Manager",
      company: "StyleShop",
      testimonial: "The QR code feature and analytics dashboard are game-changers. Our product links are now getting twice as many clicks.",
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-brand-purple/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-brand-brightBlue/5 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1 border-brand-purple text-brand-purple">
            Testimonials
          </Badge>
          <h2 className="text-4xl font-bold mb-6">Trusted by thousands of marketers</h2>
          <p className="text-lg text-foreground/70">
            See what our users have to say about their experience with LinkLift.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="h-full card-hover">
                <CardContent className="p-6">
                  <div className="mb-6">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 mr-1">★</span>
                    ))}
                  </div>
                  <p className="mb-6 text-foreground/80 italic">&quot;{item.testimonial}&quot;</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-purple to-brand-brightBlue flex items-center justify-center text-white font-bold">
                      {item.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-foreground/60">{item.position}, {item.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for personal use",
      features: [
        "Up to 50 links per month",
        "Basic analytics",
        "7-day link history",
        "Standard support",
      ],
      cta: "Get Started Free",
      popular: false,
    },
    {
      name: "Pro",
      price: "$12",
      period: "/month",
      description: "For growing businesses",
      features: [
        "Unlimited links",
        "Advanced analytics",
        "Custom branded domains",
        "Password protected links",
        "Priority support",
      ],
      cta: "Start Pro Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "Everything in Pro",
        "Multiple team members",
        "SSO authentication",
        "API access",
        "Dedicated account manager",
      ],
      cta: "Contact Sales",
      popular: false,
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-secondary/50" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1 border-brand-purple text-brand-purple">
            Pricing
          </Badge>
          <h2 className="text-4xl font-bold mb-6">Simple, transparent pricing</h2>
          <p className="text-lg text-foreground/70">
            Choose the plan that works best for you. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex"
            >
              <Card className={`flex flex-col h-full w-full card-hover ${plan.popular ? "border-brand-purple shadow-glow-light" : ""
                }`}>
                <CardContent className="p-6 flex-1 flex flex-col">
                  {plan.popular && (
                    <Badge className="mb-4 self-start button-gradient">Most Popular</Badge>
                  )}

                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-foreground/60">{plan.period}</span>}
                  </div>
                  <p className="text-sm text-foreground/70 mb-6">{plan.description}</p>

                  <Separator className="my-6" />

                  <ul className="mb-8 space-y-3 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <div className="mr-3 h-5 w-5 rounded-full bg-brand-softPurple/50 flex items-center justify-center">
                          <svg className="h-3 w-3 text-brand-purple" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`mt-auto ${plan.popular ? "button-gradient" : "bg-secondary hover:bg-secondary/80"}`}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [openItem, setOpenItem] = useState<number | null>(0);

  const faqs = [
    {
      question: "How long do shortened links last?",
      answer: "Free links last for 30 days. Pro and Enterprise links never expire unless you set an expiration date manually."
    },
    {
      question: "Can I customize my short links?",
      answer: "Yes! Pro and Enterprise plans allow you to create custom branded links with your own domain and custom slugs."
    },
    {
      question: "What analytics do you provide?",
      answer: "We provide click counts, geographic data, referrer information, device types, and time-based analytics. Pro and Enterprise plans include more detailed analytics."
    },
    {
      question: "Is there an API available?",
      answer: "No, as of now we do not offer APIs."
    },
    {
      question: "How secure are the shortened links?",
      answer: "Very secure! We use HTTPS for all links and offer additional security features like password protection and email verification for Pro and Enterprise plans."
    }
  ];

  return (
    <section id="faq" className="py-24" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1 border-brand-purple text-brand-purple">
            FAQ
          </Badge>
          <h2 className="text-4xl font-bold mb-6">Frequently asked questions</h2>
          <p className="text-lg text-foreground/70">
            Everything you need to know about LinkLift.
          </p>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-border">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="py-6"
            >
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => setOpenItem(openItem === index ? null : index)}
              >
                <h3 className="text-lg font-medium">{faq.question}</h3>
                <div className={`ml-2 flex-shrink-0 h-5 w-5 rounded-full border border-brand-purple flex items-center justify-center transition-transform duration-200 ${openItem === index ? "rotate-45" : ""
                  }`}>
                  <span className="block h-0.5 w-3 bg-brand-purple absolute"></span>
                  <span className={`block h-3 w-0.5 bg-brand-purple absolute transition-opacity duration-200 ${openItem === index ? "opacity-0" : ""
                    }`}></span>
                </div>
              </button>
              <AnimatePresence>
                {openItem === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-foreground/70">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 to-brand-brightBlue/10 -z-10"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to <span className="text-gradient">supercharge</span> your links?
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-2xl mx-auto">
              Join thousands of marketers, content creators, and businesses who trust LinkLift
              to power their link optimization strategy.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button size="lg" className="button-gradient px-8 py-6 text-lg">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                View Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-secondary pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-purple to-brand-brightBlue"></div>
              <span className="text-xl font-bold">
                <span>Link</span>
                <span className="text-brand-purple">Lift</span>
              </span>
            </div>
            <p className="text-foreground/70 max-w-xs mb-6">
              Powerful link shortening and management tools for marketers, businesses, and individuals.
            </p>
            <div className="flex space-x-4">
              {["Twitter", "LinkedIn", "Facebook", "Instagram"].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-10 w-10 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-brand-softPurple/30 hover:border-brand-purple transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <div className="h-5 w-5 rounded bg-foreground/30"></div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {["Features", "Pricing", "API", "Integrations", "Documentation"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-foreground/70 hover:text-brand-purple transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {["About", "Contact"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-foreground/70 hover:text-brand-purple transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {["Terms", "Privacy", "Cookies"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-foreground/70 hover:text-brand-purple transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/60">
            © 2025 LinkLift. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-sm text-foreground/60 hover:text-brand-purple transition-colors">
              Status: All systems operational
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Index;
