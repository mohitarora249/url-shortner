"use client";

import { motion } from "framer-motion"
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import Image from "next/image"
import { api } from "~/trpc/react";

type Props = {
  url: string
}

export function LinkPreviewCard({ url }: Props) {
  const { data, isFetching } = api.preview.preview.useQuery({ url });

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden p-0 m-0">
        <CardHeader>
          <CardTitle>{data ? data.title : "Loading..."}</CardTitle>
        </CardHeader>
        <CardDescription>
          {data && (
            <div className="flex gap-3">
              {data.image && (
                <Image src={data.image} alt="Preview Image" width={60} height={60} className="rounded" />
              )}
              <p>{data.description}</p>
            </div>
          )}
        </CardDescription>
      </Card>
    </motion.div>
  )
}
