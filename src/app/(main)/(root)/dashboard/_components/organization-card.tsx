
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
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Card 
        onClick={organizationCardClickHandler} 
        className="cursor-pointer bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300"
      >
        <CardHeader className="p-6">
          <CardTitle className="flex items-center gap-4">
            <JazzIcon text={orgName} className="flex items-center" diameter={48} />
            <span className="text-xl font-semibold">{orgName}</span>
          </CardTitle>
        </CardHeader>
      </Card>
    </motion.div>
  )
}

export default OrganizationCard