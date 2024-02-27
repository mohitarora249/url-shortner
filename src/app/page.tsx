import { redirect } from "next/navigation";
import TypewriterEffect from "~/components/typewriter-effect";
import { getServerAuthSession } from "~/server/auth";
import ActionBar from "./_components/action-bar";

const Home = async () => {
  const session = await getServerAuthSession();
  if (session?.user.id) redirect("/dashboard");

  return (
    <div className="mx-4 flex h-screen max-w-full flex-col items-center justify-center md:mx-auto md:max-w-screen-lg">
      <TypewriterEffect
        className="space-y-8	tracking-wider"
        words={[
          { text: "Start", className: "text-xl md:text-[5rem]" },
          {
            text: "shortening",
            className: "text-xl md:text-[5rem] text-blue-500",
          },
          { text: "links", className: "text-xl md:text-[5rem] text-blue-500" },
          { text: "with", className: "text-xl md:text-[5rem]" },
          { text: "one", className: "text-xl md:text-[5rem]" },
          { text: "simple", className: "text-xl md:text-[5rem]" },
          { text: "click", className: "text-xl md:text-[5rem]" },
        ]}
      />
      <ActionBar />
    </div>
  );
};

export default Home;
