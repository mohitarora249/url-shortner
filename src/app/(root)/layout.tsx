import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import TopNav from "./_components/top-nav";

type Props = { children: React.ReactNode };

const Layout = async ({ children }: Props) => {
  // const session = await getServerAuthSession();
  // if (!session?.user.id) redirect("/");
  return (
    <div className="h-full flex flex-col w-full">
      <TopNav />
      <div className="flex-1 h-full mt-4">{children}</div>
    </div>
  );
}

export default Layout;