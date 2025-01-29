"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { api } from "~/trpc/react"
import OrganizationCard from "./_components/organization-card"
import CreateOrganization from "./_components/create-organization"
import OrganizationListSkeleton from "./_components/organization-list-skeleton"

const Dashboard = () => {
  const { data, isLoading } = api.organization.getAll.useQuery()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      {isLoading && <OrganizationListSkeleton />}
      {!isLoading && data && data?.length === 0 && (
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
          <CreateOrganization />
        </div>
      )}
      {!isLoading && data && data?.length > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {data.map((org, index) => (
            <motion.div
              key={org.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <OrganizationCard orgId={org.id} orgName={org.name} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

export default Dashboard
