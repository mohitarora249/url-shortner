import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { PublicLinks } from "@prisma/client";
import { isAfter } from "date-fns";
import redis from "~/server/redis";
import NotFound from "./_components/not-found";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const RedirectionPage = async ({ params }: Props) => {
  const res = await redis.get(params.slug);
  let data: PublicLinks | null = null;

  if (res) data = res as PublicLinks;
  else {
    data = await db.publicLinks.findFirst({
      where: {
        shortLink: params.slug,
      },
    });
    await redis.set(params.slug, JSON.stringify(data));
  }

  if (!data)
    return (
      <NotFound message="Looks like the link you are trying to access does not exists" />
    );

  if (
    data &&
    data.expirationTime &&
    isAfter(new Date(), new Date(data.expirationTime))
  )
    return (
      <NotFound message="Looks like the link you are trying to access is expired" />
    );

  if (data && data.isDeleted)
    return (
      <NotFound message="Looks like the link you are trying to access is removed from our system" />
    );

  if (data && data.link) redirect(data.link);

  return <div className="h-screen" />;
};

export default RedirectionPage;
