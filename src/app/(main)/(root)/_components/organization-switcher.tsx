"use client";

import { Organization } from "@prisma/client";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import JazzIcon from "~/components/jazz-icon";
import { ChevronsUpDown, PlusCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandSeparator,
  CommandGroup,
} from "~/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import CreateOrgForm from "./create-org-form";
import { useParams, useRouter } from "next/navigation";
import { Input } from "~/components/ui/input";
import { toast } from "sonner";

type Props = {
  className?: string;
};

const OrganizationSwitcher = ({ className = "" }: Props) => {
  const params = useParams();
  const router = useRouter();
  const [orgName, setOrgName] = useState("");
  const [open, setOpen] = useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState<
    Organization | undefined
  >(undefined);
  const [organizations, setOrganizations] = useState<Organization[] | []>([]);

  const {
    data = [],
    isLoading,
    isFetching,
    refetch,
  } = api.organization.getAllUserOrgById.useQuery();
  const orgNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrgName(e.target.value);
  };
  const { mutate: createOrganization, isLoading: createOrgLoading } =
    api.organization.create.useMutation({
      onSuccess: () => {
        toast(`${orgName} organization created`);
        setOrgName("");
        setShowNewTeamDialog(false);
        refetch();
      },
    });
  const createOrgHandler = () => {
    createOrganization({ name: orgName });
  };
  useEffect(() => {
    if (!isLoading) {
      setOrganizations(data);
      setSelectedOrganization(data.filter((d) => d.id === params.orgId)[0]);
    }
  }, [isLoading, isFetching]);

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("w-[200px] items-center justify-between", className)}
          >
            {selectedOrganization ? (
              <JazzIcon
                text={selectedOrganization.name}
                className="mr-1 flex items-center"
                diameter={25}
              />
            ) : (
              <></>
            )}
            <span className="">
              {selectedOrganization ? selectedOrganization.name : ""}
            </span>
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
                      router.push(`${organization.id}`);
                    }}
                    className="text-sm"
                  >
                    <JazzIcon
                      text={organization.name}
                      className="mr-2"
                      diameter={20}
                    />
                    <span className="">{organization.name}</span>
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedOrganization?.name === organization.name
                          ? "opacity-100"
                          : "opacity-0",
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
                      setOpen(false);
                      setShowNewTeamDialog(true);
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
        <div className="flex flex-col">
          <Input
            className="my-4"
            onChange={orgNameChangeHandler}
            value={orgName}
          />
          <Button
            disabled={createOrgLoading}
            className="my-4"
            onClick={createOrgHandler}
          >
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrganizationSwitcher;
