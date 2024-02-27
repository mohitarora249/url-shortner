"use client";

import { useParams } from 'next/navigation';
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input'
import useCreateLink from '~/hooks/use-create-link';
import { Loader2 } from 'lucide-react';

const CreateLinkForm = () => {
  const params = useParams();
  const orgId = params.orgId as string;
  const { form, onSubmit, isLoading } = useCreateLink({ orgId });

  return (
    <div className='w-full '>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex space-x-4 mb-4">
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input placeholder="Enter link here" {...field} />
                </FormControl>
                <FormMessage />
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
  )
}

export default CreateLinkForm;
