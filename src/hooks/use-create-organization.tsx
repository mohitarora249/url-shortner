"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { z } from "zod"
import { CreateOrgSchema } from "~/schemas/organization";
import { api } from "~/trpc/react";

type Args = {
  callback?: () => void;
}

const useCreateOrganization = ({ callback }: Args) => {
  const { mutate, isLoading, isError, isSuccess } = api.organization.create.useMutation({
    onSuccess: (data) => toast(`${data.name} Organization created`),
    onError: (err) => toast(err.message)
  });

  const form = useForm<z.infer<typeof CreateOrgSchema>>({
    resolver: zodResolver(CreateOrgSchema),
    defaultValues: {
      name: "",
      host: ""
    },
  });

  const onSubmit = (values: z.infer<typeof CreateOrgSchema>) => {
    mutate({ name: values.name, host: values.host });
    form.reset();
    if (callback) callback();
  }

  return {
    onSubmit, form, isLoading, isError, isSuccess
  }

}

export default useCreateOrganization;

