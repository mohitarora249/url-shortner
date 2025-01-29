"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Links } from "@prisma/client"
import { ExternalLink, Trash2, Ban, UndoDot, Copy, Loader } from 'lucide-react'
import { Badge } from "~/components/ui/badge"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip"
import { env } from "~/env"
import { api } from "~/trpc/react"
import type { LinkType } from "~/types"
import { format } from "date-fns"
import useClipboard from "~/hooks/common/use-clipboard"
import { generateQRCode } from "~/lib/qr-code"

type Props = Links & { linkType: LinkType }

const LinkItem = ({ shortLink, id, link, linkType, expirationTime }: Props) => {
  const { copyToClipboard } = useClipboard()
  const url = `${env.NEXT_PUBLIC_BASE_URL}/${shortLink}`
  const onExternalLinkClickHandler = () => window.open(url)
  const { links } = api.useUtils()
  const [qrCode, setQrCode] = useState<string | null>(null)

  const { mutate: deleteLinkById } = api.links.deleteById.useMutation({
    onSuccess: () => {
      toast.success("Link deleted")
      links.invalidate()
    },
    onError: () => toast.error("Error occurred while deleting link"),
  })
  const { mutate: expireLinkById } = api.links.expireById.useMutation({
    onSuccess: () => {
      toast.success("Link expired")
      links.invalidate()
    },
    onError: () => toast.error("Error occurred while expiring link"),
  })
  const { mutate: activateLinkById } = api.links.markLinkActiveFromDeletedById.useMutation({
    onSuccess: () => {
      toast.success("Link activated")
      links.invalidate()
    },
    onError: () => toast.error("Error occurred while activating link"),
  })

  const deleteLinkHandler = () => deleteLinkById({ id })
  const onBanLinkClickHandler = () => expireLinkById({ id })
  const markLinkActiveFromDeletedById = () => activateLinkById({ id })
  const copyLinkHandler = () => copyToClipboard(url)

  useEffect(() => {
    const generateCode = async () => {
      try {
        const code = await generateQRCode(url)
        setQrCode(code)
      } catch (error) {
        console.error("Error generating QR code:", error)
      }
    }
    generateCode()
  }, [url])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="mb-4 w-full rounded-lg bg-white p-4 shadow-md transition-all hover:shadow-lg"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {qrCode ? (
            <img src={qrCode} alt="QR Code" className="w-12 h-12" />
          ) : (
            <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-md">
              <Loader className="h-8 w-8 animate-spin text-gray-500" />
            </div>
          )}
        </div>
        <div className="flex-grow">
          <div className="flex flex-col">
            <div className="font-bold text-blue-600">{url}</div>
            <div className="text-sm text-gray-600">{link}</div>
            {expirationTime && linkType === "active" && (
              <Badge className="my-1 w-fit" variant="outline">
                Expires at : {format(expirationTime, "dd-MM-yyyy HH:mm:ss")}
              </Badge>
            )}
          </div>
          <div className="flex space-x-2">
            <Tooltip>
              <TooltipTrigger>
                <Button onClick={copyLinkHandler} variant="ghost" size="sm" className="rounded-full">
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy link</p>
              </TooltipContent>
            </Tooltip>
            {linkType !== "deleted" && linkType !== "expired" && (
              <Tooltip>
                <TooltipTrigger>
                  <Button onClick={deleteLinkHandler} variant="ghost" size="sm" className="rounded-full">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete link</p>
                </TooltipContent>
              </Tooltip>
            )}
            {linkType === "deleted" && (
              <Tooltip>
                <TooltipTrigger>
                  <Button onClick={markLinkActiveFromDeletedById} variant="ghost" size="sm" className="rounded-full">
                    <UndoDot className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Activate link</p>
                </TooltipContent>
              </Tooltip>
            )}
            {linkType === "active" && (
              <>
                <Tooltip>
                  <TooltipTrigger>
                    <Button onClick={onBanLinkClickHandler} variant="ghost" size="sm" className="rounded-full">
                      <Ban className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Expire link</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <Button onClick={onExternalLinkClickHandler} variant="ghost" size="sm" className="rounded-full">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Open link</p>
                  </TooltipContent>
                </Tooltip>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default LinkItem
