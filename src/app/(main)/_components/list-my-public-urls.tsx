"use client"

import { api } from "~/trpc/react"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { generateQRCode } from "~/lib/qr-code"
import { env } from "~/env"
import { Loader } from "lucide-react"
import Link from "next/link"
import useFingerprint from "~/hooks/use-fingerprint"

const ListMyPublicURLs = () => {
  const fingerprint = useFingerprint()

  const { data, isFetching } = api.publicLink.getAllMyLinks.useQuery({
    i: fingerprint,
  })

  if (isFetching)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex justify-center items-center h-20"
      >
        <Loader className="h-8 w-8 animate-spin text-blue-500" />
      </motion.div>
    )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-sm space-y-2"
    >
      <AnimatePresence mode="popLayout">
        {data?.map((link) => (
          <ListItem key={link.id} link={link} />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

const ListItem = ({ link }: { link: any }) => {
  const [qrCode, setQrCode] = useState<string | null>(null)
  const url = `${env.NEXT_PUBLIC_BASE_URL}/pub/${link.shortLink}`

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
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-1 w-full rounded-lg bg-white p-1 px-4 shadow-md transition-all hover:shadow-lg min-w-fit"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {qrCode ? (
            <motion.img
              src={qrCode}
              alt="QR Code"
              className="w-12 h-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.div
              className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-md"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Loader className="h-8 w-8 text-gray-500" />
            </motion.div>
          )}
        </div>
        <div className="flex flex-col">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link href={url} target="_blank" className="text-sm font-semibold hover:underline">
              {url}
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-start text-xs text-gray-500"
          >
            {link.link}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default ListMyPublicURLs
