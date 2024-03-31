import CreateLinkForm from "./_components/create-link-form";
import LinksList from "./_components/links-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import Overview from "./_components/overview";
import { ORGANIZATION_PAGE_TABS } from "~/constants";

const Organization = () => {
  return (
    <div className="h-full w-full">
      <div className="mx-auto max-w-screen-lg">
        <div className="flex space-x-2 md:space-x-4">
          <CreateLinkForm />
        </div>
        <Tabs defaultValue="active-links" className="w-full space-y-8">
          <TabsList className="w-full">
            {ORGANIZATION_PAGE_TABS.map((tab) => (
              <TabsTrigger className="w-full" key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
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
    </div>
  );
};

export default Organization;
