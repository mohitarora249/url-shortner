"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import useFingerprint from "~/hooks/use-fingerprint";
import { api } from "~/trpc/react";
import { motion, AnimatePresence } from "framer-motion";

const CreateFreeShorternURLForm = () => {
    const { publicLink } = api.useUtils();
    const fingerprint = useFingerprint();
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
        }
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        form.reset();
        mutate({ link: values.link, i: fingerprint });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-2">
                    <motion.div
                        className="max-w-lg flex-1"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Input
                            className="w-full"
                            placeholder="Enter your long URL"
                            type="url"
                            {...form.register("link")}
                        />
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button type="submit" disabled={isPending}>
                            {isPending ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                >
                                    ⟳
                                </motion.div>
                            ) : (
                                "Shorten"
                            )}
                        </Button>
                    </motion.div>
                </form>
            </Form>
            <AnimatePresence>
                {form.formState.errors.link && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-xs text-red-500 mt-1"
                    >
                        {form.formState.errors.link.message}
                    </motion.p>
                )}
            </AnimatePresence>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xs text-gray-500 dark:text-gray-400 mt-2"
            >
                No sign up required. Shorten your first link for free!
            </motion.p>
        </motion.div>
    );
};

export default CreateFreeShorternURLForm;
