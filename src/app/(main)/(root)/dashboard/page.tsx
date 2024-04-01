"use client";

import { api } from "~/trpc/react";
import OrganizationCard from "./_components/organization-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Button, buttonVariants } from "~/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import OrganizationListSkeleton from "./_components/organization-list-skeleton";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { data, isLoading } = api.organization.getAll.useQuery();

  return (
    <div className="mx-2 flex h-full w-full flex-col">
      {isLoading && <OrganizationListSkeleton />}
      {!isLoading && data && data?.length === 0 && (
        <div className="flex h-full w-full flex-1 items-center justify-center">
          <CreateOrganization />
        </div>
      )}
      {!isLoading && data && data?.length > 0 && (
        <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {data.map((org) => (
            <OrganizationCard key={org.id} orgId={org.id} orgName={org.name} />
          ))}
        </div>
      )}
    </div>
  );
};

const CreateOrganization = () => {
  const [orgName, setOrgName] = useState("");
  const [open, setOpen] = useState(false);
  const orgNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrgName(e.target.value);
  };
  const { mutate: createOrganization, isLoading } =
    api.organization.create.useMutation({
      onSuccess: () => {
        toast(`${orgName} organization created`);
        setOrgName("");
        setOpen(false);
      },
    });
  const createOrgHandler = () => {
    createOrganization({ name: orgName });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <motion.div
          whileHover={{ scale: 1.5 }}
          className={buttonVariants({ size: "lg" })}
        >
          Create your first Organization
        </motion.div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="my-4">Create Organization</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col">
              <Input
                className="my-4"
                onChange={orgNameChangeHandler}
                value={orgName}
              />
              <Button
                disabled={isLoading}
                className="my-4"
                onClick={createOrgHandler}
              >
                Create
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Dashboard;
