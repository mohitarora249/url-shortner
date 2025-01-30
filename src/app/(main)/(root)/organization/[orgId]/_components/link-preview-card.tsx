"use client";

import { motion } from "framer-motion"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import { api } from "~/trpc/react";

type Props = {
  url: string
}

export function LinkPreviewCard({ url }: Props) {
  const { data, isFetching } = api.preview.preview.useQuery({ url });

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden">
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
        <CardFooter>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
          </a>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
