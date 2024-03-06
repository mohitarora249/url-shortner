import { redirect } from "next/navigation";
import TypewriterEffect from "~/components/typewriter-effect";
import { getServerAuthSession } from "~/server/auth";
import ActionBar from "./_components/action-bar";
import CreateLinkForm from "./(root)/organization/[orgId]/_components/create-link-form";

const Home = async () => {
  const session = await getServerAuthSession();
  if (session?.user.id) redirect("/dashboard");

  return (
    <div className="mx-4 flex h-full max-w-full flex-col items-center mt-14 md:mt-0 md:justify-center md:mx-auto md:max-w-screen-lg">
      <TypewriterEffect
        className="space-y-3 md:space-y-8 tracking-wider"
        words={[
          { text: "Start", className: "text-3xl md:text-[5rem]" },
          {
            text: "shortening",
            className: "text-3xl md:text-[5rem] text-blue-500",
          },
          { text: "links", className: "text-3xl md:text-[5rem] text-blue-500" },
          { text: "in", className: "text-3xl md:text-[5rem]" },
          { text: "one", className: "text-3xl md:text-[5rem]" },
          { text: "simple", className: "text-3xl md:text-[5rem]" },
          { text: "click", className: "text-3xl md:text-[5rem]" },
        ]}
      />
      <ActionBar />
    </div>
  );
};

export default Home;
