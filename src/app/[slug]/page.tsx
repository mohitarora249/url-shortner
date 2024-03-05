import Redis from "ioredis";
import { redirect } from "next/navigation";
import { env } from "~/env";
import { db } from "~/server/db";
import { Links } from "@prisma/client";
import { isAfter } from "date-fns";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const redis = new Redis(env.REDIS);

const RedirectionPage = async ({ params }: Props) => {
  const res = await redis.get(params.slug);
  let data: Links | null = null;
  if (res) {
    data = JSON.parse(res) as Links;
  } else {
    data = await db.links.findFirst({
      where: {
        shortLink: params.slug,
      },
    });
    await redis.set(params.slug, JSON.stringify(data));
  }

  if (!data) return <div className="h-screen">Link Not Found</div>;

  if (
    data &&
    data.expirationTime &&
    isAfter(new Date(), new Date(data.expirationTime))
  )
    return <div className="h-screen">Link Expired</div>;

  if (data && data.isDeleted)
    return <div className="h-screen">Link Deleted</div>;

  if (data && data.link) redirect(data.link);

  return <div className="h-screen" />;
};

export default RedirectionPage;
