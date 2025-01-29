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
      className="h-full"
    >
      {isFetching && !isFetched && <LinkListSkeleton />}
      {data?.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4 flex justify-center text-gray-500"
        >
          No links available
        </motion.div>
      )}
      {isFetched && data && (
        <AnimatePresence>
          {data.map((item) => (
            <LinkItem key={item.id} linkType={linkType} {...item} />
          ))}
        </AnimatePresence>
      )}
    </motion.div>
  )
}

export default LinksList
