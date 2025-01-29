"use client"
import React from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle } from "~/components/ui/card"
import JazzIcon from "~/components/jazz-icon"

type Props = {
  orgName: string
  orgId: string
}

const OrganizationCard = ({ orgName, orgId }: Props) => {
  const router = useRouter()
  const organizationCardClickHandler = () => {
    router.push(`/organization/${orgId}`)
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Card onClick={organizationCardClickHandler} className="cursor-pointer transition-shadow hover:shadow-lg">
        <CardHeader className="p-4">
          <CardTitle className="flex items-center space-x-4">
            <JazzIcon text={orgName} className="flex items-center" diameter={48} />
            <span className="text-lg font-semibold">{orgName}</span>
          </CardTitle>
        </CardHeader>
      </Card>
    </motion.div>
  )
}

export default OrganizationCard

