import CreateLinkForm from "./_components/create-link-form";
import LinksList from "./_components/links-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

const Organization = () => {
  return (
    <div className="h-full w-full">
      <div className="mx-auto max-w-screen-lg">
        <div className="flex space-x-2 md:space-x-4">
          <CreateLinkForm />
        </div>
        <Tabs defaultValue="active-links" className="w-full">
          <TabsList>
            <TabsTrigger value="active-links">Active Links</TabsTrigger>
            <TabsTrigger value="expired-links">Expired Links</TabsTrigger>
            <TabsTrigger value="deleted-links">Deleted Links</TabsTrigger>
          </TabsList>
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
