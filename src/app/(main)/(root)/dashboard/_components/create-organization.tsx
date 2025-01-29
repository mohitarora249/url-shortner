"use client"
import React from "react";
import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { api } from "~/trpc/react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"

const CreateOrganization = () => {
  const [orgName, setOrgName] = useState("")
  const [open, setOpen] = useState(false)

  const orgNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrgName(e.target.value)
  }

  const { mutate: createOrganization, isLoading } = api.organization.create.useMutation({
    onSuccess: () => {
      toast.success(`${orgName} organization created`)
      setOrgName("")
      setOpen(false)
    },
  })

  const createOrgHandler = () => {
    if (orgName.trim()) {
      createOrganization({ name: orgName })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button size="lg" className="text-lg">
            Create your first Organization
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create Organization</DialogTitle>
          <DialogDescription className="text-lg">Enter a name for your new organization</DialogDescription>
        </DialogHeader>
        <div className="mt-6 space-y-4">
          <Input placeholder="Organization name" className="text-lg" onChange={orgNameChangeHandler} value={orgName} />
          <Button disabled={isLoading || !orgName.trim()} className="w-full text-lg" onClick={createOrgHandler}>
            {isLoading ? "Creating..." : "Create Organization"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateOrganization

