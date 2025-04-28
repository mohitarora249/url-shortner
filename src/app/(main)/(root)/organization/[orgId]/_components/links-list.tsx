
"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useParams } from "next/navigation"
import { api } from "~/trpc/react"
import LinkItem from "./link-item"
import { LinkType } from "~/types"
import LinkListSkeleton from "./link-list-skeleton"

type Props = {
  linkType?: LinkType
}

const LinksList = ({ linkType = "active" }: Props) => {
  const params = useParams()
  const orgId = params.orgId as string

  const { data, isFetching, isFetched } = api.links.getAllAvailableLinksByOrgId.useQuery(
    { orgId, linkType, page: 0 },
    { enabled: !!orgId }
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full w-full max-w-4xl mx-auto px-4 py-6 space-y-4"
    >
      {isFetching && !isFetched && <LinkListSkeleton />}
      {data?.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 p-8 bg-gray-50 rounded-lg border border-gray-100"
        >
          <p className="text-lg font-medium text-gray-500">No links available</p>
          <p className="text-sm text-gray-400">Create your first shortened link above</p>
        </motion.div>
      )}
      {isFetched && data && (
        <AnimatePresence mode="popLayout">
          <div className="space-y-4">
            {data.map((item) => (
              <LinkItem key={item.id} linkType={linkType} {...item} />
            ))}
          </div>
        </AnimatePresence>
      )}
    </motion.div>
  )
}

export default LinksList