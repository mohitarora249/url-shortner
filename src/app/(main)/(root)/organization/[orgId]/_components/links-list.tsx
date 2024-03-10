"use client";

import { useParams } from "next/navigation";
import { api } from "~/trpc/react";
import LinkItem from "./link-item";
import { LinkType } from "~/types";

type Props = {
  linkType?: LinkType;
};

const LinksList = ({ linkType = "active" }: Props) => {
  const params = useParams();
  const orgId = params.orgId as string;

  const { data, isFetching, isFetched } =
    api.links.getAllAvailableLinksByOrgId.useQuery(
      { orgId, linkType, page: 0 },
      { enabled: !!orgId },
    );

  return (
    <div className="h-full">
      {isFetching && !isFetched && (
        <div className="mt-4 flex  justify-center">Loading</div>
      )}
      {data?.length === 0 && (
        <div className="mt-4 flex  justify-center">No links available</div>
      )}
      {isFetched && data && (
        <div className="flex flex-col p-4 pt-0">
          {data.map((item) => (
            <LinkItem linkType={linkType} key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LinksList;
