import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Link2, Clock, BarChart2, Lock, Zap, Globe } from "lucide-react";
import RootNav from "./_components/root-nav";
import GoogleLogin from "~/components/google-login";

const LandingPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <RootNav />
      <main className="flex-1">
        <section className="w-full py-12 md:mx-auto md:max-w-screen-lg md:justify-center md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Shorten, Share, Succeed
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Create powerful, customizable short links in seconds. Boost
                  your online presence with LinkSnip.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
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
              </div>
            </div>
          </div>
        </section>
        <section
          className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32"
          id="features"
        >
          <div className="container px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
              Powerful Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 text-center">
                <Link2 className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Custom Short Links</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Create memorable, branded short links that reflect your
                  identity.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <Clock className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Expirable Links</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Set expiration dates for your links to control access over
                  time.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <BarChart2 className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Advanced Analytics</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Track clicks, geographic data, and more with our detailed
                  analytics.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <Lock className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Secure Links</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Protect your links with passwords or require email
                  verification.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <Zap className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Fast Redirection</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Experience lightning-fast redirects for a seamless user
                  experience.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <Globe className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">API Access</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Integrate our URL shortener into your own applications with
                  our robust API.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32"
          id="contact"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Get Started?
                </h2>
                <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of satisfied users who have streamlined their
                  link sharing with LinkSnip.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <GoogleLogin />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Start with our free plan. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
