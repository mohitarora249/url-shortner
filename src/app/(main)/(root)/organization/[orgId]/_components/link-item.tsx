"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
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

type Props = {
  shortLink: string
  id: string
  link: string
  linkType: LinkType
  expirationTime: Date | null
}

const LinkItem = ({ shortLink, id, link, linkType, expirationTime }: Props) => {
  const { copyToClipboard } = useClipboard();
  const url = `${env.NEXT_PUBLIC_BASE_URL}/${shortLink}`
  const [qrCode, setQrCode] = useState<string | null>(null)
  const onExternalLinkClickHandler = () => window.open(url)
  const { links } = api.useUtils()

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
      className="group relative overflow-hidden rounded-lg bg-white p-4 shadow-md transition-all hover:shadow-lg hover:bg-gray-50/50"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          {qrCode ? (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={qrCode}
              alt="QR Code"
              className="w-16 h-16 rounded-lg shadow-sm transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="w-16 h-16 flex items-center justify-center bg-gray-50 rounded-lg">
              <Loader className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-blue-600 truncate hover:text-blue-700 transition-colors">
                {url}
              </p>
              <p className="mt-1 text-sm text-gray-600 truncate">{link}</p>
              {expirationTime && linkType === "active" && (
                <Badge variant="outline" className="mt-2">
                  Expires at: {format(expirationTime, "dd-MM-yyyy HH:mm:ss")}
                </Badge>
              )}
            </div>

            <div className="flex gap-1">
              <Tooltip>
                <TooltipTrigger>
                  <Button onClick={copyLinkHandler} variant="ghost" size="icon" className="rounded-full hover:bg-blue-50 hover:text-blue-600">
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy link</TooltipContent>
              </Tooltip>

              {linkType !== "deleted" && linkType !== "expired" && (
                <Tooltip>
                  <TooltipTrigger>
                    <Button onClick={deleteLinkHandler} variant="ghost" size="icon" className="rounded-full hover:bg-red-50 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Delete link</TooltipContent>
                </Tooltip>
              )}

              {linkType === "deleted" && (
                <Tooltip>
                  <TooltipTrigger>
                    <Button onClick={markLinkActiveFromDeletedById} variant="ghost" size="icon" className="rounded-full hover:bg-green-50 hover:text-green-600">
                      <UndoDot className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Activate link</TooltipContent>
                </Tooltip>
              )}

              {linkType === "active" && (
                <>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button onClick={onBanLinkClickHandler} variant="ghost" size="icon" className="rounded-full hover:bg-yellow-50 hover:text-yellow-600">
                        <Ban className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Expire link</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button onClick={onExternalLinkClickHandler} variant="ghost" size="icon" className="rounded-full hover:bg-blue-50 hover:text-blue-600">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Open link</TooltipContent>
                  </Tooltip>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default LinkItem;
