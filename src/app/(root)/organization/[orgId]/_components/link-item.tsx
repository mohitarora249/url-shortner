import { Links } from "@prisma/client";
import { ExternalLink, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { env } from "~/env";
import { api } from "~/trpc/react";

const LinkItem = ({ shortLink, id, link }: Links) => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/${shortLink}`;
  const onExternalLinkClickHandler = () => window.open(url);
  const { links } = api.useUtils();
  const { mutate, } = api.links.deleteById.useMutation({
    onSuccess: () => {
      toast("Link deleted");
      links.invalidate();
    },
    onError: () => toast("Error occurred while deleting link")
  });

  const deleteLinkHandler = () => {
    mutate({ id });
  };

  return (
    <div key={id} className="flex w-full flex-col hover:bg-gray-50 pl-2 rounded-md cursor-pointer">
      <div className="flex items-center">
        <div className="flex flex-col">
          <div className="font-bold">{url}</div>
          <div className='text-sm'>{link}</div>
        </div>
        <div className='space-x-2 flex justify-end w-full'>
          <Button onClick={deleteLinkHandler} variant="ghost">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button onClick={onExternalLinkClickHandler} variant="ghost">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LinkItem;