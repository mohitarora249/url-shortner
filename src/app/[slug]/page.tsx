import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { Links } from "@prisma/client";
import { isAfter } from "date-fns";
import redis from "~/server/redis";
import NotFound from "./_components/not-found";
import sendEvent from "~/lib/tinybird";

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

  await sendEvent({ timestamp: new Date().toISOString(), session_id: "", action: "link_view", payload: { orgId: data.organizationId, link: data.link }});

  if (data && data.link) redirect(data.link);

  return <div className="h-screen" />;
};

export default RedirectionPage;
