"use client";

import { useParams } from "next/navigation";
import { api } from "~/trpc/react";
import LinkItem from "./link-item";

const LinksList = () => {
  const params = useParams();
  const orgId = params.orgId as string;
  const { data, isFetching, isFetched } = api.links.getAllAvailableLinksByOrgId.useQuery(
    { orgId },
    { enabled: !!orgId }
  );

  return (
    <div className="h-full">
      {isFetching && !isFetched && <div>Fetching data</div>}
      {isFetched && data && <div className="flex flex-col p-4 pt-0">
        {data.map((item) => <LinkItem {...item} />)}
      </div>}
    </div>
  )
}

export default LinksList;