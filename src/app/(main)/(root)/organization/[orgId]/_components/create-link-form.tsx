"use client"

import { motion } from "framer-motion"
import { useParams } from "next/navigation"
import { Button } from "~/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import useCreateLink from "~/hooks/use-create-link"
import { Loader2, MoreVertical } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "~/components/ui/dropdown-menu"
import useClipboard from "~/hooks/common/use-clipboard"
import { api } from "~/trpc/react"
import { toast } from "sonner"

const CreateLinkForm = () => {
  const params = useParams()
  const orgId = params.orgId as string
  const { form, onSubmit, isLoading } = useCreateLink({ orgId })
  const { copyToClipboard } = useClipboard()

  const { mutate: createApiKey, isPending } = api.apiKeyMgmt.create.useMutation({
    onSuccess: async () => {
      await refetch()
      toast.success("API key created")
    },
    onError: () => {
      toast.error("Error occurred while creating API key")
    },
  })

  const { data: organization, refetch } = api.organization.getById.useQuery(
    {
      id: orgId,
    },
    { enabled: !!orgId }
  )

  const createApiKeyHdlr = () => {
    createApiKey({ orgId })
  }

  const copyApiKey = () => {
    copyToClipboard("" + organization.apiKey)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex w-full space-x-4"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-4 flex w-full space-x-4">
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input className="rounded-full" placeholder="https://www.linklift.in" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expiration"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="min-w-max rounded-full">
                      <SelectValue placeholder="No Expiration" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="5_MIN">5 minutes</SelectItem>
                    <SelectItem value="15_MIN">15 minutes</SelectItem>
                    <SelectItem value="1_HR">1 hour</SelectItem>
                    <SelectItem value="24_HR">24 hours</SelectItem>
                    <SelectItem value="NO_EXP">No Expiration</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button className="rounded-full" disabled={isLoading} type="submit">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </form>
      </Form>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={createApiKeyHdlr} disabled={isPending || !!organization?.apiKey}>
            Create API Key
          </DropdownMenuItem>
          <DropdownMenuItem disabled={isPending || !organization?.apiKey} onClick={copyApiKey}>
            Copy API Key
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  )
}

export default CreateLinkForm
