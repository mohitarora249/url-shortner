"use client"

import { motion } from "framer-motion"
import CreateLinkForm from "./_components/create-link-form"
import LinksList from "./_components/links-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import Overview from "./_components/overview"
import { ORGANIZATION_PAGE_TABS } from "~/constants"

const Organization = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 p-6"
    >
      <div className="mx-auto h-full max-w-screen-xl rounded-lg bg-white p-8 shadow-lg">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <CreateLinkForm />
        </motion.div>
        <Tabs defaultValue="active-links" className="w-full space-y-8">
          <TabsList className="w-full bg-gray-100 p-1 rounded-lg">
            {ORGANIZATION_PAGE_TABS.map((tab, index) => (
              <motion.div
                key={tab.value}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
                className="w-full"
              >
                <TabsTrigger
                  className="w-full rounded-md transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  value={tab.value}
                >
                  {tab.label}
                </TabsTrigger>
              </motion.div>
            ))}
          </TabsList>
          <TabsContent value="overview">
            <Overview />
          </TabsContent>
          <TabsContent value="active-links">
            <LinksList />
          </TabsContent>
          <TabsContent value="expired-links">
            <LinksList linkType="expired" />
          </TabsContent>
          <TabsContent value="deleted-links">
            <LinksList linkType="deleted" />
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  )
}

export default Organization
