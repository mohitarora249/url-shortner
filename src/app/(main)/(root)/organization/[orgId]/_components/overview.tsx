"use client"

import { motion } from "framer-motion"
import { useParams } from "next/navigation"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Skeleton } from "~/components/ui/skeleton"
import { api } from "~/trpc/react"

const Overview = () => {
  const params = useParams()
  const orgId = params.orgId as string
  const { data: analytics = [], isFetching } = api.analytics.getByOrgId.useQuery({
    orgId,
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-[550px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        {isFetching ? (
          <div className="flex h-full items-center justify-center space-x-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <Skeleton key={item} className="h-3/4 w-8" />
            ))}
          </div>
        ) : (
          <>
            {analytics.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex h-full items-center justify-center text-gray-500"
              >
                No links visited
              </motion.div>
            ) : (
              <BarChart
                data={analytics}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
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
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Bar dataKey="viewCount" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary">
                  {analytics.map((entry, index) => (
                    <motion.rect
                      key={`bar-${index}`}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    />
                  ))}
                </Bar>
              </BarChart>
            )}
          </>
        )}
      </ResponsiveContainer>
    </motion.div>
  )
}

export default Overview

