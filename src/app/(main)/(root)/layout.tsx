import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import TopNav from "./_components/top-nav";
import RootNav from "../_components/root-nav";

type Props = { children: React.ReactNode };

const Layout = async ({ children }: Props) => {
  const session = await getServerAuthSession();
  if (!session?.user.id) redirect("/");

  return (
    <div className="flex h-full w-full flex-col">
      {session?.user.id ? <TopNav /> : <RootNav />}
      <div className="mt-4 h-full flex-1">{children}</div>
    </div>
  );
};

export default Layout;
