"use client";
import { Links } from "@prisma/client";
import { ExternalLink, Trash2, Ban, UndoDot, Copy } from "lucide-react";
import { Badge } from "~/components/ui/badge";
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
import { format } from "date-fns";
import useClipboard from "~/hooks/common/use-clipboard";

type Props = Links & { linkType: LinkType };

const LinkItem = ({ shortLink, id, link, linkType, expirationTime }: Props) => {
  const { copyToClipboard } = useClipboard();
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
  const onBanLinkClickHandler = () => expireLinkById({ id });
  const markLinkActiveFromDeletedById = () => activateLinkById({ id });
  const copyLinkHandler = () => copyToClipboard(url);

  return (
    <div
      key={id}
      className="flex w-full cursor-pointer flex-col rounded-md pl-2 hover:bg-gray-50"
    >
      <div className="flex items-center">
        <div className="flex w-full flex-col">
          <div className="font-bold">{url}</div>
          <div className="text-sm">{link}</div>
          {expirationTime && linkType === "active" && (
            <Badge className="my-[2px] w-fit" variant="outline">
              Expires at : {format(expirationTime, "dd-MM-yyyy HH:mm:ss")}
            </Badge>
          )}
        </div>
        <div className="flex w-full justify-end space-x-2">
          <Tooltip>
            <TooltipTrigger>
              <Button onClick={copyLinkHandler} variant="ghost">
                <Copy className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy link</p>
            </TooltipContent>
          </Tooltip>
          {linkType !== "deleted" && linkType !== "expired" && (
            <Tooltip>
              <TooltipTrigger>
                <Button onClick={deleteLinkHandler} variant="ghost">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
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
                    <Ban className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Expire link</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Button onClick={onExternalLinkClickHandler} variant="ghost">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
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
