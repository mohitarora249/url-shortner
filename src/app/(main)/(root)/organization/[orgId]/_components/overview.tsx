"use client";

import { useParams } from "next/navigation";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";

const Overview = () => {
  const params = useParams();
  const orgId = params.orgId as string;
  const { data: analytics = [], isFetching } =
    api.analytics.getByOrgId.useQuery({
      orgId,
    });

  return (
    <ResponsiveContainer width="100%" height={550}>
      {isFetching ? (
        <div className="flex h-96 justify-center space-x-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <Skeleton key={item} className="h-full w-20" />
          ))}
        </div>
      ) : (
        <BarChart
          data={analytics}
          margin={{
            bottom: 50,
          }}
        >
          <XAxis
            dataKey="formattedDate"
            label={{
              value: "Date",
              position: "insideBottom",
              offset: -10,
            }}
          />
          <YAxis
            label={{
              value: "Links viewed",
              angle: -90,
              position: "inside",
            }}
          />
          <Bar
            dataKey="viewCount"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
        </BarChart>
      )}
    </ResponsiveContainer>
  );
};

export default Overview;
