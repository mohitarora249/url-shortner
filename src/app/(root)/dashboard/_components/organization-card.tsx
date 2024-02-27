"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import JazzIcon from "~/components/jazz-icon";

type Props = {
  orgName: string;
  orgId: string;
}

const OrganizationCard = ({ orgName, orgId }: Props) => {
  const router = useRouter();
  const organizationCardClickHandler = () => {
    router.push(`/organization/${orgId}`)
  }

  return (
    <Card onClick={organizationCardClickHandler} className="cursor-pointer">
      <CardHeader className="p-2">
        <CardTitle className="flex items-center space-x-4">
          <JazzIcon text={orgName} className="flex items-center" diameter={40} />
          <span>{orgName}</span>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export default OrganizationCard;