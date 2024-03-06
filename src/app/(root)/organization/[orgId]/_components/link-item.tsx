import { Links } from "@prisma/client";
import { ExternalLink, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { env } from "~/env";
import { api } from "~/trpc/react";
import { LinkType } from "~/types";

type Props = Links & { linkType: LinkType };

const LinkItem = ({ shortLink, id, link, linkType }: Props) => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/${shortLink}`;
  const onExternalLinkClickHandler = () => window.open(url);
  const { links } = api.useUtils();
  const { mutate } = api.links.deleteById.useMutation({
    onSuccess: () => {
      toast.success("Link deleted");
      links.invalidate();
    },
    onError: () => toast.error("Error occurred while deleting link"),
  });

  const deleteLinkHandler = () => {
    mutate({ id });
  };

  return (
    <div
      key={id}
      className="flex w-full cursor-pointer flex-col rounded-md pl-2 hover:bg-gray-50"
    >
      <div className="flex items-center">
        <div className="flex w-full flex-col">
          <div className="font-bold">{url}</div>
          <div className="text-sm">{link}</div>
        </div>
        <div className="flex w-full justify-end space-x-2">
          {linkType !== "deleted" && <Button onClick={deleteLinkHandler} variant="ghost">
            <Trash2 className="h-4 w-4" />
          </Button>}
          {linkType === "active" && <Button onClick={onExternalLinkClickHandler} variant="ghost">
            <ExternalLink className="h-4 w-4" />
          </Button>}
        </div>
      </div>
    </div>
  );
};

export default LinkItem;
