import { Links } from "@prisma/client";
import { ExternalLink, Trash2, Ban, UndoDot } from "lucide-react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { env } from "~/env";
import { api } from "~/trpc/react";
import { LinkType } from "~/types";

type Props = Links & { linkType: LinkType };

const LinkItem = ({ shortLink, id, link, linkType }: Props) => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/${shortLink}`;
  const onExternalLinkClickHandler = () => window.open(url);
  const { links } = api.useUtils();

  const { mutate: deleteLinkById } = api.links.deleteById.useMutation({
    onSuccess: () => {
      toast.success("Link deleted");
      links.invalidate();
    },
    onError: () => toast.error("Error occurred while deleting link"),
  });
  const { mutate: expireLinkById } = api.links.expireById.useMutation({
    onSuccess: () => {
      toast.success("Link expired");
      links.invalidate();
    },
    onError: () => toast.error("Error occurred while expiring link"),
  });

  const { mutate: activateLinkById } =
    api.links.markLinkActiveFromDeletedById.useMutation({
      onSuccess: () => {
        toast.success("Link activated");
        links.invalidate();
      },
      onError: () => toast.error("Error occurred while activating link"),
    });

  const deleteLinkHandler = () => deleteLinkById({ id });
  const markLinkActiveFromDeletedById = () => activateLinkById({ id });
  const onBanLinkClickHandler = () => expireLinkById({ id });

  return (
    <div
      key={id}
      className="flex w-full cursor-pointer flex-col rounded-md hover:bg-gray-50"
    >
      <div className="flex items-center">
        <div className="flex w-full flex-col">
          <div className="md:text-normal text-sm font-bold">{url}</div>
          <div className="text-xs md:text-sm">{link}</div>
        </div>
        <div className="flex w-full justify-end space-x-1 md:space-x-2">
          {linkType !== "deleted" && (
            <Tooltip>
              <TooltipTrigger>
                <Button onClick={deleteLinkHandler} variant="ghost">
                  <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Delete link</p>
              </TooltipContent>
            </Tooltip>
          )}
          {linkType === "deleted" && (
            <Tooltip>
              <TooltipTrigger>
                <Button onClick={markLinkActiveFromDeletedById} variant="ghost">
                  <UndoDot className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Active link</p>
              </TooltipContent>
            </Tooltip>
          )}
          {linkType === "active" && (
            <>
              <Tooltip>
                <TooltipTrigger>
                  <Button onClick={onBanLinkClickHandler} variant="ghost">
                    <Ban className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Expire link</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Button onClick={onExternalLinkClickHandler} variant="ghost">
                    <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Open link</p>
                </TooltipContent>
              </Tooltip>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkItem;
