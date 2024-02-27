"use client";

import { api } from '~/trpc/react';
import OrganizationCard from './_components/organization-card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

const Dashboard = () => {

  const { data, isLoading } = api.organization.getAll.useQuery({});
  console.log("data : ", data);

  return (
    <div>
      {isLoading && <div>Loading</div>}
      {!isLoading && data && data?.length === 0 && <div className='h-full w-full flex justify-center items-center'>
        <CreateOrganization />
      </div>}
      {!isLoading && data && data?.length > 0 &&
        <div className='max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
          {data.map(org => <OrganizationCard key={org.id} orgId={org.id} orgName={org.name} />)}
        </div>}
    </div>
  )
}

const CreateOrganization = () => {
  const [orgName, setOrgName] = useState("");
  const orgNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrgName(e.target.value);
  }
  const { mutate: createOrganization, isLoading } = api.organization.create.useMutation({
    onSuccess: () => {
      toast(`${orgName} organization created`)
      setOrgName("");
    }
  });
  const createOrgHandler = () => {
    createOrganization({ name: orgName })
  }
  return (
    <Dialog>
      <DialogTrigger>Create your first Organization</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='my-4'>Create Organization</DialogTitle>
          <DialogDescription>
            <div className='flex flex-col'>
              <Input className='my-4' onChange={orgNameChangeHandler} value={orgName} />
              <Button disabled={isLoading} className='my-4' onClick={createOrgHandler}>Create</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default Dashboard;
