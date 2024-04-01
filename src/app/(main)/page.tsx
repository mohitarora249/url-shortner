import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import Features from "./_components/features";
import HeroSection from "./_components/hero-section";
import RootNav from "./_components/root-nav";

const Home = async () => {
  const session = await getServerAuthSession();
  if (session?.user.id) redirect("/dashboard");

  return (
    <main className="flex h-full w-full flex-col">
      <RootNav />
      <HeroSection />
      <Features />
      {/* <motion.div>Shorten links</motion.div> */}
      {/* <div className="mx-auto flex max-w-7xl flex-1 flex-col border">
        <h1 className="text-3xl">Start shortening links in one simple click</h1>
      </div> */}
    </main>
  );
};

export default Home;
