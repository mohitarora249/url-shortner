import { motion } from "framer-motion"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { ExternalLink } from "lucide-react"

interface LinkPreviewCardProps {
  url: string
}

export function LinkPreviewCard({ url }: LinkPreviewCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Link Preview</CardTitle>
        </CardHeader>
        <CardDescription className="relative h-52 w-full">
          <iframe 
            src={url} 
            className="w-full h-full border-none rounded-lg"
            sandbox="allow-scripts allow-same-origin"
          />
        </CardDescription>
        <CardFooter>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
          </a>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
