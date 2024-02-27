import { redirect } from "next/navigation";
import { db } from "~/server/db";

type Props = {
  params: { slug: string },
  searchParams: { [key: string]: string | string[] | undefined }
}

const RedirectionPage = async ({ params }: Props) => {
  const data = await db.links.findFirst({
    where: {
      shortLink: params.slug
    }
  });

  if (data && data.link) redirect(data.link);
  if (!data) return <div className="h-screen">Link Not Found</div>;
  if (data && data.isExpired) return <div className="h-screen">Link Expired</div>;
  if (data && data.isDeleted) return <div className="h-screen">Link Deleted</div>;
  return <div className="h-screen" />;
}

export default RedirectionPage;
