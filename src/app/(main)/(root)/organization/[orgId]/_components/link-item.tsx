"use client";
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import { generateQRCode } from "~/lib/qr-code";

type Props = Links & { linkType: LinkType };

const LinkItem = ({ shortLink, id, link, linkType }: Props) => {
  const [qrCode, setQrCode] = useState("");
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

  const onLinkMouseOverHandler = async () => {
    const linkQR = await generateQRCode(link);
    setQrCode(linkQR);
  };

  return (
    <div
      key={id}
      className="flex w-full cursor-pointer flex-col rounded-md pl-2 hover:bg-gray-50"
    >
      <div className="flex items-center" onMouseOver={onLinkMouseOverHandler}>
        <HoverCard>
          <HoverCardTrigger className="w-full" asChild>
            <div className="flex w-full flex-col">
              <div className="font-bold">{url}</div>
              <div className="text-sm">{link}</div>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="m-0 h-[250px] w-[250px] p-0">
            {!qrCode ? (
              <Skeleton className="h-[250px] w-[250px]" />
            ) : (
              <Image
                alt={`QR Code from link ${link}`}
                height={250}
                width={250}
                src={qrCode}
              />
            )}
          </HoverCardContent>
        </HoverCard>
        <div className="flex w-full justify-end space-x-2">
          {linkType !== "deleted" && (
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