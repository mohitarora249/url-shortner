import { motion } from "framer-motion"
import { Skeleton } from "~/components/ui/skeleton"

const OrganizationListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array(6)
        .fill(0)
        .map((_, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Skeleton className="h-20 w-full rounded-lg" />
          </motion.div>
        ))}
    </div>
  )
}

export default OrganizationListSkeleton

