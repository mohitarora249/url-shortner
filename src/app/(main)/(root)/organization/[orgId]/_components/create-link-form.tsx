"use client";

import { useParams } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import useCreateLink from "~/hooks/use-create-link";
import { Loader2, MailIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const CreateLinkForm = () => {
  const params = useParams();
  const orgId = params.orgId as string;
  const { form, onSubmit, isLoading } = useCreateLink({ orgId });

  return (
    <div className="w-full ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mb-4 flex w-full space-x-1 md:space-x-4"
        >
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="https://www.linklift.in" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expiration"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="">
                    <SelectTrigger className="min-w-max">
                      <SelectValue placeholder="No Expiration" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="5_MIN">5 minutes</SelectItem>
                    <SelectItem value="15_MIN">15 minutes</SelectItem>
                    <SelectItem value="1_HR">1 hour</SelectItem>
                    <SelectItem value="24_HR">24 hours</SelectItem>
                    <SelectItem value="NO_EXP">No Expiration</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button disabled={isLoading} type="submit">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateLinkForm;
