"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { z } from "zod"
import { CreateShortenLink } from "~/schemas/links";
import { api } from "~/trpc/react";

const useCreateLink = ({ orgId }: { orgId: string }) => {
  const { links } = api.useUtils();
  const { mutate, isLoading, isError, isSuccess } = api.links.create.useMutation({
    onSuccess: () => {
      links.invalidate();
      toast("Link Generated");
      form.reset();
    },
    onError: (err) => toast(err.message)
  });

  const form = useForm<z.infer<typeof CreateShortenLink>>({
    resolver: zodResolver(CreateShortenLink),
    defaultValues: {
      link: "",
      orgId: ""
    },
  });

  const onSubmit = (values: z.infer<typeof CreateShortenLink>) => {
    mutate({ link: values.link, orgId });
  }

  return {
    onSubmit, form, isLoading, isError, isSuccess
  }

}

export default useCreateLink;
