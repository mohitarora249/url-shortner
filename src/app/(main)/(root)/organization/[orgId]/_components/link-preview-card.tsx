"use client";

import { motion } from "framer-motion"
import { Card } from "~/components/ui/card"
import Image from "next/image"
import { api } from "~/trpc/react"
import { Skeleton } from "~/components/ui/skeleton"

type Props = {
    url: string
}

export function LinkPreviewCard({ url }: Props) {

    const { data, isFetching } = api.preview.useQuery({ url });

    return (
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Card className="overflow-hidden w-48 h-48">
                {isFetching ? <Skeleton className="w-48 h-48 rounded" /> : null}
                {data && (
                    <div className="flex gap-3">
                        {data.image && (
                            <Image src={data.image} alt="Preview Image" width={60} height={60} className="rounded" />
                        )}
                        <p>{data.description}</p>
                    </div>
                )}
            </Card>
        </motion.div>
    )
}
