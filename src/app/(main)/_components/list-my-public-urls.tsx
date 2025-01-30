"use client";

import { api } from "~/trpc/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { generateQRCode } from "~/lib/qr-code";
import { env } from "~/env";
import { Loader } from "lucide-react";
import Link from "next/link";
import { ClientJS } from "clientjs";

const ListMyPublicURLs = () => {
    const { data, isFetching } = api.publicLink.getAllMyLinks.useQuery({
        i: new ClientJS().getFingerprint().toString()
    });
    console.log("data : ", data)
    if (isFetching) return null;
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-sm space-y-2"
        >
            {data?.map((link) => (
                <ListItem key={link.id} link={link} />
            ))}
        </motion.div>
    );
};

const ListItem = ({ link }: { link: any }) => {
    const [qrCode, setQrCode] = useState<string | null>(null);
    const url = `${env.NEXT_PUBLIC_BASE_URL}/${link.shortLink}`
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
            className="mb-1 w-full rounded-lg bg-white p-1 shadow-md transition-all hover:shadow-lg"
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
                <div>
                    <Link href={url} target="_blank" className="text-sm font-semibold hover:underline">{url}</Link>
                    <div className="text-start text-xs text-gray-500">{link.link}</div>
                </div>
            </div>
        </motion.div>
    )
}

export default ListMyPublicURLs;