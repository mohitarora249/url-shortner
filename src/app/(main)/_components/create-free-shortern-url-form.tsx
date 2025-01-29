"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";


const CreateFreeShorternURLForm = () => {
    const { publicLink } = api.useUtils();

    const formSchema = z.object({
        link: z
            .string()
            .url({ message: "Must be a valid url. e.g. https://www.linklift.in" }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            link: "",
        },
    });

    const { mutate, isPending } = api.publicLink.create.useMutation({
        onSuccess: () => {
            publicLink.refetch();
            toast.success("Link Generated");
        },
        onError: (err) => {
            toast.error(err.message)
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        form.reset();
        mutate({ link: values.link });
    };


    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-2">
                    <Input
                        className="max-w-lg flex-1"
                        placeholder="Enter your long URL"
                        type="url"
                        {...form.register("link")}
                    />
                    <Button type="submit" disabled={isPending}>Shorten</Button>
                </form>
            </Form>
            <p className="text-xs text-gray-500 dark:text-gray-400">
                No sign up required. Shorten your first link for free!
            </p>
        </>
    );
};

export default CreateFreeShorternURLForm;