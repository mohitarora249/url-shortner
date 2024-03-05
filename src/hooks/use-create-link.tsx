"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { CreateShortenLink } from "~/schemas/links";
import { api } from "~/trpc/react";

const useCreateLink = ({ orgId }: { orgId: string }) => {
  const { links } = api.useUtils();
  const { mutate, isLoading, isError, isSuccess } =
    api.links.create.useMutation({
      onSuccess: () => {
        links.invalidate();
        toast.success("Link Generated");
        form.reset();
      },
      onError: (err) => {
        if (err.message === "TOO_MANY_REQUESTS")
          toast.error("Too many requests. Try after 10 seconds");
        else toast.error(err.message);
      },
    });

  const form = useForm<z.infer<typeof CreateShortenLink>>({
    resolver: zodResolver(CreateShortenLink),
    defaultValues: {
      link: "",
      orgId: "",
      expiration: "NO_EXP",
    },
  });

  const onSubmit = (values: z.infer<typeof CreateShortenLink>) => {
    form.reset();
    mutate({ link: values.link, orgId, expiration: values.expiration });
  };

  return {
    onSubmit,
    form,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useCreateLink;
