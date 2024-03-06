import { z } from "zod";

export const LinkEnum = z.enum(["expired", "active", "deleted"]);
export type LinkType = z.infer<typeof LinkEnum>;
