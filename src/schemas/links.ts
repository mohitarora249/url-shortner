import { z } from "zod";

export const CreateShortenLink = z.object({
  link: z.string().url({message: "Must be a valid url."}),
  orgId: z.string()
});

export const ShortenLinkSchema = z.object({ shortLink: z.string().min(1) });
