import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { Links } from "@prisma/client";
import { isAfter } from "date-fns";
import redis from "~/server/redis";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const RedirectionPage = async ({ params }: Props) => {
  const res = await redis.get(params.slug);
  let data: Links | null = null;

  if (res) data = res as Links;
  else {
    data = await db.links.findFirst({
      where: {
        shortLink: params.slug,
      },
    });
    await redis.set(params.slug, JSON.stringify(data));
  }

  if (!data) return <div className="h-screen">Link Not Found</div>;

  // if (data && data?.organizationId) {
  //   const exists = await redis.exists(data.organizationId);
  //   if (exists) await redis.incr(data.organizationId);
  //   else await redis.set(data.organizationId, 1);
  // }

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
