"use client"

import { Organization } from "@prisma/client";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import JazzIcon from "~/components/jazz-icon";
import { ChevronsUpDown, PlusCircle } from 'lucide-react';
import { Button } from "~/components/ui/button";
import { Command, CommandList, CommandDialog, CommandEmpty, CommandInput, CommandItem, CommandSeparator, CommandGroup } from "~/components/ui/command";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { cn } from "~/lib/utils"
import { api } from "~/trpc/react";
import CreateOrgForm from "./create-org-form";
import { useParams, useRouter } from "next/navigation";

type Props = {
  className?: string;
}

const OrganizationSwitcher = ({ className = "" }: Props) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);
  const closeShowNewTeamDialog = () => setShowNewTeamDialog(false);
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | undefined>(undefined);
  const [organizations, setOrganizations] = useState<Organization[] | []>([]);
  const { data = [], isLoading } = api.organization.getAllUserOrgById.useQuery({});

  useEffect(() => {
    if (!isLoading) {
      setOrganizations(data);
      setSelectedOrganization(data.filter(d => d.id === params.orgId)[0]);
    };
  }, [isLoading])

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("w-[200px] justify-between items-center", className)}
          >
            {selectedOrganization ? <JazzIcon text={selectedOrganization.name} className="flex items-center mr-1" diameter={25} /> : <></>}
            <span className="">{selectedOrganization ? selectedOrganization.name : ""}</span>
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search Organization..." />
              <CommandEmpty>No Organization found.</CommandEmpty>
              <CommandGroup key="organizations" heading="Organizations">
                {organizations.map((organization) => (
                  <CommandItem
                    key={organization.id}
                    onSelect={() => {
                      setSelectedOrganization(organization);
                      setOpen(false);
                      router.push(`${organization.id}`)
                    }}
                    className="text-sm"
                  >
                    <JazzIcon text={organization.name} className="mr-2" diameter={20} />
                    <span className="">{organization.name}</span>
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedOrganization?.name === organization.name
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false)
                      setShowNewTeamDialog(true)
                    }}
                  >
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create Organization
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Organization</DialogTitle>
          <DialogDescription>
            Add a Organization to manage your links.
          </DialogDescription>
        </DialogHeader>
        <CreateOrgForm callback={closeShowNewTeamDialog} />
      </DialogContent>
    </Dialog>
  )
}

export default OrganizationSwitcher;
