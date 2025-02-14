import { z } from "zod";

export const ExpirationEnum = z.enum([
  "5_MIN",
  "15_MIN",
  "1_HR",
  "24_HR",
  "NO_EXP",
]);

export const CreateShortenLink = z.object({
  link: z
    .string()
    .url({ message: "Must be a valid url. e.g. https://www.linklift.in" }),
  orgId: z.string(),
  expiration: ExpirationEnum,
  password: z.string().optional(),
});

export const CreateShortenLinkViaSDK = z.object({
  link: z
    .string()
    .url({ message: "Must be a valid url. e.g. https://www.linklift.in" }),
  options: z.object({
    expiration: ExpirationEnum,
  }),
});

export const ShortenLinkSchema = z.object({ shortLink: z.string().min(1) });

export const APIKeySchema = z.object({ apiKey: z.string() });
